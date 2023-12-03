import React, { useRef } from "react";
import { Edges, useGLTF } from "@react-three/drei";
import { Group } from "three";
import shotgun from "./assets/test/low_poly_shotgun/scene.gltf?url";

export default function LoadedModel() {
    const groupRef = useRef<Group>(null!);

    const { scene } = useGLTF(shotgun);
    return (
        <group ref={groupRef}>
            <primitive object={scene} position={[0, 0, 0]} scale={20}>
                <Edges
                    scale={2}
                    threshold={10} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
                    color="black"
                />
            </primitive>
        </group>
    );
}
