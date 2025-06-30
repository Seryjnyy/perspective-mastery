"use client";
import { ControlsPanel } from "@/app/newtesting/app/components/control-panel/control-panel";
import {
  ObjectDataDisplayObject,
  ObjectDataDisplaySection,
} from "@/app/newtesting/shared/components/object-data-display";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  EnterFullScreenIcon,
  ExitFullScreenIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import {
  Edges,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { StoreApi, useStore } from "zustand";
import { TestingScene } from "./challenges/[challenge]/page";
import SceneVisualisation, {
  SceneVisualisationProps,
} from "./features/scene-previewer/scene-visualisation";
import { CameraData } from "./scene-store/camera-slice";
import { LookAtMode, LookAtTargetData } from "./scene-store/lookat-slice";
import { SceneState } from "./scene-store/shared";
import { createSceneStore } from "./scene-store/scene-store";
import { GroundData, ObjectData } from "./scene-store/object-slice";

// Scene with a controllable object group
const Scene = ({
  objectPosition,
  objectScale,
  objectRotation,
  groundPosition,
  lookAtTarget,
  showTarget,
}: {
  objectPosition: { x: number; y: number; z: number };
  groundPosition: { x: number; y: number; z: number };
  objectScale: { x: number; y: number; z: number };
  objectRotation: { x: number; y: number; z: number };
  lookAtTarget: { x: number; y: number; z: number };
  showTarget?: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Apply position and scale to the group
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(
        objectPosition.x,
        objectPosition.y,
        objectPosition.z
      );
      groupRef.current.scale.set(objectScale.x, objectScale.y, objectScale.z);
    }
  }, [objectPosition, objectScale]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Controllable group that can contain any mesh/models */}
      <group ref={groupRef}>
        <mesh rotation={[objectRotation.x, objectRotation.y, objectRotation.z]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial color={"#33ff20"} opacity={0} transparent />
          <Edges scale={1} threshold={10} color="red" />
        </mesh>
      </group>

      {/* Visual indicator for the look-at target point */}
      {showTarget && (
        <mesh position={[lookAtTarget.x, lookAtTarget.y, lookAtTarget.z]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="red" />
        </mesh>
      )}

      <gridHelper
        args={[10, 10]}
        position={[groundPosition.x, groundPosition.y, groundPosition.z]}
      />
    </>
  );
};

/**
 * Tracks camera data in the scene.
 *
 * @param onCameraDataChange The function to receive the camera data update.
 */
const CameraDataCollector = ({
  onCameraDataChange,
}: {
  onCameraDataChange: (data: CameraData) => void;
}) => {
  const { camera } = useThree();

  useFrame(() => {
    const data: CameraData = {
      position: {
        x: Number(camera.position.x.toFixed(2)),
        y: Number(camera.position.y.toFixed(2)),
        z: Number(camera.position.z.toFixed(2)),
      },
      rotation: {
        x: Number(camera.rotation.x.toFixed(2)),
        y: Number(camera.rotation.y.toFixed(2)),
        z: Number(camera.rotation.z.toFixed(2)),
      },
      fov: Number((camera as THREE.PerspectiveCamera).fov.toFixed(2)),
      near: Number(camera.near.toFixed(2)),
      far: Number(camera.far.toFixed(2)),
      aspect: Number((camera as THREE.PerspectiveCamera).aspect.toFixed(2)),
      zoom: Number(camera.zoom.toFixed(2)),
    };

    onCameraDataChange(data);
  });

  return null;
};

// Component to handle camera updates
//  TODO : idk if this is needed
//   idk if you need to update the camera aspect,  it seems to work the same without it
// function CameraUpdater() {
//     const {camera, gl, size} = useThree(); // Get camera, renderer, and canvas size from R3F state
//
//     useEffect(() => {
//         // This effect runs whenever the 'size' object changes (i.e., canvas resizes)
//         if (camera instanceof THREE.PerspectiveCamera) {
//             camera.aspect = size.width / size.height;
//             camera.updateProjectionMatrix(); // Always call this after changing camera properties
//             console.log("Camera aspect updated", camera.aspect);
//         }
//         // You might also want to update the renderer's size here if it's not handled by Canvas
//         gl.setSize(size.width, size.height);
//         gl.setPixelRatio(window.devicePixelRatio); // Good practice for sharpness
//     }, [camera, gl, size]); // Re-run effect if camera, renderer, or size changes
//
//     return null; // This component doesn't render anything visually
// }

