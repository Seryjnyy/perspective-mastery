"use client";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  GizmoHelper,
  GizmoViewport,
  Line,
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

// Scene with a controllable object group
const Scene = ({
  objectPosition,
  objectScale,
  objectRotation,
  lookAtTarget,
  showTarget,
}: {
  objectPosition: { x: number; y: number; z: number };
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
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </group>

      {/* Visual indicator for the look-at target point */}
      {showTarget && (
        <mesh position={[lookAtTarget.x, lookAtTarget.y, lookAtTarget.z]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="red" />
        </mesh>
      )}

      <gridHelper args={[10, 10]} />
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
}: {
  cameraPosition: { x: number; y: number; z: number };
  cameraFov: number;
  lookAtTarget: { x: number; y: number; z: number };
  lookAtEnabled: boolean;
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

      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["red", "green", "blue"]}
          labelColor="white"
        />
      </GizmoHelper>
    </>
  );
};

type CameraData = {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  fov: number;
  near: number;
  far: number;
  aspect: number;
  zoom: number;
};

const defaultCameraData: CameraData = {
  position: { x: 3, y: 3, z: 5 },
  rotation: { x: 0, y: 0, z: 0 },
  fov: 50,
  near: 0.1,
  far: 1000,
  aspect: 1,
  zoom: 1,
};

type ObjectData = {
  position: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
};

const defaultObjectData: ObjectData = {
  position: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
  rotation: { x: 0, y: 0, z: 0 },
};

// Main component
const CameraControlsScene = () => {
  // Camera state
  const [cameraPosition, setCameraPosition] = useState(
    defaultCameraData.position
  );
  const [cameraFov, setCameraFov] = useState(defaultCameraData.fov);
  const [cameraData, setCameraData] = useState<CameraData>(defaultCameraData);

  // Look-at target state
  const [lookAtTarget, setLookAtTarget] = useState({ x: 0, y: 0, z: 0 });
  const [lookAtEnabled, setLookAtEnabled] = useState(true);
  const [showLookAtTarget, setShowLookAtTarget] = useState(true);

  // Object state
  const [objectPosition, setObjectPosition] = useState(
    defaultObjectData.position
  );
  const [objectScale, setObjectScale] = useState(defaultObjectData.scale);
  const [objectRotation, setObjectRotation] = useState(
    defaultObjectData.rotation
  );

  const handleCameraDataChange = (data: CameraData) => {
    setCameraData(data);
  };

  // Reset object to default
  const resetObject = () => {
    setObjectPosition({ x: 0, y: 0, z: 0 });
    setObjectScale({ x: 1, y: 1, z: 1 });
    setObjectRotation({ x: 0, y: 0, z: 0 });
  };

  // Reset camera to default
  const resetCamera = () => {
    setCameraPosition({ x: 3, y: 3, z: 5 });
    setCameraFov(50);
  };

  // Reset look-at target to default
  const resetLookAt = () => {
    setLookAtTarget({ x: 0, y: 0, z: 0 });
  };

  // Look at object position
  const lookAtObject = () => {
    setLookAtTarget({
      x: objectPosition.x,
      y: objectPosition.y,
      z: objectPosition.z,
    });
    setLookAtEnabled(true);
  };

  const rotateObject = (axis: "x" | "y" | "z", degrees: number) => {
    const radians = (degrees * Math.PI) / 180;
    setObjectRotation((prevRotation) => {
      const newRotation = { ...prevRotation };
      newRotation[axis] += radians;
      return newRotation;
    });
  };

  return (
    <div className="w-full h-[90vh] relative">
      {/* Camera Data Info Panel */}
      <div className="absolute top-2 left-2 bg-black/70 text-white p-3 rounded-md font-mono text-xs max-w-[300px] z-10">
        <Tabs defaultValue="camera">
          <TabsList>
            <TabsTrigger value="camera">Camera</TabsTrigger>
            <TabsTrigger value="object">Object</TabsTrigger>
            <TabsTrigger value="look-at-target">Look at target</TabsTrigger>
          </TabsList>
          <TabsContent value="camera">
            <DataDisplaySection title="Camera Data">
              <DataDisplayObject data={cameraData} />
            </DataDisplaySection>
          </TabsContent>
          <TabsContent value="object">
            <DataDisplaySection title="Object Data">
              <DataDisplayObject
                data={{
                  position: objectPosition,
                  scale: objectScale,
                  rotation: objectRotation,
                }}
              />
            </DataDisplaySection>
          </TabsContent>
          <TabsContent value="look-at-target">
            <DataDisplaySection title="Look At Target Data">
              <DataDisplayObject
                data={{
                  position: lookAtTarget,
                  enabled: lookAtEnabled,
                  showTarget: showLookAtTarget,
                }}
              />
            </DataDisplaySection>
          </TabsContent>
        </Tabs>
      </div>
      <SceneVisualisationPreview
        lookAtTargetPosition={lookAtTarget}
        cameraPosition={cameraPosition}
        cameraRotation={cameraData.rotation}
        fov={cameraFov}
        aspect={cameraData.aspect}
        near={cameraData.near}
        far={cameraData.far}
        objectPosition={objectPosition}
        objectRotation={objectRotation}
        objectScale={objectScale}
      />

      <div className="absolute top-2 right-2 bg-black/70 text-white p-3 rounded-md font-mono z-10 min-w-[250px]">
        {/* Tabs */}
        <ControlsPanel
          cameraFov={cameraFov}
          cameraPosition={cameraPosition}
          objectPosition={objectPosition}
          objectRotation={objectRotation}
          lookAtTarget={lookAtTarget}
          lookAtEnabled={lookAtEnabled}
          resetCamera={resetCamera}
          lookAtObject={lookAtObject}
          objectScale={objectScale}
          resetLookAt={resetLookAt}
          resetObject={resetObject}
          setCameraFov={setCameraFov}
          setCameraPosition={setCameraPosition}
          setObjectPosition={setObjectPosition}
          setLookAtEnabled={setLookAtEnabled}
          setLookAtTarget={setLookAtTarget}
          setObjectRotation={setObjectRotation}
          setObjectScale={setObjectScale}
          showTarget={showLookAtTarget}
          setShowTarget={setShowLookAtTarget}
        />
      </div>
      {/* 3D Canvas */}
      <Canvas>
        <Scene
          objectPosition={objectPosition}
          objectScale={objectScale}
          objectRotation={objectRotation}
          lookAtTarget={lookAtTarget}
          showTarget={showLookAtTarget && lookAtEnabled}
        />
        <CameraControlsInScene
          cameraPosition={cameraPosition}
          cameraFov={cameraFov}
          lookAtTarget={lookAtTarget}
          lookAtEnabled={lookAtEnabled}
        />
        <CameraDataCollector onCameraDataChange={handleCameraDataChange} />
      </Canvas>
    </div>
  );
};

function SceneVisualisationPreview({
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
}: {
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
}) {
  const cameraModelRef = useRef<THREE.Group>(null);

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
      <Canvas camera={{ position: [6, 2, 3], near: 0.1, far: 40000 }}>
        <OrbitControls />
        <ambientLight intensity={1} />
        <directionalLight
          intensity={0.4}
          color={0xffffff}
          position={[2, 2, 2]}
        />
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
          ref={cameraModelRef}
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
        <gridHelper args={[10, 10]} />
      </Canvas>
    </div>
  );
}

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

export default CameraControlsScene;
