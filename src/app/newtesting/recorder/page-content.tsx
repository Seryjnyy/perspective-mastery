"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { v4 as uuidv4 } from "uuid";
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
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ControlsPanel } from "../app/components/control-panel/control-panel";
import { TestingScene } from "../challenges/[challenge]/page";
import localPrimitiveModelsRepo from "../features/animation/model-repo";
import SceneVisualisation from "../features/scene-previewer/scene-visualisation";

import {
  CameraData,
  createSceneStore,
  deletePersistedSceneStore,
  SCENE_STORE_NAME,
  SceneState,
} from "../scene-store";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { CONTROL_PANEL_TABS } from "../app/components/control-panel/control-panel-tabs";
import { useLocalAnimationPresetsStore } from "../features/animation-recorder/local-animation-preset-store";
import { RecordTab } from "../features/animation-recorder/record-window";

import { useModelsData } from "../features/scene/models/use-models";
import { StoreApi } from "zustand";
import { AnimationKeyframe } from "../features/animation/types/types";
import { AnimationPresetLocalCreation, Difficulty } from "../types2";
import ModelGetterLoader from "../features/scene/components/model-getter-loader";
import { getLocalStorageItemsByPrefix } from "@/app/newtesting/features/animation-recorder/utils/utils";
import {
  createRecorderSessionStore,
  RECORDER_SESSION_STORE_NAME,
  RecorderSessionStore,
  RecorderSessionStoreState,
} from "@/app/newtesting/features/animation-recorder/recorder-session-store";
import { useStore } from "zustand/index";
import {
  CameraControlsInScene,
  CameraDataCollector,
  DataDisplayWindow,
  StoreContext,
  useTestingNewStore,
} from "@/app/newtesting/page-content";
import { Input } from "@/components/ui/input";
import { CreatePresetForm } from "../features/animation-recorder/components/create-preset-form";

type PresetCreatorState = {
  id: string;
  recordSessionStore: StoreApi<RecorderSessionStore>;
  setId: (id: string) => void;
};

const PresetCreatorStoreContext = createContext<PresetCreatorState | null>(
  null
);

const PresetCreatorStoreProvider = ({
  children,
  id,
  setId,
}: {
  children: ReactNode;
  id: string;
  setId: (id: string) => void;
}) => {
  const createStore = (storeId: string) => {
    const temp = createRecorderSessionStore(storeId);
    temp.getState().forcePersist();
    return temp;
  };

  const storeRef = useRef<StoreApi<RecorderSessionStore> | null>(null);
  const currentIdRef = useRef<string | null>(null);

  // Only create new store if ID changes
  if (currentIdRef.current !== id) {
    storeRef.current = createStore(id);
    currentIdRef.current = id;
  }

  // Optional: Cleanup on unmount
  useEffect(() => {
    return () => {
      // Cleanup logic if needed
      storeRef.current = null;
    };
  }, []);

  if (!storeRef.current) {
    // TODO : This seems to be happening a lot, return instead of throwing an error
    // throw new Error("Store not initialized");
    return null;
  }

  return (
    <PresetCreatorStoreContext.Provider
      value={{
        recordSessionStore: storeRef.current!,
        id: id,
        setId: setId,
      }}
    >
      {children}
    </PresetCreatorStoreContext.Provider>
  );
};

export default function PresetCreatorPage() {
  // get id from url
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    setId("cb10c821-0409-4455-bba3-414f52fa3075");
  }, []);

  if (id == null) return;

  return (
    <PresetCreatorStoreProvider id={id} setId={setId}>
      <TestingSceneStoreProvider id={id}>
        <Page />
      </TestingSceneStoreProvider>
    </PresetCreatorStoreProvider>
  );
}

function usePresetCreatorSession() {
  const ctx = useContext(PresetCreatorStoreContext);
  if (!ctx) throw new Error("Hook must be used within Provider.");
  return ctx;
}

