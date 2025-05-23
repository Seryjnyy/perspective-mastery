import { Button, Checkbox, Slider } from "./base-ui";

const CameraTab = ({
    cameraPosition,
    setCameraPosition,
    cameraFov,
    setCameraFov,
    resetCamera,
}: {
    cameraPosition: { x: number; y: number; z: number };
    setCameraPosition: (pos: { x: number; y: number; z: number }) => void;
    cameraFov: number;
    setCameraFov: (fov: number) => void;
    resetCamera: () => void;
}) => (
    <div>
        <h3 className="font-bold mb-2">Camera Controls</h3>
        <Slider
            label="Position X"
            value={cameraPosition.x}
            min={-10}
            max={10}
            step={0.1}
            onChange={(value) =>
                setCameraPosition({ ...cameraPosition, x: value })
            }
        />
        <Slider
            label="Position Y"
            value={cameraPosition.y}
            min={-10}
            max={10}
            step={0.1}
            onChange={(value) =>
                setCameraPosition({ ...cameraPosition, y: value })
            }
        />
        <Slider
            label="Position Z"
            value={cameraPosition.z}
            min={-10}
            max={10}
            step={0.1}
            onChange={(value) =>
                setCameraPosition({ ...cameraPosition, z: value })
            }
        />
        <Slider
            label="FOV"
            value={cameraFov}
            min={10}
            max={120}
            step={1}
            onChange={setCameraFov}
        />
        <Button onClick={resetCamera}>Reset Camera</Button>
    </div>
);

const LookAtTab = ({
    lookAtEnabled,
    setLookAtEnabled,
    showTarget,
    setShowTarget,
    lookAtTarget,
    setLookAtTarget,
    resetLookAt,
    lookAtObject,
}: {
    lookAtEnabled: boolean;
    setLookAtEnabled: (enabled: boolean) => void;
    showTarget: boolean;
    setShowTarget: (show: boolean) => void;
    lookAtTarget: { x: number; y: number; z: number };
    setLookAtTarget: (target: { x: number; y: number; z: number }) => void;
    resetLookAt: () => void;
    lookAtObject: () => void;
}) => (
    <div>
        <h3 className="font-bold mb-2">Look-At Target</h3>
        <Checkbox
            label="Enable Look-At"
            checked={lookAtEnabled}
            onChange={() => setLookAtEnabled(!lookAtEnabled)}
        />
        <Checkbox
            label="Show Target Marker"
            checked={showTarget}
            onChange={() => setShowTarget(!showTarget)}
        />
        <Slider
            label="Target X"
            value={lookAtTarget.x}
            min={-5}
            max={5}
            step={0.1}
            onChange={(value) => setLookAtTarget({ ...lookAtTarget, x: value })}
            disabled={!lookAtEnabled}
        />
        <Slider
            label="Target Y"
            value={lookAtTarget.y}
            min={-5}
            max={5}
            step={0.1}
            onChange={(value) => setLookAtTarget({ ...lookAtTarget, y: value })}
            disabled={!lookAtEnabled}
        />
        <Slider
            label="Target Z"
            value={lookAtTarget.z}
            min={-5}
            max={5}
            step={0.1}
            onChange={(value) => setLookAtTarget({ ...lookAtTarget, z: value })}
            disabled={!lookAtEnabled}
        />
        <div className="flex gap-2">
            <Button onClick={resetLookAt} disabled={!lookAtEnabled}>
                Reset Target
            </Button>
            <Button onClick={lookAtObject} variant="success">
                Look At Object
            </Button>
        </div>
    </div>
);

const PositionTab = ({
    objectPosition,
    setObjectPosition,
    resetObject,
}: {
    objectPosition: { x: number; y: number; z: number };
    setObjectPosition: (pos: { x: number; y: number; z: number }) => void;
    resetObject: () => void;
}) => (
    <div>
        <h3 className="font-bold mb-2">Object Position</h3>
        <Slider
            label="Position X"
            value={objectPosition.x}
            min={-5}
            max={5}
            step={0.1}
            onChange={(value) =>
                setObjectPosition({ ...objectPosition, x: value })
            }
        />
        <Slider
            label="Position Y"
            value={objectPosition.y}
            min={-5}
            max={5}
            step={0.1}
            onChange={(value) =>
                setObjectPosition({ ...objectPosition, y: value })
            }
        />
        <Slider
            label="Position Z"
            value={objectPosition.z}
            min={-5}
            max={5}
            step={0.1}
            onChange={(value) =>
                setObjectPosition({ ...objectPosition, z: value })
            }
        />
        <Button onClick={resetObject}>Reset Object</Button>
    </div>
);

