
const { bundle } = require("@remotion/bundler");
const { renderMedia, selectComposition } = require("@remotion/renderer");
const path = require("path");

async function generateVideo({ script, prompt }) {
  try {
    const compositionId = "MyComp";
    // Match these numbers with the ones used in src/MyVideo.tsx
    const sceneDuration = 180; // frames per scene (6s @ 30fps)
    const transitionDuration = 15; // frames per transition
    const totalFrames =
      script.length * sceneDuration +
      Math.max(0, script.length - 1) * transitionDuration;
    const inputProps = { script, durationInFrames: totalFrames };
    const sanitizedPrompt = prompt.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
    const timestamp = Date.now();
    const outputLocation = path.join(__dirname, "../public", `${sanitizedPrompt}_${timestamp}.mp4`);

    console.log("Bundling Remotion project...");
    const bundleLocation = await bundle({
      entryPoint: path.join(__dirname, "../src/index.tsx"),
      webpackOverride: (config) => config,
    });

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
