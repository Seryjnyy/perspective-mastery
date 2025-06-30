"use client";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStore, StateCreator, StoreApi } from "zustand/vanilla";
import { createCameraSlice } from "./camera-slice";
import { createLookAtTargetSlice } from "./lookat-slice";
import { createGroundSlice, createObjectSlice } from "./object-slice";
import { createPersistenceSlice } from "./persistance-slice";
import { SceneState } from "./shared";
import { createStaticBackgroundSlice } from "./static-background-slice";
// TODO : Add functions to allow setting the models initial values. (the values can be used to displace the model, or scale it, rotate it)

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

export const SCENE_STORE_NAME = "scene-store-";

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
      name: `${SCENE_STORE_NAME}${id}`,
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
    localStorage.removeItem(`${SCENE_STORE_NAME}${id}`);
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
