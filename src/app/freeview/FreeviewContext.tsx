"use client";
import { degreesToRadians, radiansToDegrees } from "@/lib/radians";
import { MutableRefObject, createContext, useContext, useRef } from "react";

type FreeviewContextType = {
  // viewGismos: MutableRefObject<boolean>;
  // rotateAxis: MutableRefObject<string>;
  // rotateDegree: MutableRefObject<number>;
  // rotateForward: () => void;
  subscribeToEvents: (callback: (eventType: string) => void) => number;
  unsubscribeFromEvents: (index: number) => void;

  shape: MutableRefObject<Shapes>;
  setShape: (newShape: Shapes) => void;

  solidColour: MutableRefObject<boolean>;
  toggleSolidColour: (toggle: boolean) => void;

  edges: MutableRefObject<boolean>;
  toggleEdges: (toggle: boolean) => void;

  directionalLight: MutableRefObject<boolean>;
  toggleDirectionalLight: (toggle: boolean) => void;

  fisheye: MutableRefObject<boolean>;
  toggleFisheye: (toggle: boolean) => void;

  gizmo: MutableRefObject<boolean>;
  toggleGizmo: (toggle: boolean) => void;

  cameraTarget: MutableRefObject<boolean>;
  toggleCameraTarget: (toggle: boolean) => void;

  shapeControls: MutableRefObject<ShapeControlsType>;
  setShapeControls: (newControls: ShapeControlsType) => void;

  lighting: MutableRefObject<LightingType>;
  setLighting: (newLighting: LightingType) => void;

  // taken from the other context
  xDegree: MutableRefObject<number>;
  yDegree: MutableRefObject<number>;
  zDegree: MutableRefObject<number>;
  rotateForward: (axis: "x" | "y" | "z") => void;
  rotateBackward: (axis: "x" | "y" | "z") => void;
  rotate: (axis: "x" | "y" | "z", degree: number) => void;
};

const FreeviewerContext = createContext<FreeviewContextType>(
  {} as FreeviewContextType
);

export type Shapes =
  | "box"
  | "cylinder"
  | "cone"
  | "capsule"
  | "ring"
  | "circle"
  | "torus"
  | "torusKnot";

export type ShapeControlsType =
  | "none"
  | "pivot"
  | "translate"
  | "scale"
  | "rotate";

export type LightingType = "none" | "ambient" | "directional" | "point";

