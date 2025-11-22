// src/MyVideo.tsx
import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
} from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";

const MyVideo = ({ script = [], audioPath = '' }: any) => {
  const transitionDuration = 60; // 2 second transition for drawing effect

  // Safety check
  if (!script || !Array.isArray(script)) {
    return <AbsoluteFill style={{ backgroundColor: "white" }} />;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      {audioPath && <Audio src={staticFile(audioPath)} />}
      {/* Logo watermark - made bigger */}
      <img
        src={staticFile('/Wekoya_logo_mark.svg')}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          width: 150,
          height: 40,
          zIndex: 20,
        }}
      />
      <TransitionSeries>
        {script.map((scene: any, index: number) => {
          const sceneDuration = scene.durationInFrames || 900; // 30 seconds at 30fps

          return (
            <React.Fragment key={`scene-${index}`}>
              <TransitionSeries.Sequence durationInFrames={sceneDuration}>
                <AbsoluteFill>
                  {scene.imagePath && (
                    <img
                      src={staticFile(scene.imagePath)}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }}
                    />
                  )}
                </AbsoluteFill>
              </TransitionSeries.Sequence>
              {index < script.length - 1 && (
                <TransitionSeries.Transition
                  presentation={slide()}
                  timing={linearTiming({ durationInFrames: transitionDuration })}
                />
              )}
            </React.Fragment>
          );
        })}
        {/* Final logo sequence - starts immediately after last scene */}
        <TransitionSeries.Sequence durationInFrames={60}> {/* 2 seconds */}
          <AbsoluteFill style={{ backgroundColor: "white", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={staticFile('/Wekoya_logo_mark.svg')}
              style={{
                width: 200,
                height: 50,
              }}
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

export default MyVideo;