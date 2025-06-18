import { create, createStore } from "zustand";
import { AnimationKeyframe } from "../animation/types/types";

type State = {
  keyframes: AnimationKeyframe[];
};

interface Actions {
  setKeyframes: (val: AnimationKeyframe[]) => void;
}

// const s = createStore<State & Actions>()();
