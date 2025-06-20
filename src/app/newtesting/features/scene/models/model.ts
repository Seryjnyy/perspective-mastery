import {
  LOCAL_GROUND_MODELS,
  LOCAL_OBJECT_MODELS,
} from "../../animation/model-repo";

export type ModelSource = "local" | "remote";

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

/**
 * These are the definitions of the models, the react node for the scene needs to be loaded in.
 */
const localModelsList: Model[] = [
  localCube,
  localCylinder,
  localHead,
  localGrid,
];
export { localModelsList, localCube, localCylinder, localHead, localGrid };
