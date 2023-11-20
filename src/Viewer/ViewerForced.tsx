import { Canvas, useFrame, useThree } from "@react-three/fiber";
import WireBox from "./WireBox";
import { useEffect, useRef } from "react";
import { Mesh } from "three";
import { useViewer } from "./ViewerForcedContext";
import { GizmoHelper, GizmoViewport } from "@react-three/drei";
import { useParams } from "react-router-dom";
import WireCylinder from "./WireCylinder";

const ViewerContent = () => {
    const wireShapeRef = useRef<Mesh>(null);
    const { shape } = useParams();

    // TODO : check if those params are accurate

    const {
        subscribeToRotation,
        unsubscribeFromRotation,
        xDegree,
        yDegree,
        zDegree,
        rotate,
    } = useViewer();

    useEffect(() => {
        const index = subscribeToRotation(() => {
            // update model
            wireShapeRef?.current?.rotation.set(
                xDegree.current,
                yDegree.current,
                zDegree.current
            );
        });

        return () => unsubscribeFromRotation(index);
    }, []);

    useFrame(() => {
        // if (wireBoxRef != null) console.log(wireBoxRef.current?.rotation);
    });

    if (shape == "box") {
        return (
            <>
                <WireBox visible={true} ref={wireShapeRef} />
            </>
        );
    }

    if (shape == "cylinder") {
        rotate("z", 90);
        return (
            <>
                <WireCylinder visible={true} ref={wireShapeRef} />
            </>
        );
    }
};

// TODO : maybe add a line to show the axis of rotation
// can disable enable from settings

// TODO : in different themes the background colour could be white
// need to change colour of box
export default function ViewerForced() {
    const { camPos } = useParams();

    // default
    let camPosY = 0;

    if (camPos == "above") {
        camPosY = 2;
    }

    if (camPos == "level") {
        camPosY = 0;
    }

    if (camPos == "below") {
        camPosY = -2;
    }

    return (
        <Canvas camera={{ position: [0, camPosY, 2] }}>
            <ViewerContent />
            {/* <GizmoHelper alignment="bottom-right" margin={[70, 70]}>
                <GizmoViewport labelColor="white" axisHeadScale={1} disabled />
            </GizmoHelper> */}
        </Canvas>
    );
}
