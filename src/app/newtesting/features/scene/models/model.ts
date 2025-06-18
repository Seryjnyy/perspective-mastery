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
  id: "local-cube",
  name: "Cube",
  description: "A cube",
  source: "local",
  modelUrl: "",
  tags: [],
};

const localCylinder: Model = {
  id: "local-cylinder",
  name: "Cylinder",
  description: "A cylinder",
  source: "local",
  modelUrl: "",
  tags: [],
};

const localHead: Model = {
  id: "local-head",
  name: "Head",
  description: "A head",
  source: "local",
  modelUrl: "/models/head.glb",
  tags: [],
};

const localModelsList: Model[] = [localCube, localCylinder, localHead];

export { localModelsList, localCube, localCylinder, localHead };
