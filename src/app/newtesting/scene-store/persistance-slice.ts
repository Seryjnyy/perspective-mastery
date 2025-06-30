import { StateCreator } from "zustand";
import { SceneState, Vec3 } from "./shared";

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
