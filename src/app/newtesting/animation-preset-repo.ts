import { AnimationPresetLocalModel, testAnimationPresets } from "./types";

interface AnimationPresetRepo {
  getAnimationPreset(id: string): AnimationPresetLocalModel | undefined;
  getAnimationPresets(): AnimationPresetLocalModel[];
  //   addAnimationPreset(preset: AnimationPresetLocalModel): void;
  //   updateAnimationPreset(preset: AnimationPresetLocalModel): void;
  //   deleteAnimationPreset(id: string): void;
}

export const animationPresetRepo: AnimationPresetRepo = {
  getAnimationPreset: (id: string) => {
    return testAnimationPresets.find((preset) => preset.id === id);
  },
  getAnimationPresets: () => {
    return testAnimationPresets;
  },
};
