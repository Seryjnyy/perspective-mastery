"use client";

import { Model } from "../models/model";
import { useModelsData } from "../models/use-models";
import { useEffect, useState } from "react";
import ModelLoader from "./model-loader";
import { Vec3 } from "@/app/newtesting/scene-store/shared";

export default function ModelGetterLoader({
  modelId,
  onLoadedModelData,
  onLoadedModel,
  ...props
}: {
  modelId?: string;
  onLoadedModel?: () => void;
  onLoadedModelData?: (model: Model) => void;
  showBoundingBox?: boolean;
  position?: Vec3;
  rotation?: Vec3;
  scale?: Vec3;
}) {
  const { getModelData } = useModelsData();
  const [model, setModel] = useState<Model | null>(null);

  useEffect(() => {
    if (modelId) {
      const loadModelData = async () => {
        const model = await getModelData(modelId);

        if (model) {
          setModel(model);
          console.log("GROUNDED TWO", model.id, model.name);
          onLoadedModelData?.(model);
        }
      };
      loadModelData();
    }
  }, [modelId, getModelData]);

  // TODO : Add loading and error
  if (!model) {
    return null;
  }

  return <ModelLoader model={model} onLoaded={onLoadedModel} {...props} />;
}
