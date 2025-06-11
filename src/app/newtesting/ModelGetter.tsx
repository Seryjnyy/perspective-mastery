import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import modelRepo from "./model-repo";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export default function ModelGetter({
  modelName,
  onLoaded,
  showBoundingBox = false,
}: {
  modelName: string;
  onLoaded?: () => void;
  showBoundingBox?: boolean;
}) {
  //   useEffect(() => {
  //     if (modelName.includes("glb=")) {
  //       setIsPrimitive(false);
  //     }
  //   }, [modelName]);
  const isPrimitive = !modelName.includes("glb=");

  return (
    <>
      {isPrimitive ? (
        <PrimitiveModel modelName={modelName} onLoaded={onLoaded} />
      ) : (
        <RemoteModel
          modelName={modelName}
          onLoaded={onLoaded}
          showBoundingBox={showBoundingBox}
        />
      )}
    </>
  );
}

const PrimitiveModel = ({
  modelName,
  onLoaded,
}: {
  modelName: string;
  onLoaded?: () => void;
}) => {
  useEffect(() => {
    onLoaded?.();
  }, [onLoaded]);

  return <>{modelRepo.getModel(modelName)}</>;
};

/**
 * This is model that has to be loaded in, either from public folder or from a url.
 * Use with Suspense to load the model.
 *
 * @param modelName - The name of the model to load. It should be prefixed by the type of model. So "glb=", "obj=" etc.
 *  Followed by the path to the model. "glb=/models/head.glb" or "obj=https:/wwwgoogle.com/models/head.obj"
 * @returns The model.
 */
const RemoteModel = ({
  modelName,
  onLoaded,
  showBoundingBox = false,
}: {
  modelName: string;
  onLoaded?: () => void;
  showBoundingBox?: boolean;
}) => {
  const { scene } = useGLTF(modelName.split("glb=")[1]);
  const modelRef = useRef<THREE.Group>(null);
  const [boundingBox, setBoundingBox] = useState<THREE.Box3 | null>(null);

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    if (!showBoundingBox) return;

    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      setBoundingBox(box);
    }
  }, [clonedScene, showBoundingBox]);

  useEffect(() => {
    onLoaded?.();
  }, [onLoaded]);

  return (
    <group>
      <group ref={modelRef}>
        <primitive object={clonedScene} />
      </group>

      {boundingBox && showBoundingBox && (
        <primitive object={new THREE.Box3Helper(boundingBox, 0xff0000)} />
      )}
    </group>
  );
};
