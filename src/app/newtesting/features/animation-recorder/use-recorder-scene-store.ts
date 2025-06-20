import { createPersistedSceneStore } from "@/app/newtesting/scene-store";
import { createSelectors } from "../../shared/utils/create-selectors";

export const globalRecorderSceneStore = createPersistedSceneStore(
  "recorder-scene-store"
);

export const useRecorderSceneStore = createSelectors(globalRecorderSceneStore);
