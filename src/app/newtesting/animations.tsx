import { AnimationKeyframe } from "./control-panel/tabs";

export type AnimationPreset = {
  id: string;
  name: string;
  desc: string;
  keyFrames: AnimationKeyframe[];
};
export const animationPresets: AnimationPreset[] = [
  {
    id: "orbit-reveal",
    name: "Orbit Reveal",
    desc: "The camera orbits around the object revealing its sides.",
    keyFrames: [
      {
        t: 0,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: 5, y: 2, z: 0 },
          cameraFov: 50,
          lookAtTargetPosition: { x: 0, y: 0, z: 0 },
        },
      },
      {
        t: 1,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: -5, y: 2, z: 0 },
          cameraFov: 50,
          lookAtTargetPosition: { x: 0, y: 0, z: 0 },
        },
      },
    ],
  },
  {
    id: "rise-and-zoom",
    name: "Rise and Zoom",
    desc: "Camera zooms in while ascending to reveal the top.",
    keyFrames: [
      {
        t: 0,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: 0, y: 2, z: 10 },
          cameraFov: 75,
          lookAtTargetPosition: { x: 0, y: 1, z: 0 },
        },
      },
      {
        t: 1,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: 0, y: 5, z: 3 },
          cameraFov: 35,
          lookAtTargetPosition: { x: 0, y: 1.5, z: 0 },
        },
      },
    ],
  },
  {
    id: "swoop-around",
    name: "Swoop Around",
    desc: "A fast swooping motion to circle the object.",
    keyFrames: [
      {
        t: 0,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: -6, y: 1, z: -6 },
          cameraFov: 50,
          lookAtTargetPosition: { x: 0, y: 0.5, z: 0 },
        },
      },
      {
        t: 1,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: 6, y: 1, z: 6 },
          cameraFov: 50,
          lookAtTargetPosition: { x: 0, y: 0.5, z: 0 },
        },
      },
    ],
  },
  {
    id: "dolly-forward",
    name: "Dolly Forward",
    desc: "Camera dollies in toward the object.",
    keyFrames: [
      {
        t: 0,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: 0, y: 1, z: 10 },
          cameraFov: 50,
          lookAtTargetPosition: { x: 0, y: 0.5, z: 0 },
        },
      },
      {
        t: 1,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: 0, y: 1, z: 2 },
          cameraFov: 50,
          lookAtTargetPosition: { x: 0, y: 0.5, z: 0 },
        },
      },
    ],
  },
  {
    id: "side-pan",
    name: "Side Pan",
    desc: "Camera pans sideways across the object.",
    keyFrames: [
      {
        t: 0,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: -5, y: 1, z: 2 },
          cameraFov: 50,
          lookAtTargetPosition: { x: 0, y: 0, z: 0 },
        },
      },
      {
        t: 1,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: 5, y: 1, z: 2 },
          cameraFov: 50,
          lookAtTargetPosition: { x: 0, y: 0, z: 0 },
        },
      },
    ],
  },
  {
    id: "lift-off",
    name: "Lift Off",
    desc: "Object rises while the camera zooms out.",
    keyFrames: [
      {
        t: 0,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: 0, y: 2, z: 6 },
          cameraFov: 60,
          lookAtTargetPosition: { x: 0, y: 1, z: 0 },
        },
      },
      {
        t: 1,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 3, z: 0 },
          cameraPosition: { x: 0, y: 5, z: 10 },
          cameraFov: 45,
          lookAtTargetPosition: { x: 0, y: 3, z: 0 },
        },
      },
    ],
  },
  {
    id: "pivot-turn",
    name: "Pivot Turn",
    desc: "Camera pans as the object stays fixed.",
    keyFrames: [
      {
        t: 0,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: 5, y: 2, z: 0 },
          cameraFov: 50,
          lookAtTargetPosition: { x: 0, y: 1, z: 0 },
        },
      },
      {
        t: 1,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: 5, y: 2, z: 0 },
          cameraFov: 50,
          lookAtTargetPosition: { x: 0, y: 1, z: 0 },
        },
      },
    ],
  },
  {
    id: "diagonal-drift",
    name: "Diagonal Drift",
    desc: "Object and camera drift diagonally in sync.",
    keyFrames: [
      {
        t: 0,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: -1, y: 0, z: -1 },
          cameraPosition: { x: -3, y: 2, z: -3 },
          cameraFov: 50,
          lookAtTargetPosition: { x: -1, y: 0, z: -1 },
        },
      },
      {
        t: 1,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 1, y: 0, z: 1 },
          cameraPosition: { x: 3, y: 2, z: 3 },
          cameraFov: 50,
          lookAtTargetPosition: { x: 1, y: 0, z: 1 },
        },
      },
    ],
  },
  {
    id: "flyover",
    name: "Flyover",
    desc: "Camera flies over and past the object.",
    keyFrames: [
      {
        t: 0,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: 0, y: 10, z: -10 },
          cameraFov: 50,
          lookAtTargetPosition: { x: 0, y: 0, z: 0 },
        },
      },
      {
        t: 1,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: 0, y: 2, z: 4 },
          cameraFov: 50,
          lookAtTargetPosition: { x: 0, y: 0.5, z: 0 },
        },
      },
    ],
  },
  {
    id: "spiral-in",
    name: "Spiral In",
    desc: "Camera spirals inward toward the object.",
    keyFrames: [
      {
        t: 0,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: 8, y: 6, z: 0 },
          cameraFov: 60,
          lookAtTargetPosition: { x: 0, y: 0, z: 0 },
        },
      },
      {
        t: 0.5,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: 4, y: 4, z: 4 },
          cameraFov: 55,
          lookAtTargetPosition: { x: 0, y: 0, z: 0 },
        },
      },
      {
        t: 1,
        config: {
          objectRotation: { x: 0, y: 0, z: 0 },
          objectPosition: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: 0, y: 2, z: 6 },
          cameraFov: 50,
          lookAtTargetPosition: { x: 0, y: 0, z: 0 },
        },
      },
    ],
  },
];
