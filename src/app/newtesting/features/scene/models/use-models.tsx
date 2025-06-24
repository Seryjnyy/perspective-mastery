"use client";
import {useEffect, useState} from "react";
import {localModelsList, Model} from "./model";

export const useModelsData = () => {
    const [localModelsData, setLocalModelsData] =
        useState<Model[]>(localModelsList);
    //   const [remoteModels, setRemoteModels] = useState<Model[]>([]);

    const getModelData = async (id: string) => {
        console.log("getModelData", id);
        const m = localModelsData.find((model) => model.id === id);
        console.log("found", m)
        return m
    };

    return {models: localModelsData, getModelData};
};