// Camera controls component for the 3D scene - inside Canvas
const CameraControlsInScene = ({
  cameraPosition,
  cameraFov,
  lookAtTarget,
  lookAtMode,
  isShowGizmos,
}: {
  cameraPosition: { x: number; y: number; z: number };
  cameraFov: number;
  lookAtTarget?: { x: number; y: number; z: number };
  lookAtMode: LookAtMode;
  isShowGizmos: boolean;
}) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const setLookAtTargetPosition = useTestingNewStore(
    (state) => state.setLookAtTargetPosition
  );
  const setCameraPosition = useTestingNewStore(
    (state) => state.setCameraDesiredPosition
  );

  // Update camera when controls change
  useEffect(() => {
    if (cameraRef.current) {
      if (lookAtMode === "orbit") return;

      // Set camera position
      cameraRef.current.position.set(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z
      );

      // Apply look-at if enabled
      if (lookAtMode === "manual") {
        console.log("being called", lookAtTarget);
        if (lookAtTarget) {
          cameraRef.current.lookAt(
            lookAtTarget.x,
            lookAtTarget.y,
            lookAtTarget.z
          );
        }
      }

      // Update FOV and projection matrix
      cameraRef.current.fov = cameraFov;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [cameraPosition, cameraFov, lookAtTarget, lookAtMode]);

  useFrame(() => {
    if (controlsRef.current) {
      const target = controlsRef.current.target;
      const position = controlsRef.current.position0;
      // Copy to state or log, etc.
      // console.log("Current target:", target);

      if (lookAtMode === "orbit") {
        if (
          lookAtTarget?.x !== target.x ||
          lookAtTarget?.y !== target.y ||
          lookAtTarget?.z !== target.z
        ) {
          setLookAtTargetPosition({
            x: target.x,
            y: target.y,
            z: target.z,
          });
          setCameraPosition({
            x: position.x,
            y: position.y,
            z: position.z,
          });
        }
      }
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
        fov={cameraFov}
        near={0.1}
        far={1000}
      />
      {/* <CameraUpdater /> */}
      {/* OrbitControls will be disabled when lookAt is enabled */}
      {lookAtMode === "orbit" && (
        <OrbitControls
          ref={controlsRef}
          target={
            lookAtTarget
              ? new THREE.Vector3(
                  lookAtTarget.x,
                  lookAtTarget.y,
                  lookAtTarget.z
                )
              : undefined
          }
        />
      )}

      {isShowGizmos && (
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["red", "green", "blue"]}
            labelColor="white"
          />
        </GizmoHelper>
      )}
    </>
  );
};

// export type SceneStoreHook = ReturnType<typeof createSceneStore>;
// export const SceneStoreContext = createContext<SceneStoreHook | null>(null);

export const StoreContext = createContext<StoreApi<SceneState> | null>(null);

const SceneStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<StoreApi<SceneState>>();
  if (!storeRef.current) {
    storeRef.current = createSceneStore();
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export default function NewTestingPage() {
  return (
    <SceneStoreProvider>
      <CameraControlsScene />
    </SceneStoreProvider>
  );
}

// export const useMyStore = <T,>(selector: (state: MyStore) => T): T => {
//   const store = useContext(StoreContext);
//   if (!store)
//     throw new Error("useMyStore must be used within a MyStoreProvider");
//   return useStore(store, selector);
// };

export function useTestingNewStore<T>(selector: (state: SceneState) => T): T {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Hook must be used within Provider.");
  return useStore(store, selector);
}

// Main component
function CameraControlsScene() {
  // Camera state
  const camera = useTestingNewStore((state) => state.camera.data);
  const setCamera = useTestingNewStore((state) => state.setCamera);
  const setCameraDesiredPosition = useTestingNewStore(
    (state) => state.setCameraDesiredPosition
  );
  const setCameraDesiredFov = useTestingNewStore(
    (state) => state.setCameraDesiredFov
  );

  const lookAtTarget = useTestingNewStore((state) => state.lookAtTarget.data);
  const setLookAtTargetPosition = useTestingNewStore(
    (state) => state.setLookAtTargetPosition
  );

  const object = useTestingNewStore((state) => state.object.data);
  const setObjectPosition = useTestingNewStore(
    (state) => state.setObjectPosition
  );

  const ground = useTestingNewStore((state) => state.ground.data);

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

  return (
    <div className="w-full h-[90vh] relative">
      {/* Data Info Panel */}
      <div className="absolute top-2 left-2 bg-black/70 text-white p-3 rounded-md font-mono text-xs max-w-[300px] z-10">
        <DataDisplayWindow
          camera={camera}
          object={object}
          ground={ground}
          lookAtTarget={lookAtTarget}
        />
      </div>
      <SceneVisualisationPreview
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
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="orange" />
          </mesh>
        }
        groundModel={<gridHelper args={[10, 10]} />}
        lookAtTargetModel={
          <mesh>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshBasicMaterial color="blue" />
          </mesh>
        }
        staticBackgroundModels={<></>}
        showFrustum={true}
        showGround={true}
      />

      <div className="absolute top-2 right-2 bg-black/70 text-white p-3 rounded-md font-mono z-10 min-w-[250px]">
        <ControlsPanel tabs={[]} />
      </div>
      <Canvas>
        <TestingScene
          objectPosition={object.position}
          objectScale={object.scale}
          groundPosition={ground.position}
          objectRotation={object.rotation}
          lookAtTarget={lookAtTarget.position}
          showTarget={lookAtTarget.isShowTargetMarker}
          model={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="orange" />
            </mesh>
          }
          groundModel={<gridHelper args={[10, 10]} />}
          lookAtTargetModel={
            <mesh>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshBasicMaterial color="blue" />
            </mesh>
          }
          staticBackgroundModels={<></>}
          lights={<></>}
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
    </div>
  );
}

export function SceneVisualisationPreview(props: SceneVisualisationProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
    console.log("Fullscreen toggled:", !isFullscreen);
  };

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 border-2 z-20 backdrop-blur-sm",
        isFullscreen ? "w-full h-full" : "w-[200px] h-[200px]"
      )}
    >
      <div className="absolute top-2 left-2 z-50">
        <Button
          onClick={toggleFullscreen}
          className="space-x-4"
          variant={"ghost"}
        >
          {isFullscreen ? (
            <ExitFullScreenIcon />
          ) : (
            <>
              <EnterFullScreenIcon />
              <GearIcon />
            </>
          )}
        </Button>
      </div>
      <SceneVisualisation {...props}></SceneVisualisation>
    </div>
  );
}

