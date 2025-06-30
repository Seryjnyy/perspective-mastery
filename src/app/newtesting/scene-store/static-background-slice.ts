import { StateCreator } from "zustand";
import { SceneState, Vec3 } from "./shared";
import { InSceneState, SceneModel } from "../types2";

export type StaticBackgroundData = {
  models: SceneModel[];
  inScene: InSceneState;
};

export interface StaticBackgroundSlice {
  staticBackground: {
    data: StaticBackgroundData;
    defaultsInScene: Required<InSceneState>;
  };
  addModelToStaticBackground: (model: SceneModel) => void;
  removeModelFromStaticBackground: (model: SceneModel) => void;
  resetStaticBackground: () => void;
}

const defaultsInScene: Required<InSceneState> = {
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
};

const staticBackgroundDefaults: StaticBackgroundData = {
  models: [],
  inScene: defaultsInScene,
};
export const createStaticBackgroundSlice: StateCreator<
  SceneState, // full state
  [["zustand/immer", never]], // middleware
  [], // no other middleware
  StaticBackgroundSlice // this slice
> = (set) => ({
  staticBackground: {
    data: staticBackgroundDefaults,
    defaultsInScene: defaultsInScene,
  },
  addModelToStaticBackground: (patch) =>
    set((state) => {
      const isNotInList =
        state.staticBackground.data.models.find(
          (modelData) => modelData.model.modelId == patch.model.modelId
        ) == null;
      if (isNotInList) {
        state.staticBackground.data.models = [
          ...state.staticBackground.data.models,
          patch,
        ];
      }
    }),
  removeModelFromStaticBackground: (patch) =>
    set((state) => {
      state.staticBackground.data.models =
        state.staticBackground.data.models.filter(
          (modelData) => modelData.model.modelId != patch.model.modelId
        );
    }),
  resetStaticBackground: () =>
    set((state) => {
      state.staticBackground.data = staticBackgroundDefaults;
    }),
});
