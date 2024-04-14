"use client";
import { Edges, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group, Mesh } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { useAnimatedContext } from "./AnimatedContext";
import {
  rotateMeshInCirclePlaneX,
  rotateMeshInCirclePlaneY,
  rotateMeshInCirclePlaneZ,
  rotateMeshX,
  rotateMeshY,
  rotateMeshZ,
} from "./MeshRotationHelper";
import { AnimationType, Axis, CamPos, Shape } from "@/lib/types";
// import LoadedModel from "@/AnimatedViewer/LoadedModel";

const RingCircle = ({
  depth,
  axis,
  animType,
}: {
  depth: boolean;
  axis: Axis;
  animType: AnimationType;
}) => {
  const { subscribeToEvents, unsubscribeFromEvents, axisSetting } =
    useAnimatedContext();
  const [visible, setVisible] = useState<boolean>(axisSetting.current);

  useEffect(() => {
    const id = subscribeToEvents((eventType) => {
      if (eventType == "setting_change") {
        setVisible(axisSetting.current);
      }
    });

    return () => unsubscribeFromEvents(id);
  }, []);

  if (!visible) {
    return <></>;
  }

  let rotX = 0;
  let rotY = 0;
  let rotZ = 180;

  let posX = 0;
  let posY = 0;
  let posZ = 0;

  switch (axis) {
    case "x":
      rotX = 90;
      rotY = 0;
      rotZ = 90;
      break;
    case "y":
      rotX = 0;
      rotY = 0;
      rotZ = 180;
      break;
    case "z":
      rotX = 90;
      rotY = 0;
      rotZ = 180;
      break;
  }

  if (animType == "circle") {
    switch (axis) {
      case "x":
        posX = 0;
        posY = 0;
        posZ = 4;
        break;
      case "y":
        posX = 4;
        posY = 0;
        posZ = 0;
        rotX = 180;
        break;
      case "z":
        posX = 0;
        posY = 4;
        posZ = 0;
        rotY = 90;
        break;
    }
  }

  return (
    <group
      position-x={posX}
      position-y={posY}
      position-z={posZ}
      rotation-x={degToRad(rotX)}
      rotation-y={degToRad(rotY)}
      rotation-z={degToRad(rotZ)}
    >
      <mesh rotation-x={degToRad(90)} scale={4}>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial color={"#33ff20"} opacity={0} transparent />
        <Edges scale={1} threshold={10} color="red" />
      </mesh>
      <mesh
        rotation-x={degToRad(90)}
        scale={0.04}
        position-z={-1.99 * 2}
        rotation-z={degToRad(-90)}
      >
        <coneGeometry args={[8, 20, 32]} />
        <meshStandardMaterial color={"#33ff20"} />
      </mesh>
      <mesh
        rotation-x={degToRad(90)}
        scale={depth ? 0.028 : 0.04}
        position-z={1.99 * 2}
        rotation-z={degToRad(90)}
      >
        <coneGeometry args={[8, 20, 32]} />
        <meshStandardMaterial color={"#33ff20"} />
      </mesh>
    </group>
  );
};

const BoxModel = ({
  axis,
  animType,
}: {
  axis: Axis;
  animType: AnimationType;
}) => {
  return (
    <>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color={"#33ff20"} opacity={0} transparent />
        <Edges scale={1} threshold={10} color="white" />
      </mesh>
    </>
  );
};

const CylinderModel = ({
  axis,
  animType,
}: {
  axis: Axis;
  animType: AnimationType;
}) => {
  let rotZ = 0;
  if (axis == "y") {
    rotZ = -45;
  }

  return (
    <>
      <mesh rotation-z={degToRad(rotZ)}>
        <cylinderGeometry args={[1.3, 1.3, 2, 32]} />
        <meshBasicMaterial color={"#33ff20"} opacity={0} transparent />
        <Edges scale={1} threshold={10} color="white" />
      </mesh>
    </>
  );
};

