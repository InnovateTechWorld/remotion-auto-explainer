// render.js main file
require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
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

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    console.log("Generating script for prompt:", prompt);
    const script = await generate(prompt);
    if (script) {
      console.log("Script generated:", script);
      const videoPath = await generateVideo({ script, prompt });
      if (videoPath) {
        console.log("Video generated successfully:", videoPath);
        res.status(200).json({ message: "Video generated successfully", videoPath });
      } else {
        console.log("Video generation failed");
        res.status(500).json({ message: "Video generation failed" });
      }
    } else {
      console.log("Script generation failed");
      res.status(500).json({ message: "Script generation failed" });
    }
  } catch (error) {
    console.error("Error generating video:", error);
    res.status(500).json({ message: "Error generating video" });
  }
});
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
