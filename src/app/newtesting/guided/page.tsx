"use client";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useMemo, useState } from "react";
import CameraControlsScene, {
    CameraControlsInScene,
    CameraDataCollector,
    Scene,
    SceneStoreProvider,
    SceneVisualisationPreview,
    useTestingNewStore,
} from "@/app/newtesting/page";
import {
    CameraData,
    useGlobalSceneStore,
} from "@/app/newtesting/useGlobalSceneStore";
import ContentLibrarySection from "@/app/newtesting/content-library-section";
import { AnimationPreviewer } from "../control-panel/tabs";
import { AnimationPresetLocalModel } from "../types";
import SceneVisualisation from "../preview/scene-visualisation";
import { TestingScene } from "./[challenge]/page";
import modelRepo from "../model-repo";
import { animationPresetRepo } from "../animation-preset-repo";
import { Loader } from "../test-model-loading";
import ModelGetter from "../ModelGetter";
import ModelCreator from "../preset-creator/preset-creator-menu";
import KeyframeEditor from "../preset-creator/keyframe-editor";

export default function Guided() {
    return <KeyframeEditor />;

    return (
        <SceneStoreProvider>
            <Page />
        </SceneStoreProvider>
    );
}

const Page = () => {
    const camera = useTestingNewStore()((state) => state.camera.data);
    const setCamera = useTestingNewStore()((state) => state.camera.setCamera);
    const object = useTestingNewStore()((state) => state.object.data);
    const ground = useTestingNewStore()((state) => state.ground.data);
    const lookAtTarget = useTestingNewStore()(
        (state) => state.lookAtTarget.data
    );
    const setObjectRotation = useTestingNewStore()(
        (state) => state.object.setObjectRotation
    );
    const setObjectPosition = useTestingNewStore()(
        (state) => state.object.setObjectPosition
    );
    const setCameraDesiredPosition = useTestingNewStore()(
        (state) => state.camera.setCameraDesiredPosition
    );
    const setCameraDesiredFov = useTestingNewStore()(
        (state) => state.camera.setCameraDesiredFov
    );
    const setLookAtTargetPosition = useTestingNewStore()(
        (state) => state.lookAtTarget.setLookAtTargetPosition
    );

    const handleCameraDataChange = (data: CameraData) => {
        setCamera({
            fov: data.fov,
            position: data.position,
            aspect: data.aspect,
            far: data.far,
            near: data.near,
            rotation: data.rotation,
            zoom: data.zoom,
        });
    };
    const [selectedAnimationPreset, setSelectedAnimationPreset] =
        useState<AnimationPresetLocalModel | null>(null);

    // const model = useMemo(() => {
    //   const modelData = selectedAnimationPreset?.animationPresetData.modelData;
    //   if (!modelData) return null;
    //   // return modelRepo.getModel(
    //   //   modelData.model.source,
    //   //   modelData.position,
    //   //   modelData.scale,
    //   //   modelData.rotation
    //   // );
    //   return (
    //     <Suspense fallback={<Loader />}>
    //       <ModelGetter modelName={modelData.model.source} />
    //     </Suspense>
    //   );
    // }, [selectedAnimationPreset]);

    const groundModel = useMemo(() => {
        const groundData =
            selectedAnimationPreset?.animationPresetData.groundData;
        if (!groundData) return null;
        return modelRepo.getGroundModel(
            groundData.model,
            groundData.position,
            groundData.scale,
            groundData.rotation
        );
    }, [selectedAnimationPreset]);

    // TODO : duplicate code
    const lookAtTargetModel = useMemo(() => {
        const lookAtTargetData =
            selectedAnimationPreset?.animationPresetData.lookAtTargetData;
        if (!lookAtTargetData) return null;
        return modelRepo.getLookAtTargetModel(
            lookAtTargetData.model,
            lookAtTargetData.position,
            lookAtTargetData.scale,
            lookAtTargetData.rotation
        );
    }, [selectedAnimationPreset]);

    const staticBackgroundModels = useMemo(() => {
        const staticBackgroundData =
            selectedAnimationPreset?.animationPresetData.staticBackground;
        if (!staticBackgroundData) return null;
        const models = staticBackgroundData.models.map((model) =>
            modelRepo.getModel(
                model.model.source,
                model.position,
                model.scale,
                model.rotation
            )
        );
        return <group>{models}</group>;
    }, [selectedAnimationPreset]);

    const lights = useMemo(() => {
        const lightData =
            selectedAnimationPreset?.animationPresetData.lightData;
        if (!lightData) return null;
        return lightData.lights.map((light) =>
            modelRepo.getLightModel(
                light.type,
                light.position,
                light.scale,
                light.rotation,
                light.intensity
            )
        );
    }, [selectedAnimationPreset]);

    return (
        <ContentLibrarySection
            selectedAnimationPreset={selectedAnimationPreset}
            setSelectedAnimationPreset={setSelectedAnimationPreset}
        >
            <div className="absolute bottom-2 left-2 z-50 backdrop-blur-xl border-2 w-[12rem] h-fit p-4">
                <AnimationPreviewer
                    autoPlay={true}
                    duration={3}
                    keyframes={
                        selectedAnimationPreset?.animationPresetData
                            .animationData.keyframes || []
                    }
                    apply={(state) => {
                        setObjectRotation(state.objectRotation);
                        setObjectPosition(state.objectPosition);
                        setCameraDesiredPosition(state.cameraPosition);
                        setCameraDesiredFov(state.cameraFov);
                        setLookAtTargetPosition(state.lookAtTargetPosition);
                    }}
                />
            </div>
            <div className="absolute top-2 right-2 z-50 backdrop-blur-xl border-2">
                <SceneVisualisation
                    lookAtTargetPosition={lookAtTarget.position}
                    cameraPosition={camera.position}
                    cameraRotation={camera.rotation}
                    fov={camera.desiredFov}
                    aspect={camera.aspect}
                    near={camera.near}
                    far={camera.far}
                    objectPosition={object.position}
                    objectRotation={object.rotation}
                    objectScale={object.scale}
                    groundPosition={ground.position}
                    model={
                        <Suspense fallback={<Loader />}>
                            <ModelGetter
                                modelName={
                                    selectedAnimationPreset?.animationPresetData
                                        .modelData.model.source || ""
                                }
                            />
                        </Suspense>
                    }
                    groundModel={groundModel}
                    lookAtTargetModel={lookAtTargetModel}
                    staticBackgroundModels={staticBackgroundModels}
                    showFrustum={true}
                    showGround={true}
                />
            </div>
            <Canvas className={""}>
                <TestingScene
                    objectPosition={object.position}
                    objectScale={object.scale}
                    groundPosition={ground.position}
                    objectRotation={object.rotation}
                    lookAtTarget={lookAtTarget.position}
                    showTarget={
                        lookAtTarget.isEnabled &&
                        lookAtTarget.isShowTargetMarker
                    }
                    model={
                        <Suspense fallback={<Loader />}>
                            <ModelGetter
                                modelName={
                                    selectedAnimationPreset?.animationPresetData
                                        .modelData.model.source || ""
                                }
                            />
                        </Suspense>
                    }
                    groundModel={groundModel}
                    lookAtTargetModel={lookAtTargetModel}
                    staticBackgroundModels={staticBackgroundModels}
                    lights={lights}
                    showGround={true}
                />
                <CameraControlsInScene
                    cameraPosition={camera.desiredPosition}
                    cameraFov={camera.desiredFov}
                    lookAtTarget={lookAtTarget.position}
                    lookAtEnabled={lookAtTarget.isEnabled}
                    isShowGizmos={false}
                />

                <CameraDataCollector
                    onCameraDataChange={handleCameraDataChange}
                />
            </Canvas>
        </ContentLibrarySection>
    );
};
