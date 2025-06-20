import { Group } from "three";
import { AnimationKeyframe } from "./features/animation/types/types";
import { Vec3 } from "./scene-store";
import { boxRotationsYaxis } from "./features/animation/presets/box-rotation/y-axis";
import {
  localCube,
  localCylinder,
  localHead,
  Model,
  ModelSource,
} from "./features/scene/models/model";

type AnimationData = {
  keyframes: AnimationKeyframe[];
};

// type LocalModel = "cube" | "sphere" | "cylinder" | "cone" | "torus" | "teapot";

// type RemoteModel = {
//   source: string;
//   // This might include other remote related data
// };

// type ModelLocal = {
//   source: LocalModel;
//   // This might include other local related data
// };

// TODO : Doesn't need position since it will come from keyframes
//  but scale isn't animated so maybe it should be here
//  and maybe rotation to allow for initial rotation
// Actually scratch the above
type ModelData = {
  modelId: string;
  position?: Vec3;
  rotation?: Vec3;
  scale?: Vec3;
};

type GroundData = {
  model?: ModelData;
  position?: Vec3;
  rotation?: Vec3;
  scale?: Vec3;
};

// TODO : the models already container their own position, rotation, and scale
//  so we don't need to pass them in here
type StaticBackground = {
  models: ModelData[];
  position?: Vec3;
  rotation?: Vec3;
  scale?: Vec3;
};

type LookAtTargetData = {
  model: ModelData;
  position?: Vec3;
  rotation?: Vec3;
  scale?: Vec3;
};
type AnimationPreset = {
  id: string;
  animationPresetData: AnimationPresetData;
};

export type LightType = "point" | "directional" | "ambient";

export type Light = {
  type: LightType;
  position?: Vec3;
  rotation?: Vec3;
  scale?: Vec3;
  intensity: number;
};

type LightData = {
  lights: Light[];
};

type AnimationPresetData = {
  animationData: AnimationData;
  modelData: ModelData;
  groundData: ModelData;
  staticBackground: StaticBackground;
  lookAtTargetData: LookAtTargetData;
  lightData: LightData;
};

type Difficulty = "easy" | "medium" | "hard" | "extra hard";

type AnimationPresetLocalModel = AnimationPreset & {
  metadata: {
    name: string;
    desc: string;
    createdAt?: string;
    lastUsedAt?: string;
    isFavorite?: boolean;
    difficulty: Difficulty;
    recommendedSteps?: number;
    tags?: string[];
    source?: "local" | "remote";
  };
};

type AnimationPresetLocalCreationMetadata = Omit<
  AnimationPresetLocalModel["metadata"],
  "createdAt" | "lastUsedAt" | "isFavorite" | "source"
>;

export type AnimationPresetLocalCreation = Omit<
  AnimationPresetLocalModel,
  "id" | "metadata"
> & {
  metadata: AnimationPresetLocalCreationMetadata;
};

