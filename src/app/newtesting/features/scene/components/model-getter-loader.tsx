"use client";
import {Vec3} from "@/app/newtesting/scene-store";
import {Model} from "../models/model";
import {useModelsData} from "../models/use-models";
import {useEffect, useState} from "react";
import ModelLoader from "./model-loader";

export default function ModelGetterLoader({
                                              modelId,
                                              onLoadedModelData,
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
    const {getModelData} = useModelsData();
    const [model, setModel] = useState<Model | null>(null);

    useEffect(() => {
        if (modelId) {
            const loadModel = async () => {
                console.log("we are getting passed in this", modelId)
                const model = await getModelData(modelId);

                if (model) {
                    setModel(model);
                }
            };
            loadModel();
        }
    }, [modelId, getModelData]);

    // TODO : Add loading and error
    if (!model) {
        return null;
    }

    return <ModelLoader model={model} {...props} />;
}
