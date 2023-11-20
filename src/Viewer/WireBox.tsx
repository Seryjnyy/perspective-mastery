import { Edges } from "@react-three/drei";
import { forwardRef } from "react";
import { Mesh } from "three";

interface WireBoxProps {
    visible: boolean;
}
const WireBox = forwardRef<Mesh, WireBoxProps>((props, ref) => {
    return (
        <mesh ref={ref} visible={props.visible}>
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
});

export default WireBox;
