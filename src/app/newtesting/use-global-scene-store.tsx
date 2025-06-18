import { createSceneStore } from "./scene-store";
import { createSelectors } from "./shared/utils/create-selectors";

export const useGlobalSceneStore = createSelectors(createSceneStore());
