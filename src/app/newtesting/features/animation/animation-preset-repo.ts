"use client";
import { AnimationPresetLocalModel, testAnimationPresets } from "../../types2";
import { getLocalAnimationPresets } from "../animation-animation-recorder/local-preset-to-animation";

interface AnimationPresetRepo {
  getAnimationPreset(id: string): AnimationPresetLocalModel | undefined;

  getAnimationPresets(): AnimationPresetLocalModel[];

  //   addAnimationPreset(preset: AnimationPresetLocalModel): void;
  //   updateAnimationPreset(preset: AnimationPresetLocalModel): void;
  //   deleteAnimationPreset(id: string): void;
}

export const animationPresetRepo: AnimationPresetRepo = {
  getAnimationPreset: (id: string) => {
    return getLocalAnimationPresets().find((preset) => preset.id === id);
  },
  getAnimationPresets: () => {
    return testAnimationPresets;
  },
};
