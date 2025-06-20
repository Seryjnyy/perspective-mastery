import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";
import { AnimationPresetLocalCreation } from "../../types2";
import {
  LOCAL_GROUND_MODELS,
  LOCAL_LOOK_AT_TARGET_MODELS,
  LOCAL_OBJECT_MODELS,
} from "../animation/model-repo";
import { createSelectors } from "../../shared/utils/create-selectors";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type RecorderSessionStoreState = {
  currentPreset: AnimationPresetLocalCreation;
};

type RecorderSessionStoreActions = {};

type RecorderSessionStore = RecorderSessionStoreState &
  RecorderSessionStoreActions;

const defaultState: RecorderSessionStoreState = {
  currentPreset: {
    animationPresetData: {
      animationData: {
        keyframes: [],
      },
      modelData: {
        modelId: LOCAL_OBJECT_MODELS.CYLINDER,
      },
      groundData: {
        model: {
          modelId: LOCAL_GROUND_MODELS.GRID,
        },
      },
      staticBackground: {
        models: [],
      },
      lookAtTargetData: {
        model: {
          modelId: LOCAL_LOOK_AT_TARGET_MODELS.SPHERE,
        },
      },
      lightData: {
        lights: [],
      },
    },
    metadata: {
      name: "",
      desc: "",
      difficulty: "medium",
      recommendedSteps: 10,
      tags: [],
    },
  },
};

const recorderSessionStore = create<RecorderSessionStore>()(
  persist(
    immer((set) => ({
      ...defaultState,
    })),
    {
      name: "recorder-session-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useRecorderSessionStore = createSelectors(recorderSessionStore);
