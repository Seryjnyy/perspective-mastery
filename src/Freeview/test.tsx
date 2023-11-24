import {
    CameraControls,
    Edges,
    GizmoHelper,
    GizmoViewport,
    KeyboardControlsEntry,
    OrbitControls,
    PivotControls,
    Stars,
    TransformControls,
    useGizmoContext,
    useKeyboardControls,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, {
    createRef,
    forwardRef,
    useEffect,
    useMemo,
    useRef,
} from "react";
import {
    BufferGeometry,
    Color,
    Group,
    MathUtils,
    Mesh,
    NormalBufferAttributes,
    Object3DEventMap,
    Vector3,
} from "three";
import { Object3DNode } from "three/examples/jsm/nodes/Nodes.js";
import { useViewer } from "./FreeviewContext";

enum Controls {
    forward = "forward",
    back = "back",
    left = "left",
    right = "right",
    jump = "jump",
}

interface WireBoxProps {
    visible: boolean;
}
const WireBox = forwardRef<Mesh, WireBoxProps>((props, ref) => {
    return (
        <mesh ref={ref} visible={props.visible}>
            <cylinderGeometry args={[1, 1, 1]} />
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

export default function Test() {
    const camRef = useRef<CameraControls>(null);
    const boxRef = createRef<Mesh>();
    const pivotRef = createRef<Group<Object3DEventMap>>();

    const forwardPressed = useKeyboardControls<Controls>(
        (state) => state.forward
    );

    const backPressed = useKeyboardControls<Controls>((state) => state.back);
    const leftPressed = useKeyboardControls<Controls>((state) => state.left);
    const rightPressed = useKeyboardControls<Controls>((state) => state.right);

    // TODO : a lot of duplicate code
    const rotateX = (mesh: Mesh | null) => {
        if (mesh == null) return;

        mesh.rotation.x += (15 * Math.PI) / 180;
        console.log(mesh.rotation.x * (180 / Math.PI));

        // TODO : will have inaccuracies the more its used because of the decimal point values
        // also 6.28319 is 360 in radians
        if (mesh.rotation.x > 6.28319) {
            console.log("more than 360, wrap it");
            mesh.rotation.x = mesh.rotation.x - 6.28319;
        }
    };
    const rotateY = (mesh: Mesh | null) => {
        if (mesh == null) return;

        mesh.rotation.y += (15 * Math.PI) / 180;
        console.log(mesh.rotation.y * (180 / Math.PI));

        // TODO : will have inaccuracies the more its used because of the decimal point values
        // also 6.28319 is 360 in radians
        if (mesh.rotation.y > 6.28319) {
            console.log("more than 360, wrap it");
            mesh.rotation.y = mesh.rotation.y - 6.28319;
        }
    };
    const rotateZ = (mesh: Mesh | null) => {
        if (mesh == null) return;

        mesh.rotation.z += (15 * Math.PI) / 180;
        console.log(mesh.rotation.z * (180 / Math.PI));

        // TODO : will have inaccuracies the more its used because of the decimal point values
        // also 6.28319 is 360 in radians
        if (mesh.rotation.z > 6.28319) {
            console.log("more than 360, wrap it");
            mesh.rotation.z = mesh.rotation.z - 6.28319;
        }
    };

    // const {
    //     viewGismos,
    //     rotateAxis,
    //     rotateDegree,
    //     subscribeToRotation,
    //     unsubscribeFromRotation,
    // } = useViewer();

    // useEffect(() => {
    //     const subscription = subscribeToRotation(() => {
    //         if (boxRef == null) return;

    //         if (rotateAxis.current == "x") {
    //             rotateX(boxRef.current);
    //         } else if (rotateAxis.current == "y") {
    //             rotateY(boxRef.current);
    //         } else if (rotateAxis.current == "z") {
    //             rotateZ(boxRef.current);
    //         }
    //     });

    //     return () => unsubscribeFromRotation(subscription);
    // }, []);

    const prevViewGismos = useRef<boolean>(true);

    useFrame(({ clock, camera }) => {
        // if (camRef == null) return;

        if (backPressed) {
            camera.position.add(new Vector3(0, -0.2, 0));
            // camera.lookAt(new Vector3(0, -4, 0));
            // camera.
        }

        if (forwardPressed) {
            camera.position.add(new Vector3(0, 0.2, 0));
        }

        // if (viewGismos != prevViewGismos) {
        //     if (pivotRef != null && pivotRef.current != null) {
        //         if (boxRef != null && boxRef.current != null) {
        //             pivotRef.current.visible = viewGismos.current;
        //             boxRef.current.visible = !viewGismos.current;

        //             prevViewGismos.current = viewGismos.current;
        //         }
        //     }
        // }

        // if (forwardPressed) {
        //     if (pivotRef != null) {
        //         if (pivotRef.current != null) {
        //             if (boxRef == null || boxRef.current == null) return;

        //             console.log(pivotRef.current.scale);
        //             // pivotRef.current.scale.set(0, 0, 0);
        //             pivotRef.current.position.set(100, 100, 100);

        //             if (viewGismos) {
        //                 pivotRef.current.visible = false;
        //                 boxRef.current.visible = true;
        //             } else {
        //             }

        //             // let lastPos = pivotRef.current.position;
        //             // boxRef.current.position.set(
        //             //     lastPos.x,
        //             //     lastPos.y,
        //             //     lastPos.z
        //             // );
        //             // pivotRef.current.
        //         }
        //     }
        // }

        // if (forwardPressed) {
        //     if (camRef.current == null) {
        //         console.log("you thought");
        //         return;
        //     }
        //     // camRef.current?.forward(0.01 * deltaTime * 200, false);
        //     // camRef.current.rotate(
        //     //     -0.1 * MathUtils.DEG2RAD * deltaTime,
        //     //     0,
        //     //     true
        //     // );
        // }

        // if (boxRef == null || boxRef.current == null) {
        //     console.log("returning");
        //     return;
        // }

        // if (forwardPressed) {
        //     boxRef.current.position.y += 0.1;
        // }

        // if (backPressed) {
        //     boxRef.current.position.y -= 0.1;
        // }

        // if (leftPressed) {
        //     boxRef.current.position.x += 0.1;
        // }

        // if (rightPressed) {
        //     boxRef.current.position.x -= 0.1;
        // }

        // boxRef.current.rotation.x = clock.getElapsedTime();
    });

    // TODO : idk the type
    const orbitControlRef = createRef<any>();
    return (
        <>
            <OrbitControls makeDefault ref={orbitControlRef} />
            {/* <CameraControls ref={camRef} /> */}
            {/* <ambientLight intensity={0.5} /> */}

            {/* <PivotControls
                rotation={[0, -Math.PI / 2, 0]}
                anchor={[1, -1, -1]}
                scale={100}
                depthTest={false}
                fixed
                lineWidth={4}
            >
                <mesh
                    scale={5}
                    receiveShadow
                    position={[0, -2, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                >
                    <planeGeometry />
                    <meshBasicMaterial color={new Color(0x020302)} />
                </mesh>
            </PivotControls> */}

            {/* <PivotControls
                ref={pivotRef}
                rotation={[0, -Math.PI / 2, 0]}
                anchor={[1, -1, -1]}
                scale={100}
                depthTest={false}
                fixed
                lineWidth={4}
            > */}
            <TransformControls mode="translate">
                <WireBox visible={true} />
            </TransformControls>
            {/* </PivotControls> */}

            <WireBox ref={boxRef} visible={false} />

            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial attach={"material"} />
            </mesh>

            <GizmoHelper alignment="bottom-right" margin={[70, 70]}>
                <GizmoViewport labelColor="white" axisHeadScale={1} />
            </GizmoHelper>
        </>
    );
}
