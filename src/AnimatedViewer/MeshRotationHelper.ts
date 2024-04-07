import { Group, Mesh } from "three";
import { degToRad } from "three/src/math/MathUtils.js";

const calcPosRotForRotationInCirclePlaneX = (
  r: number,
  currentFrame: number,
  frameAmount: number
) => {
  let y = r * Math.cos((currentFrame / frameAmount) * (2 * Math.PI));
  let z = r * Math.sin((currentFrame / frameAmount) * (2 * Math.PI));
  let xRot = Math.atan2(z, y) + Math.PI / 2;

  return { y: y, z: z, xRot: xRot };
};

const calcPosRotForRotationInCirclePlaneZ = (
  r: number,
  currentFrame: number,
  frameAmount: number
) => {
  let x = r * Math.cos((currentFrame / frameAmount) * (2 * Math.PI));
  let y = r * Math.sin((currentFrame / frameAmount) * (2 * Math.PI));
  let zRot = Math.atan2(y, x) + Math.PI / 2;

  return { x: x, y: y, zRot: zRot };
};

const calcPosRotForRotationInCirclePlaneY = (
  r: number,
  currentFrame: number,
  frameAmount: number
) => {
  let x = r * Math.cos((currentFrame / frameAmount) * (2 * Math.PI));
  let z = r * Math.sin((currentFrame / frameAmount) * (2 * Math.PI));
  let yRot = Math.atan2(x, z) + Math.PI / 2;

  return { x: x, z: z, yRot: yRot };
};

// TODO : should it be named rotate mesh or group
const rotateMeshInCirclePlaneY = (
  group: Group | Mesh,
  radius: number,
  currentFrame: number,
  frameAmount: number,
  forwardSpin?: "forward" | "backward"
) => {
  const { x, z, yRot } = calcPosRotForRotationInCirclePlaneY(
    radius,
    currentFrame,
    frameAmount
  );

  let zRot = group.rotation.z;

  if (forwardSpin) {
    zRot = forwardSpin == "forward" ? group.rotation.y : -group.rotation.y;
  }

  group.position.set(x, group.position.y, z);
  group.rotation.set(group.rotation.x, yRot, zRot);
};

const rotateMeshInCirclePlaneZ = (
  mesh: Mesh | Group,
  radius: number,
  currentFrame: number,
  frameAmount: number,
  forwardSpin?: "forward" | "backward"
) => {
  const { x, y, zRot } = calcPosRotForRotationInCirclePlaneZ(
    radius,
    currentFrame,
    frameAmount
  );

  let yRot = mesh.rotation.y;

  // if (forwardSpin) {
  //     zRot =
  //         forwardSpin == "forward" ? mesh.rotation.y : -mesh.rotation.y;
  // }

  mesh.position.set(x, y, mesh.position.z);
  mesh.rotation.set(mesh.rotation.x, yRot, zRot);
};

const rotateMeshInCirclePlaneX = (
  mesh: Mesh | Group,
  radius: number,
  currentFrame: number,
  frameAmount: number,
  forwardSpin?: "forward" | "backward"
) => {
  const { z, y, xRot } = calcPosRotForRotationInCirclePlaneX(
    radius,
    currentFrame,
    frameAmount
  );

  // let yRot = mesh.rotation.y;

  // if (forwardSpin) {
  //     zRot =
  //         forwardSpin == "forward" ? mesh.rotation.y : -mesh.rotation.y;
  // }

  mesh.position.set(mesh.position.x, y, z);
  mesh.rotation.set(xRot, mesh.rotation.y, mesh.rotation.z);
};

const rotateMeshY = (
  mesh: Mesh | Group,
  currentFrame: number,
  frameAmount: number
) => {
  const yRot = degToRad((360 / frameAmount) * currentFrame);

  mesh.rotation.set(mesh.rotation.x, yRot, mesh.rotation.z);
};

const rotateMeshX = (
  mesh: Mesh | Group,
  currentFrame: number,
  frameAmount: number
) => {
  const xRot = degToRad((360 / frameAmount) * currentFrame);

  mesh.rotation.set(xRot, mesh.rotation.y, mesh.rotation.z);
};

const rotateMeshZ = (
  mesh: Mesh | Group,
  currentFrame: number,
  frameAmount: number
) => {
  const zRot = degToRad((360 / frameAmount) * currentFrame);

  mesh.rotation.set(mesh.rotation.x, mesh.rotation.y, zRot);
};

export {
  rotateMeshInCirclePlaneX,
  rotateMeshInCirclePlaneY,
  rotateMeshInCirclePlaneZ,
  rotateMeshX,
  rotateMeshY,
  rotateMeshZ,
};
