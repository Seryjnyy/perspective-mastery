import { CameraSlice } from "./camera-slice";
import { LookAtTargetSlice } from "./lookat-slice";
import { GroundSlice, ObjectSlice } from "./object-slice";
import { PersistenceSlice } from "./persistance-slice";
import { StaticBackgroundSlice } from "./static-background-slice";

export type Vec3 = { x: number; y: number; z: number };

export type SceneState = CameraSlice &
  LookAtTargetSlice &
  ObjectSlice &
  GroundSlice &
  StaticBackgroundSlice &
  PersistenceSlice;
