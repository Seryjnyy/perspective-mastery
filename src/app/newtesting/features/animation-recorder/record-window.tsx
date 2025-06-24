"use client";
import { useTestingNewStore } from "@/app/newtesting/page-content";
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
  const object = useTestingNewStore((state) => state.object.data);
  const setObjectPosition = useTestingNewStore(
    (state) => state.setObjectPosition
  );

  const setObjectRotation = useTestingNewStore(
    (state) => state.setObjectRotation
  );
  const setCameraDesiredFov = useTestingNewStore(
    (state) => state.setCameraDesiredFov
  );
  const setCameraDesiredPosition = useTestingNewStore(
    (state) => state.setCameraDesiredPosition
  );
  const camera = useTestingNewStore((state) => state.camera.data);

  const setLookAtTargetPosition = useTestingNewStore(
    (state) => state.setLookAtTargetPosition
  );

  const lookAtTarget = useTestingNewStore((state) => state.lookAtTarget.data);
  const resetObject = useTestingNewStore((state) => state.resetObject);
  const objectDefaults = useTestingNewStore(
    (state) => state.getObjectDefaults
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
