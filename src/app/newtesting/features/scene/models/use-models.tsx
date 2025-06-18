import { useEffect, useState } from "react";
import { localModelsList, Model } from "./model";

export const useModels = () => {
  const [localModels, setModels] = useState<Model[]>(localModelsList);
  //   const [remoteModels, setRemoteModels] = useState<Model[]>([]);

  const getModel = (id: string) => {
    return localModels.find((model) => model.id === id);
  };

  return { models: localModels, getModel };
};
