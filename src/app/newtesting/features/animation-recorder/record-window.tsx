import { useTestingNewStore } from "../../page";
import { Vec3 } from "../../scene-store";
import { AnimationKeyframe } from "../animation/types/types";
import KeyframeEditor from "./keyframe-editor";

export const RecordTab = ({
  keyframes,
  setKeyframes,
}: {
  keyframes: AnimationKeyframe[];
  setKeyframes: (keyframes: AnimationKeyframe[]) => void;
}) => {
  const object = useTestingNewStore()((state) => state.object.data);
  const setObjectPosition = useTestingNewStore()(
    (state) => state.object.setObjectPosition
  );

  const setObjectRotation = useTestingNewStore()(
    (state) => state.object.setObjectRotation
  );
  const setCameraDesiredFov = useTestingNewStore()(
    (state) => state.camera.setCameraDesiredFov
  );
  const setCameraDesiredPosition = useTestingNewStore()(
    (state) => state.camera.setCameraDesiredPosition
  );
  const camera = useTestingNewStore()((state) => state.camera.data);

  const setLookAtTargetPosition = useTestingNewStore()(
    (state) => state.lookAtTarget.setLookAtTargetPosition
  );

  const lookAtTarget = useTestingNewStore()((state) => state.lookAtTarget.data);
  const resetObject = useTestingNewStore()((state) => state.object.resetObject);
  const objectDefaults = useTestingNewStore()(
    (state) => state.object.getDefaults
  )();

  const applyKeyframe = (
    objectRotation: Vec3,
    objectPosition: Vec3,
    cameraPosition: Vec3,
    lookAtTargetPosition: Vec3,
    cameraFov: number
  ) => {
    setObjectPosition(objectPosition);
    setObjectRotation(objectRotation);
    setCameraDesiredFov(cameraFov);
    setCameraDesiredPosition(cameraPosition);
    setLookAtTargetPosition(lookAtTargetPosition);
  };

  return (
    <KeyframeEditor
      keyframes={keyframes}
      setKeyframes={setKeyframes}
      applyKeyframe={applyKeyframe}
      getCurrentState={() => ({
        cameraFov: camera.fov,
        cameraPosition: camera.position,
        lookAtTargetPosition: lookAtTarget.position,
        objectPosition: object.position,
        objectRotation: object.rotation,
      })}
    />
  );
};
