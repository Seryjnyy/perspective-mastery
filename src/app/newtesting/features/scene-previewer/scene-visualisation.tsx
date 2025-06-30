"use client";
import { Line, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import FrustumVisualiser from "./frustrum-visualiser";

// TODO : Add light models
export default function SceneVisualisation({
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
  model,
  groundModel,
  lookAtTargetModel,
  staticBackgroundModels,
  showFrustum,
  showGround,
}: SceneVisualisationProps) {
  return (
    <Canvas camera={{ position: [6, 2, 3], near: 0.1, far: 40000 }}>
      <OrbitControls />
      <ambientLight intensity={1} />
      <directionalLight intensity={0.4} color={0xffffff} position={[2, 2, 2]} />
      <group
        position={[
          lookAtTargetPosition.x,
          lookAtTargetPosition.y,
          lookAtTargetPosition.z,
        ]}
      >
        {lookAtTargetModel}
        {/* <mesh
          position={[
            lookAtTargetPosition.x,
            lookAtTargetPosition.y,
            lookAtTargetPosition.z,
          ]}
        >
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshBasicMaterial color="blue" />
        </mesh> */}
      </group>
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

      <group
        position={[objectPosition.x, objectPosition.y, objectPosition.z]}
        rotation={[objectRotation.x, objectRotation.y, objectRotation.z]}
        scale={[objectScale.x, objectScale.y, objectScale.z]}
      >
        {model}
        {/* <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="orange" />
          </mesh> */}
      </group>
      <group
        position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
        rotation={[cameraRotation.x, cameraRotation.y, cameraRotation.z]}
      >
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="red" />
        </mesh>
        {showFrustum && (
          <group rotation={[0, 0, 0]}>
            <FrustumVisualiser
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
        )}
      </group>

      {staticBackgroundModels}
      <group position={[groundPosition.x, groundPosition.y, groundPosition.z]}>
        {showGround && groundModel}
      </group>
    </Canvas>
  );
}

export interface SceneVisualisationProps {
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
  model: React.ReactNode;
  groundModel: React.ReactNode;
  lookAtTargetModel: React.ReactNode;
  staticBackgroundModels: React.ReactNode;
  showFrustum?: boolean;
  showGround?: boolean;
}
