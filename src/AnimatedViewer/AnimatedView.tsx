import { animated } from "@react-spring/three";
import { Edges, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
import LoadedModel from "@/LoadedModel";
import { ANIM_TYPE, AXIS } from "@/utility/globals";

const RingCircle = ({
  depth,
  axis,
  animType,
}: {
  depth: boolean;
  axis: AXIS;
  animType: ANIM_TYPE;
}) => {
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

const BoxModel = ({ axis, animType }: { axis: AXIS; animType: ANIM_TYPE }) => {
  return (
    <>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color={"#33ff20"} opacity={0} transparent />
        <Edges scale={1} threshold={10} color="white" />
      </mesh>
      <group>
        <RingCircle depth={false} axis={axis} animType={animType} />
      </group>
    </>
  );
};

const CylinderModel = ({
  axis,
  animType,
}: {
  axis: AXIS;
  animType: ANIM_TYPE;
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
      <RingCircle depth={false} axis={axis} animType={animType} />
    </>
  );
};

const Shape = () => {
  const meshGroup = useRef<Group>(null!);
  const {
    subscribeToEvents,
    unsubscribeFromEvents,
    currentFrame,
    frameAmount,
  } = useAnimatedContext();
  const { shape, animation_type, variant } = useParams();

  // TODO : No better way to do this?
  const animateFunc = (type: string, axis: string) => {
    if (type == "circle") {
      if (axis == "y") {
        rotateMeshInCirclePlaneY(
          meshGroup.current,
          4,
          currentFrame.current,
          frameAmount.current
        );
      } else if (axis == "z") {
        rotateMeshInCirclePlaneZ(
          meshGroup.current,
          4,
          currentFrame.current,
          frameAmount.current
        );
      } else if (axis == "x") {
        rotateMeshInCirclePlaneX(
          meshGroup.current,
          4,
          currentFrame.current,
          frameAmount.current
        );
      }
    } else if (type == "rotate") {
      if (axis == "y") {
        rotateMeshY(
          meshGroup.current,
          currentFrame.current,
          frameAmount.current
        );
      } else if (axis == "x") {
        rotateMeshX(
          meshGroup.current,
          currentFrame.current,
          frameAmount.current
        );
      } else if (axis == "z") {
        rotateMeshZ(
          meshGroup.current,
          currentFrame.current,
          frameAmount.current
        );
      }
    }
  };
  useEffect(() => {
    animateFunc(animation_type!, variant!);
    const id = subscribeToEvents((eventType) => {
      console.log("event");
      if (eventType == "frame_change") {
        animateFunc(animation_type!, variant!);
      }
    });

    return () => unsubscribeFromEvents(id);
  }, []);

  // This is just to satisfy TypeScript, if any of this is really incorrect then the Page will catch it first
  if (variant != "x" && variant != "y" && variant != "z") {
    return <></>;
  }

  if (animation_type != "circle" && animation_type != "rotate") {
    return <></>;
  }

  let model = <></>;

  if (shape == "box") {
    model = <BoxModel axis={variant} animType={animation_type} />;
  }

  if (shape == "cylinder") {
    model = <CylinderModel axis={variant} animType={animation_type} />;
  }

  if (shape == "cone") {
    geometry = <coneGeometry args={[1, 2, 10]} />;
  }

  return (
    <animated.group ref={meshGroup}>
      {/* <LoadedModel /> */}
      {model}
    </animated.group>
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

export default function AnimatedView() {
  const { camPos, animation_type } = useParams();

  // default
  let camPosY = 3;
  let camPosZ = 4;

  if (animation_type == "circle") {
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
        <Shape />
      </Canvas>
    </div>
  );
}
