import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  Sequence,
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
        <Sequence
          key={index}
          from={index * framesPerScene}
          durationInFrames={framesPerScene}
        >
          <AbsoluteFill>
            {/* Background image */}
            <AbsoluteFill>
              <img
                src={staticFile(scene.imagePath)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain', // Changed from 'cover' to 'contain' to fit within screen
                  backgroundColor: 'white', // Ensure white background
                }}
              />
            </AbsoluteFill>

            {/* Logo - moved to top */}
            <AbsoluteFill style={{ justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20 }}>
              <img
                src={staticFile('/Wekoya_logo_mark.svg')}
                style={{
                  width: 100,
                  height: 100,
                  opacity: 0.8,
                }}
              />
            </AbsoluteFill>
          </AbsoluteFill>
        </Sequence>
      ))}
    </div>
  );
};

export default MyVideo;

// Import Composition at the top
import { Composition } from "remotion";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyVideo}
        durationInFrames={1} // Placeholder, will be overridden
        fps={30}
        width={1280} // Confirm this is set
        height={720} // Confirm this is set
        defaultProps={{
          script: [],
          audioPath: '',
          durationInFrames: 1
        }}
      />
    </>
  );
};