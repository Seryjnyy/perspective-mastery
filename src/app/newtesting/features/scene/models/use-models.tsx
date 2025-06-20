import { useEffect, useState } from "react";
import { localModelsList, Model } from "./model";

export const useModelsData = () => {
  const [localModelsData, setLocalModelsData] =
    useState<Model[]>(localModelsList);
  //   const [remoteModels, setRemoteModels] = useState<Model[]>([]);

  const getModelData = async (id: string) => {
    return localModelsData.find((model) => model.id === id);
  };

  return { models: localModelsData, getModelData };
};
