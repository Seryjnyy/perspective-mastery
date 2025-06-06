"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";
import CameraControlsScene, {
  CameraControlsInScene,
  CameraDataCollector,
  Scene,
  SceneStoreProvider,
  SceneVisualisation,
  SceneVisualisationPreview,
  useTestingNewStore,
} from "@/app/newtesting/page";
import {
  CameraData,
  useGlobalSceneStore,
} from "@/app/newtesting/useGlobalSceneStore";
import ContentLibrarySection from "@/app/newtesting/content-library-section";
import { AnimationPreviewer, AnimationStepper } from "../control-panel/tabs";

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

  return (
    <ContentLibrarySection>
      <div className="absolute bottom-2 left-2 z-50 backdrop-blur-xl border-2 w-[12rem] h-fit p-4">
        <AnimationPreviewer
          duration={3}
          keyframes={[]}
          apply={(state) => {
            // setObjectRotation(state.objectRotation);
            // setObjectPosition(state.objectPosition);
            // setCameraPosition(state.cameraPosition);
            // setCameraFov(state.cameraFov);
            // setLookAtTargetPosition(state.lookAtTargetPosition);
          }}
        />
      </div>
      <div className="absolute bottom-2 right-2 z-50 backdrop-blur-xl border-2">
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
        />
      </div>
      <Canvas className={""}>
        <Scene
          objectPosition={object.position}
          objectScale={object.scale}
          groundPosition={ground.position}
          objectRotation={object.rotation}
          lookAtTarget={lookAtTarget.position}
          showTarget={lookAtTarget.isEnabled && lookAtTarget.isShowTargetMarker}
        />
        <CameraControlsInScene
          cameraPosition={camera.desiredPosition}
          cameraFov={camera.desiredFov}
          lookAtTarget={lookAtTarget.position}
          lookAtEnabled={lookAtTarget.isEnabled}
          isShowGizmos={false}
        />

        <CameraDataCollector onCameraDataChange={handleCameraDataChange} />
      </Canvas>
    </ContentLibrarySection>
  );
};