export default function FreeviewContext({ children }: any) {
  // const viewGismos = useRef(false);

  // const rotateAxis = useRef("");
  // const rotateDegree = useRef(15);

  // box default
  const shape = useRef<Shapes>("box");
  const solidColour = useRef<boolean>(false);
  const edges = useRef<boolean>(true);
  const directionalLight = useRef<boolean>(true);
  const fisheye = useRef<boolean>(false);
  const gizmo = useRef<boolean>(true);
  const cameraTarget = useRef<boolean>(true);

  const shapeControls = useRef<ShapeControlsType>("none");
  const lighting = useRef<LightingType>("none");

  // rotation stuff
  const xDegree = useRef(0);
  const yDegree = useRef(0);
  const zDegree = useRef(0);
  const rotateDegree = useRef(15);

  // TODO : duplicate code from the other context
  const rotateForward = (axis: "x" | "y" | "z") => {
    switch (axis) {
      case "x":
        xDegree.current += (rotateDegree.current * Math.PI) / 180;
        if (xDegree.current > 6.2831853072) {
          xDegree.current = 6.2831853072;
        }
        break;
      case "y":
        yDegree.current += (rotateDegree.current * Math.PI) / 180;
        if (yDegree.current > 6.2831853072) {
          yDegree.current = 6.2831853072;
        }
        break;
      case "z":
        zDegree.current += (rotateDegree.current * Math.PI) / 180;
        if (zDegree.current > 6.2831853072) {
          zDegree.current = 6.2831853072;
        }
        break;
    }

    updateSubscribers("objectRotation_change");
  };

  // TODO : handle overflow with more than 360 and less than 0
  const rotateBackward = (axis: "x" | "y" | "z") => {
    switch (axis) {
      case "x":
        xDegree.current -= (rotateDegree.current * Math.PI) / 180;
        if (xDegree.current < 0) {
          xDegree.current = 0;
        }
        break;
      case "y":
        yDegree.current -= (rotateDegree.current * Math.PI) / 180;
        if (yDegree.current < 0) {
          yDegree.current = 0;
        }
        break;
      case "z":
        zDegree.current -= (rotateDegree.current * Math.PI) / 180;
        if (zDegree.current < 0) {
          zDegree.current = 0;
        }
        break;
    }

    updateSubscribers("objectRotation_change");
  };

  // TODO : get stuff from test for this
  // limits to 360 but not less than 0
  const addToAxisRotation = (
    axis: MutableRefObject<number>,
    radians: number
  ) => {
    axis.current += radians;
    if (axis.current > degreesToRadians(360)) {
      axis.current = axis.current - degreesToRadians(360);
    }
    if (axis.current < 0) {
      axis.current = degreesToRadians(360) + axis.current;
    }
  };
  const rotate = (axis: "x" | "y" | "z", degree: number) => {
    const radians = degreesToRadians(degree);

    switch (axis) {
      case "x":
        addToAxisRotation(xDegree, radians);
        break;
      case "y":
        addToAxisRotation(yDegree, radians);
        break;
      case "z":
        addToAxisRotation(zDegree, radians);
        break;
    }

    updateSubscribers("objectRotation_change");
  };

  const updateSubscribers = (eventType: string) => {
    eventSubscribers.current.forEach((callback) => callback(eventType));
  };

  const toggleSolidColour = (toggle: boolean) => {
    solidColour.current = toggle;
    updateSubscribers("solidColour_change");
  };

  const toggleCameraTarget = (toggle: boolean) => {
    cameraTarget.current = toggle;
    updateSubscribers("cameraTarget_change");
  };

  const toggleGizmo = (toggle: boolean) => {
    gizmo.current = toggle;
    updateSubscribers("gizmo_change");
  };
  const toggleFisheye = (toggle: boolean) => {
    fisheye.current = toggle;
    updateSubscribers("fisheye_change");
  };

  const toggleEdges = (toggle: boolean) => {
    edges.current = toggle;
    updateSubscribers("edges_change");
  };

  const toggleDirectionalLight = (toggle: boolean) => {
    directionalLight.current = toggle;
    updateSubscribers("directionalLight_change");
  };

  const setShapeControls = (newControls: ShapeControlsType) => {
    shapeControls.current = newControls;
    updateSubscribers("shapeControls_change");
  };

  const setLighting = (newLighting: LightingType) => {
    lighting.current = newLighting;
    updateSubscribers("lighting_change");
  };

  const setShape = (newShape: Shapes) => {
    shape.current = newShape;

    updateSubscribers("shape_change");
  };

  // TODO : doesn't seem right
  const eventSubscribers = useRef<[(eventType: string) => void]>([() => {}]);

  const subscribeToEvents = (callback: (eventType: string) => void) => {
    eventSubscribers.current.push(callback);

    console.log("subscription");
    return eventSubscribers.current.length - 1;
  };

  const unsubscribeFromEvents = (index: number) => {
    eventSubscribers.current.splice(index, 1);
    console.log("unsubscription");
  };

  // const rotateForward = () => {
  //     rotationSubscribers.current.forEach((callback) => callback());
  // };

  return (
    <FreeviewerContext.Provider
      value={{
        subscribeToEvents,
        unsubscribeFromEvents,
        shape,
        setShape,
        solidColour,
        toggleSolidColour,
        edges,
        toggleEdges,
        directionalLight,
        toggleDirectionalLight,
        fisheye,
        toggleFisheye,
        gizmo,
        toggleGizmo,
        cameraTarget,
        toggleCameraTarget,
        shapeControls,
        setShapeControls,
        lighting,
        setLighting,
        xDegree,
        yDegree,
        zDegree,
        rotateForward,
        rotateBackward,
        rotate,
      }}
    >
      {children}
    </FreeviewerContext.Provider>
  );
}

export function useFreeviewContext() {
  return useContext(FreeviewerContext);
}
