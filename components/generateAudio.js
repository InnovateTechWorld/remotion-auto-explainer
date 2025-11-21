const { GoogleGenAI } = require('@google/genai');
const fs = require('fs/promises');
const path = require('path');
const wav = require('wav');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

const audioAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateAudio(script, outputPath, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const startTime = Date.now();
      console.log(`🎤 STARTING TTS for full script (Attempt ${attempt})`);
      console.log(`📂 Output path: ${outputPath}`);

      // Validate script data
      if (!script || !Array.isArray(script)) {
        throw new Error('Script is missing or not an array');
      }

      // Concatenate all narration texts
      const fullText = script.map(scene => scene.narration).filter(Boolean).join(' ');
      if (!fullText) {
        throw new Error('No narration text found in script');
      }

      console.log(`📝 Full narration: "${fullText.substring(0, 100)}..."`);
      console.log(`🎙️ Using default voice style`);

      // Ensure output directory exists
      const outputDir = path.dirname(outputPath);
      await fs.mkdir(outputDir, { recursive: true });

      console.log(`🤖 Calling Gemini TTS API...`);
      const apiStartTime = Date.now();

      const response = await audioAI.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Say in an engaging and informative voice: ${fullText}` }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: "Puck" // Upbeat and lively voice
              }
            }
          }
        }
      });

      const apiDuration = Date.now() - apiStartTime;
      console.log(`✅ Gemini TTS API call completed in ${apiDuration}ms`);

      const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!data) {
        throw new Error('No audio data received from Gemini TTS');
      }

      const audioBuffer = Buffer.from(data, 'base64');

      const writer = new wav.FileWriter(outputPath, {
        channels: 1,
        sampleRate: 24000,
        bitDepth: 16,
      });
      writer.write(audioBuffer);
      writer.end();

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      // Convert to stereo 48kHz using FFmpeg
      const convertedPath = outputPath.replace('.wav', '_converted.wav');
      const ffmpegCommand = `ffmpeg -i "${outputPath}" -ac 2 -ar 48000 "${convertedPath}"`;
      await execAsync(ffmpegCommand);

      // Replace original with converted
      await fs.unlink(outputPath);
      await fs.rename(convertedPath, outputPath);

      const totalDuration = Date.now() - startTime;
      console.log(`🎉 TTS COMPLETED in ${totalDuration}ms: ${outputPath}`);
      return outputPath;

    } catch (error) {
      console.error(`💥 TTS attempt ${attempt} failed:`, error.message);
      if (attempt === retries) {
        throw new Error(`Failed to generate audio after ${retries} attempts: ${error.message}`);
      }
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s before retry
    }
  }
}

module.exports = { generateAudio };