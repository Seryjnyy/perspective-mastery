"use client";
import { ControlsPanel } from "@/app/newtesting/app/components/control-panel/control-panel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  EnterFullScreenIcon,
  ExitFullScreenIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import {
  Edges,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import {
  ObjectDataDisplayObject,
  ObjectDataDisplaySection,
} from "@/app/newtesting/shared/components/object-data-display";
import SceneVisualisation, {
  SceneVisualisationProps,
} from "./features/scene-previewer/scene-visualisation";
import { TestingScene } from "./challenges/[challenge]/page";
import {
  CameraData,
  createSceneStore,
  LookAtMode,
  LookAtTargetData,
  ObjectData,
  SceneState,
} from "./scene-store";
import { StoreApi, useStore } from "zustand";
import NewTestingPage from "@/app/newtesting/page-content";

export default function Page() {
  return <NewTestingPage />;
}
