import { createStore, StateCreator } from "zustand/vanilla";
import { create } from "zustand";

export type Vec3 = { x: number; y: number; z: number };

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
        setCamera: (camera: Partial<CameraSlice["camera"]["data"]>) => void;
        resetCamera: () => void;
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

export const createCameraSlice: StateCreator<CameraSlice> = (set) => ({
    camera: {
        data: cameraDefaults,
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
        resetCamera: () =>
            set((state) => ({
                camera: {
                    ...state.camera,
                    data: cameraDefaults,
                },
            })),
    },
});

export interface LookAtTargetSlice {
    lookAtTarget: {
        data: {
            position: Vec3;
            isEnabled: boolean;
            isFollowModel: boolean;
            isShowTargetMarker: boolean;
        };
        setLookAtTarget: (
            lookAtTarget: Partial<LookAtTargetSlice["lookAtTarget"]>
        ) => void;
        resetLookAtTargetPosition: () => void;
    };
}

const lookAtTargetDefaults: LookAtTargetSlice["lookAtTarget"]["data"] = {
    isEnabled: true,
    isFollowModel: false,
    isShowTargetMarker: true,
    position: { x: 0, y: 0, z: 0 },
};

export const createLookAtTargetSlice: StateCreator<LookAtTargetSlice> = (
    set
) => ({
    lookAtTarget: {
        data: lookAtTargetDefaults,
        setLookAtTarget: (data) =>
            set((state) => ({
                lookAtTarget: { ...state.lookAtTarget, ...data },
            })),
        resetLookAtTargetPosition: () =>
            set((state) => ({
                lookAtTarget: {
                    ...state.lookAtTarget,
                    position: lookAtTargetDefaults.position,
                },
            })),
    },
});

type SceneState = CameraSlice & LookAtTargetSlice;

const createSceneStore = () =>
    create<SceneState>()((...a) => ({
        ...createCameraSlice(...a),
        ...createLookAtTargetSlice(...a),
    }));

export const useSceneStore = createSceneStore();