export const DataDisplayWindow = ({
  camera,
  object,
  lookAtTarget,
  ground,
}: {
  camera: CameraData;
  object: ObjectData;
  ground: GroundData;
  lookAtTarget: LookAtTargetData;
}) => {
  return (
    <Tabs defaultValue="camera">
      <TabsList>
        <TabsTrigger value="camera">Camera</TabsTrigger>
        <TabsTrigger value="object">Object</TabsTrigger>
        <TabsTrigger value="ground">Ground</TabsTrigger>
        <TabsTrigger value="look-at-target">Look at target</TabsTrigger>
      </TabsList>
      <TabsContent value="camera">
        <ObjectDataDisplaySection title="Camera">
          <ObjectDataDisplayObject data={camera} />
        </ObjectDataDisplaySection>
      </TabsContent>
      <TabsContent value="object">
        <ObjectDataDisplaySection title="Object">
          <ObjectDataDisplayObject data={object} />
        </ObjectDataDisplaySection>
      </TabsContent>
      <TabsContent value="ground">
        <ObjectDataDisplaySection title="Ground">
          <ObjectDataDisplayObject data={ground} />
        </ObjectDataDisplaySection>
      </TabsContent>
      <TabsContent value="look-at-target">
        <ObjectDataDisplaySection title="Look At Target">
          <ObjectDataDisplayObject data={lookAtTarget} />
        </ObjectDataDisplaySection>
      </TabsContent>
    </Tabs>
  );
};

export {
  CameraControlsInScene,
  CameraDataCollector,
  Scene,
  SceneStoreProvider,
};
