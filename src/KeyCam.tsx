import {
    Edges,
    KeyboardControls,
    KeyboardControlsEntry,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useMemo } from "react";

export default function KeyCam() {
    enum Controls {
        forward = "forward",
        back = "back",
        left = "left",
        right = "right",
        jump = "jump",
        color = "color",
    }

    const WireBox = () => {
        // const { camera } = useThree();
        // const forwardPressed = useKeyboardControls<Controls>(
        //     (state) => state.forward
        // );

        return (
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial
                    transparent={true}
                    color="#333"
                    depthTest={false}
                    opacity={0}
                />
                <Edges
                    scale={1}
                    threshold={10} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
                    color="white"
                />
            </mesh>
        );
    };

    const map = useMemo<KeyboardControlsEntry[]>(
        () => [
            {
                name: Controls.forward,
                keys: ["ArrowUp", "KeyW"],
            },
            {
                name: Controls.back,
                keys: ["ArrowDown", "KeyS"],
            },
            {
                name: Controls.left,
                keys: ["ArrowLeft", "KeyA"],
            },
            {
                name: Controls.right,
                keys: ["ArrowRight", "KeyD"],
            },
            {
                name: Controls.color,
                keys: ["Space"],
            },
        ],
        []
    );
    const [color, setColor] = React.useState("green");

    return (
        <Canvas>
            <KeyboardControls
                map={map}
                onChange={(name, pressed, _state) => {
                    // Test onChange by toggling the color.
                    if (name === Controls.color && pressed) {
                        setColor((color) =>
                            color === "green" ? "red" : "green"
                        );
                    }
                }}
            >
                <mesh>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 15, 10]} angle={0.3} />
                    <boxGeometry />
                    <meshBasicMaterial />
                </mesh>
            </KeyboardControls>
        </Canvas>
    );
}
