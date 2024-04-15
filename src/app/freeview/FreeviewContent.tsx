"use client";
import {
  Edges,
  Fisheye,
  GizmoHelper,
  GizmoViewport,
  KeyboardControls,
  KeyboardControlsEntry,
  OrbitControls,
  PivotControls,
  TransformControls,
  useKeyboardControls,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ReactElement,
  ReactNode,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// import Test from "./test";
import { BoxGeometry, CapsuleGeometry, Mesh, Vector3 } from "three";
import { ShapeControlsType, useFreeviewContext } from "./FreeviewContext";

enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
}

interface WireShapeProps {
  visible: boolean;
  solidColour: boolean;
  edges: boolean;
  rotation: { x: number; y: number; z: number };
  geometry: ReactNode;
  shapeName: string;
}

const WireShape = forwardRef<Mesh, WireShapeProps>((props, ref) => {
  return (
    <mesh
      ref={ref}
      visible={props.visible}
      rotation={[props.rotation.x, props.rotation.y, props.rotation.z]}
    >
      {props.geometry}
      {/* <meshBasicMaterial
                transparent={false}
                color="#333"
                depthTest={true}
                opacity={solidColour ? 1 : 0}
            /> */}
      <meshStandardMaterial
        attach="material"
        color={"#6be092"}
        opacity={props.solidColour ? 1 : 0}
        transparent={props.solidColour ? false : true}
      />
      <Edges
        scale={props.edges ? 1 : 0}
        threshold={1} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
        color="white"
      />
      {props.shapeName == "torusKnot" ? (
        <Edges
          scale={props.edges ? 1 : 0}
          threshold={-360} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
          color="white"
        />
      ) : (
        <></>
      )}
      {props.shapeName == "torus" ? (
        <Edges
          scale={props.edges ? 1 : 0}
          threshold={-360} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
          color="white"
        />
      ) : (
        <></>
      )}
    </mesh>
  );
});
WireShape.displayName = "WireShape";

const ShapeWithControls = ({
  shapeControls,
  shape,
}: {
  shapeControls: ShapeControlsType;
  shape: ReactElement;
}) => {
  return (
    <>
      <TransformControls
        mode={
          shapeControls == "none" || shapeControls == "pivot"
            ? "translate"
            : shapeControls
        }
        scale={1}
        size={
          shapeControls == "rotate" ||
          shapeControls == "translate" ||
          shapeControls == "scale"
            ? 1
            : 0
        }
      >
        <PivotControls
          rotation={[0, -Math.PI / 2, 0]}
          anchor={[1, -1, -1]}
          scale={shapeControls == "pivot" ? 100 : 1}
          depthTest={false}
          fixed
          lineWidth={shapeControls == "pivot" ? 4 : 0}
        >
          {shape}
        </PivotControls>
      </TransformControls>
    </>
  );
};

