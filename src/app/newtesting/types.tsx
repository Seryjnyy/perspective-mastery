import { Group } from "three";
import { AnimationKeyframe } from "./control-panel/tabs";
import { Vec3 } from "./useGlobalSceneStore";

type AnimationData = {
  keyframes: AnimationKeyframe[];
};

type ModelSourceType = "local" | "remote";

type LocalModel = "cube" | "sphere" | "cylinder" | "cone" | "torus" | "teapot";

type RemoteModel = {
  source: string;
  // This might include other remote related data
};

type ModelLocal = {
  source: LocalModel;
  // This might include other local related data
};

type ModelData = {
  type: ModelSourceType;
  model: ModelLocal | RemoteModel;
  position?: Vec3;
  rotation?: Vec3;
  scale?: Vec3;
};

export type GroundModel = "grid";

// So when you load in the model, you can set the position, rotation, and scale.

type GroundData = {
  model: GroundModel;
  position?: Vec3;
  rotation?: Vec3;
  scale?: Vec3;
};

type StaticBackground = {
  models: ModelData[];
  position?: Vec3;
  rotation?: Vec3;
  scale?: Vec3;
};

export type LookAtTargetModel = "sphere";

type LookAtTargetData = {
  model: LookAtTargetModel;
  position?: Vec3;
  rotation?: Vec3;
  scale?: Vec3;
};
type AnimationPreset = {
  id: string;
  animationPresetData: AnimationPresetData;
};

export type LightType = "point" | "directional" | "ambient";

type Light = {
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
  groundData: GroundData;
  staticBackground: StaticBackground;
  lookAtTargetData: LookAtTargetData;
  lightData: LightData;
};

type Difficulty = "easy" | "medium" | "hard" | "extra hard";

type AnimationPresetLocalModel = AnimationPreset & {
  metadata: {
    name: string;
    desc: string;
    createdAt: Date;
    lastUsedAt: Date;
    isFavorite: boolean;
    difficulty: Difficulty;
    recommendedSteps: number;
    tags: string[];
    source: "local" | "remote";
  };
};

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
        lights: [],
      },
    },
    metadata: {
      name: "Test Animation Preset",
      desc: "This is a test animation preset",
      createdAt: new Date(),
      lastUsedAt: new Date(),
      isFavorite: false,
      difficulty: "easy",
      recommendedSteps: 10,
      tags: ["test", "animation", "preset"],
      source: "local",
    },
  },
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
        type: "local",
        model: {
          source: "cylinder",
        },
      },
      groundData: {
        model: "grid",
      },
      staticBackground: {
        models: [
          {
            type: "local",
            model: { source: "cube" },
            position: { x: 3, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 0.5, y: 0.5, z: 0.5 },
          },
        ],
      },
      lookAtTargetData: {
        model: "sphere",
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
      createdAt: new Date(),
      lastUsedAt: new Date(),
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
        type: "local",
        model: {
          source: "glb=/models/head.glb",
        },
      },
      groundData: {
        model: "grid",
      },
      staticBackground: {
        models: [
          {
            type: "local",
            model: { source: "cube" },
            position: { x: 3, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 0.5, y: 0.5, z: 0.5 },
          },
        ],
      },
      lookAtTargetData: {
        model: "sphere",
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
      createdAt: new Date(),
      lastUsedAt: new Date(),
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
        type: "local",
        model: {
          source: "glb=/models/head.glb",
        },
      },
      groundData: {
        model: "grid",
      },
      staticBackground: {
        models: [
          {
            type: "local",
            model: { source: "cube" },
            position: { x: 3, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 0.5, y: 0.5, z: 0.5 },
          },
        ],
      },
      lookAtTargetData: {
        model: "sphere",
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
      createdAt: new Date(),
      lastUsedAt: new Date(),
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
        type: "local",
        model: {
          source: "glb=/models/head.glb",
        },
      },
      groundData: {
        model: "grid",
      },
      staticBackground: {
        models: [
          {
            type: "local",
            model: { source: "cube" },
            position: { x: 3, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 0.5, y: 0.5, z: 0.5 },
          },
        ],
      },
      lookAtTargetData: {
        model: "sphere",
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
      createdAt: new Date(),
      lastUsedAt: new Date(),
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
