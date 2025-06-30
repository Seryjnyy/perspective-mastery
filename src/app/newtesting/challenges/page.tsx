"use client";
import ContentLibrarySection from "@/app/newtesting/content-library-section";

import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import { AnimationPreviewer } from "../features/animation/components/animation-previewer";
import localPrimitiveModelsRepo from "../features/animation/model-repo";
import SceneVisualisation from "../features/scene-previewer/scene-visualisation";
import ModelLoader from "../features/scene/components/model-loader";
import { AnimationPresetLocalModel } from "../types2";
import { TestingScene } from "./[challenge]/page";

import { useModelsData } from "../features/scene/models/use-models";
import {
  CameraControlsInScene,
  CameraDataCollector,
  SceneStoreProvider,
  useTestingNewStore,
} from "../page-content";
import ModelGetterLoader from "../features/scene/components/model-getter-loader";
import { CameraData } from "../scene-store/camera-slice";

export default function Guided() {
  return (
    <SceneStoreProvider>
      <Page />
    </SceneStoreProvider>
  );
}

const Page = () => {
  const camera = useTestingNewStore((state) => state.camera.data);
  const setCamera = useTestingNewStore((state) => state.setCamera);
  const object = useTestingNewStore((state) => state.object);
  const ground = useTestingNewStore((state) => state.ground);
  const lookAtTarget = useTestingNewStore((state) => state.lookAtTarget);
  const setObjectRotation = useTestingNewStore(
    (state) => state.setObjectRotation
  );
  const setObjectPosition = useTestingNewStore(
    (state) => state.setObjectPosition
  );
  const setCameraDesiredPosition = useTestingNewStore(
    (state) => state.setCameraDesiredPosition
  );
  const setCameraDesiredFov = useTestingNewStore(
    (state) => state.setCameraDesiredFov
  );
  const setLookAtTargetPosition = useTestingNewStore(
    (state) => state.setLookAtTargetPosition
  );

  const models = useModelsData();

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

  // TODO : wth is this, need uniformity
  const model = useMemo(() => {
    const modelData = selectedAnimationPreset?.animationPresetData.modelData;
    if (modelData == null) return;

    return (
      <ModelGetterLoader
        modelId={modelData.model.modelId}
        position={modelData.inScene.position}
        rotation={modelData.inScene.rotation}
        scale={modelData.inScene.scale}
      />
    );
  }, [selectedAnimationPreset]);

  const groundModel = useMemo(() => {
    const groundData = selectedAnimationPreset?.animationPresetData.groundData;
    if (!groundData) return null;
    return (
      <ModelGetterLoader
        modelId={groundData.model.modelId}
        position={groundData.inScene.position}
        rotation={groundData.inScene.rotation}
        scale={groundData.inScene.scale}
      />
    );
  }, [selectedAnimationPreset]);

  // TODO : duplicate code
  const lookAtTargetModel = useMemo(() => {
    const lookAtTargetData =
      selectedAnimationPreset?.animationPresetData.lookAtTargetData;
    if (!lookAtTargetData) return null;
    return localPrimitiveModelsRepo.getLocalModel(
      lookAtTargetData.model.modelId,
      lookAtTargetData.inScene.position,
      lookAtTargetData.inScene.scale,
      lookAtTargetData.inScene.rotation
    );
  }, [selectedAnimationPreset]);

  const staticBackgroundModels = useMemo(() => {
    const staticBackgroundData =
      selectedAnimationPreset?.animationPresetData.staticBackground;
    if (!staticBackgroundData) return null;
    const models = staticBackgroundData.models.map((model) =>
      localPrimitiveModelsRepo.getLocalModel(
        model.model.modelId,
        model.inScene.position,
        model.inScene.scale,
        model.inScene.rotation
      )
    );
    return <group>{models}</group>;
  }, [selectedAnimationPreset]);

  const lights = useMemo(() => {
    const lightData = selectedAnimationPreset?.animationPresetData.lightData;
    if (!lightData) return null;
    return lightData.lights.map((light) =>
      localPrimitiveModelsRepo.getLightModel(
        light.type,
        light.position,
        light.scale,
        light.rotation,
        light.intensity
      )
    );
  }, [selectedAnimationPreset]);

  const objectPosition =
    object.data.inScene.position || object.defaultsInScene.position;
  const objectScale = object.data.inScene.scale || object.defaultsInScene.scale;
  const groundPosition =
    ground.data.inScene.position || object.defaultsInScene.scale;
  const objectRotation =
    object.data.inScene.rotation || object.defaultsInScene.rotation;
  const lookAtTargetPosition =
    lookAtTarget.data.inScene.position || lookAtTarget.defaultsInScene.position;

  return (
    <div className="h-[calc(100vh-48px)] mt-[48px] ">
      <ContentLibrarySection
        selectedAnimationPreset={selectedAnimationPreset}
        setSelectedAnimationPreset={setSelectedAnimationPreset}
      >
        <div className="absolute bottom-2 left-2 z-50 backdrop-blur-xl border-2 w-[12rem] h-fit p-4">
          <AnimationPreviewer
            autoPlay={true}
            duration={3}
            keyframes={
              selectedAnimationPreset?.animationPresetData.animationData
                .keyframes || []
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
            lookAtTargetPosition={lookAtTargetPosition}
            cameraPosition={camera.position}
            cameraRotation={camera.rotation}
            fov={camera.desiredFov}
            aspect={camera.aspect}
            near={camera.near}
            far={camera.far}
            objectPosition={objectPosition}
            objectRotation={objectRotation}
            objectScale={objectScale}
            groundPosition={groundPosition}
            model={model}
            groundModel={groundModel}
            lookAtTargetModel={lookAtTargetModel}
            staticBackgroundModels={staticBackgroundModels}
            showFrustum={true}
            showGround={true}
          />
        </div>
        <Canvas>
          <TestingScene
            objectPosition={objectPosition}
            objectScale={objectScale}
            groundPosition={groundPosition}
            objectRotation={objectRotation}
            lookAtTarget={lookAtTargetPosition}
            showTarget={lookAtTarget.data.isShowTargetMarker}
            model={model}
            groundModel={groundModel}
            lookAtTargetModel={lookAtTargetModel}
            staticBackgroundModels={staticBackgroundModels}
            lights={lights}
            showGround={true}
          />
          <CameraControlsInScene
            cameraPosition={camera.desiredPosition}
            cameraFov={camera.desiredFov}
            lookAtTarget={lookAtTarget.data.inScene.position}
            lookAtMode={lookAtTarget.data.mode}
            isShowGizmos={false}
          />
          <CameraDataCollector onCameraDataChange={handleCameraDataChange} />
        </Canvas>
      </ContentLibrarySection>
    </div>
  );
};
