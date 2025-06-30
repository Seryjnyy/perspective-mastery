import { StateCreator } from "zustand";
import { SceneState, Vec3 } from "./shared";
import { InSceneState, SceneModel } from "../types2";
import {
  LOCAL_GROUND_MODELS,
  LOCAL_OBJECT_MODELS,
} from "../features/animation/model-repo";

export type ObjectData = SceneModel;

export interface ObjectSlice {
  object: {
    data: ObjectData;
    defaultsInScene: Required<InSceneState>;
  };
  setObjectModel: (modelId: string) => void;
  setObjectPosition: (position: Vec3) => void;
  setObjectRotation: (rotation: Vec3) => void;
  setObjectScale: (scale: Vec3) => void;
  resetObject: () => void;
}

const defaultsInScene: Required<InSceneState> = {
  position: { x: 0, y: 0.5, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
};

const objectDefaults: ObjectData = {
  inScene: defaultsInScene,
  model: {
    modelId: LOCAL_OBJECT_MODELS.CUBE,
  },
};

export const createObjectSlice: StateCreator<
  SceneState, // full state
  [["zustand/immer", never]], // middleware
  [], // no other middleware
  ObjectSlice // this slice
> = (set) => ({
  object: {
    data: objectDefaults,
    defaultsInScene: defaultsInScene,
  },
  setObjectModel: (patch) =>
    set((state) => {
      state.object.data.model.modelId = patch;
    }),
  setObjectPosition: (patch) =>
    set((state) => {
      state.object.data.inScene.position = patch;
    }),
  setObjectRotation: (patch) =>
    set((state) => {
      state.object.data.inScene.rotation = patch;
    }),
  setObjectScale: (patch) =>
    set((state) => {
      state.object.data.inScene.scale = patch;
    }),
  resetObject: () =>
    set((state) => {
      state.object.data = objectDefaults;
    }),
  getObjectDefaults: () => objectDefaults,
});

export type GroundData = SceneModel;

export interface GroundSlice {
  ground: {
    data: GroundData;
    defaultsInScene: Required<InSceneState>;
  };
  setGroundPosition: (position: Vec3) => void;
  resetGround: () => void;
  getGroundDefaults: () => GroundData;
}

const groundDefaults: GroundData = {
  model: {
    modelId: LOCAL_GROUND_MODELS.GRID,
  },
  inScene: { position: { x: 0, y: 0.5, z: 0 } },
};
export const createGroundSlice: StateCreator<
  SceneState, // full state
  [["zustand/immer", never]], // middleware
  [], // no other middleware
  GroundSlice // this slice
> = (set) => ({
  ground: {
    data: groundDefaults,
    defaultsInScene: defaultsInScene,
  },
  setGroundPosition: (patch) =>
    set((state) => {
      state.ground.data.inScene.position = patch;
    }),
  resetGround: () =>
    set((state) => {
      state.ground.data = groundDefaults;
    }),
  getGroundDefaults: () => groundDefaults,
});