const TestingSceneStoreProvider = ({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) => {
  const createStore = (storeId: string) => {
    const temp = createSceneStore(true, storeId);
    temp.getState().forcePersist();
    return temp;
  };

  const storeRef = useRef<StoreApi<SceneState> | null>(null);
  const currentIdRef = useRef<string | null>(null);

  // Only create new store if ID changes
  if (currentIdRef.current !== id) {
    storeRef.current = createStore(id);
    currentIdRef.current = id;
  }

  // Optional: Cleanup on unmount
  useEffect(() => {
    return () => {
      // Cleanup logic if needed
      storeRef.current = null;
    };
  }, []);

  if (!storeRef.current) {
    throw new Error("Store not initialized");
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

function useRecorderSessionStore<T>(
  selector: (state: RecorderSessionStore) => T
): T {
  const s = usePresetCreatorSession().recordSessionStore;
  if (!s) {
    throw new Error("Recorder Session Store is not available");
  }
  return useStore(s, selector);
}

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
  const { id, setId } = usePresetCreatorSession();
  const recordSessionMetadata = useRecorderSessionStore(
    (state) => state.metadata
  );
  const keyframes = useRecorderSessionStore((state) => state.keyframes);
  const setKeyframes = useRecorderSessionStore((state) => state.setKeyframes);
  const setSessionName = useRecorderSessionStore((state) => state.setName);
  const setSessionDesc = useRecorderSessionStore((state) => state.setDesc);
  const setSessionDifficulty = useRecorderSessionStore(
    (state) => state.setDifficulty
  );
  const setSessionRecommendedSteps = useRecorderSessionStore(
    (state) => state.setRecommendedSteps
  );
  const setSessionTags = useRecorderSessionStore((state) => state.setTags);

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

  const deletePreset = () => {
    // move to other existing preset or to new preset
    // delete local storage items

    // Need to first move from the current stores to delete them, there might be issues if we delete the store while it's being used
    setId(uuidv4());
    deletePersistedSceneStore(id);
    // toast message
  };

  // Look at object position
  // const lookAtObject = () => {
  //     // setLookAtTarget({
  //     //   mode: "manual",
  //     // });
  //     setLookAtTarget({
  //         position: {
  //             x: object.position.x,
  //             y: object.position.y,
  //             z: object.position.z,
  //         },
  //     });
  // };

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
    console.log("wtf ", object);
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
        name: recordSessionMetadata.name,
        desc: recordSessionMetadata.desc,
        difficulty: recordSessionMetadata.difficulty,
        recommendedSteps: recordSessionMetadata.recommendedSteps,
        tags: recordSessionMetadata.tags,
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

  // useEffect(() => {
  //   // Slight hack to make sure the store gets persisted in local storage, if i doesn't then it won't show up in the recent presets list

  //   if (recordSessionMetadata.name == "Untitled") {
  //     setSessionName("Preset " + id.slice(0, 5));
  //   }
  // }, [recordSessionMetadata.name, id]);

  // const [keyframes, setKeyframes] = useState<AnimationKeyframe[]>([]);

  const [isEditMetadataDialogOpen, setIsEditMetadataDialogOpen] =
    useState(false);
  return (
    <div className="h-[calc(100vh-36px)] mt-[36px] flex flex-col">
      <div className=" fixed top-0 left-0 px-2 z-50 flex items-center h-[36px] gap-6">
        <Dialog
          open={isEditMetadataDialogOpen}
          onOpenChange={setIsEditMetadataDialogOpen}
        >
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

            <div>
              <CreatePresetForm
                defaultValues={{
                  name: recordSessionMetadata.name,
                  desc: recordSessionMetadata.desc,
                  difficulty: recordSessionMetadata.difficulty,
                  tags: recordSessionMetadata.tags,
                  recommendedSteps: recordSessionMetadata.recommendedSteps,
                }}
                onSubmit={(data) => {
                  setSessionName(data.name);
                  if (data.desc) {
                    setSessionDesc(data.desc);
                  }
                  // TODO : If wrong difficulty passed in this might break idk
                  setSessionDifficulty(data.difficulty as Difficulty);
                  setSessionRecommendedSteps(data.recommendedSteps);
                  setSessionTags(data.tags);

                  setIsEditMetadataDialogOpen(false);
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
        <div className="text-xs flex flex-col">
          {/* {currentPreset.metadata.name == ""
            ? "Untitled"
            : currentPreset.metadata.name} */}
          <span>{recordSessionMetadata.name}</span>
          <span className="text-muted-foreground">{id}</span>
        </div>

        <div>
          <Button onClick={() => setId(uuidv4())}>New</Button>
        </div>
        <RecorderMenuBar
          onNewPreset={() => setId(uuidv4())}
          onSelectPreset={(id) => setId(id)}
          onDeletePreset={deletePreset}
        />
        <Button onClick={exportPreset}>Export</Button>
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

const RecorderMenuBar = ({
  onNewPreset,
  onSelectPreset,
  onDeletePreset,
}: {
  onNewPreset: () => void;
  onDeletePreset: () => void;
  onSelectPreset: (id: string) => void;
}) => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={onNewPreset}>New</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Recent</MenubarSubTrigger>
            <MenubarSubContent>
              <RecentPresetList onSelectRecentPreset={onSelectPreset} />
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem onClick={onDeletePreset}>Delete</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

type ZustandRecorderSessionStoreState = {
  state: RecorderSessionStoreState;
  version: number;
};

const RecentPresetList = ({
  onSelectRecentPreset,
}: {
  onSelectRecentPreset: (id: string) => void;
}) => {
  const [scenes, setScenes] = useState<
    Record<string, ZustandRecorderSessionStoreState>
  >({});

  useEffect(() => {
    const items =
      getLocalStorageItemsByPrefix<ZustandRecorderSessionStoreState>(
        RECORDER_SESSION_STORE_NAME
      );
    setScenes(items);
  }, []);

  return (
    <>
      {Object.entries(scenes).map((entry) => {
        const key = entry[0];
        const value = entry[1];
        return (
          <MenubarItem key={key} onClick={() => onSelectRecentPreset(key)}>
            <div>
              <span className="font-semibold">{value.state.metadata.name}</span>
              <div className="text-xs text-muted-foreground">{key}</div>
            </div>
          </MenubarItem>
        );
      })}
    </>
  );
};
