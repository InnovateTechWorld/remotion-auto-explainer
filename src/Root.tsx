import { Composition } from "remotion";
import MyVideo from "./MyVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyVideo}
        durationInFrames={1} // Placeholder, will be overridden
        fps={30}
        width={1280} // Reduced from 1920
        height={720} // Reduced from 1080
        defaultProps={{
          script: [],
          audioPath: '',
          logoPath: '',
          durationInFrames: 1
        }}
      />
    </>
  );
};
