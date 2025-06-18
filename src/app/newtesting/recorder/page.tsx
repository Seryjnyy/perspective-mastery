"use client";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import { ControlsPanel } from "../app/components/control-panel/control-panel";
import { AnimationKeyframe } from "../features/animation/types/types";
import modelRepo from "../features/animation/model-repo";
import SceneVisualisation from "../features/scene-previewer/scene-visualisation";
import ModelGetter from "../features/scene/components/model-getter";
import { TestingScene } from "../guided/[challenge]/page";
import {
  CameraControlsInScene,
  CameraDataCollector,
  DataDisplayWindow,
  SceneStoreProvider,
  useTestingNewStore,
} from "../page";
import { CameraData } from "../scene-store";

import { Button } from "@/components/ui/button";
import { CONTROL_PANEL_TABS } from "../app/components/control-panel/control-panel-tabs";
import { useLocalAnimationPresetsStore } from "../features/animation-recorder/local-animation-preset-store";
import { AnimationPresetLocalCreation } from "../types2";
import { RecordTab } from "../features/animation-recorder/record-window";

export default function PresetCreatorPage() {
  return (
    <SceneStoreProvider>
      <Page />
    </SceneStoreProvider>
  );
}

const Page = () => {
  const camera = useTestingNewStore()((state) => state.camera.data);
  const setCamera = useTestingNewStore()((state) => state.camera.setCamera);

  const lookAtTarget = useTestingNewStore()((state) => state.lookAtTarget.data);
  const setLookAtTarget = useTestingNewStore()(
    (state) => state.lookAtTarget.setLookAtTarget
  );

  const object = useTestingNewStore()((state) => state.object.data);
  const setObject = useTestingNewStore()((state) => state.object.setObject);

  const ground = useTestingNewStore()((state) => state.ground.data);

  // Sync store data with actual camera data
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

  // Look at object position
  const lookAtObject = () => {
    // setLookAtTarget({
    //   mode: "manual",
    // });
    setLookAtTarget({
      position: {
        x: object.position.x,
        y: object.position.y,
        z: object.position.z,
      },
    });
  };

  const rotateObject = (axis: "x" | "y" | "z", degrees: number) => {
    const radians = (degrees * Math.PI) / 180;
    setObject({
      position: {
        x: object.position.x,
        y: object.position.y,
        z: object.position.z,
      },
    });
    // setObjectRotation({
    //   const newRotation = { ...prevRotation };
    //   newRotation[axis] += radians;
    //   return newRotation;
    // });
  };

  // const model = useMemo(() => {
  //   const modelData = animationPreset.animationPresetData.modelData;
  //   return modelRepo.getModel(
  //     modelData.model.source,
  //     modelData.position,
  //     modelData.scale,
  //     modelData.rotation
  //   );
  // }, [animationPreset]);

  //   const model = useMemo(() => {
  //     return modelRepo.getLocalModel(
  //       object.model.source,
  //       object.position,
  //       object.scale,
  //       object.rotation
  //     );
  //   }, [object.model, object.position, object.scale, object.rotation]);

  // const groundModel = useMemo(() => {
  //   const groundData = animationPreset.animationPresetData.groundData;
  //   return modelRepo.getGroundModel(
  //     groundData.model,
  //     groundData.position,
  //     groundData.scale,
  //     groundData.rotation
  //   );
  // }, [animationPreset]);

  // const lookAtTargetModel = useMemo(() => {
  //   const lookAtTargetData =
  //     animationPreset.animationPresetData.lookAtTargetData;
  //   return modelRepo.getLookAtTargetModel(
  //     lookAtTargetData.model,
  //     lookAtTargetData.position,
  //     lookAtTargetData.scale,
  //     lookAtTargetData.rotation
  //   );
  // }, [animationPreset]);

  // const staticBackgroundModels = useMemo(() => {
  //   const staticBackgroundData =
  //     animationPreset.animationPresetData.staticBackground;
  //   const models = staticBackgroundData.models.map((model) =>
  //     modelRepo.getModel(
  //       model.model.source,
  //       model.position,
  //       model.scale,
  //       model.rotation
  //     )
  //   );
  //   return <group>{models}</group>;
  // }, [animationPreset]);
  const [keyframes, setKeyframes] = useState<AnimationKeyframe[]>([]);
  const lookAtTargetModel = useMemo(() => {
    return modelRepo.getLocalModel("local-look-at-target-sphere");
  }, [lookAtTarget.position]);

  const groundModel = useMemo(() => {
    return modelRepo.getLocalModel("local-grid");
  }, [ground.position]);

  const model = useMemo(() => {
    return <ModelGetter model={object.model} />;
  }, [object.model, object.position, object.scale, object.rotation]);

  const staticBackgroundModels = useMemo(() => {
    return <></>;
  }, []);

  const lights = useMemo(() => {
    return (
      <>
        {/* TODO : This should be loaded in */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={1} />
      </>
    );
  }, []);

  const { setLocalAnimationPreset } = useLocalAnimationPresetsStore();

  const exportPreset = () => {
    console.log("exporting preset");

    const preset: AnimationPresetLocalCreation = {
      animationPresetData: {
        animationData: {
          keyframes: keyframes,
        },
        modelData: {
          modelId: object.model.id,
        },
        groundData: {
          model: undefined,
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
          lights: [],
        },
      },
      metadata: {
        name: "Preset 1",
        desc: "Description 1",
        difficulty: "easy",
        recommendedSteps: 10,
        tags: [],
      },
    };

    const json = JSON.stringify(preset);
    console.log(json);
    MOVE_THIS_FUNCTION_CREATE_PRESET(preset);
    // const blob = new Blob([json], { type: "application/json" });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement("a");
  };

  const MOVE_THIS_FUNCTION_CREATE_PRESET = (
    data: AnimationPresetLocalCreation
  ) => {
    setLocalAnimationPreset({
      ...data,
      id: crypto.randomUUID(),
    });
  };

  return (
    <div className="h-[calc(100vh-36px)] mt-[36px] flex flex-col">
      <div className=" fixed top-0 left-0 px-2 z-50 flex items-center h-[36px]">
        <Button size={"sm"} onClick={exportPreset}>
          Export
        </Button>
      </div>

      {/* Top Row */}
      <div className="flex flex-1 overflow-hidden bg-[#171717]">
        <div className="w-1/4 max-w-[300px] min-w-[150px] overflow-y-auto px-2 pt-2 text-xs">
          <DataDisplayWindow
            camera={camera}
            object={object}
            lookAtTarget={lookAtTarget}
          />
        </div>

        {/* Center Panel */}
        <div className="flex-1 overflow-auto bg-black border-x border-t border-white/70 relative">
          <Canvas>
            <TestingScene
              objectPosition={object.position}
              objectScale={object.scale}
              groundPosition={ground.position}
              objectRotation={object.rotation}
              lookAtTarget={lookAtTarget.position}
              showTarget={lookAtTarget.isShowTargetMarker}
              groundModel={groundModel}
              lookAtTargetModel={lookAtTargetModel}
              staticBackgroundModels={staticBackgroundModels}
              lights={lights}
              showGround={true}
              model={model}
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
          <div className="absolute top-0 left-0 size-[8rem] backdrop-blur-md rounded-br-xl overflow-hidden border-r border-b">
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
              model={model}
              groundModel={groundModel}
              lookAtTargetModel={lookAtTargetModel}
              staticBackgroundModels={staticBackgroundModels}
              showFrustum={true}
              showGround={true}
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-1/4 max-w-[300px] min-w-[150px] overflow-y-auto px-2 pt-2 text-xs">
          <ControlsPanel
            tabs={[
              CONTROL_PANEL_TABS.camera,
              CONTROL_PANEL_TABS.object,
              CONTROL_PANEL_TABS.ground,
            ]}
          />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="h-fit border-t  border-white/70">
        <RecordTab keyframes={keyframes} setKeyframes={setKeyframes} />
      </div>
    </div>
  );
};
