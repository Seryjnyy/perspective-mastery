import { StateCreator } from "zustand";
import { SceneState, Vec3 } from "./shared";

export type CameraData = {
  position: Vec3;
  rotation: Vec3;
  fov: number;
  near: number;
  far: number;
  aspect: number;
  zoom: number;
};

export interface CameraSlice {
  camera: {
    // Required because the camera data collector sets the actual camera data.
    // What the user wants then conflicts with the data collector.
    // The desired values set the value for the camera in the scene, and the camera data collector
    // then updates the other values.
    data: CameraData & {
      desiredPosition: Vec3;
      desiredFov: number;
    };
  };
  setCamera: (camera: Partial<CameraSlice["camera"]["data"]>) => void;
  setCameraDesiredPosition: (position: Vec3) => void;
  setCameraDesiredFov: (fov: number) => void;
  setCameraFov: (fov: number) => void;
  resetCamera: () => void;
  getCameraDefaults: () => CameraData & {
    desiredPosition: Vec3;
    desiredFov: number;
  };
}

const cameraDefaults: CameraSlice["camera"]["data"] = {
  position: { x: 3, y: 3, z: 5 },
  desiredPosition: { x: 3, y: 3, z: 5 },
  desiredFov: 50,
  rotation: { x: 0, y: 0, z: 0 },
  fov: 50,
  near: 0.1,
  far: 1000,
  aspect: 1,
  zoom: 1,
};

export const createCameraSlice: StateCreator<
  SceneState, // full state
  [["zustand/immer", never]], // middleware
  [], // no other middleware
  CameraSlice // this slice
> = (set) => ({
  camera: {
    data: cameraDefaults,
  },
  setCamera: (cameraData) =>
    set((state) => ({
      camera: {
        ...state.camera,
        data: {
          ...state.camera.data,
          ...cameraData,
        },
      },
    })),
  setCameraDesiredPosition: (position) =>
    set((state) => {
      state.camera.data.desiredPosition = position;
    }),
  setCameraDesiredFov: (patch) =>
    set((state) => {
      state.camera.data.desiredFov = patch;
    }),
  setCameraFov: (patch) =>
    set((state) => {
      state.camera.data.desiredFov = patch;
    }),

  resetCamera: () =>
    set((state) => ({
      camera: {
        ...state.camera,
        data: cameraDefaults,
      },
    })),
  getCameraDefaults: () => cameraDefaults,
});
