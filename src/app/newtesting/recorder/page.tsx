"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Canvas } from "@react-three/fiber";
import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ControlsPanel } from "../app/components/control-panel/control-panel";
import { TestingScene } from "../challenges/[challenge]/page";
import localPrimitiveModelsRepo from "../features/animation/model-repo";
import SceneVisualisation from "../features/scene-previewer/scene-visualisation";
import ModelLoader from "../features/scene/components/model-loader";
import {
  CameraControlsInScene,
  CameraDataCollector,
  DataDisplayWindow,
  SceneStoreProvider,
  StoreContext,
  useTestingNewStore,
} from "../page";
import {
  CameraData,
  createPersistedSceneStore,
  createSceneStore,
  SceneState,
} from "../scene-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { CONTROL_PANEL_TABS } from "../app/components/control-panel/control-panel-tabs";
import { useLocalAnimationPresetsStore } from "../features/animation-recorder/local-animation-preset-store";
import { RecordTab } from "../features/animation-recorder/record-window";
import { useRecorderSessionStore } from "../features/animation-recorder/recorder-session-store";
import { globalRecorderSceneStore } from "../features/animation-recorder/use-recorder-scene-store";
import { useModelsData } from "../features/scene/models/use-models";
import { StoreApi } from "zustand";
import { AnimationKeyframe } from "../features/animation/types/types";
import { AnimationPresetLocalCreation } from "../types2";
import ModelGetterLoader from "../features/scene/components/model-getter-loader";

export default function PresetCreatorPage() {
  return (
    <TestingSceneStoreProvider>
      <Page />
    </TestingSceneStoreProvider>
  );
}

const TestingSceneStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<StoreApi<SceneState>>();
  if (!storeRef.current) {
    storeRef.current = createSceneStore(true);
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

const Page = () => {
  const camera = useTestingNewStore((state) => state.camera.data);
  const setCamera = useTestingNewStore((state) => state.setCamera);

  const lookAtTarget = useTestingNewStore((state) => state.lookAtTarget.data);
  const setLookAtTarget = useTestingNewStore((state) => state.setLookAtTarget);
  const object = useTestingNewStore((state) => state.object.data);
  const setObjectModel = useTestingNewStore((state) => state.setObjectModel);
  const setObjectPosition = useTestingNewStore(
    (state) => state.setObjectPosition
  );
  const staticBackground = useTestingNewStore(
    (state) => state.staticBackground
  );
  const ground = useTestingNewStore((state) => state.ground.data);

  // const {
  //   currentPreset,
  //   clearCurrentPreset,
  //   setName,
  //   setDescription,
  //   setModelId,
  // } = useRecorderSessionStore();

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

  // const rotateObject = (axis: "x" | "y" | "z", degrees: number) => {
  //   const radians = (degrees * Math.PI) / 180;
  //   setObjectPosition({
  //     x: object.position.x,
  //     y: object.position.y,
  //     z: object.position.z,
  //   });
  //   // setObjectRotation({
  //   //   const newRotation = { ...prevRotation };
  //   //   newRotation[axis] += radians;
  //   //   return newRotation;
  //   // });
  // };

  const lookAtTargetModel = useMemo(() => {
    return localPrimitiveModelsRepo.getLocalModel(
      "local-look-at-target-sphere"
    );
  }, [lookAtTarget.position]);

  const groundModel = useMemo(() => {
    return localPrimitiveModelsRepo.getLocalModel("local-grid");
  }, [ground.model.position]);

  const model = useMemo(() => {
    return <ModelGetterLoader modelId={object.model.modelId} />;
  }, [object.model.modelId, object.position, object.scale, object.rotation]);

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
  const { getModelData } = useModelsData();

  // useEffect(() => {
  //   const loadModel = async () => {
  //     const model = await getModelData(
  //       currentPreset.animationPresetData.modelData.modelId
  //     );
  //     if (model) {
  //       setObjectModel(model);
  //     }
  //   };
  //   loadModel();
  // }, [currentPreset.animationPresetData]);

  // persist seperately
  // keyframes
  const exportPreset = () => {
    console.log("exporting preset");

    const preset: AnimationPresetLocalCreation = {
      animationPresetData: {
        animationData: {
          keyframes: keyframes,
        },
        modelData: {
          modelId: object.model.modelId,
        },
        groundData: {
          modelId: ground.model.modelId,
        },
        staticBackground: {
          models: [],
        },
        lookAtTargetData: {
          model: {
            modelId: lookAtTarget.model.modelId,
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
    // MOVE_THIS_FUNCTION_CREATE_PRESET(preset);
    // const blob = new Blob([json], { type: "application/json" });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement("a");
  };

  // const MOVE_THIS_FUNCTION_CREATE_PRESET = (
  //   data: AnimationPresetLocalCreation
  // ) => {
  //   setLocalAnimationPreset({
  //     ...data,
  //     id: crypto.randomUUID(),
  //   });
  // };

  const [keyframes, setKeyframes] = useState<AnimationKeyframe[]>([]);

  return (
    <div className="h-[calc(100vh-36px)] mt-[36px] flex flex-col">
      <div className=" fixed top-0 left-0 px-2 z-50 flex items-center h-[36px] gap-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <Pencil />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Preset</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>

            {/* <div>
              <Input
                placeholder="Preset Name"
                value={currentPreset.metadata.name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Preset Description"
                value={currentPreset.metadata.desc}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div> */}
            <div className="flex gap-2">
              <Button>Cancel</Button>
              <Button>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
        <div>
          {/* {currentPreset.metadata.name == ""
            ? "Untitled"
            : currentPreset.metadata.name} */}
        </div>
        <div>{/* <Button onClick={clearCurrentPreset}>Clear</Button> */}</div>
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
              groundPosition={ground.model.position ?? { x: 0, y: 0, z: 0 }}
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
              lookAtTarget={{ x: 0, y: 0, z: 0 }}
              lookAtMode={"orbit"}
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
