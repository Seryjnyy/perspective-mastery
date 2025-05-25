import {
  AnimationTab,
  CameraTab,
  LookAtTab,
  ObjectTab,
  PositionTab,
  RotationTab,
  ScaleTab,
} from "./tabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { ReactNode } from "react";

export const ControlsPanel = ({
  cameraPosition,
  setCameraPosition,
  cameraFov,
  setCameraFov,
  resetCamera,
  lookAtEnabled,
  setLookAtEnabled,
  showTarget,
  setShowTarget,
  lookAtTarget,
  setLookAtTarget,
  resetLookAt,
  lookAtObject,
  objectPosition,
  setObjectPosition,
  objectScale,
  setObjectScale,
  objectRotation,
  setObjectRotation,

  resetObject,
}: {
  cameraPosition: { x: number; y: number; z: number };
  setCameraPosition: (position: { x: number; y: number; z: number }) => void;
  cameraFov: number;
  setCameraFov: (fov: number) => void;
  resetCamera: () => void;
  lookAtEnabled: boolean;
  setLookAtEnabled: (enabled: boolean) => void;
  showTarget: boolean;
  setShowTarget: (show: boolean) => void;
  lookAtTarget: { x: number; y: number; z: number };
  setLookAtTarget: (target: { x: number; y: number; z: number }) => void;
  resetLookAt: () => void;
  lookAtObject: () => void;
  objectPosition: { x: number; y: number; z: number };
  setObjectPosition: (position: { x: number; y: number; z: number }) => void;
  objectScale: { x: number; y: number; z: number };
  setObjectScale: (scale: { x: number; y: number; z: number }) => void;
  objectRotation: {
    x: number;
    y: number;
    z: number;
  };
  setObjectRotation: (rotation: { x: number; y: number; z: number }) => void;
  resetObject: () => void;
}) => {
  const tabs = [
    { id: "object", label: "Object" },
    { id: "animation", label: "Animation" },
    { id: "camera", label: "Camera" },
    { id: "lookAt", label: "Look At" },
    { id: "position", label: "Position" },
    { id: "scale", label: "Scale" },
    { id: "rotation", label: "Rotation" },
  ];

  const getTabContent = (tabId: string) => {
    switch (tabId) {
      case "object":
        return <ObjectTab />;
      case "camera":
        return (
          <CameraTab
            {...{
              cameraPosition,
              setCameraPosition,
              cameraFov,
              setCameraFov,
              resetCamera,
            }}
          />
        );
      case "lookAt":
        return (
          <LookAtTab
            {...{
              lookAtEnabled,
              setLookAtEnabled,
              showTarget,
              setShowTarget,
              lookAtTarget,
              setLookAtTarget,
              resetLookAt,
              lookAtObject,
            }}
          />
        );
      case "position":
        return (
          <PositionTab
            {...{ objectPosition, setObjectPosition, resetObject }}
          />
        );
      case "scale":
        return <ScaleTab {...{ objectScale, setObjectScale, resetObject }} />;
      case "rotation":
        return (
          <RotationTab
            {...{
              objectRotation,
              setObjectRotation,
              resetObject,
            }}
          />
        );

      case "animation":
        return (
          <AnimationTab
            {...{
              setObjectPosition,
              setObjectRotation,
              setCameraFov,
              setCameraPosition,
              setLookAtTargetPosition: setLookAtTarget,
            }}
          />
        );
    }
  };

  return (
    <Tabs defaultValue={tabs[0].id} className="max-w-[300px] overflow-hidden">
      <div className="max-w-[300px] h-fit overflow-x-scroll">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger value={tab.id} key={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabs.map((tab) => (
        <TabsContent value={tab.id} key={tab.id}>
          {getTabContent(tab.id)}
        </TabsContent>
      ))}
    </Tabs>
  );
};
