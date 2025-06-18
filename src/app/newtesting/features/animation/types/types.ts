export type AnimationKeyFrameConfig = {
  objectRotation: { x: number; y: number; z: number };
  objectPosition: { x: number; y: number; z: number };
  cameraPosition: { x: number; y: number; z: number };
  cameraFov: number;
  lookAtTargetPosition: { x: number; y: number; z: number };
};

export type AnimationKeyframe = {
  t: number; // from 0 to 1
  config: AnimationKeyFrameConfig;
};
