
const { bundle } = require("@remotion/bundler");
const { renderMediaOnLambda } = require("@remotion/lambda");
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
        - Style: MODERN 3D RENDERED educational illustrations with realistic lighting, shadows, and depth. Use vibrant colors (blues, purples, teals) on a STRICTLY PURE WHITE background.
        - VISUAL APPEAL: Create stunning, modern 3D graphics that are visually captivating and engaging. Include subtle gradients, highlights, and professional 3D effects.
        - FORMAT: Rectangular (16:9 aspect ratio) with TWO side-by-side educational diagrams/figures.
        - CANVAS SIZE: Design for 1280x720 resolution - ensure ALL content fits perfectly within this frame.
        - LAYOUT: Two diagrams side-by-side with GENEROUS spacing between them (at least 100px gap in center). Each diagram should be well-spaced and not cramped.
        - INCLUDE clear, modern 3D-styled text labels and explanatory text within the image for educational clarity.
        - Each diagram should be comprehensive and match the narration exactly.
        - Make all elements VERY LARGE and EXTREMELY CLEARLY VISIBLE - use bold 3D styling and LARGE, BOLD text.
        - TEXT READABILITY: Use MASSIVE, EXTRA-BOLD 3D-styled text that is perfectly readable. Make all labels prominent with 3D effects.
        - PROGRESSIVE COMPLEXITY: Start minimal in scene 1, add complexity gradually.
        - MAXIMUM CLARITY: Ensure every element is crystal clear and easy to read from a distance.
        - DIAGRAM ELEMENTS: Use modern 3D arrows, lines, and shapes with depth and shadows for maximum visibility.
        - FIT TO FRAME: CRITICAL - ensure the entire composition fits within the 16:9 canvas with NO elements cut off or extending outside.
        - MARGINS: Leave generous white space around all elements to prevent cutoff and enhance visual appeal.
        - SCALING: Size all elements to fit comfortably within their designated areas without overflow.
        - MODERN 3D EFFECTS: Add subtle shadows, highlights, and 3D depth to make diagrams look professional and engaging.
        - DONT OVERCROWD: Avoid clutter - keep diagrams clean and focused on key elements only.
        - CONSISTENCY: Maintain a consistent modern 3D style across both diagrams.
        - NO TEXTURE: Use smooth, clean surfaces without texture for a sleek modern look.
        - USE MODERN TYPOGRAPHY: Select contemporary sans-serif fonts with NO SHADOWS IN TEXT AT ALL.
        - NO EMOJIS, NO logos, NO additional decorative elements unless explicitly requested in the description.
        - BACKGROUND MUST BE 100% PURE WHITE - no variations, gradients, or dark areas.
        - Ensure the entire image is highly educational and matches the drawing description exactly.
        - HIGH QUALITY: Generate crisp, professional-quality images with sharp edges and clear details
        - RESOLUTION: Ensure all elements are rendered at high resolution for the 1280x720 canvas
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
    // Input validation
    if (!script || !Array.isArray(script) || script.length === 0) {
      throw new Error('Invalid script provided');
    }

    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Invalid prompt provided');
    }

    const compositionId = "MyComp";
    const transitionDuration = 15; // frames per transition

    // Use temp directories for cloud deployment
    const tempDir = process.env.TEMP_DIR || '/tmp';
    const audioDir = path.join(tempDir, "audio");
    const imageDir = path.join(tempDir, "images");
    const outputDir = path.join(tempDir, "output");

    // Ensure directories exist
    await fs.ensureDir(audioDir);
    await fs.ensureDir(imageDir);
    await fs.ensureDir(outputDir);

    console.log("Generating full audio...");
    const audioFilename = `full_audio.wav`;
    const audioOutputPath = path.join(audioDir, audioFilename);

    let inputProps;

    try {
      await generateAudio(script, audioOutputPath);
      const totalDurationInSeconds = await getAudioDurationInSeconds(audioOutputPath);
      const totalFrames = Math.ceil(totalDurationInSeconds * 30); // Assuming 30 FPS

      const logoDurationFrames = 60; // 2 seconds for logo
      const totalFramesWithLogo = totalFrames + logoDurationFrames;

      console.log(`Total audio duration: ${totalDurationInSeconds}s, total frames: ${totalFrames}, with logo: ${totalFramesWithLogo}`);

      const scriptWithDuration = [];

      for (let i = 0; i < script.length; i++) {
        const scene = script[i];
        const sceneDurationInSeconds = (totalDurationInSeconds / script.length) + 1; // Add 1 second to each scene
        const durationInFrames = Math.ceil(sceneDurationInSeconds * 30);

        let updatedScene = {
          ...scene,
          durationInFrames,
        };

        console.log(`Generating image for scene ${i}...`);
        try {
          const imageData = await generateImage(scene.image_prompt);
          if (imageData && imageData.length > 0) {
            const imageFilename = `scene_${i}.png`;
            const imagePath = path.join(imageDir, imageFilename);
            fs.writeFileSync(imagePath, Buffer.from(imageData, "base64"));

            // Verify the image was written correctly
            if (fs.existsSync(imagePath)) {
              const stats = fs.statSync(imagePath);
              if (stats.size > 0) {
                updatedScene.imagePath = `/images/${imageFilename}`;
                console.log(`Image for scene ${i} generated successfully (${stats.size} bytes)`);
              } else {
                console.warn(`Image for scene ${i} is empty, skipping`);
              }
            } else {
              console.warn(`Image file for scene ${i} was not created`);
            }
          } else {
            console.warn(`No image data received for scene ${i}`);
          }
        } catch (imageError) {
          console.error(`Failed to generate image for scene ${i}:`, imageError.message);
          // Continue without image for this scene
        }

        scriptWithDuration.push(updatedScene);
      }

      const finalScript = scriptWithDuration;

      inputProps = { script: finalScript, audioPath: `/audio/${audioFilename}`, durationInFrames: totalFramesWithLogo };
    } catch (audioError) {
      console.error("Failed to generate full audio:", audioError.message);
      throw audioError;
    }
    const sanitizedPrompt = prompt.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
    const timestamp = Date.now();
    const outputLocation = `s3://${process.env.S3_BUCKET_NAME}/videos/${sanitizedPrompt}_${timestamp}.mp4`;

    // Now bundle AFTER audio is generated
    console.log("Bundling Remotion project...");
    let bundleLocation;
    try {
      bundleLocation = await bundle({
        entryPoint: path.join(__dirname, "../src/index.tsx"),
        webpackOverride: (config) => config,
      });
      console.log("Bundle created at:", bundleLocation);
    } catch (bundleError) {
      console.error("Bundling failed:", bundleError);
      throw new Error(`Failed to bundle Remotion project: ${bundleError.message}`);
    }

    // Ensure public folder exists in bundle
    const bundlePublicDir = path.join(bundleLocation, "public");
    await fs.ensureDir(bundlePublicDir);

    // Copy audio files to the bundle's public/audio folder
    const bundleAudioDir = path.join(bundleLocation, "public", "audio");
    await fs.ensureDir(bundleAudioDir);
    await fs.copy(audioDir, bundleAudioDir, { overwrite: true });

    // Copy image files to the bundle's public/images folder
    const bundleImageDir = path.join(bundleLocation, "public", "images");
    await fs.ensureDir(bundleImageDir);
    await fs.copy(imageDir, bundleImageDir, { overwrite: true });

    // Copy logo file to the bundle's public folder
    const logoPath = path.join(__dirname, "../public/Wekoya_logo_mark.svg");
    const bundleLogoPath = path.join(bundleLocation, "public", "Wekoya_logo_mark.svg");
    if (await fs.pathExists(logoPath)) {
      await fs.copy(logoPath, bundleLogoPath, { overwrite: true });
    }

    // Define composition directly (no selectComposition needed for Lambda)
    const composition = {
      id: compositionId,
      width: 1280,
      height: 720,
      fps: 30,
      durationInFrames: inputProps.durationInFrames,
    };

    console.log("Starting video render on Lambda...");
    try {
  const renderProgress = await renderMediaOnLambda({
    functionName: "remotion-render-4-0-286-mem3008mb-disk2048mb-120sec", // Updated to match deployed name
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation,
    inputProps,
    region: process.env.AWS_REGION || "us-east-1",
  });

      // Lambda writes directly to S3 - no need to check local file
      console.log("Video rendered successfully on Lambda:", outputLocation);

      // Return S3 URL for download
      const downloadUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/videos/${sanitizedPrompt}_${timestamp}.mp4`;
      return downloadUrl;

    } catch (renderError) {
      console.error("Video rendering failed:", renderError.message);
      throw new Error(`Video rendering failed: ${renderError.message}`);
    }
  } catch (error) {
    console.error("Error generating video:", error);
    return null;
  }
}
module.exports = generateVideo;

// generateVideo();
