
import { registerRoot } from "remotion";
import { Composition } from "remotion";
import MyVideo from "./MyVideo";

registerRoot(() => {

  return (
    <Composition
      id="MyComp"
      component={MyVideo}
      defaultProps={{ durationInFrames: 1800 }} // Fallback duration
      calculateMetadata={async ({ props }) => {
        return {
          durationInFrames: props.durationInFrames as number, // Explicitly cast to number
          fps: 30, // Set your desired fps
          width: 1920,
          height: 1080,
        };
      }}
    />
  );
});
