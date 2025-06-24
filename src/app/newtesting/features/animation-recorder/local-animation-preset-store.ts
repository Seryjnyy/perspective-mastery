"use client";
import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import {
    AnimationPresetLocalCreation,
    AnimationPresetLocalModel,
} from "../../types2";

interface LocalAnimationPresetState {
    localAnimationPresets: AnimationPresetLocalModel[];
    setLocalAnimationPreset: (preset: AnimationPresetLocalModel) => void;
}

export const useLocalAnimationPresetsStore =
    create<LocalAnimationPresetState>()(
        persist(
            (set) => ({
                localAnimationPresets: [],
                setLocalAnimationPreset: (preset) =>
                    set((state) => ({
                        localAnimationPresets: [...state.localAnimationPresets, preset],
                    })),
            }),
            {
                name: "local-animation-preset",
                storage: createJSONStorage(() => localStorage),
            }
        )
    );
