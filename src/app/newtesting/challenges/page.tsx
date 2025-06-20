"use client";
import ContentLibrarySection from "@/app/newtesting/content-library-section";
import {
  CameraControlsInScene,
  CameraDataCollector,
  SceneStoreProvider,
  useTestingNewStore,
} from "@/app/newtesting/page";
import { CameraData } from "@/app/newtesting/scene-store";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import { AnimationPreviewer } from "../features/animation/components/animation-previewer";
import localPrimitiveModelsRepo from "../features/animation/model-repo";
import SceneVisualisation from "../features/scene-previewer/scene-visualisation";
import ModelLoader from "../features/scene/components/model-loader";
import { AnimationPresetLocalModel } from "../types2";
import { TestingScene } from "./[challenge]/page";

import { useModelsData } from "../features/scene/models/use-models";

export default function Guided() {
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
  const lookAtTarget = useTestingNewStore()((state) => state.lookAtTarget.data);
  const setObjectRotation = useTestingNewStore()(
    (state) => state.object.setRotation
  );
  const setObjectPosition = useTestingNewStore()(
    (state) => state.object.setPosition
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

    return models.getModel(modelData.modelId);
  }, [selectedAnimationPreset]);

  const groundModel = useMemo(() => {
    const groundData = selectedAnimationPreset?.animationPresetData.groundData;
    if (!groundData) return null;
    return localPrimitiveModelsRepo.getLocalModel(
      groundData.model?.modelId || "",
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
    return localPrimitiveModelsRepo.getLocalModel(
      lookAtTargetData.model.modelId,
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
      localPrimitiveModelsRepo.getLocalModel(
        model.modelId,
        model.position,
        model.scale,
        model.rotation
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
            <ModelLoader
              model={model}
              position={
                selectedAnimationPreset?.animationPresetData.modelData.position
              }
              rotation={
                selectedAnimationPreset?.animationPresetData.modelData.rotation
              }
              scale={
                selectedAnimationPreset?.animationPresetData.modelData.scale
              }
            />
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
          showTarget={lookAtTarget.isShowTargetMarker}
          model={
            <ModelLoader
              model={model}
              position={
                selectedAnimationPreset?.animationPresetData.modelData.position
              }
              rotation={
                selectedAnimationPreset?.animationPresetData.modelData.rotation
              }
              scale={
                selectedAnimationPreset?.animationPresetData.modelData.scale
              }
            />
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
          lookAtMode={lookAtTarget.mode}
          isShowGizmos={false}
        />
        <CameraDataCollector onCameraDataChange={handleCameraDataChange} />
      </Canvas>
    </ContentLibrarySection>
  );
};
