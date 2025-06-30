"use client";
import { AnimationKeyframe } from "@/app/newtesting/features/animation/types/types";
import {
  getStorageImplementation,
  StorageMethod,
} from "@/app/newtesting/scene-store/scene-store";
import {
  AnimationPresetLocalCreationMetadata,
  Difficulty,
} from "@/app/newtesting/types2";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { StoreApi } from "zustand/vanilla";

export type RecorderSessionStoreState = {
  keyframes: AnimationKeyframe[];
  metadata: AnimationPresetLocalCreationMetadata;
  randomValueToForceStoreToPersist: number | null;
  lastUpdated?: string;
  createdAt: string;
};

type RecorderSessionStoreActions = {
  setName: (name: string) => void;
  setDesc: (desc: string) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setRecommendedSteps: (steps: number) => void;
  setTags: (tags: string[]) => void;
  addKeyframe: (keyframe: AnimationKeyframe) => void;
  removeKeyframe: (keyframeId: string) => void;
  clearKeyframes: () => void;
  setKeyframes: (keyframes: AnimationKeyframe[]) => void;
  forcePersist: () => void;
};

export type RecorderSessionStore = RecorderSessionStoreState &
  RecorderSessionStoreActions;

const defaultState: RecorderSessionStoreState = {
  // TODO : Creating uuid client side, should be fine for when kept client side, but shouldn't allow it or change it when working with server
  keyframes: [],
  metadata: {
    name: "Untitled",
    desc: "",
    tags: [],
    difficulty: "medium",
    recommendedSteps: 6,
  },
  lastUpdated: new Date().toISOString(),
  randomValueToForceStoreToPersist: null,
  createdAt: new Date().toISOString(),
};
export const RECORDER_SESSION_STORE_NAME = "recorder-session-";

const storageMethod: StorageMethod = "localStorage";

export const createRecorderSessionStore = (
  id: string
): StoreApi<RecorderSessionStore> => {
  return create<RecorderSessionStore>()(
    persist(
      immer((set) => ({
        ...defaultState,
        setName: (patch) =>
          set((state) => {
            state.metadata.name = patch;
            state.lastUpdated = new Date().toISOString();
          }),
        setDesc: (patch) =>
          set((state) => {
            state.metadata.desc = patch;
            state.lastUpdated = new Date().toISOString();
          }),
        setDifficulty: (patch) =>
          set((state) => {
            state.metadata.difficulty = patch;
            state.lastUpdated = new Date().toISOString();
          }),
        setRecommendedSteps: (patch) =>
          set((state) => {
            state.metadata.recommendedSteps = patch;
            state.lastUpdated = new Date().toISOString();
          }),
        setTags: (patch) =>
          set((state) => {
            state.metadata.tags = patch;
            state.lastUpdated = new Date().toISOString();
          }),
        addKeyframe: (patch) =>
          set((state) => {
            const filtered = state.keyframes.filter(
              (keyframe) => keyframe.id != patch.id
            );

            state.keyframes = [...filtered, patch];
            state.lastUpdated = new Date().toISOString();
          }),
        removeKeyframe: (keyframeId) =>
          set((state) => {
            state.keyframes = state.keyframes.filter(
              (kf) => kf.id !== keyframeId
            );
            state.lastUpdated = new Date().toISOString();
          }),
        setKeyframes: (keyframes) =>
          set((state) => {
            state.keyframes = keyframes;
            state.lastUpdated = new Date().toISOString();
          }),

        clearKeyframes: () =>
          set((state) => {
            state.keyframes = [];
            state.lastUpdated = new Date().toISOString();
          }),
        forcePersist: () =>
          set((state) => {
            state.randomValueToForceStoreToPersist = Math.random();
            state.lastUpdated = new Date().toISOString();
          }),
      })),
      {
        name: `${RECORDER_SESSION_STORE_NAME}${id}`,
        storage: createJSONStorage(() =>
          getStorageImplementation(storageMethod)
        ),
      }
    )
  );
};

/**
 * Deletes a persisted scene store.
 * @param id The id of the scene store to delete.
 * @throws Error if the storage method is not supported.
 */
export const deletePersistedRecordSessionStore = (id: string) => {
  if (storageMethod === "localStorage") {
    localStorage.removeItem(`${RECORDER_SESSION_STORE_NAME}${id}`);
  } else {
    throw new Error("Unsupported storage method for deletion");
  }
};

// export const useRecorderSessionStore = (id: string) => createSelectors(createRecorderSessionStore(id))()
