"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  AnimationPresetLocalCreation,
  AnimationPresetLocalModel,
} from "../../types2";
import { immer } from "zustand/middleware/immer";

// interface LocalAnimationPresetState {
//   localAnimationPresets: AnimationPresetLocalModel[];
//   setLocalAnimationPresets: (preset: AnimationPresetLocalModel[]) => void;
//   addAnimationPreset: (preset: AnimationPresetLocalModel) => void;
//   removeAnimationPreset: (presetId: string) => void;
// }

// export const useLocalAnimationPresetsStore =
//   create<LocalAnimationPresetState>()(
//     persist(
//       immer((set) => ({
//         localAnimationPresets: [],
//         setLocalAnimationPresets: (presets) =>
//           set((state) => {
//             state.localAnimationPresets = presets;
//           }),
//         addAnimationPreset: (preset) =>
//           set((state) => {
//             const filtered = state.localAnimationPresets.filter(
//               (existingPreset) => existingPreset.id !== preset.id
//             );
//             state.localAnimationPresets = [...filtered, preset];
//           }),
//         removeAnimationPreset: (presetId) =>
//           set((state) => {
//             state.localAnimationPresets = state.localAnimationPresets.filter(
//               (preset) => preset.id !== presetId
//             );
//           }),
//       })),
//       {
//         name: "local-animation-presets",
//         storage: createJSONStorage(() => localStorage),
//         // TODO : do we need this?
//         partialize: (state) => ({
//           localAnimationPresets: state.localAnimationPresets,
//         }),
//       }
//     )
//   );
