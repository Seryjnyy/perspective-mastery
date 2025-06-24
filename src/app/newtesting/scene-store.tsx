"use client";
import { createStore, StateCreator, StoreApi } from "zustand/vanilla";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "./shared/utils/create-selectors";
import {
  localCube,
  localGrid,
  localModelsList,
  Model,
} from "./features/scene/models/model";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  LOCAL_GROUND_MODELS,
  LOCAL_LOOK_AT_TARGET_MODELS,
  LOCAL_OBJECT_MODELS,
} from "./features/animation/model-repo";
import { ModelData } from "./types2";

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
  };
  setCamera: (camera: Partial<CameraSlice["camera"]["data"]>) => void;
  setCameraDesiredPosition: (position: Vec3) => void;
  setCameraDesiredFov: (fov: number) => void;
  resetCamera: () => void;
  getCameraDefaults: () => CameraData & {
    desiredPosition: Vec3;
    desiredFov: number;
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
  },
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
  getCameraDefaults: () => cameraDefaults,
});

export type LookAtMode = "manual" | "orbit";

export type LookAtTargetData = {
  position: Vec3;
  mode: LookAtMode;
  isFollowModel: boolean;
  isShowTargetMarker: boolean;
  model: ModelData;
};

export interface LookAtTargetSlice {
  lookAtTarget: {
    data: LookAtTargetData;
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
  position: { x: 0, y: 0, z: 0 },
  model: {
    modelId: LOCAL_LOOK_AT_TARGET_MODELS.SPHERE,
  },
};

export const createLookAtTargetSlice: StateCreator<
  SceneState, // full state
  [["zustand/immer", never]], // middleware
  [], // no other middleware
  LookAtTargetSlice // this slice
> = (set) => ({
  lookAtTarget: {
    data: lookAtTargetDefaults,
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
  getLookAtTargetDefaults: () => lookAtTargetDefaults,
});

export type ObjectData = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
  model: ModelData;
};

export interface ObjectSlice {
  object: {
    data: ObjectData;
  };
  setObjectModel: (modelId: string) => void;
  setObjectPosition: (position: Vec3) => void;
  setObjectRotation: (rotation: Vec3) => void;
  setObjectScale: (scale: Vec3) => void;
  resetObject: () => void;
  getObjectDefaults: () => ObjectData;
}

// TODO : Add functions to allow setting the models initial values. (the values can be used to displace the model, or scale it, rotate it)
const objectDefaults: ObjectData = {
  position: { x: 0, y: 0.5, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
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
  },
  setObjectModel: (patch) =>
    set((state) => {
      state.object.data.model.modelId = patch;
    }),
  setObjectPosition: (patch) =>
    set((state) => {
      state.object.data.position = patch;
    }),
  setObjectRotation: (patch) =>
    set((state) => {
      state.object.data.rotation = patch;
    }),
  setObjectScale: (patch) =>
    set((state) => {
      state.object.data.scale = patch;
    }),
  resetObject: () =>
    set((state) => {
      state.object.data = objectDefaults;
    }),
  getObjectDefaults: () => objectDefaults,
});

export type GroundData = {
  model: ModelData;
  position: Vec3;
};

export interface GroundSlice {
  ground: {
    data: GroundData;
  };
  setGroundPosition: (position: Vec3) => void;
  resetGround: () => void;
  getGroundDefaults: () => GroundData;
}

const groundDefaults: GroundData = {
  model: {
    modelId: LOCAL_GROUND_MODELS.GRID,
  },
  position: { x: 0, y: 0.5, z: 0 },
};
export const createGroundSlice: StateCreator<
  SceneState, // full state
  [["zustand/immer", never]], // middleware
  [], // no other middleware
  GroundSlice // this slice
> = (set) => ({
  ground: {
    data: groundDefaults,
  },
  setGroundPosition: (patch) =>
    set((state) => {
      state.ground.data.model.position = patch;
    }),
  resetGround: () =>
    set((state) => {
      state.ground.data = groundDefaults;
    }),
  getGroundDefaults: () => groundDefaults,
});

export type StaticBackgroundData = {
  models: ModelData[];
  position?: Vec3;
  rotation?: Vec3;
  scale?: Vec3;
};

export interface StaticBackgroundSlice {
  staticBackground: {
    data: StaticBackgroundData;
  };
  addModelToStaticBackground: (model: ModelData) => void;
  removeModelFromStaticBackground: (model: ModelData) => void;
  resetStaticBackground: () => void;
}

