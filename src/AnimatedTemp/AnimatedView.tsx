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
        geometry = <cylinderGeometry args={[1.3, 1.3, 1.3, 32]} />;
    }

    if (shape == "cone") {
        geometry = <coneGeometry args={[1, 2, 10]} />;
    }

    return (
        <animated.group ref={meshGroup}>
            <mesh rotation-z={shape == "cylinder" ? degToRad(90) : 0}>
                {geometry}
                <meshBasicMaterial color={"#33ff20"} opacity={0} transparent />
                <Edges scale={1} threshold={10} color="white" />
            </mesh>

            <mesh
                rotation-z={shape == "cylinder" ? degToRad(90) : 0}
                position={[0, 4, 2]}
            >
                {geometry}
                <meshBasicMaterial color={"#33ff20"} opacity={0} transparent />
                <Edges scale={1} threshold={10} color="white" />
            </mesh>
        </animated.group>
    );
};

export default function AnimatedView() {
    const { camPos, animation_type } = useParams();

    // default
    let camPosY = 0;
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
                <mesh>
                    <boxGeometry args={[0.1, 0.1, 0.1]} />
                    <meshBasicMaterial />
                </mesh>
                <Shape />
            </Canvas>
        </div>
    );
}