const Content = () => {
  const {
    subscribeToEvents,
    unsubscribeFromEvents,
    shape,
    solidColour,
    edges,
    fisheye,
    shapeControls,
    xDegree,
    yDegree,
    zDegree,
  } = useFreeviewContext();
  const boxRef = useRef<Mesh>(null);
  const cylinderRef = useRef<Mesh>(null);
  const refs = [boxRef, cylinderRef];

  const [solidColourEnabled, setSolidColourEnabled] = useState(
    solidColour.current
  );

  const [edgesEnabled, setEdgesEnabled] = useState(edges.current);

  const [fisheyeEnabled, setFisheyeEnabled] = useState(fisheye.current);

  const [shapeControlsEnabled, setShapeControlsEnabled] = useState(
    shapeControls.current
  );

  const [currentShape, setCurrentShape] = useState(shape.current);

  useEffect(() => {
    const id = subscribeToEvents((eventType: string) => {
      // if (eventType == "shape_change") {
      //     // hide all refs first
      //     refs.forEach((ref) => {
      //         if (ref.current) ref.current.visible = false;
      //     });

      //     // then show the chosen one
      //     switch (shape.current) {
      //         case "box":
      //             if (boxRef.current) boxRef.current.visible = true;
      //             break;
      //         case "cylinder":
      //             if (cylinderRef.current)
      //                 cylinderRef.current.visible = true;
      //             break;
      //     }
      // }

      if (eventType == "shape_change") {
        setCurrentShape(shape.current);
      }

      if (eventType == "solidColour_change") {
        setSolidColourEnabled(solidColour.current);
      }

      if (eventType == "edges_change") {
        setEdgesEnabled(edges.current);
      }

      if (eventType == "fisheye_change") {
        setFisheyeEnabled(fisheye.current);
      }

      if (eventType == "shapeControls_change") {
        console.log(boxRef.current?.position);
        setShapeControlsEnabled(shapeControls.current);
      }

      if (eventType == "objectRotation_change") {
        refs.forEach((ref) =>
          ref.current?.rotation.set(
            xDegree.current,
            yDegree.current,
            zDegree.current
          )
        );
      }
    });

    return () => unsubscribeFromEvents(id);
  }, []);
  // TODO : MAKE LIGHT, SHAPES, AND GIZMO into separate components that are actually located in the parent
  // instead of being in the same component, so don't have to worry about their state, and state changes affecting them

  // TODO : i don't think we need to render all shapes at the same time anymore

  let geometry = <></>;
  let shapeName = "";

  if (currentShape == "box") {
    geometry = <boxGeometry args={[2, 2, 2]} />;
    shapeName = "box";
  } else if (currentShape == "cylinder") {
    geometry = <cylinderGeometry args={[2, 2, 2]} />;
    shapeName = "cylinder";
  } else if (currentShape == "cone") {
    geometry = <coneGeometry args={[4, 5, 8]} />;
    shapeName = "cone";
  } else if (currentShape == "ring") {
    geometry = <ringGeometry args={[1, 2, 32]} />;
    shapeName = "ring";
  } else if (currentShape == "capsule") {
    geometry = <capsuleGeometry args={[1, 1, 4, 8]} />;
    shapeName = "capsule";
  } else if (currentShape == "circle") {
    geometry = <circleGeometry args={[1, 32]} />;
    shapeName = "circle";
  } else if (currentShape == "torus") {
    geometry = <torusGeometry args={[1, 0.25, 32, 100]} />;
    shapeName = "torus";
  } else if (currentShape == "torusKnot") {
    geometry = <torusKnotGeometry args={[5, 1.5, 50, 8]} />;
    shapeName = "torusKnot";
  }

  console.log(currentShape);

  const content = (
    <>
      <ShapeWithControls
        shapeControls={shapeControlsEnabled}
        shape={
          <WireShape
            rotation={{
              x: xDegree.current,
              y: yDegree.current,
              z: zDegree.current,
            }}
            visible={true}
            ref={boxRef}
            solidColour={solidColourEnabled}
            edges={edgesEnabled}
            geometry={geometry}
            shapeName={shapeName}
          />
        }
      />
    </>
  );

  if (fisheyeEnabled) {
    return (
      <>
        <Fisheye zoom={1}>{content}</Fisheye>
      </>
    );
  }

  return <>{content}</>;
};

const Lighting = () => {
  const { subscribeToEvents, unsubscribeFromEvents, lighting } =
    useFreeviewContext();
  const [lightingEnabled, setLightingEnabled] = useState(lighting.current);

  useEffect(() => {
    const id = subscribeToEvents((eventType) => {
      if (eventType == "lighting_change") {
        setLightingEnabled(lighting.current);
      }
    });

    return () => unsubscribeFromEvents(id);
  }, []);

  if (lightingEnabled == "none") {
    return <></>;
  }

  if (lightingEnabled == "ambient") {
    return <ambientLight />;
  }

  if (lightingEnabled == "point") {
    return <pointLight intensity={3} color={0xffffff} position={[2, 2, 2]} />;
  }

  if (lightingEnabled == "directional") {
    return (
      <directionalLight intensity={0.4} color={0xffffff} position={[2, 2, 2]} />
    );
  }
};

const CameraTarget = () => {
  const { subscribeToEvents, unsubscribeFromEvents, cameraTarget } =
    useFreeviewContext();
  const [cameraTargetEnabled, setCameraTargetEnabled] = useState(
    cameraTarget.current
  );

  useEffect(() => {
    const id = subscribeToEvents((eventType) => {
      if (eventType == "cameraTarget_change") {
        setCameraTargetEnabled(cameraTarget.current);
      }
    });

    return () => unsubscribeFromEvents(id);
  }, []);

  if (!cameraTargetEnabled) {
    return <></>;
  }

  return (
    <mesh>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshBasicMaterial attach={"material"} color={"#ffffff"} />
    </mesh>
  );
};

const Gizmo = () => {
  const { subscribeToEvents, unsubscribeFromEvents, gizmo } =
    useFreeviewContext();
  const [gizmoEnabled, setGizmoEnabled] = useState(gizmo.current);

  useEffect(() => {
    const id = subscribeToEvents((eventType) => {
      if (eventType == "gizmo_change") {
        setGizmoEnabled(gizmo.current);
      }
    });

    return () => unsubscribeFromEvents(id);
  }, []);

  if (!gizmoEnabled) {
    return <></>;
  }

  return (
    <GizmoHelper alignment="bottom-right" margin={[50, 50]}>
      <GizmoViewport labelColor="white" axisHeadScale={1} scale={30} />
    </GizmoHelper>
  );
};

export default function FreeviewContent() {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  return (
    <div className="h-screen">
      <KeyboardControls map={map}>
        <Canvas>
          <OrbitControls makeDefault />
          <Lighting />
          <Content />
          <CameraTarget />
          <Gizmo />
        </Canvas>
      </KeyboardControls>
    </div>
  );
}