const ScaleTab = ({
    objectScale,
    setObjectScale,
    resetObject,
}: {
    objectScale: { x: number; y: number; z: number };
    setObjectScale: (scale: { x: number; y: number; z: number }) => void;
    resetObject: () => void;
}) => (
    <div>
        <h3 className="font-bold mb-2">Object Scale</h3>
        <Slider
            label="Scale X"
            value={objectScale.x}
            min={0.1}
            max={3}
            step={0.1}
            onChange={(value) => setObjectScale({ ...objectScale, x: value })}
        />
        <Slider
            label="Scale Y"
            value={objectScale.y}
            min={0.1}
            max={3}
            step={0.1}
            onChange={(value) => setObjectScale({ ...objectScale, y: value })}
        />
        <Slider
            label="Scale Z"
            value={objectScale.z}
            min={0.1}
            max={3}
            step={0.1}
            onChange={(value) => setObjectScale({ ...objectScale, z: value })}
        />
        <Button onClick={resetObject}>Reset Object</Button>
    </div>
);

const RotationTab = ({
    objectRotation,
    setObjectRotation,
    toggleAutoRotation,
    resetObject,
}: {
    objectRotation: {
        x: number;
        y: number;
        z: number;
        autoRotate: boolean;
        manual: { x: number; y: number; z: number };
    };
    setObjectRotation: (rotation: {
        x: number;
        y: number;
        z: number;
        autoRotate: boolean;
        manual: { x: number; y: number; z: number };
    }) => void;
    toggleAutoRotation: () => void;
    resetObject: () => void;
}) => {
    const rotateObject = (axis: "x" | "y" | "z", degrees: number) => {
        const radians = (degrees * Math.PI) / 180;
        //     setObjectRotation(prev => ({
        //         ...prev,
        //         manual: {
        //             ...prev.manual,
        //             [axis]: prev.manual[axis] + radians
        //         }
        //     })

        // );
        setObjectRotation({
            ...objectRotation,
            manual: {
                ...objectRotation.manual,
                [axis]: objectRotation.manual[axis] + radians,
            },
        });
    };

    return (
        <div>
            <h3 className="font-bold mb-2">Object Rotation</h3>
            <Slider
                label="Rotation X"
                value={objectRotation.manual.x}
                min={0}
                max={2 * Math.PI}
                step={0.1}
                onChange={(value) =>
                    setObjectRotation({
                        ...objectRotation,
                        manual: { ...objectRotation.manual, x: value },
                    })
                }
            />
            <Slider
                label="Rotation Y"
                value={objectRotation.manual.y}
                min={0}
                max={2 * Math.PI}
                step={0.1}
                onChange={(value) =>
                    setObjectRotation({
                        ...objectRotation,
                        manual: { ...objectRotation.manual, y: value },
                    })
                }
            />
            <Slider
                label="Rotation Z"
                value={objectRotation.manual.z}
                min={0}
                max={2 * Math.PI}
                step={0.1}
                onChange={(value) =>
                    setObjectRotation({
                        ...objectRotation,
                        manual: { ...objectRotation.manual, z: value },
                    })
                }
            />
            <Checkbox
                label="Auto-rotate"
                checked={objectRotation.autoRotate}
                onChange={toggleAutoRotation}
            />
            <div className="mt-3 border-t border-gray-600 pt-3">
                <h4 className="font-semibold mb-2">Quick Rotation</h4>
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        size="small"
                        variant="danger"
                        onClick={() => rotateObject("x", 10)}
                    >
                        X +10°
                    </Button>
                    <Button
                        size="small"
                        variant="danger"
                        onClick={() => rotateObject("x", -10)}
                    >
                        X -10°
                    </Button>
                    <Button
                        size="small"
                        variant="success"
                        onClick={() => rotateObject("y", 10)}
                    >
                        Y +10°
                    </Button>
                    <Button
                        size="small"
                        variant="success"
                        onClick={() => rotateObject("y", -10)}
                    >
                        Y -10°
                    </Button>
                    <Button size="small" onClick={() => rotateObject("z", 10)}>
                        Z +10°
                    </Button>
                    <Button size="small" onClick={() => rotateObject("z", -10)}>
                        Z -10°
                    </Button>
                </div>
            </div>
            <Button onClick={resetObject}>Reset Object</Button>
        </div>
    );
};

export { CameraTab, LookAtTab, PositionTab, ScaleTab, RotationTab };
