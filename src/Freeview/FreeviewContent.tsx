import {
    Edges,
    Fisheye,
    KeyboardControls,
    KeyboardControlsEntry,
    OrbitControls,
    useKeyboardControls,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    ReactNode,
    forwardRef,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import Test from "./test";
import { BoxGeometry, CapsuleGeometry, Mesh } from "three";
import { useFreeviewContext } from "./FreeviewContext";

enum Controls {
    forward = "forward",
    back = "back",
    left = "left",
    right = "right",
    jump = "jump",
}

interface WireBoxProps {
    visible: boolean;
    solidColour: boolean;
}

interface WireCylinderProps {
    solidColour: boolean;
    visible: boolean;
}

interface WireShapeProps {
    visible: boolean;
    solidColour: boolean;
    geometry: ReactNode;
}

const WireShape = forwardRef<Mesh, WireShapeProps>((props, ref) => {
    // const [solidColour, setSolidColour] = useState(props.solidColour);

    return (
        <mesh ref={ref} visible={props.visible}>
            {props.geometry}
            {/* <meshBasicMaterial
                transparent={false}
                color="#333"
                depthTest={true}
                opacity={solidColour ? 1 : 0}
            /> */}
            <meshStandardMaterial
                attach="material"
                color={"#6be092"}
                opacity={props.solidColour ? 1 : 0}
                transparent={props.solidColour ? false : true}
            />
            <Edges
                scale={1}
                threshold={10} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
                color="white"
            />
        </mesh>
    );
});

const WireBox = forwardRef<Mesh, WireBoxProps>((props, ref) => {
    return (
        <WireShape
            ref={ref}
            solidColour={props.solidColour}
            visible={props.visible}
            geometry={<boxGeometry args={[1, 1, 1]} />}
        />
    );
});

const WireCylinder = forwardRef<Mesh, WireCylinderProps>((props, ref) => {
    return (
        <WireShape
            ref={ref}
            visible={props.visible}
            solidColour={props.solidColour}
            geometry={<cylinderGeometry args={[1, 1, 1]} />}
        />
    );
});

// const WireCone = forwardRef<Mesh, WireCylinderProps>((props, ref) => {
//     return (
//         <WireShape
//             ref={ref}
//             visible={props.visible}
//             geometry={<coneGeometry args={[4, 5, 8]} />}
//         />
//     );
// });

// const TEST = forwardRef<Mesh, WireCylinderProps>((props, ref) => {
//     return (
//         <WireShape
//             ref={ref}
//             visible={props.visible}
//             geometry={<ringGeometry args={[1, 2, 32]} />}
//         />
//     );
// });

const Content = () => {
    const { subscribeToEvents, unsubscribeFromEvents, shape, solidColour } =
        useFreeviewContext();
    const boxRef = useRef<Mesh>(null);
    const cylinderRef = useRef<Mesh>(null);
    const refs = [boxRef, cylinderRef];

    const [solidColourEnabled, setSolidColourEnabled] = useState(
        solidColour.current
    );
    const [edges, setEdges] = useState(false);

    useEffect(() => {
        const id = subscribeToEvents((eventType: string) => {
            if (eventType == "shape_change") {
                // hide all refs first
                refs.forEach((ref) => {
                    if (ref.current) ref.current.visible = false;
                });

                // then show the chosen one
                switch (shape.current) {
                    case "box":
                        if (boxRef.current) boxRef.current.visible = true;
                        break;
                    case "cylinder":
                        if (cylinderRef.current)
                            cylinderRef.current.visible = true;
                        break;
                }
            }

            if (eventType == "solidColour_change") {
                setSolidColourEnabled(solidColour.current);
            }
        });

        return () => unsubscribeFromEvents(id);
    }, []);

    const backPressed = useKeyboardControls<Controls>((state) => state.back);
    useFrame(({}) => {
        if (backPressed) {
            if (boxRef.current) {
                boxRef.current.rotation.set(
                    boxRef.current.rotation.x + 0.01,
                    boxRef.current.rotation.y,
                    boxRef.current.rotation.z
                );
            }
        }
    });

    return (
        <>
            {/* <WireShape
                visible={true}
                geometry={<torusGeometry args={[1, 0.25, 32, 100]} />}
            /> */}
            {/* <WireShape
                visible={true}
                geometry={<capsuleGeometry args={[1, 1, 4, 8]} />}
            /> */}
            {/* <WireShape
                visible={true}
                geometry={<circleGeometry args={[1, 32]} />}
            /> */}

            {/* better without wireframe */}
            {/* <WireShape
                visible={true}
                solidColour={solidColour}
                ref={boxRef}
                geometry={<torusKnotGeometry args={[5, 1.5, 50, 8]} />}
            /> */}

            <WireBox
                visible={shape.current == "box"}
                ref={boxRef}
                solidColour={solidColourEnabled}
            />
            <WireCylinder
                visible={shape.current == "cylinder"}
                ref={cylinderRef}
                solidColour={solidColourEnabled}
            />
        </>
    );
};

export default function FreeviewContent() {
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
                    {/* <ambientLight /> */}
                    <pointLight
                        intensity={4}
                        color={0xffffff}
                        position={[2, 2, 2]}
                    />
                    <OrbitControls />

                    {/* <Fisheye zoom={1}> */}
                    <Content />
                    {/* </Fisheye> */}
                </Canvas>
            </KeyboardControls>
        </div>
    );
}
