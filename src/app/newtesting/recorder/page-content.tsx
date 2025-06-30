"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
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
import { v4 as uuidv4 } from "uuid";
import { ControlsPanel } from "../app/components/control-panel/control-panel";
import { TestingScene } from "../challenges/[challenge]/page";
import SceneVisualisation from "../features/scene-previewer/scene-visualisation";

import {
  createSceneStore,
  deletePersistedSceneStore,
} from "../scene-store/scene-store";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { CONTROL_PANEL_TABS } from "../app/components/control-panel/control-panel-tabs";

import { RecordTab } from "../features/animation-recorder/record-window";

import {
  createRecorderSessionStore,
  RECORDER_SESSION_STORE_NAME,
  RecorderSessionStore,
  RecorderSessionStoreState,
} from "@/app/newtesting/features/animation-recorder/recorder-session-store";
import { getLocalStorageItemsByPrefix } from "@/app/newtesting/features/animation-recorder/utils/utils";
import {
  CameraControlsInScene,
  CameraDataCollector,
  DataDisplayWindow,
  StoreContext,
  useTestingNewStore,
} from "@/app/newtesting/page-content";
import { StoreApi } from "zustand";
import { useStore } from "zustand/index";
import { CreatePresetForm } from "../features/animation-recorder/components/create-preset-form";
import ModelGetterLoader from "../features/scene/components/model-getter-loader";
import { Difficulty } from "../types2";
import { SceneState } from "../scene-store/shared";
import { CameraData } from "../scene-store/camera-slice";
import { TransformControls } from "@react-three/drei";

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
    const sessions =
      getLocalStorageItemsByPrefix<ZustandRecorderSessionStoreState>(
        RECORDER_SESSION_STORE_NAME
      );

    const sorted = Object.entries(sessions).toSorted((a, b) => {
      const aDate = new Date(a[1].state.createdAt);
      const bDate = new Date(b[1].state.createdAt);
      return bDate.getTime() - aDate.getTime(); // Sort by createdAt in descending order
    });

    if (sorted.length > 0) {
      const mostRecentId = sorted[0][0]; // Get the ID of the most recent preset
      setId(mostRecentId);
    } else {
      // If no presets found, set a new ID
      setId(uuidv4());
    }
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
  const recordSessionLastUpdateAt = useRecorderSessionStore(
    (state) => state.lastUpdated
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
    return (
      <ModelGetterLoader
        modelId={lookAtTarget.model.modelId}
        position={lookAtTarget.model.transform?.position}
        rotation={lookAtTarget.model.transform?.rotation}
        scale={lookAtTarget.model.transform?.scale}
      />
    );
  }, [lookAtTarget]);

  const groundModel = useMemo(() => {
    console.log("GROUNDED", ground.model.modelId);
    return (
      <ModelGetterLoader
        modelId={ground.model.modelId}
        position={ground.model.transform?.position}
        rotation={ground.model.transform?.rotation}
        scale={ground.model.transform?.scale}
      />
    );
  }, [ground.model]);

  const model = useMemo(() => {
    return (
      <ModelGetterLoader
        modelId={object.model.modelId}
        position={object.model.transform?.position}
        rotation={object.model.transform?.rotation}
        scale={object.model.transform?.scale}
      />
    );
  }, [object.model]);

  const staticBackgroundModels: any[] = [];

  const lights = useMemo(() => {
    return (
      <>
        {/* TODO : This should be loaded in */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={1} />
      </>
    );
  }, []);

  // const exportPreset = () => {
  //   console.log("exporting preset");

  //   const preset: AnimationPresetLocalCreation = {
  //     animationPresetData: {
  //       animationData: {
  //         keyframes: keyframes,
  //       },
  //       modelData: {
  //         modelId: object.model.modelId,
  //       },
  //       groundData: {
  //         modelId: ground.model.modelId,
  //       },
  //       staticBackground: {
  //         models: [],
  //       },
  //       lookAtTargetData: {
  //         modelId: lookAtTarget.model.modelId,
  //       },
  //       lightData: {
  //         lights: [],
  //       },
  //     },
  //     metadata: {
  //       name: recordSessionMetadata.name,
  //       desc: recordSessionMetadata.desc,
  //       difficulty: recordSessionMetadata.difficulty,
  //       recommendedSteps: recordSessionMetadata.recommendedSteps,
  //       tags: recordSessionMetadata.tags,
  //     },
  //   };

  //   const json = JSON.stringify(preset);
  //   console.log(json);
  //   // MOVE_THIS_FUNCTION_CREATE_PRESET(preset);
  //   // const blob = new Blob([json], { type: "application/json" });
  //   // const url = URL.createObjectURL(blob);
  //   // const a = document.createElement("a");
  // };

  // const MOVE_THIS_FUNCTION_CREATE_PRESET = (
  //   data: AnimationPresetLocalCreation
  // ) => {
  //   setLocalAnimationPreset({
  //     ...data,
  //     id: crypto.randomUUID(),
  //   });
  // };

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
    <div className="h-[calc(100vh-48px)] mt-[48px] flex flex-col">
      <div className=" fixed top-0 left-0 px-2 z-50 flex items-center h-[48px] gap-6">
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
              <DialogTitle>Edit preset</DialogTitle>
              <DialogDescription className="sr-only">
                {/* TODO : desc */}
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
              <div className="w-full flex justify-end">
                <span className="text-xs text-muted-foreground mt-2 flex items-center gap-2 ">
                  <span>last update at:</span>
                  {recordSessionLastUpdateAt &&
                    new Date(recordSessionLastUpdateAt).toLocaleString()}
                </span>
              </div>
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
        <RecorderMenuBar
          onNewPreset={() => setId(uuidv4())}
          onSelectPreset={(id) => setId(id)}
          onDeletePreset={deletePreset}
        />
      </div>

      {/* Top Row */}
      <div className="flex flex-1 overflow-hidden bg-[#171717]">
        <div className="w-1/4 max-w-[300px] min-w-[150px] overflow-y-auto px-2 pt-2 text-xs">
          <DataDisplayWindow
            camera={camera}
            object={object}
            lookAtTarget={lookAtTarget}
            ground={ground}
          />
        </div>

        {/* Center Panel */}
        <div className="flex-1 overflow-auto bg-black border-x border-t border-white/70 relative">
          <Canvas>
            {/* <TransformControls mode="translate">
              <mesh>
                <boxGeometry args={[2, 2, 2]} />
                <meshBasicMaterial color={"#33ff20"} opacity={100} />
              </mesh>
            </TransformControls> */}
            <TestingScene
              objectPosition={object.inScene.position}
              objectScale={object.inScene.scale}
              groundPosition={ground.inScene.position}
              objectRotation={object.inScene.rotation}
              lookAtTarget={lookAtTarget.inScene.position}
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
              lookAtTarget={lookAtTarget.inScene.position}
              lookAtMode={lookAtTarget.mode}
              isShowGizmos={false}
            />
            <CameraDataCollector onCameraDataChange={handleCameraDataChange} />
          </Canvas>
          <div className="absolute top-0 left-0 size-[8rem] backdrop-blur-md rounded-br-xl overflow-hidden border-r border-b">
            <SceneVisualisation
              lookAtTargetPosition={
                lookAtTarget.inScene.position || { x: 0, y: 0, z: 0 }
              }
              cameraPosition={camera.position}
              cameraRotation={camera.rotation}
              fov={camera.desiredFov}
              aspect={camera.aspect}
              near={camera.near}
              far={camera.far}
              objectPosition={object.inScene.position || { x: 0, y: 0, z: 0 }}
              objectRotation={object.inScene.rotation || { x: 0, y: 0, z: 0 }}
              objectScale={object.inScene.scale || { x: 1, y: 1, z: 1 }}
              groundPosition={ground.inScene.position || { x: 0, y: 0, z: 0 }}
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
        <MenubarTrigger className="outline-none">File</MenubarTrigger>
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

export type ZustandRecorderSessionStoreState = {
  state: RecorderSessionStoreState;
  version: number;
};

export type ZustandSceneStoreState = {
  state: SceneState;
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
