import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
} from "remotion";

const MyVideo: React.FC<{ script: any[]; audioPath: string; durationInFrames: number }> = ({ script, audioPath, durationInFrames }) => {
  // Safety check
  if (!script || !Array.isArray(script)) {
    return <AbsoluteFill style={{ backgroundColor: "white" }} />;
  }

  // Calculate frames per scene (assuming 4 scenes)
  const framesPerScene = Math.floor(durationInFrames / script.length);

  return (
    <div style={{ flex: 1, backgroundColor: 'white' }}>
      {audioPath && <Audio src={staticFile(audioPath)} />}
      {script.map((scene: any, index: number) => (
        <AbsoluteFill key={index} style={{
          display: index === 0 ? 'block' : 'none'
        }}>
          {/* Background image */}
          <AbsoluteFill>
            <img
              src={staticFile(scene.imagePath)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </AbsoluteFill>

          {/* On-screen text */}
          <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div
              style={{
                fontSize: 72, // Reduced from 96
                fontWeight: 'bold',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                textAlign: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '20px 40px',
                borderRadius: '10px',
              }}
            >
              {scene.on_screen_text}
            </div>
          </AbsoluteFill>

          {/* Logo */}
          <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'flex-end', padding: 20 }}>
            <img
              src={staticFile('/Wekoya_logo_mark.svg')}
              style={{
                width: 100, // Reduced from 150
                height: 100,
                opacity: 0.8,
              }}
            />
          </AbsoluteFill>
        </AbsoluteFill>
      ))}
    </div>
  );
};

export default MyVideo;