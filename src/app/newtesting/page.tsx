"use client";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  use,
  ReactNode,
  createContext,
  useContext,
} from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  GizmoHelper,
  GizmoViewport,
  Line,
  Edges,
} from "@react-three/drei";
import * as THREE from "three";
import { DataDisplayObject, DataDisplaySection } from "./data-display/base";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  EnterFullScreenIcon,
  ExitFullScreenIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import { ControlsPanel } from "@/app/newtesting/control-panel/control-panel";
import {
  CameraData,
  createSceneStore,
  useGlobalSceneStore,
} from "./useGlobalSceneStore";

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
  const boxRef = useRef<THREE.Mesh>(null);

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
        <mesh
          ref={boxRef}
          rotation={[objectRotation.x, objectRotation.y, objectRotation.z]}
        >
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

// Camera data collector component - inside Canvas
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

  return null; // This component doesn't render anything itself
};

// Camera controls component for the 3D scene - inside Canvas
const CameraControlsInScene = ({
  cameraPosition,
  cameraFov,
  lookAtTarget,
  lookAtEnabled,
  isShowGizmos,
}: {
  cameraPosition: { x: number; y: number; z: number };
  cameraFov: number;
  lookAtTarget: { x: number; y: number; z: number };
  lookAtEnabled: boolean;
  isShowGizmos: boolean;
}) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Update camera when controls change
  useEffect(() => {
    if (cameraRef.current) {
      // Set camera position
      cameraRef.current.position.set(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z
      );

      // Apply look-at if enabled
      if (lookAtEnabled) {
        cameraRef.current.lookAt(
          lookAtTarget.x,
          lookAtTarget.y,
          lookAtTarget.z
        );
      }

      // Update FOV and projection matrix
      cameraRef.current.fov = cameraFov;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [cameraPosition, cameraFov, lookAtTarget, lookAtEnabled]);

  // Disable OrbitControls when look-at is enabled
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = !lookAtEnabled;
    }
  }, [lookAtEnabled, controlsRef.current]);

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
      {/* OrbitControls will be disabled when lookAt is enabled */}
      <OrbitControls ref={controlsRef} />

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

type SceneStoreHook = ReturnType<typeof createSceneStore>;
const SceneStoreContext = createContext<SceneStoreHook | null>(null);

const SceneStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<SceneStoreHook>();
  if (!storeRef.current) {
    storeRef.current = createSceneStore();
  }

  return (
    <SceneStoreContext.Provider value={storeRef.current}>
      {children}
    </SceneStoreContext.Provider>
  );
};

export default function NewTestingPage() {
  return (
    <SceneStoreProvider>
      <CameraControlsScene />
    </SceneStoreProvider>
  );
}

export function useTestingNewStore() {
  const store = useContext(SceneStoreContext);
  if (!store) throw new Error("useMyStore must be used within MyStoreProvider");
  return store;
}

// Main component
function CameraControlsScene() {
  // Camera state
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
    setLookAtTarget({
      position: {
        x: object.position.x,
        y: object.position.y,
        z: object.position.z,
      },
    });
    setLookAtTarget({
      isEnabled: true,
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

  return (
    <div className="w-full h-[90vh] relative">
      {/* Data Info Panel */}
      <div className="absolute top-2 left-2 bg-black/70 text-white p-3 rounded-md font-mono text-xs max-w-[300px] z-10">
        <Tabs defaultValue="camera">
          <TabsList>
            <TabsTrigger value="camera">Camera</TabsTrigger>
            <TabsTrigger value="object">Object</TabsTrigger>
            <TabsTrigger value="look-at-target">Look at target</TabsTrigger>
          </TabsList>
          <TabsContent value="camera">
            <DataDisplaySection title="Camera Data">
              <DataDisplayObject data={camera} />
            </DataDisplaySection>
          </TabsContent>
          <TabsContent value="object">
            <DataDisplaySection title="Object Data">
              <DataDisplayObject data={object} />
            </DataDisplaySection>
          </TabsContent>
          <TabsContent value="look-at-target">
            <DataDisplaySection title="Look At Target Data">
              <DataDisplayObject data={lookAtTarget} />
            </DataDisplaySection>
          </TabsContent>
        </Tabs>
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
      />

      <div className="absolute top-2 right-2 bg-black/70 text-white p-3 rounded-md font-mono z-10 min-w-[250px]">
        <ControlsPanel lookAtObject={lookAtObject} />
      </div>
      <Canvas>
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

interface SceneVisualisationProps {
  // Look At Target
  lookAtTargetPosition: { x: number; y: number; z: number };
  // Camera
  cameraPosition: { x: number; y: number; z: number };
  cameraRotation: { x: number; y: number; z: number };
  fov: number;
  aspect: number;
  near: number;
  far: number;
  // Object
  objectPosition: { x: number; y: number; z: number };
  objectRotation: { x: number; y: number; z: number };
  objectScale: { x: number; y: number; z: number };
  // Ground
  groundPosition: { x: number; y: number; z: number };
}

export const SceneVisualisation = ({
  lookAtTargetPosition,
  cameraPosition,
  cameraRotation,
  fov,
  aspect,
  near,
  far,
  objectPosition,
  objectRotation,
  objectScale,
  groundPosition,
}: SceneVisualisationProps) => {
  return (
    <Canvas camera={{ position: [6, 2, 3], near: 0.1, far: 40000 }}>
      <OrbitControls />
      <ambientLight intensity={1} />
      <directionalLight intensity={0.4} color={0xffffff} position={[2, 2, 2]} />
      <mesh
        position={[
          lookAtTargetPosition.x,
          lookAtTargetPosition.y,
          lookAtTargetPosition.z,
        ]}
      >
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshBasicMaterial color="blue" />
      </mesh>
      <Line
        points={[
          [cameraPosition.x, cameraPosition.y, cameraPosition.z],
          [
            lookAtTargetPosition.x,
            lookAtTargetPosition.y,
            lookAtTargetPosition.z,
          ],
        ]}
        color="yellow"
        lineWidth={2}
      />

      <mesh
        position={[objectPosition.x, objectPosition.y, objectPosition.z]}
        rotation={[objectRotation.x, objectRotation.y, objectRotation.z]}
        scale={[objectScale.x, objectScale.y, objectScale.z]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="orange" />
      </mesh>
      <group
        position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
        rotation={[cameraRotation.x, cameraRotation.y, cameraRotation.z]}
      >
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="red" />
        </mesh>
        <group rotation={[0, 0, 0]}>
          <FrustumVisualizer
            position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
            target={[
              lookAtTargetPosition.x,
              lookAtTargetPosition.y,
              lookAtTargetPosition.z,
            ]}
            fov={fov}
            aspect={aspect}
            near={near}
            far={far}
          />
        </group>
      </group>
      <gridHelper
        args={[10, 10]}
        position={[groundPosition.x, groundPosition.y, groundPosition.z]}
      />
    </Canvas>
  );
};

function FrustumVisualizer({
  position,
  target,
  fov,
  aspect,
  near,
  far,
}: {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  aspect: number;
  near: number;
  far: number;
}) {
  const geometry = useMemo(() => {
    const cam = new THREE.PerspectiveCamera(fov, aspect, near, far);
    cam.position.set(...position);
    cam.lookAt(...target);
    cam.updateMatrixWorld();

    const helper = new THREE.CameraHelper(cam);
    return helper.geometry;
  }, [position, target, fov, aspect, near, far]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="orange" />
    </lineSegments>
  );
}

export {
  Scene,
  CameraDataCollector,
  CameraControlsInScene,
  SceneStoreProvider,
};
