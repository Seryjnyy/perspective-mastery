import { useMemo } from "react";
import { PerspectiveCamera, CameraHelper } from "three";

export default function FrustumVisualiser({
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
    const cam = new PerspectiveCamera(fov, aspect, near, far);
    cam.position.set(...position);
    cam.lookAt(...target);
    cam.updateMatrixWorld();

    const helper = new CameraHelper(cam);
    return helper.geometry;
  }, [position, target, fov, aspect, near, far]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="orange" />
    </lineSegments>
  );
}
