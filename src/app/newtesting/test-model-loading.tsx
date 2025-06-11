import { Html, useGLTF, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

export function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <span className="text-white text-sm">{progress.toFixed(2)}%</span>
    </Html>
  );
}

function TestModel() {
  const { scene } = useGLTF("/models/head.glb");
  return <primitive object={scene} />;
}

export default function TestModelLoading() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      className="w-full h-full"
    >
      <Suspense fallback={<Loader />}>
        <TestModel />
      </Suspense>
    </Canvas>
  );
}
