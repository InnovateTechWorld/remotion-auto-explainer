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
  try {
    const { prompt } = req.body;

    // Input validation
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ message: "Prompt is required and must be a string" });
    }

    if (prompt.trim().length < 3) {
      return res.status(400).json({ message: "Prompt must be at least 3 characters long" });
    }

    if (prompt.length > 500) {
      return res.status(400).json({ message: "Prompt must be less than 500 characters" });
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
      return res.status(500).json({ message: "Failed to generate video script. Please try a different prompt." });
    }

    console.log("Script generated with", script.length, "scenes");

    // Generate video with timeout
    const videoPath = await Promise.race([
      generateVideo({ script, prompt }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Video generation timeout')), 300000) // 5 minutes
      )
    ]);

    if (!videoPath) {
      console.log("Video generation failed");
      return res.status(500).json({ message: "Video generation failed. Please try again." });
    }

    console.log("Video generated successfully:", videoPath);

    // Check if file exists and get its size
    const fs = require('fs');
    if (!fs.existsSync(videoPath)) {
      console.error("Generated video file not found:", videoPath);
      return res.status(500).json({ message: "Video file was not created properly" });
    }

    const stats = fs.statSync(videoPath);
    if (stats.size === 0) {
      console.error("Generated video file is empty:", videoPath);
      fs.unlinkSync(videoPath); // Clean up empty file
      return res.status(500).json({ message: "Generated video file is empty" });
    }

    console.log("Video file size:", stats.size, "bytes");

    // Read the video file and send it directly
    const videoBuffer = fs.readFileSync(videoPath);

    // Clean up the file after reading
    try {
      fs.unlinkSync(videoPath);
      console.log("Cleaned up video file:", videoPath);
    } catch (cleanupError) {
      console.warn("Could not clean up video file:", cleanupError.message);
    }

    // Set headers for file download
    const sanitizedPrompt = prompt.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
    const filename = `educational_video_${sanitizedPrompt}.mp4`;

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', videoBuffer.length);
    res.setHeader('Cache-Control', 'no-cache');

    // Send the video file
    res.send(videoBuffer);

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

    res.status(500).json({ message: errorMessage });
  }
});
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
