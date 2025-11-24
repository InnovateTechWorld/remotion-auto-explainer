// render.js main file
require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;
const generate = require("./components/scriptGenerator.js");
const generateVideo = require("./components/generateVideo.js");
const cors = require("cors");
const AWS = require('aws-sdk');
const fs = require('fs');

app.use(
  cors({
    origin: "*", // Allow all origins
  }),
);

app.use(express.json());

// Configure AWS S3
const s3 = new AWS.S3({
  region: process.env.AWS_REGION || 'us-east-1'
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'your-video-bucket-name';

// In-memory job storage (use Redis/database for production)
const jobs = new Map();

// Cleanup old jobs (run every hour)
setInterval(() => {
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  for (const [jobId, job] of jobs.entries()) {
    if (job.createdAt < oneHourAgo) {
      jobs.delete(jobId);
    }
  }
}, 60 * 60 * 1000);

// Async video generation function
async function generateVideoAsync(script, prompt, jobId) {
  try {
    console.log(`Starting async video generation for job ${jobId}`);

    // Update job status
    jobs.set(jobId, {
      status: 'processing',
      message: 'Generating video...',
      createdAt: Date.now()
    });

    // Generate video
    const videoPath = await generateVideo({ script, prompt });

    if (!videoPath) {
      throw new Error('Video generation failed');
    }

    console.log(`Video generated successfully for job ${jobId}: ${videoPath}`);

    // Upload to S3
    const videoKey = `videos/${jobId}.mp4`;
    const fileStream = fs.createReadStream(videoPath);

    console.log(`Uploading video to S3 for job ${jobId}`);

    await s3.upload({
      Bucket: BUCKET_NAME,
      Key: videoKey,
      Body: fileStream,
      ContentType: 'video/mp4',
      ACL: 'public-read'
    }).promise();

    // Generate download URL
    const downloadUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${videoKey}`;

    // Update job status
    jobs.set(jobId, {
      status: 'completed',
      message: 'Video generated successfully!',
      downloadUrl: downloadUrl,
      createdAt: Date.now()
    });

    // Clean up local file
    try {
      fs.unlinkSync(videoPath);
      console.log(`Cleaned up local video file for job ${jobId}`);
    } catch (cleanupError) {
      console.warn(`Could not clean up video file for job ${jobId}:`, cleanupError.message);
    }

    console.log(`Video generation completed for job ${jobId}`);

  } catch (error) {
    console.error(`Error generating video for job ${jobId}:`, error);
    jobs.set(jobId, {
      status: 'error',
      message: error.message || 'Video generation failed',
      createdAt: Date.now()
    });
  }
}
// generate acess token using the refresh token

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages", "home.html"));
});
app.get("/privacy", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages", "privacy.html"));
});
app.get("/terms", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages", "terms.html"));
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    // Input validation
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ status: 'error', message: "Prompt is required and must be a string" });
    }

    if (prompt.trim().length < 3) {
      return res.status(400).json({ status: 'error', message: "Prompt must be at least 3 characters long" });
    }

    if (prompt.length > 500) {
      return res.status(400).json({ status: 'error', message: "Prompt must be less than 500 characters" });
    }

    console.log("Generating script for prompt:", prompt);

    // Generate script with timeout
    const script = await Promise.race([
      generate(prompt),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Script generation timeout')), 60000)
      )
    ]);

    if (!script || !Array.isArray(script) || script.length === 0) {
      console.log("Script generation failed or returned invalid data");
      return res.status(400).json({ status: 'error', message: "Failed to generate video script. Please try a different prompt." });
    }

    console.log("Script generated with", script.length, "scenes");

    // Generate unique job ID
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Initialize job status
    jobs.set(jobId, {
      status: 'queued',
      message: 'Video generation queued...',
      createdAt: Date.now()
    });

    // Start async video generation
    generateVideoAsync(script, prompt, jobId);

    // Return job ID immediately
    res.json({
      status: 'queued',
      message: 'Video generation started. Check status using the job ID.',
      jobId: jobId
    });

  } catch (error) {
    console.error("Error starting video generation:", error);

    // Provide more specific error messages
    let errorMessage = "An unexpected error occurred while starting video generation";

    if (error.message.includes('timeout')) {
      errorMessage = "Script generation timed out. Please try a simpler prompt.";
    } else if (error.message.includes('API')) {
      errorMessage = "AI service temporarily unavailable. Please try again later.";
    } else if (error.message.includes('quota')) {
      errorMessage = "API quota exceeded. Please try again later.";
    }

    res.status(500).json({ status: 'error', message: errorMessage });
  }
});

// Status endpoint to check job progress
app.get("/status/:jobId", (req, res) => {
  const { jobId } = req.params;

  const job = jobs.get(jobId);
  if (!job) {
    return res.status(404).json({ status: 'error', message: 'Job not found' });
  }

  res.json(job);
});
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
