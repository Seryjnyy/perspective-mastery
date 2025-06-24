"use client";
import { AnimationPresetLocalModel, testAnimationPresets } from "../../types2";
import { useLocalAnimationPresetsStore } from "../animation-recorder/local-animation-preset-store";

interface AnimationPresetRepo {
  getAnimationPreset(id: string): AnimationPresetLocalModel | undefined;

  getAnimationPresets(): AnimationPresetLocalModel[];

  //   addAnimationPreset(preset: AnimationPresetLocalModel): void;
  //   updateAnimationPreset(preset: AnimationPresetLocalModel): void;
  //   deleteAnimationPreset(id: string): void;
}

export const animationPresetRepo: AnimationPresetRepo = {
  getAnimationPreset: (id: string) => {
    const k = useLocalAnimationPresetsStore();
    return k.localAnimationPresets.find((preset) => preset.id === id);
  },
  getAnimationPresets: () => {
    return testAnimationPresets;
  },
};
