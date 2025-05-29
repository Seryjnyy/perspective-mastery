import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {
  AnimationTab,
  CameraTab, GizmosTab, GroundTab,
  LookAtTab,
  ObjectTab,
  PositionTab,
  RotationTab,
  ScaleTab,
} from "./tabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { ReactNode } from "react";
import Gizmos from "@/app/freeview/FreeviewSettings/Gizmos";

export const ControlsPanel = ({
  lookAtObject,
}: {
  lookAtObject: () => void;
}) => {
  const tabs = [
    { id: "object", label: "Object" },
    { id: "animation", label: "Animation" },
    { id: "camera", label: "Camera" },
    { id: "ground", label: "Ground" },
    { id: "gizmos", label: "Gizmos" },
  ];

  const getTabContent = (tabId: string) => {
    switch (tabId) {
      case "object":
        return <ObjectTab />;
      case "camera":
        return (
          <CameraTab
            {...{
              lookAtObject,
            }}
          />
        );

      case "animation":
        return <AnimationTab />;
      case "ground":
        return <GroundTab/>
      case "gizmos":
        return <GizmosTab/>
    }
  };

  return (
    <Tabs
      defaultValue={tabs[0].id}
      className="max-w-[300px] min-w-[300px] overflow-hidden"
    >
      <ScrollArea className="w-full">
        <TabsList className={"mb-4"}>
          {tabs.map((tab) => (
            <TabsTrigger value={tab.id} key={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {tabs.map((tab) => (
        <TabsContent value={tab.id} key={tab.id}>
          {getTabContent(tab.id)}
        </TabsContent>
      ))}
    </Tabs>
  );
};
