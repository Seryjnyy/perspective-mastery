"use client";
import { createJSONStorage, persist } from "zustand/middleware";
import { createSelectors } from "../../shared/utils/create-selectors";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { AnimationKeyframe } from "@/app/newtesting/features/animation/types/types";
import {
  AnimationPresetLocalCreationMetadata,
  Difficulty,
} from "@/app/newtesting/types2";
import { v4 as uuidv4 } from "uuid";
import { StoreApi } from "zustand/vanilla";
import {
  getStorageImplementation,
  SceneState,
  StorageMethod,
} from "@/app/newtesting/scene-store";
import { Tag } from "postcss-selector-parser";

export type RecorderSessionStoreState = {
  keyframes: AnimationKeyframe[];
  metadata: AnimationPresetLocalCreationMetadata;
  randomValueToForceStoreToPersist: number | null;
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
  randomValueToForceStoreToPersist: null,
};
export const RECORDER_SESSION_STORE_NAME = "recorder-session-";

const storageMethod: StorageMethod = "localStorage";

export const createRecorderSessionStore = (
  id: string
): StoreApi<RecorderSessionStore> => {
  console.log("ApplesPears", id);
  return create<RecorderSessionStore>()(
    persist(
      immer((set) => ({
        ...defaultState,
        setName: (patch) =>
          set((state) => {
            state.metadata.name = patch;
          }),
        setDesc: (patch) =>
          set((state) => {
            state.metadata.desc = patch;
          }),
        setDifficulty: (patch) =>
          set((state) => {
            state.metadata.difficulty = patch;
          }),
        setRecommendedSteps: (patch) =>
          set((state) => {
            state.metadata.recommendedSteps = patch;
          }),
        setTags: (patch) =>
          set((state) => {
            state.metadata.tags = patch;
          }),
        addKeyframe: (patch) =>
          set((state) => {
            const filtered = state.keyframes.filter(
              (keyframe) => keyframe.id != patch.id
            );

            state.keyframes = [...filtered, patch];
          }),
        removeKeyframe: (keyframeId) =>
          set((state) => {
            state.keyframes = state.keyframes.filter(
              (kf) => kf.id !== keyframeId
            );
          }),
        setKeyframes: (keyframes) =>
          set((state) => {
            state.keyframes = keyframes;
          }),
        clearKeyframes: () =>
          set((state) => {
            state.keyframes = [];
          }),
        forcePersist: () =>
          set((state) => {
            state.randomValueToForceStoreToPersist = Math.random();
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
