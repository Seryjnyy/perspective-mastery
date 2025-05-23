import { TabButton } from "./base-ui";
import {
    CameraTab,
    LookAtTab,
    PositionTab,
    RotationTab,
    ScaleTab,
} from "./tabs";

export const ControlsPanel = ({
    activeTab,
    setActiveTab,
    cameraPosition,
    setCameraPosition,
    cameraFov,
    setCameraFov,
    resetCamera,
    lookAtEnabled,
    setLookAtEnabled,
    showTarget,
    setShowTarget,
    lookAtTarget,
    setLookAtTarget,
    resetLookAt,
    lookAtObject,
    objectPosition,
    setObjectPosition,
    objectScale,
    setObjectScale,
    objectRotation,
    setObjectRotation,
    toggleAutoRotation,
    resetObject,
}: {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    cameraPosition: { x: number; y: number; z: number };
    setCameraPosition: (position: { x: number; y: number; z: number }) => void;
    cameraFov: number;
    setCameraFov: (fov: number) => void;
    resetCamera: () => void;
    lookAtEnabled: boolean;
    setLookAtEnabled: (enabled: boolean) => void;
    showTarget: boolean;
    setShowTarget: (show: boolean) => void;
    lookAtTarget: { x: number; y: number; z: number };
    setLookAtTarget: (target: { x: number; y: number; z: number }) => void;
    resetLookAt: () => void;
    lookAtObject: () => void;
    objectPosition: { x: number; y: number; z: number };
    setObjectPosition: (position: { x: number; y: number; z: number }) => void;
    objectScale: { x: number; y: number; z: number };
    setObjectScale: (scale: { x: number; y: number; z: number }) => void;
    objectRotation: {
        x: number;
        y: number;
        z: number;
        autoRotate: boolean;
        manual: { x: number; y: number; z: number };
    };
    setObjectRotation: (rotation: { x: number; y: number; z: number }) => void;
    toggleAutoRotation: () => void;
    resetObject: () => void;
}) => {
    const tabs = [
        { id: "camera", label: "Camera" },
        { id: "lookAt", label: "Look At" },
        { id: "position", label: "Position" },
        { id: "scale", label: "Scale" },
        { id: "rotation", label: "Rotation" },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "camera":
                return (
                    <CameraTab
                        {...{
                            cameraPosition,
                            setCameraPosition,
                            cameraFov,
                            setCameraFov,
                            resetCamera,
                        }}
                    />
                );
            case "lookAt":
                return (
                    <LookAtTab
                        {...{
                            lookAtEnabled,
                            setLookAtEnabled,
                            showTarget,
                            setShowTarget,
                            lookAtTarget,
                            setLookAtTarget,
                            resetLookAt,
                            lookAtObject,
                        }}
                    />
                );
            case "position":
                return (
                    <PositionTab
                        {...{ objectPosition, setObjectPosition, resetObject }}
                    />
                );
            case "scale":
                return (
                    <ScaleTab
                        {...{ objectScale, setObjectScale, resetObject }}
                    />
                );
            case "rotation":
                return (
                    <RotationTab
                        {...{
                            objectRotation,
                            setObjectRotation,
                            toggleAutoRotation,
                            resetObject,
                        }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="absolute top-2 right-2 bg-black/70 text-white p-3 rounded-md font-mono z-10 min-w-[250px]">
            {/* Tabs */}
            <div className="flex mb-3">
                {tabs.map((tab) => (
                    <TabButton
                        key={tab.id}
                        active={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </TabButton>
                ))}
            </div>

            {/* Tab Content */}
            {renderTabContent()}
        </div>
    );
};
