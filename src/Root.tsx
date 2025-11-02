import { Composition } from "remotion";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {

  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={1800} // 60 seconds for 10 scenes
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ script: [] }}
      />
    </>
  );
};
