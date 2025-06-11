import { produce } from "immer";
import { AnimationKeyFrameConfig } from "../../control-panel/tabs";
import { defaultLights } from "../../types";

const unchangingData: Partial<AnimationKeyFrameConfig> = {
  objectPosition: { x: 0, y: 0, z: 0 },
  cameraFov: 50,
  lookAtTargetPosition: { x: 0, y: 0, z: 0 },
};

const boxRotationYAxisCameraAbove = {
  id: "3190e085-1d56-4ae4-91ef-861241d14496",
  animationPresetData: {
    animationData: {
      keyframes: [
        {
          t: 0,
          config: {
            ...unchangingData,
            cameraPosition: { x: 2, y: 3, z: 2 },
            objectRotation: { x: 0, y: 0, z: 0 },
          },
        },
        {
          t: 1,
          config: {
            ...unchangingData,
            cameraPosition: { x: 2, y: 3, z: 2 },
            objectRotation: { x: 0, y: Math.PI, z: 0 },
          },
        },
      ],
    },
    modelData: {
      type: "local",
      model: {
        source: "cube",
      },
    },
    groundData: {
      model: "grid",
    },
    staticBackground: {
      models: [],
    },
    lookAtTargetData: {
      model: "sphere",
    },
    lightData: {
      lights: defaultLights,
    },
  },
  metadata: {
    name: "Box rotate - x axis - camera above",
    desc: "Box rotates on the x axis, with the camera above the box",
    createdAt: "2025-06-11T13:00:00.000Z",
    difficulty: "easy",
    recommendedSteps: 10,
    tags: ["object rotates", "y-axis", "camera above"],
    source: "local",
  },
};

const boxRotationYAxisCameraLevel = produce(
  boxRotationYAxisCameraAbove,
  (draft) => {
    draft.id = "b35acf68-49bf-425e-8635-782f6c1c1f37";
    draft.metadata.name = "Box rotate - x axis - camera level";
    draft.metadata.desc =
      "Box rotates on the x axis, with the camera level with the box";
    draft.metadata.tags = ["test", "animation", "preset"];
    draft.metadata.source = "local";

    draft.animationPresetData.animationData.keyframes = [
      {
        t: 0,
        config: {
          ...unchangingData,
          cameraPosition: { x: 2, y: 0, z: 2 },
          objectRotation: { x: 0, y: 0, z: 0 },
        },
      },
      {
        t: 1,
        config: {
          ...unchangingData,
          cameraPosition: { x: 2, y: 0, z: 2 },
          objectRotation: { x: 0, y: Math.PI, z: 0 },
        },
      },
    ];
  }
);