const staticBackgroundDefaults: StaticBackgroundData = {
  models: [],
};
export const createStaticBackgroundSlice: StateCreator<
  SceneState, // full state
  [["zustand/immer", never]], // middleware
  [], // no other middleware
  StaticBackgroundSlice // this slice
> = (set) => ({
  staticBackground: {
    data: staticBackgroundDefaults,
  },
  addModelToStaticBackground: (patch) =>
    set((state) => {
      const isNotInList =
        state.staticBackground.data.models.find(
          (model) => model.modelId == patch.modelId
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
          (model) => model.modelId != patch.modelId
        );
    }),
  resetStaticBackground: () =>
    set((state) => {
      state.staticBackground.data = staticBackgroundDefaults;
    }),
});

export type PersistenceData = {
  randomValueToForceStoreToPersist: number | null;
};

export interface PersistenceSlice {
  persistence: {
    data: PersistenceData;
  };
  forcePersist: () => void;
}

const persistenceDefaults: PersistenceData = {
  randomValueToForceStoreToPersist: null,
};

/**
 * This slice is used to force the store to persist. It has a method to set a random non important value so it forces the store to persist.
 */
export const createPersistenceSlice: StateCreator<
  SceneState, // full state
  [["zustand/immer", never]], // middleware
  [], // no other middleware
  PersistenceSlice // this slice
> = (set) => ({
  persistence: {
    data: persistenceDefaults,
  },
  forcePersist: () =>
    set((state) => {
      state.persistence.data.randomValueToForceStoreToPersist = Math.random();
    }),
});

export type SceneState = CameraSlice &
  LookAtTargetSlice &
  ObjectSlice &
  GroundSlice &
  StaticBackgroundSlice &
  PersistenceSlice;

const createSceneStoreInitializer = (
  set: StoreApi<SceneState>["setState"],
  get: StoreApi<SceneState>["getState"],
  api: StoreApi<SceneState>
): SceneState => ({
  ...createCameraSlice(set, get, api),
  ...createLookAtTargetSlice(set, get, api),
  ...createObjectSlice(set, get, api),
  ...createGroundSlice(set, get, api),
  ...createStaticBackgroundSlice(set, get, api),
  ...createPersistenceSlice(set, get, api),
});

export const SCENE_STORE_NAME = "scene-store";

export type StorageMethod = "localStorage";

const storageMethod: StorageMethod = "localStorage";

export const getStorageImplementation = (storageMethod: StorageMethod) => {
  if (storageMethod === "localStorage") {
    return localStorage;
  } else {
    throw new Error("Unsupported storage method");
  }
};
/**
 *
 * A persisted store without id would be like a default.
 * A persisted store with id creates a store that can later be retrieved.
 * A non-persisted store without id or with id is the same thing, it doesn't matter.
 *
 * @param persisted
 * @param id Provide id to access a specific store.
 */
export const createSceneStore = (
  persisted = false,
  id = ""
): StoreApi<SceneState> => {
  // The core middleware chain
  const initializer = immer(createSceneStoreInitializer);

  if (persisted) {
    const persistedInitializer = persist(initializer, {
      name: `${SCENE_STORE_NAME}-${id}`,
      storage: createJSONStorage(() => getStorageImplementation(storageMethod)),
    }) as unknown as StateCreator<SceneState, [], [], SceneState>;

    return createStore<SceneState>(persistedInitializer);
  }

  return createStore<SceneState>(
    initializer
  ) as unknown as StoreApi<SceneState>;
};

/**
 * Deletes a persisted scene store.
 * @param id The id of the scene store to delete.
 * @throws Error if the storage method is not supported.
 */
export const deletePersistedSceneStore = (id: string) => {
  if (storageMethod === "localStorage") {
    localStorage.removeItem(`${SCENE_STORE_NAME}-${id}`);
  } else {
    throw new Error("Unsupported storage method for deletion");
  }
};

// export const createSceneStore = () =>
//   create<SceneState>()(
//     immer((...a) => ({
//       ...createCameraSlice(...a),
//       ...createLookAtTargetSlice(...a),
//       ...createObjectSlice(...a),
//       ...createGroundSlice(...a),
//     }))
//   );

// export const createPersistedSceneStore = (name: string) =>
//     create<SceneState>()(
//         persist(immer(createSceneStoreInitializer), {
//             name: name,
//             storage: createJSONStorage(() => localStorage),
//         })
//     );

// create store
// it will store the zustand store name in the local storage
// if it exists it will load the store from the local storage
// if it doesn't exist then it will create a new id for that store