export const defaultLights: Light[] = [
  {
    type: "ambient",
    position: { x: 2, y: 2, z: 2 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    intensity: 1,
  },
];

const testAnimationPresets: AnimationPresetLocalModel[] = [
  {
    id: "1",
    animationPresetData: {
      animationData: {
        keyframes: [
          {
            t: 0,
            config: {
              objectRotation: { x: 0, y: 0, z: 0 },
              objectPosition: { x: 0, y: 0, z: 0 },
              cameraPosition: { x: -5, y: 1, z: 2 },
              cameraFov: 50,
              lookAtTargetPosition: { x: 0, y: 0, z: 0 },
            },
          },
          {
            t: 1,
            config: {
              objectRotation: { x: 0, y: 0, z: 0 },
              objectPosition: { x: 0, y: 0, z: 0 },
              cameraPosition: { x: 5, y: 1, z: 2 },
              cameraFov: 50,
              lookAtTargetPosition: { x: 0, y: 0, z: 0 },
            },
          },
        ],
      },
      modelData: {
        modelId: localCube.id,
      },
      groundData: {
        model: {
          modelId: "local-grid",
        },
      },
      staticBackground: {
        models: [],
      },
      lookAtTargetData: {
        model: {
          modelId: "local-look-at-target-sphere",
        },
      },
      lightData: {
        lights: [],
      },
    },

    metadata: {
      name: "Test Animation Preset",
      desc: "This is a test animation preset",
      createdAt: new Date().toISOString(),
      lastUsedAt: new Date().toISOString(),
      isFavorite: false,
      difficulty: "easy",
      recommendedSteps: 10,
      tags: ["test", "animation", "preset"],
      source: "local",
    },
  },
  ...boxRotationsYaxis,
  {
    id: "2",
    animationPresetData: {
      animationData: {
        keyframes: [
          {
            t: 0,
            config: {
              objectRotation: { x: 0, y: 0, z: 0 },
              objectPosition: { x: 0, y: 0, z: 0 },
              cameraPosition: { x: 0, y: 2, z: 6 },
              cameraFov: 60,
              lookAtTargetPosition: { x: 0, y: 1, z: 0 },
            },
          },
          {
            t: 0.99,
            config: {
              objectRotation: { x: 0, y: 0, z: 0 },
              objectPosition: { x: 0, y: 3, z: 0 },
              cameraPosition: { x: 0, y: 5, z: 10 },
              cameraFov: 45,
              lookAtTargetPosition: { x: 0, y: 3, z: 0 },
            },
          },
          {
            t: 1,
            config: {
              objectRotation: { x: 0, y: 0, z: 0 },
              objectPosition: { x: 0, y: 3, z: 0 },
              cameraPosition: { x: 0, y: 5, z: 10 },
              cameraFov: 45,
              lookAtTargetPosition: { x: 0, y: 3, z: 0 },
            },
          },
        ],
      },
      modelData: {
        modelId: localCylinder.id,
      },
      groundData: {
        model: {
          modelId: "local-grid",
        },
      },
      staticBackground: {
        models: [
          {
            modelId: localCube.id,
            position: { x: 3, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 0.5, y: 0.5, z: 0.5 },
          },
        ],
      },
      lookAtTargetData: {
        model: {
          modelId: "local-look-at-target-sphere",
        },
      },
      lightData: {
        lights: [
          {
            type: "ambient",
            position: { x: 2, y: 2, z: 2 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            intensity: 1,
          },
        ],
      },
    },
    metadata: {
      name: "Test Animation Preset 2",
      desc: "This is a test animation preset 2",
      createdAt: new Date().toISOString(),
      lastUsedAt: new Date().toISOString(),
      isFavorite: false,
      difficulty: "hard",
      recommendedSteps: 10,
      tags: ["test", "animation", "preset"],
      source: "local",
    },
  },
  {
    id: "3",
    animationPresetData: {
      animationData: {
        keyframes: [
          {
            t: 0,
            config: {
              objectRotation: { x: 0, y: 0, z: 0 },
              objectPosition: { x: 0, y: 0, z: 0 },
              cameraPosition: { x: 0, y: 2, z: 6 },
              cameraFov: 60,
              lookAtTargetPosition: { x: 0, y: 1, z: 0 },
            },
          },
          {
            t: 0.99,
            config: {
              objectRotation: { x: 0, y: 0, z: 0 },
              objectPosition: { x: 0, y: 3, z: 0 },
              cameraPosition: { x: 0, y: 5, z: 10 },
              cameraFov: 45,
              lookAtTargetPosition: { x: 0, y: 3, z: 0 },
            },
          },
          {
            t: 1,
            config: {
              objectRotation: { x: 0, y: 0, z: 0 },
              objectPosition: { x: 0, y: 3, z: 0 },
              cameraPosition: { x: 0, y: 5, z: 10 },
              cameraFov: 45,
              lookAtTargetPosition: { x: 0, y: 3, z: 0 },
            },
          },
        ],
      },
      modelData: {
        modelId: localHead.id,
      },
      groundData: {
        model: {
          modelId: "local-grid",
        },
      },
      staticBackground: {
        models: [
          {
            modelId: localCube.id,
            position: { x: 3, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 0.5, y: 0.5, z: 0.5 },
          },
        ],
      },
      lookAtTargetData: {
        model: {
          modelId: "local-look-at-target-sphere",
        },
      },
      lightData: {
        lights: [
          {
            type: "ambient",
            position: { x: 2, y: 2, z: 2 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            intensity: 1,
          },
        ],
      },
    },
    metadata: {
      name: "Test Animation Preset 3",
      desc: "This is a test animation preset 3",
      createdAt: new Date().toISOString(),
      lastUsedAt: new Date().toISOString(),
      isFavorite: false,
      difficulty: "hard",
      recommendedSteps: 10,
      tags: ["test", "animation", "preset"],
      source: "local",
    },
  },
  {
    id: "4",
    animationPresetData: {
      animationData: {
        keyframes: [
          {
            t: 0, // Start
            config: {
              objectRotation: { x: 0, y: 0, z: 0 },
              objectPosition: { x: 0, y: 0, z: 0 },
              cameraPosition: { x: -4, y: 2, z: 4 },
              cameraFov: 50,
              lookAtTargetPosition: { x: 0, y: 0, z: 0 },
            },
          },
          {
            t: 0.33,
            config: {
              objectRotation: { x: 0, y: 0, z: 0 },
              objectPosition: { x: 0, y: 0, z: 0 },
              cameraPosition: { x: 4, y: 2, z: 4 },
              cameraFov: 50,
              lookAtTargetPosition: { x: 0, y: 0, z: 0 },
            },
          },
          {
            t: 0.66,
            config: {
              objectRotation: { x: 0, y: 0, z: 0 },
              objectPosition: { x: 0, y: 0, z: 0 },
              cameraPosition: { x: 4, y: 2, z: -4 },
              cameraFov: 50,
              lookAtTargetPosition: { x: 0, y: 0, z: 0 },
            },
          },
          {
            t: 1, // End (loops back to start if animated continuously)
            config: {
              objectRotation: { x: 0, y: 0, z: 0 },
              objectPosition: { x: 0, y: 0, z: 0 },
              cameraPosition: { x: -4, y: 2, z: 4 },
              cameraFov: 50,
              lookAtTargetPosition: { x: 0, y: 0, z: 0 },
            },
          },
        ],
      },
      modelData: {
        modelId: localHead.id,
      },
      groundData: {
        model: {
          modelId: "local-grid",
        },
      },
      staticBackground: {
        models: [
          {
            modelId: localCube.id,
            position: { x: 3, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 0.5, y: 0.5, z: 0.5 },
          },
        ],
      },
      lookAtTargetData: {
        model: {
          modelId: "local-look-at-target-sphere",
        },
      },
      lightData: {
        lights: [
          {
            type: "ambient",
            position: { x: 2, y: 2, z: 2 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            intensity: 1,
          },
        ],
      },
    },
    metadata: {
      name: "Four",
      desc: "Four description",
      createdAt: new Date().toISOString(),
      lastUsedAt: new Date().toISOString(),
      isFavorite: false,
      difficulty: "hard",
      recommendedSteps: 10,
      tags: ["test", "animation", "preset"],
      source: "local",
    },
  },
  {
    id: "5",
    animationPresetData: {
      animationData: {
        keyframes: [
          {
            t: 0, // Start
            config: {
              objectRotation: { x: 0, y: 0, z: 0 },
              objectPosition: { x: 0, y: 0, z: 0 },
              cameraPosition: { x: -5, y: 1, z: 5 },
              cameraFov: 50,
              lookAtTargetPosition: { x: 0, y: 0, z: 0 },
            },
          },
          {
            t: 0.25, // Zoom In
            config: {
              objectRotation: { x: 0, y: 0, z: 0 },
              objectPosition: { x: 0, y: 0, z: 0 },
              cameraPosition: { x: -1.5, y: 0.5, z: 1.5 },
              cameraFov: 40, // Narrower FOV for close-up
              lookAtTargetPosition: { x: 0, y: 0, z: 0 },
            },
          },
          {
            t: 0.5, // Pan Left
            config: {
              objectRotation: { x: 0, y: 0, z: 0 },
              objectPosition: { x: 0, y: 0, z: 0 },
              cameraPosition: { x: 1.5, y: 0.5, z: 1.5 },
              cameraFov: 40,
              lookAtTargetPosition: { x: 0, y: 0, z: 0 },
            },
          },
          {
            t: 0.75, // Pan Right
            config: {
              objectRotation: { x: 0, y: 0, z: 0 },
              objectPosition: { x: 0, y: 0, z: 0 },
              cameraPosition: { x: -1.5, y: 0.5, z: 1.5 },
              cameraFov: 40,
              lookAtTargetPosition: { x: 0, y: 0, z: 0 },
            },
          },
          {
            t: 1, // Zoom Out
            config: {
              objectRotation: { x: 0, y: 0, z: 0 },
              objectPosition: { x: 0, y: 0, z: 0 },
              cameraPosition: { x: -5, y: 1, z: 5 },
              cameraFov: 50,
              lookAtTargetPosition: { x: 0, y: 0, z: 0 },
            },
          },
        ],
      },
      modelData: {
        modelId: localHead.id,
      },
      groundData: {
        model: {
          modelId: "local-grid",
        },
      },
      staticBackground: {
        models: [
          {
            modelId: localCube.id,
            position: { x: 3, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 0.5, y: 0.5, z: 0.5 },
          },
        ],
      },
      lookAtTargetData: {
        model: {
          modelId: "local-look-at-target-sphere",
        },
      },
      lightData: {
        lights: [
          {
            type: "ambient",
            position: { x: 2, y: 2, z: 2 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            intensity: 1,
          },
        ],
      },
    },
    metadata: {
      name: "Five",
      desc: "Five description",
      createdAt: new Date().toISOString(),
      lastUsedAt: new Date().toISOString(),
      isFavorite: false,
      difficulty: "hard",
      recommendedSteps: 10,
      tags: ["test", "animation", "preset"],
      source: "local",
    },
  },
  {
    id: "6",
    animationPresetData: {
      animationData: {
        keyframes: [
          {
            t: 0, // Start
            config: {
              objectRotation: { x: 0, y: 0, z: 0 },
              objectPosition: { x: 0, y: 0, z: 0 },
              cameraPosition: { x: -3, y: 1, z: 3 },
              cameraFov: 50,
              lookAtTargetPosition: { x: 0, y: 0, z: 0 },
            },
          },
          {
            t: 0.5, // Halfway through rotation
            config: {
              objectRotation: { x: 0, y: Math.PI, z: 0 }, // Rotate 180 degrees around Y
              objectPosition: { x: 0, y: 0, z: 0 },
              cameraPosition: { x: -3, y: 1, z: 3 },
              cameraFov: 50,
              lookAtTargetPosition: { x: 0, y: 0, z: 0 },
            },
          },
          {
            t: 1, // Full rotation
            config: {
              objectRotation: { x: 0, y: Math.PI * 2, z: 0 }, // Rotate 360 degrees around Y
              objectPosition: { x: 0, y: 0, z: 0 },
              cameraPosition: { x: -3, y: 1, z: 3 },
              cameraFov: 50,
              lookAtTargetPosition: { x: 0, y: 0, z: 0 },
            },
          },
        ],
      },
      modelData: {
        modelId: localHead.id,
      },
      groundData: {
        model: {
          modelId: "local-grid",
        },
      },
      staticBackground: {
        models: [
          {
            modelId: localCube.id,
            position: { x: 3, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 0.5, y: 0.5, z: 0.5 },
          },
        ],
      },
      lookAtTargetData: {
        model: {
          modelId: "local-look-at-target-sphere",
        },
      },
      lightData: {
        lights: [
          {
            type: "ambient",
            position: { x: 2, y: 2, z: 2 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            intensity: 1,
          },
        ],
      },
    },
    metadata: {
      name: "Six",
      desc: "Six description",
      createdAt: new Date().toISOString(),
      lastUsedAt: new Date().toISOString(),
      isFavorite: false,
      difficulty: "hard",
      recommendedSteps: 10,
      tags: ["test", "animation", "preset"],
      source: "local",
    },
  },
];

export {
  testAnimationPresets,
  type AnimationPresetLocalModel,
  type AnimationPresetData,
  type ModelData,
  type GroundData,
  type StaticBackground,
};
