import { animated } from "@react-spring/three";
import { Edges, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
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

const RingY = ({ depth }: { depth: boolean }) => {
    return (
        <>
            <mesh rotation-x={degToRad(90)} scale={2}>
                <circleGeometry args={[1, 32]} />
                <meshBasicMaterial color={"#33ff20"} opacity={0} transparent />
                <Edges scale={1} threshold={10} color="red" />
            </mesh>
            <mesh
                rotation-x={degToRad(90)}
                scale={0.03}
                position-z={1.99}
                rotation-z={degToRad(-90)}
            >
                <coneGeometry args={[8, 20, 32]} />
                <meshStandardMaterial color={"#33ff20"} />
            </mesh>
            <mesh
                rotation-x={degToRad(90)}
                scale={depth ? 0.023 : 0.03}
                position-z={-1.99}
                rotation-z={degToRad(90)}
            >
                <coneGeometry args={[8, 20, 32]} />
                <meshStandardMaterial color={"#33ff20"} />
            </mesh>
        </>
    );
};

const RingCircle = ({ depth }: { depth: boolean }) => {
    return (
        <>
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

    let geometry = <></>;

    if (shape == "box") {
        geometry = <boxGeometry args={[2, 2, 2]} />;
    }

    if (shape == "cylinder") {
        geometry = <cylinderGeometry args={[1.3, 1.3, 2, 32]} />;
    }

    if (shape == "cone") {
        geometry = <coneGeometry args={[1, 2, 10]} />;
    }

    const boxRotateZConfig = {
        rotationY: degToRad(45),
    };

    const cylinderRotateZConfig = {
        rotationY: degToRad(45),
    };

    const cylinderRotateXConfig = {
        rotationZ: degToRad(180),
    };

    const cylinderConfigWhenZ = {
        rotationZ: degToRad(90),
    };

    return (
        <animated.group ref={meshGroup}>
            {/* <LoadedModel /> */}
            <mesh
                rotation-z={shape == "cylinder" ? degToRad(180) : 0}
                // rotation-y={degToRad(45)}
            >
                {geometry}
                <meshBasicMaterial color={"#33ff20"} opacity={0} transparent />
                <Edges scale={1} threshold={10} color="white" />
            </mesh>

            {/* <group rotation-z={degToRad(270)} rotation-y={degToRad(0)}> */}
            {/* <RingY depth={true} /> */}
            {/* </group> */}

            <group
                position-x={0}
                position-y={0}
                position-z={4}
                rotation-x={degToRad(90)}
                rotation-y={degToRad(0)}
                rotation-z={degToRad(90)}
            >
                <RingCircle depth={true} />
            </group>
            {/*<mesh
                rotation-z={shape == "cylinder" ? degToRad(90) : 0}
                position={[0, 4, 2]}
            >
                {geometry}
                <meshBasicMaterial color={"#33ff20"} opacity={0} transparent />
                <Edges scale={1} threshold={10} color="white" />
            </mesh> */}
        </animated.group>
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
                <mesh>
                    <boxGeometry args={[0.1, 0.1, 0.1]} />
                    <meshBasicMaterial />
                </mesh>

                <Shape />
            </Canvas>
        </div>
    );
}
