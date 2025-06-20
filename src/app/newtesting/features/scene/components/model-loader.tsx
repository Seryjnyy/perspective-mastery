import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Loader } from "./loader";
import localPrimitiveModelsRepo from "../../animation/model-repo";
import { Model } from "../models/model";
import { Vec3 } from "../../../scene-store";

/**
 * Responsible for loading in the model to use in a three js scene. Handles local and remote models.
 *
 * @param model - The model to load.
 * @param onLoaded - A callback function to call when the model is loaded.
 * @param showBoundingBox - Whether to show the bounding box of the model.
 * @returns The model to use in scene.
 */
export default function ModelLoader({
  model,
  onLoaded,
  showBoundingBox = false,
  position,
  rotation,
  scale,
}: {
  model?: Model;
  onLoaded?: () => void;
  showBoundingBox?: boolean;
  position?: Vec3;
  rotation?: Vec3;
  scale?: Vec3;
}) {
  position = position || { x: 0, y: 0, z: 0 };
  rotation = rotation || { x: 0, y: 0, z: 0 };
  scale = scale || { x: 1, y: 1, z: 1 };

  if (!model) {
    return null;
  }

  const requiresFetching = model.source === "remote";
  const requiresLoading = model.modelUrl !== "";
  const isPrimitive = !requiresFetching && !requiresLoading;

  return (
    <Suspense fallback={<Loader />}>
      <group
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
        scale={[scale.x, scale.y, scale.z]}
      >
        {isPrimitive ? (
          <LocalPrimitiveModel modelId={model.id} onLoaded={onLoaded} />
        ) : (
          <RequiresFetchingModel
            modelUrl={model.modelUrl}
            onLoaded={onLoaded}
            showBoundingBox={showBoundingBox}
          />
        )}
      </group>
    </Suspense>
  );
}

const LocalPrimitiveModel = ({
  modelId,
  onLoaded,
}: {
  modelId: string;
  onLoaded?: () => void;
}) => {
  useEffect(() => {
    onLoaded?.();
  }, [onLoaded]);

  return <>{localPrimitiveModelsRepo.getLocalModel(modelId)}</>;
};

/**
 * This is model that has to be loaded in, either from public folder or from a url.
 * Use with Suspense to load the model.
 *
 * @param modelName - The name of the model to load. It should be prefixed by the type of model. So "glb=", "obj=" etc.
 *  Followed by the path to the model. "glb=/models/head.glb" or "obj=https:/wwwgoogle.com/models/head.obj"
 * @returns The model.
 */
const RequiresFetchingModel = ({
  modelUrl,
  onLoaded,
  showBoundingBox = false,
}: {
  modelUrl: string;
  onLoaded?: () => void;
  showBoundingBox?: boolean;
}) => {
  const { scene } = useGLTF(modelUrl);
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
