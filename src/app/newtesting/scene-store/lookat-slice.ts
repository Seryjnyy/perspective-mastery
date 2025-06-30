import { StateCreator } from "zustand";
import { SceneState, Vec3 } from "./shared";
import { InSceneState, SceneModel } from "../types2";
import { LOCAL_LOOK_AT_TARGET_MODELS } from "../features/animation/model-repo";

export type LookAtMode = "manual" | "orbit";

export type LookAtTargetData = SceneModel & {
  mode: LookAtMode;

  isFollowModel: boolean;
  isShowTargetMarker: boolean;
};

const defaultsInScene: Required<InSceneState> = {
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
};

export interface LookAtTargetSlice {
  lookAtTarget: {
    data: LookAtTargetData;
    defaultsInScene: Required<InSceneState>;
  };
  setLookAtTarget: (lookAtTarget: Partial<LookAtTargetData>) => void;
  setLookAtTargetPosition: (position: Vec3) => void;
  resetLookAtTargetPosition: () => void;
  getLookAtTargetDefaults: () => LookAtTargetData;
}

const lookAtTargetDefaults: LookAtTargetData = {
  mode: "orbit",
  // TODO What is follow model? I dont think its used anywhere.
  isFollowModel: false,
  isShowTargetMarker: true,
  model: {
    modelId: LOCAL_LOOK_AT_TARGET_MODELS.SPHERE,
  },
  inScene: defaultsInScene,
};

export const createLookAtTargetSlice: StateCreator<
  SceneState, // full state
  [["zustand/immer", never]], // middleware
  [], // no other middleware
  LookAtTargetSlice // this slice
> = (set) => ({
  lookAtTarget: {
    data: lookAtTargetDefaults,
    defaultsInScene: defaultsInScene,
  },
  setLookAtTarget: (data) =>
    set((state) => ({
      lookAtTarget: {
        ...state.lookAtTarget,
        data: {
          ...state.lookAtTarget.data,
          ...data,
        },
      },
    })),
  setLookAtTargetPosition: (patch) =>
    set((state) => {
      state.lookAtTarget.data.inScene.position = patch;
    }),
  resetLookAtTargetPosition: () =>
    set((state) => {
      state.lookAtTarget.data.inScene.position =
        lookAtTargetDefaults.inScene.position;
    }),
  getLookAtTargetDefaults: () => lookAtTargetDefaults,
});
