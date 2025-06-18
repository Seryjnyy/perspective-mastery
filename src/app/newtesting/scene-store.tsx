import { createStore, StateCreator } from "zustand/vanilla";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "./shared/utils/create-selectors";
import { localModelsList, Model } from "./features/scene/models/model";

export type Vec3 = { x: number; y: number; z: number };

export type CameraData = {
  position: Vec3;
  rotation: Vec3;
  fov: number;
  near: number;
  far: number;
  aspect: number;
  zoom: number;
};

export interface CameraSlice {
  camera: {
    // Required because the camera data collector sets the actual camera data.
    // What the user wants then conflicts with the data collector.
    // The desired values set the value for the camera in the scene, and the camera data collector
    // then updates the other values.
    data: CameraData & {
      desiredPosition: Vec3;
      desiredFov: number;
    };
    setCamera: (camera: Partial<CameraSlice["camera"]["data"]>) => void;
    setCameraDesiredPosition: (position: Vec3) => void;
    setCameraDesiredFov: (fov: number) => void;
    resetCamera: () => void;
    getDefaults: () => CameraData & {
      desiredPosition: Vec3;
      desiredFov: number;
    };
  };
}

const cameraDefaults: CameraSlice["camera"]["data"] = {
  position: { x: 3, y: 3, z: 5 },
  desiredPosition: { x: 3, y: 3, z: 5 },
  desiredFov: 50,
  rotation: { x: 0, y: 0, z: 0 },
  fov: 50,
  near: 0.1,
  far: 1000,
  aspect: 1,
  zoom: 1,
};

export const createCameraSlice: StateCreator<
  SceneState, // full state
  [["zustand/immer", never]], // middleware
  [], // no other middleware
  CameraSlice // this slice
> = (set) => ({
  camera: {
    data: cameraDefaults,
    setCamera: (cameraData) =>
      set((state) => ({
        camera: {
          ...state.camera,
          data: {
            ...state.camera.data,
            ...cameraData,
          },
        },
      })),
    setCameraDesiredPosition: (position) =>
      set((state) => {
        Object.assign(state.camera.data.desiredPosition, position);
      }),
    setCameraDesiredFov: (patch) =>
      set((state) => {
        Object.assign(state.camera.data.desiredFov, patch);
      }),

    resetCamera: () =>
      set((state) => ({
        camera: {
          ...state.camera,
          data: cameraDefaults,
        },
      })),
    getDefaults: () => cameraDefaults,
  },
});

export type LookAtMode = "manual" | "orbit";

export type LookAtTargetData = {
  position: Vec3;
  mode: LookAtMode;
  isFollowModel: boolean;
  isShowTargetMarker: boolean;
};

export interface LookAtTargetSlice {
  lookAtTarget: {
    data: LookAtTargetData;
    setLookAtTarget: (lookAtTarget: Partial<LookAtTargetData>) => void;
    setLookAtTargetPosition: (position: Vec3) => void;
    resetLookAtTargetPosition: () => void;
    getDefaults: () => LookAtTargetData;
  };
}

const lookAtTargetDefaults: LookAtTargetData = {
  mode: "orbit",
  // TODO What is follow model? I dont think its used anywhere.
  isFollowModel: false,
  isShowTargetMarker: true,
  position: { x: 0, y: 0, z: 0 },
};

export const createLookAtTargetSlice: StateCreator<
  SceneState, // full state
  [["zustand/immer", never]], // middleware
  [], // no other middleware
  LookAtTargetSlice // this slice
> = (set) => ({
  lookAtTarget: {
    data: lookAtTargetDefaults,
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
        Object.assign(state.lookAtTarget.data.position, patch);
      }),
    resetLookAtTargetPosition: () =>
      set((state) => ({
        lookAtTarget: {
          ...state.lookAtTarget,
          data: {
            ...state.lookAtTarget.data,
            position: lookAtTargetDefaults.position,
          },
        },
      })),
    getDefaults: () => lookAtTargetDefaults,
  },
});

export type ObjectData = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
  model: Model;
};

export interface ObjectSlice {
  object: {
    data: ObjectData;
    setObject: (object: Partial<ObjectData>) => void;
    setObjectPosition: (position: Vec3) => void;
    setObjectRotation: (rotation: Vec3) => void;
    setObjectModel: (model: Model) => void;
    resetObject: () => void;
    getDefaults: () => ObjectData;
  };
}

const objectDefaults: ObjectData = {
  position: { x: 0, y: 0.5, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
  model: localModelsList[0],
};

export const createObjectSlice: StateCreator<
  SceneState, // full state
  [["zustand/immer", never]], // middleware
  [], // no other middleware
  ObjectSlice // this slice
> = (set) => ({
  object: {
    data: objectDefaults,
    setObject: (objectData) =>
      set((state) => ({
        object: {
          ...state.object,
          data: {
            ...state.object.data,
            ...objectData,
          },
        },
      })),
    setObjectPosition: (patch) =>
      set((state) => {
        Object.assign(state.object.data.position, patch);
      }),
    setObjectRotation: (patch) =>
      set((state) => {
        Object.assign(state.object.data.rotation, patch);
      }),
    setObjectModel: (patch) =>
      set((state) => {
        Object.assign(state.object.data.model, patch);
      }),
    resetObject: () =>
      set((state) => ({
        object: {
          ...state.object,
          data: objectDefaults,
        },
      })),
    getDefaults: () => objectDefaults,
  },
});

export type GroundData = {
  position: Vec3;
};

export interface GroundSlice {
  ground: {
    data: GroundData;
    setGroundPosition: (position: Vec3) => void;
    resetGround: () => void;
  };
}

const groundDefaults: GroundData = {
  position: { x: 0, y: 0, z: 0 },
};
export const createGroundSlice: StateCreator<
  SceneState, // full state
  [["zustand/immer", never]], // middleware
  [], // no other middleware
  GroundSlice // this slice
> = (set) => ({
  ground: {
    data: groundDefaults,
    setGroundPosition: (patch) =>
      set((state) => {
        Object.assign(state.ground.data.position, patch);
      }),
    resetGround: () =>
      set((state) => ({
        ground: {
          ...state.ground,
          data: groundDefaults,
        },
      })),
    getDefaults: () => groundDefaults,
  },
});

type SceneState = CameraSlice & LookAtTargetSlice & ObjectSlice & GroundSlice;

export const createSceneStore = () =>
  create<SceneState>()(
    immer((...a) => ({
      ...createCameraSlice(...a),
      ...createLookAtTargetSlice(...a),
      ...createObjectSlice(...a),
      ...createGroundSlice(...a),
    }))
  );
