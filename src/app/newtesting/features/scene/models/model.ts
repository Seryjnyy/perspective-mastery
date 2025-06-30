"use client";
import {
  LOCAL_GROUND_MODELS,
  LOCAL_LOOK_AT_TARGET_MODELS,
  LOCAL_OBJECT_MODELS,
} from "../../animation/model-repo";

export type ModelSource = "local" | "remote";
// TODO : primary purpose, ground, look at etc.
// can then filter the list of models by purpose
// don't have to group them mnually
export type Model = {
  id: string;
  name: string;
  description: string;
  source: ModelSource;
  modelUrl: string;
  thumbnailUrl?: string;
  tags: string[];
  createdAt?: Date;
};

const localCube: Model = {
  id: LOCAL_OBJECT_MODELS.CUBE,
  name: "Cube",
  description: "A cube",
  source: "local",
  modelUrl: "",
  tags: [],
};

const localCylinder: Model = {
  id: LOCAL_OBJECT_MODELS.CYLINDER,
  name: "Cylinder",
  description: "A cylinder",
  source: "local",
  modelUrl: "",
  tags: [],
};

const localHead: Model = {
  id: LOCAL_OBJECT_MODELS.HEAD,
  name: "Head",
  description: "A head",
  source: "local",
  modelUrl: "/models/head.glb",
  tags: [],
};

const localGrid: Model = {
  id: LOCAL_GROUND_MODELS.GRID,
  name: "Grid",
  description: "A grid",
  source: "local",
  modelUrl: "",
  tags: [],
};

const localPlane: Model = {
  id: LOCAL_GROUND_MODELS.PLANE,
  name: "Plane",
  description: "A plane",
  source: "local",
  modelUrl: "",
  tags: [],
};

const localSmallSphere: Model = {
  id: LOCAL_LOOK_AT_TARGET_MODELS.SPHERE,
  name: "Small sphere",
  description: "A small sphere to look at",
  source: "local",
  modelUrl: "",
  tags: [],
};

/**
 * These are the definitions of the models, the react node for the scene needs to be loaded in.
 */
const localModelsList: Model[] = [
  localCube,
  localCylinder,
  localHead,
  localGrid,
  localSmallSphere,
  localPlane,
];
export {
  localModelsList,
  localCube,
  localCylinder,
  localHead,
  localGrid,
  localPlane,
  localSmallSphere,
};
