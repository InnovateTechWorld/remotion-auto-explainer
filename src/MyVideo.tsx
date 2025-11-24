import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
} from "remotion";

const MyVideo: React.FC<{ script: any[]; audioPath: string; durationInFrames: number }> = ({ script, audioPath, durationInFrames }) => {
  // Safety check
  if (!script || !Array.isArray(script)) {
    return <AbsoluteFill style={{ backgroundColor: "white" }} />;
  }

  // S3 bucket name - should match your bucket
  const bucketName = process.env.S3_BUCKET_NAME || "ai-videos-bucket-906510884846";

  // Construct S3 URLs
  const audioUrl = `https://${bucketName}.s3.amazonaws.com/assets/audio/${audioPath}`;
  const logoUrl = `https://${bucketName}.s3.amazonaws.com/assets/Wekoya_logo_mark.svg`;

  // Calculate frames per scene
  const framesPerScene = Math.floor(durationInFrames / script.length);

  return (
    <div style={{ flex: 1, backgroundColor: 'white' }}>
      {audioPath && <Audio src={audioUrl} />}
      {script.map((scene: any, index: number) => {
        const imageUrl = `https://${bucketName}.s3.amazonaws.com/assets/images/${scene.imagePath}`;
        return (
          <Sequence
            key={index}
            from={index * framesPerScene}
            durationInFrames={framesPerScene}
          >
            <AbsoluteFill>
              {/* Background image */}
              <AbsoluteFill>
                <img
                  src={imageUrl}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    backgroundColor: 'white',
                  }}
                />
              </AbsoluteFill>

              {/* Logo - moved to top */}
              <AbsoluteFill style={{ justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20 }}>
                <img
                  src={logoUrl}
                  style={{
                    width: 100,
                    height: 100,
                    opacity: 0.8,
                  }}
                />
              </AbsoluteFill>
            </AbsoluteFill>
          </Sequence>
        );
      })}
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