const Model = ({
  shape,
  animationType,
  axis,
}: {
  shape: Shape;
  animationType: AnimationType;
  axis: Axis;
}) => {
  const meshGroup = useRef<Group>(null!);
  const {
    subscribeToEvents,
    unsubscribeFromEvents,
    currentFrame,
    frameAmount,
    axisSetting,
  } = useAnimatedContext();

  // TODO : No better way to do this?
  const animateFunc = (type: string, _axis: string) => {
    if (type == "circle") {
      if (_axis == "y") {
        rotateMeshInCirclePlaneY(
          meshGroup.current,
          4,
          currentFrame.current,
          frameAmount.current
        );
      } else if (_axis == "z") {
        rotateMeshInCirclePlaneZ(
          meshGroup.current,
          4,
          currentFrame.current,
          frameAmount.current
        );
      } else if (_axis == "x") {
        rotateMeshInCirclePlaneX(
          meshGroup.current,
          4,
          currentFrame.current,
          frameAmount.current
        );
      }
    } else if (type == "rotate") {
      if (_axis == "y") {
        rotateMeshY(
          meshGroup.current,
          currentFrame.current,
          frameAmount.current
        );
      } else if (_axis == "x") {
        rotateMeshX(
          meshGroup.current,
          currentFrame.current,
          frameAmount.current
        );
      } else if (_axis == "z") {
        rotateMeshZ(
          meshGroup.current,
          currentFrame.current,
          frameAmount.current
        );
      }
    }
  };

  useEffect(() => {
    animateFunc(animationType, axis);
    const id = subscribeToEvents((eventType) => {
      console.log("event");
      if (eventType == "frame_change") {
        animateFunc(animationType, axis);
      }
    });

    return () => unsubscribeFromEvents(id);
  }, []);

  let model = <></>;

  if (shape == "box") {
    model = <BoxModel axis={axis} animType={animationType} />;
  }

  if (shape == "cylinder") {
    model = <CylinderModel axis={axis} animType={animationType} />;
  }

  // TODO : cone model, <coneGeometry args={[1, 2, 10]} />

  return (
    <group ref={meshGroup}>
      {/* <LoadedModel /> */}
      {model}
      <RingCircle depth={false} axis={axis} animType={animationType} />
    </group>
  );
};

const CenterPoint = () => {
  const { subscribeToEvents, unsubscribeFromEvents, centerPointSetting } =
    useAnimatedContext();
  const [visible, setVisible] = useState<boolean>(centerPointSetting.current);

  useEffect(() => {
    const id = subscribeToEvents((eventType) => {
      if (eventType == "setting_change") {
        setVisible(centerPointSetting.current);
      }
    });

    return () => unsubscribeFromEvents(id);
  }, []);

  if (!visible) {
    return <></>;
  }

  return (
    <mesh>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshBasicMaterial />
    </mesh>
  );
};

export default function AnimatedView({
  shape,
  animationType,
  camPos,
  axis,
}: {
  shape: Shape;
  animationType: AnimationType;
  camPos: CamPos;
  axis: Axis;
}) {
  // default
  let camPosY = 3;
  let camPosZ = 4;

  if (animationType == "circle") {
    camPosZ = 13;
    camPosY = 9;
  }

  if (camPos == "above") {
    camPosY = camPosY;
  }

  if (camPos == "level") {
    camPosY = 0;
  }

  if (camPos == "below") {
    camPosY = -camPosY;
  }

  return (
    <div className="h-screen">
      <Canvas camera={{ position: [0, camPosY, camPosZ] }}>
        <OrbitControls />
        <ambientLight intensity={1} />
        <directionalLight
          intensity={0.4}
          color={0xffffff}
          position={[2, 2, 2]}
        />
        <CenterPoint />
        <Model shape={shape} animationType={animationType} axis={axis} />
      </Canvas>
    </div>
  );
}
