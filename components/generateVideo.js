
const { bundle } = require("@remotion/bundler");
const { renderMedia, selectComposition } = require("@remotion/renderer");
const path = require("path");
const fs = require("fs-extra");
const { getAudioDurationInSeconds } = require("get-audio-duration");
const { generateAudio } = require("./generateAudio");
const { GoogleGenAI } = require("@google/genai");

async function generateImage(drawing_description) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const image_prompt = `
        Create a detailed educational drawing-style image based on this description: ${drawing_description}

        REQUIREMENTS:
        - Style: Clean line drawing with ONLY blue, purple, black lines on a STRICTLY PURE WHITE background.
        - Detailed, rich illustration with complex elements and diagrams.
        - High contrast for visibility - ABSOLUTELY NO black, dark, or mixed backgrounds - ONLY pure white.
        - FORMAT: Rectangular (16:9 aspect ratio) with TWO side-by-side educational diagrams/figures.
        - INCLUDE clear text labels and explanatory text within the image for educational clarity.
        - Each diagram should be comprehensive and match the narration exactly.
        - Make all elements VERY LARGE and EXTREMELY CLEARLY VISIBLE - use THICK, BOLD lines and LARGE, BOLD text.
        - PROGRESSIVE COMPLEXITY: Start minimal in scene 1, add complexity gradually.
        - MAXIMUM CLARITY: Ensure every element is crystal clear and easy to read from a distance.
        - NO EMOJIS, NO logos, NO additional decorative elements unless explicitly requested in the description.
        - BACKGROUND MUST BE 100% PURE WHITE - no variations, gradients, or dark areas.
        - Ensure the entire image is highly educational and matches the drawing description exactly.
        `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: image_prompt,
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return part.inlineData.data; // base64
    }
  }
  return null;
}

async function generateVideo({ script, prompt }) {
  try {
    const compositionId = "MyComp";
    const transitionDuration = 15; // frames per transition
    const audioDir = path.join(__dirname, "../public/audio");
    const imageDir = path.join(__dirname, "../public/images");
    await fs.ensureDir(audioDir);
    await fs.ensureDir(imageDir);

    console.log("Generating full audio...");
    const audioFilename = `full_audio.wav`;
    const audioOutputPath = path.join(audioDir, audioFilename);

    let inputProps;

    try {
      await generateAudio(script, audioOutputPath);
      const totalDurationInSeconds = await getAudioDurationInSeconds(audioOutputPath);
      const totalFrames = Math.ceil(totalDurationInSeconds * 30); // Assuming 30 FPS

      console.log(`Total audio duration: ${totalDurationInSeconds}s, total frames: ${totalFrames}`);

      const scriptWithDuration = [];

      for (let i = 0; i < script.length; i++) {
        const scene = script[i];
        const sceneDurationInSeconds = totalDurationInSeconds / script.length;
        const durationInFrames = Math.ceil(sceneDurationInSeconds * 30);

        let updatedScene = {
          ...scene,
          durationInFrames,
        };

        console.log(`Generating image for scene ${i}...`);
        const imageData = await generateImage(scene.image_prompt);
        if (imageData) {
          const imageFilename = `scene_${i}.png`;
          const imagePath = path.join(imageDir, imageFilename);
          fs.writeFileSync(imagePath, Buffer.from(imageData, "base64"));
          updatedScene.imagePath = `/images/${imageFilename}`;
        }

        scriptWithDuration.push(updatedScene);
      }

      const finalScript = scriptWithDuration;

      inputProps = { script: finalScript, audioPath: `/audio/${audioFilename}`, durationInFrames: totalFrames };
    } catch (audioError) {
      console.error("Failed to generate full audio:", audioError.message);
      throw audioError;
    }
    const sanitizedPrompt = prompt.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
    const timestamp = Date.now();
    const outputLocation = path.join(__dirname, "../public", `${sanitizedPrompt}_${timestamp}.mp4`);

    // Now bundle AFTER audio is generated
    console.log("Bundling Remotion project...");
    const bundleLocation = await bundle({
      entryPoint: path.join(__dirname, "../src/index.tsx"),
      webpackOverride: (config) => config,
    });

    // Copy audio files to the bundle's root audio folder
    const bundleAudioDir = path.join(bundleLocation, "audio");
    await fs.ensureDir(bundleAudioDir);
    await fs.copy(audioDir, bundleAudioDir, { overwrite: true });

    // Copy image files to the bundle's root images folder
    const bundleImageDir = path.join(bundleLocation, "images");
    await fs.ensureDir(bundleImageDir);
    await fs.copy(imageDir, bundleImageDir, { overwrite: true });

    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: compositionId,
      inputProps,
    });

    console.log("Starting video render...");
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation,
      inputProps,
    });

    console.log("Video rendered successfully:", outputLocation);
    return outputLocation;
  } catch (error) {
    console.error("Error generating video:", error);
    return null;
  }
}
module.exports = generateVideo;

// generateVideo();
