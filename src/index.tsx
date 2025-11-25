
import { registerRoot } from "remotion";
import { Composition } from "remotion";
import MyVideo from "./MyVideo";

registerRoot(() => {

  return (
    <Composition
      id="MyComp"
      component={MyVideo}
      defaultProps={{
        script: [],
        audioPath: '',
        logoPath: '',
        durationInFrames: 1800,
      }}
      calculateMetadata={async ({ props }) => {
        return {
          durationInFrames: props.durationInFrames as number, // Explicitly cast to number
          fps: 30, // Set your desired fps
          width: 1280, // Reduced from 1920 for Lambda memory optimization
          height: 720, // Reduced from 1080 for Lambda memory optimization
        };
      }}
    />
  );
});
