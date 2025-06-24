"use client";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React from "react";

export type Tab = {
    value: string;
    label: string;
    content: React.ReactNode;
};

type ControlPanelProps = {
    tabs: Tab[];
};
export const ControlsPanel = ({tabs}: ControlPanelProps) => {
    const defaultTab = tabs.length > 0 ? tabs[0].value : "";

    return (
        <Tabs defaultValue={defaultTab}>
            <TabsList>
                {tabs.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value}>
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    );
};
