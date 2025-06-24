"use client";
import {produce} from "immer";
import {AnimationKeyFrameConfig} from "../../types/types";
import {AnimationPresetLocalModel, Light} from "../../../../types2";
import {AnimationPreset} from "../../animations";
import {localCube} from "../../../scene/models/model";

const unchangingData: AnimationKeyFrameConfig = {
    objectPosition: {x: 0, y: 0, z: 0},
    cameraFov: 50,
    lookAtTargetPosition: {x: 0, y: 0, z: 0},
    // unused
    cameraPosition: {x: 0, y: 0, z: 0},
    objectRotation: {x: 0, y: 0, z: 0},
};

const tags = ["object rotates", "y-axis"];

const defaultLights: Light[] = [
    {
        type: "ambient",
        position: {x: 2, y: 2, z: 2},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 1, y: 1, z: 1},
        intensity: 1,
    },
];

const boxRotationYAxisCameraAbove: AnimationPresetLocalModel = {
    id: "3190e085-1d56-4ae4-91ef-861241d14496",
    animationPresetData: {
        animationData: {
            keyframes: [
                {
                    t: 0,
                    config: {
                        ...unchangingData,
                        cameraPosition: {x: 2, y: 3, z: 2},
                        objectRotation: {x: 0, y: 0, z: 0},
                    },
                },
                {
                    t: 1,
                    config: {
                        ...unchangingData,
                        cameraPosition: {x: 2, y: 3, z: 2},
                        objectRotation: {x: 0, y: Math.PI, z: 0},
                    },
                },
            ],
        },
        modelData: {
            modelId: localCube.id,
        },
        groundData: {
            modelId: "local-grid",
        },
        staticBackground: {
            models: [],
        },
        lookAtTargetData: {
            model: {
                modelId: "local-look-at-target-sphere",
            },
        },
        lightData: {
            lights: defaultLights,
        },
    },
    metadata: {
        name: "Box rotate - y axis - camera above",
        desc: "Box rotates on the y axis, with the camera above the box",
        createdAt: "2025-06-11T13:00:00.000Z",
        difficulty: "easy",
        recommendedSteps: 10,
        tags: [...tags, "camera above"],
        source: "local",
    },
};

const boxRotationYAxisCameraLevel = produce(
    boxRotationYAxisCameraAbove,
    (draft) => {
        draft.id = "b35acf68-49bf-425e-8635-782f6c1c1f37";
        draft.metadata.name = "Box rotate - y axis - camera level";
        draft.metadata.desc =
            "Box rotates on the x axis, with the camera level with the box";
        draft.metadata.tags = [...tags, "camera level"];

        draft.animationPresetData.animationData.keyframes = [
            {
                t: 0,
                config: {
                    ...unchangingData,
                    cameraPosition: {x: 2, y: 0, z: 2},
                    objectRotation: {x: 0, y: 0, z: 0},
                },
            },
            {
                t: 1,
                config: {
                    ...unchangingData,
                    cameraPosition: {x: 2, y: 0, z: 2},
                    objectRotation: {x: 0, y: Math.PI, z: 0},
                },
            },
        ];
    }
);

const boxRotationYAxisCameraBelow = produce(
    boxRotationYAxisCameraAbove,
    (draft) => {
        draft.id = "b2cfab75-c4f7-468d-aaa8-c9eddeb99d44";
        draft.metadata.name = "Box rotate - y axis - camera below";
        draft.metadata.desc =
            "Box rotates on the y axis, with the camera below the box";
        draft.metadata.tags = [...tags, "camera below"];

        draft.animationPresetData.animationData.keyframes = [
            {
                t: 0,
                config: {
                    ...unchangingData,
                    cameraPosition: {x: 2, y: -3, z: 2},
                    objectRotation: {x: 0, y: 0, z: 0},
                },
            },
            {
                t: 1,
                config: {
                    ...unchangingData,
                    cameraPosition: {x: 2, y: -3, z: 2},
                    objectRotation: {x: 0, y: Math.PI, z: 0},
                },
            },
        ];
    }
);

export const boxRotationsYaxis = [
    boxRotationYAxisCameraAbove,
    boxRotationYAxisCameraLevel,
    boxRotationYAxisCameraBelow,
];
