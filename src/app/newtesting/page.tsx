"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
    OrbitControls,
    PerspectiveCamera,
    GizmoHelper,
    GizmoViewport,
    Line,
} from "@react-three/drei";
import * as THREE from "three";
import { DataDisplayObject, DataDisplaySection } from "./data-display/base";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Fullscreen, FullscreenIcon } from "lucide-react";
import {
    EnterFullScreenIcon,
    ExitFullScreenIcon,
    GearIcon,
} from "@radix-ui/react-icons";

// Scene with a controllable object group
const Scene = ({
    objectPosition,
    objectScale,
    objectRotation,
    lookAtTarget,
    showTarget,
}) => {
    const groupRef = useRef<THREE.Group>(null);
    const boxRef = useRef<THREE.Mesh>(null);

    // Apply position and scale to the group
    useEffect(() => {
        if (groupRef.current) {
            groupRef.current.position.set(
                objectPosition.x,
                objectPosition.y,
                objectPosition.z
            );
            groupRef.current.scale.set(
                objectScale.x,
                objectScale.y,
                objectScale.z
            );
        }
    }, [objectPosition, objectScale]);

    // Animate the box rotation inside the group if auto-rotation is enabled
    useFrame(() => {
        if (boxRef.current && objectRotation.autoRotate) {
            boxRef.current.rotation.x += objectRotation.speed.x;
            boxRef.current.rotation.y += objectRotation.speed.y;
            boxRef.current.rotation.z += objectRotation.speed.z;
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            {/* Controllable group that can contain any mesh/model */}
            <group ref={groupRef}>
                <mesh
                    ref={boxRef}
                    rotation={[
                        objectRotation.manual.x,
                        objectRotation.manual.y,
                        objectRotation.manual.z,
                    ]}
                >
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </group>

            {/* Visual indicator for the look-at target point */}
            {showTarget && (
                <mesh
                    position={[lookAtTarget.x, lookAtTarget.y, lookAtTarget.z]}
                >
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshBasicMaterial color="red" />
                </mesh>
            )}

            <gridHelper args={[10, 10]} />
        </>
    );
};

// Camera data collector component - inside Canvas
const CameraDataCollector = ({ onCameraDataChange }) => {
    const { camera } = useThree();

    useFrame(() => {
        const data = {
            position: {
                x: Number(camera.position.x.toFixed(2)),
                y: Number(camera.position.y.toFixed(2)),
                z: Number(camera.position.z.toFixed(2)),
            },
            rotation: {
                x: Number(camera.rotation.x.toFixed(2)),
                y: Number(camera.rotation.y.toFixed(2)),
                z: Number(camera.rotation.z.toFixed(2)),
            },
            fov: Number((camera as THREE.PerspectiveCamera).fov.toFixed(2)),
            near: Number(camera.near.toFixed(2)),
            far: Number(camera.far.toFixed(2)),
            aspect: Number(
                (camera as THREE.PerspectiveCamera).aspect.toFixed(2)
            ),
            zoom: Number(camera.zoom.toFixed(2)),
        };

        onCameraDataChange(data);
    });

    return null; // This component doesn't render anything itself
};

// Camera controls component for the 3D scene - inside Canvas
const CameraControlsInScene = ({
    cameraPosition,
    cameraFov,
    lookAtTarget,
    lookAtEnabled,
}) => {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const controlsRef = useRef(null);

    // Update camera when controls change
    useEffect(() => {
        if (cameraRef.current) {
            // Set camera position
            cameraRef.current.position.set(
                cameraPosition.x,
                cameraPosition.y,
                cameraPosition.z
            );

            // Apply look-at if enabled
            if (lookAtEnabled) {
                cameraRef.current.lookAt(
                    lookAtTarget.x,
                    lookAtTarget.y,
                    lookAtTarget.z
                );
            }

            // Update FOV and projection matrix
            cameraRef.current.fov = cameraFov;
            cameraRef.current.updateProjectionMatrix();
        }
    }, [cameraPosition, cameraFov, lookAtTarget, lookAtEnabled]);

    // Disable OrbitControls when look-at is enabled
    useEffect(() => {
        if (controlsRef.current) {
            controlsRef.current.enabled = !lookAtEnabled;
        }
    }, [lookAtEnabled]);

    return (
        <>
            <PerspectiveCamera
                ref={cameraRef}
                makeDefault
                position={[
                    cameraPosition.x,
                    cameraPosition.y,
                    cameraPosition.z,
                ]}
                fov={cameraFov}
                near={0.1}
                far={1000}
            />
            {/* OrbitControls will be disabled when lookAt is enabled */}

            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                <GizmoViewport
                    axisColors={["red", "green", "blue"]}
                    labelColor="white"
                />
            </GizmoHelper>
        </>
    );
};

// Main component
const CameraControlsScene = () => {
    // Camera state
    const [cameraPosition, setCameraPosition] = useState({ x: 3, y: 3, z: 5 });
    const [cameraFov, setCameraFov] = useState(50);
    const [cameraData, setCameraData] = useState({
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        fov: 0,
        near: 0,
        far: 0,
        aspect: 0,
        zoom: 0,
    });

    // Look-at target state
    const [lookAtTarget, setLookAtTarget] = useState({ x: 0, y: 0, z: 0 });
    const [lookAtEnabled, setLookAtEnabled] = useState(true);
    const [showLookAtTarget, setShowLookAtTarget] = useState(true);

    // Object state
    const [objectPosition, setObjectPosition] = useState({ x: 0, y: 0, z: 0 });
    const [objectScale, setObjectScale] = useState({ x: 1, y: 1, z: 1 });
    const [objectRotation, setObjectRotation] = useState({
        manual: { x: 0, y: 0, z: 0 },
        autoRotate: false,
        speed: { x: 0.005, y: 0.01, z: 0 },
    });

    // Active controls tab state
    const [activeTab, setActiveTab] = useState("camera"); // "camera", "lookAt", "position", "scale", "rotation"

    const handleCameraDataChange = (data) => {
        setCameraData(data);
    };

    // Toggle auto rotation
    const toggleAutoRotation = () => {
        setObjectRotation({
            ...objectRotation,
            autoRotate: !objectRotation.autoRotate,
        });
    };

    // Reset object to default
    const resetObject = () => {
        setObjectPosition({ x: 0, y: 0, z: 0 });
        setObjectScale({ x: 1, y: 1, z: 1 });
        setObjectRotation({
            ...objectRotation,
            manual: { x: 0, y: 0, z: 0 },
        });
    };

    // Reset camera to default
    const resetCamera = () => {
        setCameraPosition({ x: 3, y: 3, z: 5 });
        setCameraFov(50);
    };

    // Reset look-at target to default
    const resetLookAt = () => {
        setLookAtTarget({ x: 0, y: 0, z: 0 });
    };

    // Look at object position
    const lookAtObject = () => {
        setLookAtTarget({
            x: objectPosition.x,
            y: objectPosition.y,
            z: objectPosition.z,
        });
        setLookAtEnabled(true);
    };

    const rotateObject = (axis, degrees) => {
        const radians = (degrees * Math.PI) / 180;
        setObjectRotation((prev) => ({
            ...prev,
            manual: {
                ...prev.manual,
                [axis]: prev.manual[axis] + radians,
            },
        }));
    };

    return (
        <div className="w-full h-[90vh] relative">
            {/* Camera Data Info Panel */}
            <div className="absolute top-2 left-2 bg-black/70 text-white p-3 rounded-md font-mono text-xs max-w-[300px] z-10">
                <Tabs defaultValue="camera">
                    <TabsList>
                        <TabsTrigger value="camera">Camera</TabsTrigger>
                        <TabsTrigger value="object">Object</TabsTrigger>
                        <TabsTrigger value="look-at-target">
                            Look at target
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="camera">
                        <DataDisplaySection title="Camera Data">
                            <DataDisplayObject data={cameraData} />
                        </DataDisplaySection>
                    </TabsContent>
                    <TabsContent value="object">
                        <DataDisplaySection title="Object Data">
                            <DataDisplayObject
                                data={{
                                    position: objectPosition,
                                    scale: objectScale,
                                    rotation: objectRotation.manual,
                                }}
                            />
                        </DataDisplaySection>
                    </TabsContent>
                    <TabsContent value="look-at-target">
                        <DataDisplaySection title="Look At Target Data">
                            <DataDisplayObject
                                data={{
                                    position: lookAtTarget,
                                    enabled: lookAtEnabled,
                                    showTarget: showLookAtTarget,
                                }}
                            />
                        </DataDisplaySection>
                    </TabsContent>
                </Tabs>
            </div>
            <SceneVisualisationPreview
                lookAtTargetPosition={lookAtTarget}
                cameraPosition={cameraPosition}
                cameraRotation={cameraData.rotation}
                fov={cameraFov}
                aspect={cameraData.aspect}
                near={cameraData.near}
                far={cameraData.far}
                objectPosition={objectPosition}
                objectRotation={objectRotation.manual}
                objectScale={objectScale}
            />
            Controls Panel with Tabs
            <div className="absolute top-2 right-2 bg-black/70 text-white p-3 rounded-md font-mono z-10 min-w-[250px]">
                {/* Tabs */}
                <div className="flex mb-3">
                    <button
                        className={`flex-1 py-1 ${
                            activeTab === "camera"
                                ? "bg-gray-600"
                                : "bg-gray-800"
                        } border-none text-white cursor-pointer`}
                        onClick={() => setActiveTab("camera")}
                    >
                        Camera
                    </button>
                    <button
                        className={`flex-1 py-1 ${
                            activeTab === "lookAt"
                                ? "bg-gray-600"
                                : "bg-gray-800"
                        } border-none text-white cursor-pointer`}
                        onClick={() => setActiveTab("lookAt")}
                    >
                        Look At
                    </button>
                    <button
                        className={`flex-1 py-1 ${
                            activeTab === "position"
                                ? "bg-gray-600"
                                : "bg-gray-800"
                        } border-none text-white cursor-pointer`}
                        onClick={() => setActiveTab("position")}
                    >
                        Position
                    </button>
                    <button
                        className={`flex-1 py-1 ${
                            activeTab === "scale"
                                ? "bg-gray-600"
                                : "bg-gray-800"
                        } border-none text-white cursor-pointer`}
                        onClick={() => setActiveTab("scale")}
                    >
                        Scale
                    </button>
                    <button
                        className={`flex-1 py-1 ${
                            activeTab === "rotation"
                                ? "bg-gray-600"
                                : "bg-gray-800"
                        } border-none text-white cursor-pointer`}
                        onClick={() => setActiveTab("rotation")}
                    >
                        Rotation
                    </button>
                </div>

                {/* Camera Controls Tab */}
                {activeTab === "camera" && (
                    <div>
                        <h3 className="font-bold mb-2">Camera Controls</h3>
                        <div className="mb-2">
                            <label className="block">
                                Position X:
                                <input
                                    type="range"
                                    min="-10"
                                    max="10"
                                    step="0.1"
                                    value={cameraPosition.x}
                                    onChange={(e) =>
                                        setCameraPosition({
                                            ...cameraPosition,
                                            x: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full mt-1"
                                />
                                {cameraPosition.x.toFixed(1)}
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="block">
                                Position Y:
                                <input
                                    type="range"
                                    min="-10"
                                    max="10"
                                    step="0.1"
                                    value={cameraPosition.y}
                                    onChange={(e) =>
                                        setCameraPosition({
                                            ...cameraPosition,
                                            y: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full mt-1"
                                />
                                {cameraPosition.y.toFixed(1)}
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="block">
                                Position Z:
                                <input
                                    type="range"
                                    min="-10"
                                    max="10"
                                    step="0.1"
                                    value={cameraPosition.z}
                                    onChange={(e) =>
                                        setCameraPosition({
                                            ...cameraPosition,
                                            z: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full mt-1"
                                />
                                {cameraPosition.z.toFixed(1)}
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="block">
                                FOV:
                                <input
                                    type="range"
                                    min="10"
                                    max="120"
                                    step="1"
                                    value={cameraFov}
                                    onChange={(e) =>
                                        setCameraFov(parseInt(e.target.value))
                                    }
                                    className="w-full mt-1"
                                />
                                {cameraFov}°
                            </label>
                        </div>
                        <button
                            className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
                            onClick={resetCamera}
                        >
                            Reset Camera
                        </button>
                    </div>
                )}

                {/* Look At Tab */}
                {activeTab === "lookAt" && (
                    <div>
                        <h3 className="font-bold mb-2">Look-At Target</h3>
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={lookAtEnabled}
                                    onChange={() =>
                                        setLookAtEnabled(!lookAtEnabled)
                                    }
                                    className="mr-2"
                                />
                                Enable Look-At
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={showLookAtTarget}
                                    onChange={() =>
                                        setShowLookAtTarget(!showLookAtTarget)
                                    }
                                    className="mr-2"
                                />
                                Show Target Marker
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="block">
                                Target X:
                                <input
                                    type="range"
                                    min="-5"
                                    max="5"
                                    step="0.1"
                                    value={lookAtTarget.x}
                                    onChange={(e) =>
                                        setLookAtTarget({
                                            ...lookAtTarget,
                                            x: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full mt-1"
                                    disabled={!lookAtEnabled}
                                />
                                {lookAtTarget.x.toFixed(1)}
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="block">
                                Target Y:
                                <input
                                    type="range"
                                    min="-5"
                                    max="5"
                                    step="0.1"
                                    value={lookAtTarget.y}
                                    onChange={(e) =>
                                        setLookAtTarget({
                                            ...lookAtTarget,
                                            y: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full mt-1"
                                    disabled={!lookAtEnabled}
                                />
                                {lookAtTarget.y.toFixed(1)}
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="block">
                                Target Z:
                                <input
                                    type="range"
                                    min="-5"
                                    max="5"
                                    step="0.1"
                                    value={lookAtTarget.z}
                                    onChange={(e) =>
                                        setLookAtTarget({
                                            ...lookAtTarget,
                                            z: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full mt-1"
                                    disabled={!lookAtEnabled}
                                />
                                {lookAtTarget.z.toFixed(1)}
                            </label>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
                                onClick={resetLookAt}
                                disabled={!lookAtEnabled}
                            >
                                Reset Target
                            </button>
                            <button
                                className="mt-2 px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white"
                                onClick={lookAtObject}
                            >
                                Look At Object
                            </button>
                        </div>
                    </div>
                )}

                {/* Object Position Tab */}
                {activeTab === "position" && (
                    <div>
                        <h3 className="font-bold mb-2">Object Position</h3>
                        <div className="mb-2">
                            <label className="block">
                                Position X:
                                <input
                                    type="range"
                                    min="-5"
                                    max="5"
                                    step="0.1"
                                    value={objectPosition.x}
                                    onChange={(e) =>
                                        setObjectPosition({
                                            ...objectPosition,
                                            x: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full mt-1"
                                />
                                {objectPosition.x.toFixed(1)}
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="block">
                                Position Y:
                                <input
                                    type="range"
                                    min="-5"
                                    max="5"
                                    step="0.1"
                                    value={objectPosition.y}
                                    onChange={(e) =>
                                        setObjectPosition({
                                            ...objectPosition,
                                            y: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full mt-1"
                                />
                                {objectPosition.y.toFixed(1)}
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="block">
                                Position Z:
                                <input
                                    type="range"
                                    min="-5"
                                    max="5"
                                    step="0.1"
                                    value={objectPosition.z}
                                    onChange={(e) =>
                                        setObjectPosition({
                                            ...objectPosition,
                                            z: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full mt-1"
                                />
                                {objectPosition.z.toFixed(1)}
                            </label>
                        </div>
                        <button
                            className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
                            onClick={resetObject}
                        >
                            Reset Object
                        </button>
                    </div>
                )}

                {/* Object Scale Tab */}
                {activeTab === "scale" && (
                    <div>
                        <h3 className="font-bold mb-2">Object Scale</h3>
                        <div className="mb-2">
                            <label className="block">
                                Scale X:
                                <input
                                    type="range"
                                    min="0.1"
                                    max="3"
                                    step="0.1"
                                    value={objectScale.x}
                                    onChange={(e) =>
                                        setObjectScale({
                                            ...objectScale,
                                            x: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full mt-1"
                                />
                                {objectScale.x.toFixed(1)}
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="block">
                                Scale Y:
                                <input
                                    type="range"
                                    min="0.1"
                                    max="3"
                                    step="0.1"
                                    value={objectScale.y}
                                    onChange={(e) =>
                                        setObjectScale({
                                            ...objectScale,
                                            y: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full mt-1"
                                />
                                {objectScale.y.toFixed(1)}
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="block">
                                Scale Z:
                                <input
                                    type="range"
                                    min="0.1"
                                    max="3"
                                    step="0.1"
                                    value={objectScale.z}
                                    onChange={(e) =>
                                        setObjectScale({
                                            ...objectScale,
                                            z: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full mt-1"
                                />
                                {objectScale.z.toFixed(1)}
                            </label>
                        </div>
                        <button
                            className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
                            onClick={resetObject}
                        >
                            Reset Object
                        </button>
                    </div>
                )}

                {/* Object Rotation Tab */}
                {activeTab === "rotation" && (
                    <div>
                        <h3 className="font-bold mb-2">Object Rotation</h3>
                        <div className="mb-2">
                            <label className="block">
                                Rotation X:
                                <input
                                    type="range"
                                    min="0"
                                    max={2 * Math.PI}
                                    step="0.1"
                                    value={objectRotation.manual.x}
                                    onChange={(e) =>
                                        setObjectRotation({
                                            ...objectRotation,
                                            manual: {
                                                ...objectRotation.manual,
                                                x: parseFloat(e.target.value),
                                            },
                                        })
                                    }
                                    className="w-full mt-1"
                                />
                                {objectRotation.manual.x.toFixed(1)}
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="block">
                                Rotation Y:
                                <input
                                    type="range"
                                    min="0"
                                    max={2 * Math.PI}
                                    step="0.1"
                                    value={objectRotation.manual.y}
                                    onChange={(e) =>
                                        setObjectRotation({
                                            ...objectRotation,
                                            manual: {
                                                ...objectRotation.manual,
                                                y: parseFloat(e.target.value),
                                            },
                                        })
                                    }
                                    className="w-full mt-1"
                                />
                                {objectRotation.manual.y.toFixed(1)}
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="block">
                                Rotation Z:
                                <input
                                    type="range"
                                    min="0"
                                    max={2 * Math.PI}
                                    step="0.1"
                                    value={objectRotation.manual.z}
                                    onChange={(e) =>
                                        setObjectRotation({
                                            ...objectRotation,
                                            manual: {
                                                ...objectRotation.manual,
                                                z: parseFloat(e.target.value),
                                            },
                                        })
                                    }
                                    className="w-full mt-1"
                                />
                                {objectRotation.manual.z.toFixed(1)}
                            </label>
                        </div>
                        <div className="mt-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={objectRotation.autoRotate}
                                    onChange={toggleAutoRotation}
                                    className="mr-2"
                                />
                                Auto-rotate
                            </label>
                        </div>
                        <button
                            className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
                            onClick={resetObject}
                        >
                            Reset Object
                        </button>
                    </div>
                )}
                <div className="mt-3 border-t border-gray-600 pt-3">
                    <h4 className="font-semibold mb-2">Quick Rotation</h4>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs"
                            onClick={() => rotateObject("x", 10)}
                        >
                            X +10°
                        </button>
                        <button
                            className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded text-xs"
                            onClick={() => rotateObject("x", -10)}
                        >
                            X -10°
                        </button>
                        <button
                            className="px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs"
                            onClick={() => rotateObject("y", 10)}
                        >
                            Y +10°
                        </button>
                        <button
                            className="px-2 py-1 bg-green-500 hover:bg-green-600 rounded text-xs"
                            onClick={() => rotateObject("y", -10)}
                        >
                            Y -10°
                        </button>
                        <button
                            className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs"
                            onClick={() => rotateObject("z", 10)}
                        >
                            Z +10°
                        </button>
                        <button
                            className="px-2 py-1 bg-blue-500 hover:bg-blue-600 rounded text-xs"
                            onClick={() => rotateObject("z", -10)}
                        >
                            Z -10°
                        </button>
                    </div>
                </div>
            </div>
            {/* 3D Canvas */}
            <Canvas>
                <Scene
                    objectPosition={objectPosition}
                    objectScale={objectScale}
                    objectRotation={objectRotation}
                    lookAtTarget={lookAtTarget}
                    showTarget={showLookAtTarget && lookAtEnabled}
                />
                <CameraControlsInScene
                    cameraPosition={cameraPosition}
                    cameraFov={cameraFov}
                    lookAtTarget={lookAtTarget}
                    lookAtEnabled={lookAtEnabled}
                />
                <CameraDataCollector
                    onCameraDataChange={handleCameraDataChange}
                />
            </Canvas>
        </div>
    );
};

function SceneVisualisationPreview({
    lookAtTargetPosition,
    cameraPosition,
    cameraRotation,
    fov,
    aspect,
    near,
    far,
    objectPosition,
    objectRotation,
    objectScale,
}: {
    // Look At Target
    lookAtTargetPosition: { x: number; y: number; z: number };
    // Camera
    cameraPosition: { x: number; y: number; z: number };
    cameraRotation: { x: number; y: number; z: number };
    fov: number;
    aspect: number;
    near: number;
    far: number;
    // Object
    objectPosition: { x: number; y: number; z: number };
    objectRotation: { x: number; y: number; z: number };
    objectScale: { x: number; y: number; z: number };
}) {
    const cameraModelRef = useRef<THREE.Group>(null);

    const [isFullscreen, setIsFullscreen] = useState(false);
    const toggleFullscreen = () => {
        setIsFullscreen((prev) => !prev);
        console.log("Fullscreen toggled:", !isFullscreen);
    };

    return (
        <div
            className={cn(
                "absolute bottom-0 left-0 border-2 z-20 backdrop-blur-sm",
                isFullscreen ? "w-full h-full" : "w-[200px] h-[200px]"
            )}
        >
            <div className="absolute top-2 left-2 z-50">
                <Button
                    onClick={toggleFullscreen}
                    className="space-x-4"
                    variant={"ghost"}
                >
                    {isFullscreen ? (
                        <ExitFullScreenIcon />
                    ) : (
                        <>
                            <EnterFullScreenIcon />
                            <GearIcon />
                        </>
                    )}
                </Button>
            </div>
            <Canvas camera={{ position: [6, 2, 3], near: 0.1, far: 40000 }}>
                <OrbitControls />
                <ambientLight intensity={1} />
                <directionalLight
                    intensity={0.4}
                    color={0xffffff}
                    position={[2, 2, 2]}
                />
                <mesh
                    position={[
                        lookAtTargetPosition.x,
                        lookAtTargetPosition.y,
                        lookAtTargetPosition.z,
                    ]}
                >
                    <boxGeometry args={[0.3, 0.3, 0.3]} />
                    <meshBasicMaterial color="blue" />
                </mesh>
                <Line
                    points={[
                        [cameraPosition.x, cameraPosition.y, cameraPosition.z],
                        [
                            lookAtTargetPosition.x,
                            lookAtTargetPosition.y,
                            lookAtTargetPosition.z,
                        ],
                    ]}
                    color="yellow"
                    lineWidth={2}
                />

                <mesh
                    position={[
                        objectPosition.x,
                        objectPosition.y,
                        objectPosition.z,
                    ]}
                    rotation={[
                        objectRotation.x,
                        objectRotation.y,
                        objectRotation.z,
                    ]}
                    scale={[objectScale.x, objectScale.y, objectScale.z]}
                >
                    <boxGeometry args={[1, 1, 1]} />
                    <meshBasicMaterial color="orange" />
                </mesh>
                <group
                    ref={cameraModelRef}
                    position={[
                        cameraPosition.x,
                        cameraPosition.y,
                        cameraPosition.z,
                    ]}
                    rotation={[
                        cameraRotation.x,
                        cameraRotation.y,
                        cameraRotation.z,
                    ]}
                >
                    <mesh>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshBasicMaterial color="red" />
                    </mesh>
                    <group rotation={[0, 0, 0]}>
                        <FrustumVisualizer
                            position={[
                                cameraPosition.x,
                                cameraPosition.y,
                                cameraPosition.z,
                            ]}
                            target={[
                                lookAtTargetPosition.x,
                                lookAtTargetPosition.y,
                                lookAtTargetPosition.z,
                            ]}
                            fov={fov}
                            aspect={aspect}
                            near={near}
                            far={far}
                        />
                    </group>
                </group>
                <gridHelper args={[10, 10]} />
            </Canvas>
        </div>
    );
}

function FrustumVisualizer({
    position,
    target,
    fov,
    aspect,
    near,
    far,
}: {
    position: [number, number, number];
    target: [number, number, number];
    fov: number;
    aspect: number;
    near: number;
    far: number;
}) {
    const geometry = useMemo(() => {
        const cam = new THREE.PerspectiveCamera(fov, aspect, near, far);
        cam.position.set(...position);
        cam.lookAt(...target);
        cam.updateMatrixWorld();

        const helper = new THREE.CameraHelper(cam);
        return helper.geometry;
    }, [position, target, fov, aspect, near, far]);

    return (
        <lineSegments geometry={geometry}>
            <lineBasicMaterial color="orange" />
        </lineSegments>
    );
}

export default CameraControlsScene;
