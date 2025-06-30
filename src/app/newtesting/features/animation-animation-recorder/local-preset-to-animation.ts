import {
  ZustandRecorderSessionStoreState,
  ZustandSceneStoreState,
} from "../../recorder/page-content";
import { SCENE_STORE_NAME } from "../../scene-store/scene-store";
import { SceneState } from "../../scene-store/shared";
import { AnimationPresetLocalModel } from "../../types2";
import {
  RECORDER_SESSION_STORE_NAME,
  RecorderSessionStoreState,
} from "../animation-recorder/recorder-session-store";
import { getLocalStorageItemsByPrefix } from "../animation-recorder/utils/utils";

// get scene stores and recorder session stores
export const getLocalAnimationPresets = () => {
  const s = getLocalStorageItemsByPrefix<ZustandRecorderSessionStoreState>(
    RECORDER_SESSION_STORE_NAME
  );
  const k =
    getLocalStorageItemsByPrefix<ZustandSceneStoreState>(SCENE_STORE_NAME);

  const presets: AnimationPresetLocalModel[] = [];

  for (const key in s) {
    const recorderSessionStoreState = s[key];
    const sceneStoreState = k[key];

    if (recorderSessionStoreState.state.keyframes.length === 0) {
      console.warn(`Skipping preset with no keyframes: ${key}`);
      continue;
    }

    if (!recorderSessionStoreState || !sceneStoreState) {
      console.warn(`Missing state for key: ${key}`);
      continue;
    }

    if (recorderSessionStoreState && sceneStoreState) {
      const preset = convertLocalPresetToAnimation(
        key,
        sceneStoreState.state,
        recorderSessionStoreState.state
      );
      presets.push(preset);
    }
  }

  return presets;
};
const convertLocalPresetToAnimation = (
  id: string,
  sceneStoreState: SceneState,
  recorderSessionStoreState: RecorderSessionStoreState
): AnimationPresetLocalModel => {
  return {
    id: id,
    metadata: {
      desc: recorderSessionStoreState.metadata.desc,
      name: recorderSessionStoreState.metadata.name,
      tags: recorderSessionStoreState.metadata.tags,
      difficulty: recorderSessionStoreState.metadata.difficulty,
      recommendedSteps: recorderSessionStoreState.metadata.recommendedSteps,
      lastUsedAt: recorderSessionStoreState.lastUpdated,
      createdAt: recorderSessionStoreState.createdAt,
      source: "local",
    },
    animationPresetData: {
      animationData: {
        keyframes: recorderSessionStoreState.keyframes,
      },
      modelData: {
        model: sceneStoreState.object.data.model,
        inScene: sceneStoreState.object.data.inScene,
      },
      groundData: {
        model: sceneStoreState.ground.data.model,
        inScene: sceneStoreState.ground.data.inScene,
      },
      lightData: {
        lights: [],
      },
      lookAtTargetData: {
        model: sceneStoreState.lookAtTarget.data.model,
        inScene: sceneStoreState.lookAtTarget.data.inScene,
      },
      staticBackground: sceneStoreState.staticBackground.data,
    },
  };
};

// TODO Note : modelData has position/rotation/scale but i have not used it properly yet
