import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import Test from "./test";

enum Controls {
    forward = "forward",
    back = "back",
    left = "left",
    right = "right",
    jump = "jump",
}

interface Props {
    viewGismos: boolean;
}

export default function Three({ viewGismos }: Props) {
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
        <div className="bg-gray-950 h-screen">
            <KeyboardControls map={map}>
                <Canvas>
                    <Test />
                </Canvas>
            </KeyboardControls>
        </div>
    );
}
