// render.js main file
require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;
const generate = require("./components/scriptGenerator.js");
const generateVideo = require("./components/generateVideo.js");
const cors = require("cors");
app.use(
  cors({
    origin: "*", // Allow all origins
  }),
);

app.use(express.json());
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
  // Set headers for streaming response
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Transfer-Encoding', 'chunked');

  try {
    const { prompt } = req.body;

    // Input validation
    if (!prompt || typeof prompt !== 'string') {
      res.write(JSON.stringify({ status: 'error', message: "Prompt is required and must be a string" }) + '\n');
      res.end();
      return;
    }

    if (prompt.trim().length < 3) {
      res.write(JSON.stringify({ status: 'error', message: "Prompt must be at least 3 characters long" }) + '\n');
      res.end();
      return;
    }

    if (prompt.length > 500) {
      res.write(JSON.stringify({ status: 'error', message: "Prompt must be less than 500 characters" }) + '\n');
      res.end();
      return;
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
      res.write(JSON.stringify({ status: 'error', message: "Failed to generate video script. Please try a different prompt." }) + '\n');
      res.end();
      return;
    }

    console.log("Script generated with", script.length, "scenes");

    // Send progress update if client is still connected
    if (res.writable) {
      res.write(JSON.stringify({ status: 'progress', message: 'Script generated. Generating video...' }) + '\n');
    }

    // Generate video with timeout
    const videoPath = await Promise.race([
      generateVideo({ script, prompt }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Video generation timeout')), 300000) // 5 minutes
      )
    ]);

    if (!videoPath) {
      console.log("Video generation failed");
      res.write(JSON.stringify({ status: 'error', message: "Video generation failed. Please try again." }) + '\n');
      res.end();
      return;
    }

    console.log("Video generated successfully:", videoPath);

    // Check if file exists and get its size
    const fs = require('fs');
    if (!fs.existsSync(videoPath)) {
      console.error("Generated video file not found:", videoPath);
      res.write(JSON.stringify({ status: 'error', message: "Video file was not created properly" }) + '\n');
      res.end();
      return;
    }

    const stats = fs.statSync(videoPath);
    if (stats.size === 0) {
      console.error("Generated video file is empty:", videoPath);
      fs.unlinkSync(videoPath); // Clean up empty file
      res.write(JSON.stringify({ status: 'error', message: "Generated video file is empty" }) + '\n');
      res.end();
      return;
    }

    console.log("Video file size:", stats.size, "bytes");

    // Check if client is still connected
    if (!res.writable) {
      console.log("Client disconnected, cleaning up video file");
      try {
        fs.unlinkSync(videoPath);
      } catch (cleanupError) {
        console.warn("Could not clean up video file:", cleanupError.message);
      }
      return; // Exit without sending response
    }

    // Read the video file and send it directly
    const videoBuffer = fs.readFileSync(videoPath);

    // Clean up the file after reading
    try {
      fs.unlinkSync(videoPath);
      console.log("Cleaned up video file:", videoPath);
    } catch (cleanupError) {
      console.warn("Could not clean up video file:", cleanupError.message);
    }

    // Send progress update before file download
    if (res.writable) {
      res.write(JSON.stringify({ status: 'progress', message: 'Video ready. Downloading...' }) + '\n');
    }

    // Change content type for file download
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', `attachment; filename="educational_video_${prompt.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30)}.mp4"`);
    res.setHeader('Content-Length', videoBuffer.length);
    res.setHeader('Cache-Control', 'no-cache');

    // Send the video file
    res.end(videoBuffer);

  } catch (error) {
    console.error("Error generating video:", error);

    // Provide more specific error messages
    let errorMessage = "An unexpected error occurred while generating the video";

    if (error.message.includes('timeout')) {
      errorMessage = "Video generation timed out. Please try a simpler prompt.";
    } else if (error.message.includes('API')) {
      errorMessage = "AI service temporarily unavailable. Please try again later.";
    } else if (error.message.includes('quota')) {
      errorMessage = "API quota exceeded. Please try again later.";
    }

    // Send error as streaming response
    if (res.writable) {
      res.write(JSON.stringify({ status: 'error', message: errorMessage }) + '\n');
    }
    res.end();
  }
});
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
