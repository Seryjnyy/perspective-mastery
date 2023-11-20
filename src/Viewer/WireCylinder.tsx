import { Edges } from "@react-three/drei";
import { forwardRef } from "react";
import { Mesh } from "three";

interface WireCylinderProps {
    visible: boolean;
}

// TODO : Wire shapes have the same mesh, material and edge components
// so duplicate code, especially with more shapes
const WireCylinder = forwardRef<Mesh, WireCylinderProps>((props, ref) => {
    return (
        <mesh
            ref={ref}
            visible={props.visible}
            rotation={[0, 0, 90 * (Math.PI / 180)]}
        >
            <cylinderGeometry args={[0.65, 0.65, 0.65]} />
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
});

export default WireCylinder;
