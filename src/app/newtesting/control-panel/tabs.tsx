import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

import {useFrame} from "@react-three/fiber";
import React, {useEffect, useRef, useState} from "react";
import {AnimationPreset, animationPresets} from "../animations";
import {ButtonSetting, CheckboxSetting, SliderSetting} from "./base-ui";
import {Slider} from "@/components/ui/slider";
import {CaretLeftIcon, CaretRightIcon, LoopIcon, PauseIcon, PlayIcon, ReloadIcon,} from "@radix-ui/react-icons";
import {Toggle} from "@/components/ui/toggle";
import {Input} from "@/components/ui/input";
import {Progress} from "@/components/ui/progress";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {useTestingNewStore} from "@/app/newtesting/page";

const CameraTab = ({lookAtObject}: { lookAtObject: () => void }) => {
    const camera = useTestingNewStore()((state) => state.camera.data);
    const setCamera = useTestingNewStore()((state) => state.camera.setCamera);
    const setCameraDesiredPosition = useTestingNewStore()(
        (state) => state.camera.setCameraDesiredPosition
    );
    const resetCamera = useTestingNewStore()((state) => state.camera.resetCamera);

    const lookAtTarget = useTestingNewStore()((state) => state.lookAtTarget.data);
    const setLookAtTarget = useTestingNewStore()(
        (state) => state.lookAtTarget.setLookAtTarget
    );
    const resetLookAtTargetPosition = useTestingNewStore()(
        (state) => state.lookAtTarget.resetLookAtTargetPosition
    );

    return (
        <div>
            <h3 className="font-bold mb-2">Camera Controls</h3>
            <Tabs defaultValue="camera">
                <TabsList>
                    <TabsTrigger value="camera">Camera</TabsTrigger>
                    <TabsTrigger value="look-at">Look At</TabsTrigger>
                </TabsList>

                <TabsContent value="camera">
                    <SliderSetting
                        label="Position X"
                        value={camera.desiredPosition.x}
                        min={-10}
                        max={10}
                        step={0.1}
                        onChange={(value) =>
                            setCameraDesiredPosition({
                                ...camera.desiredPosition,
                                x: value,
                            })
                        }
                    />
                    <SliderSetting
                        label="Position Y"
                        value={camera.desiredPosition.y}
                        min={-10}
                        max={10}
                        step={0.1}
                        onChange={(value) =>
                            setCamera({
                                desiredPosition: {
                                    ...camera.desiredPosition,
                                    y: value,
                                },
                            })
                        }
                    />
                    <SliderSetting
                        label="Position Z"
                        value={camera.desiredPosition.z}
                        min={-10}
                        max={10}
                        step={0.1}
                        onChange={(value) =>
                            setCamera({
                                desiredPosition: {
                                    ...camera.desiredPosition,
                                    z: value,
                                },
                            })
                        }
                    />
                    <SliderSetting
                        label="FOV"
                        value={camera.desiredFov}
                        min={10}
                        max={120}
                        step={1}
                        onChange={(value) =>
                            setCamera({
                                desiredFov: value,
                            })
                        }
                    />
                    <ButtonSetting onClick={resetCamera}>Reset Camera</ButtonSetting>
                </TabsContent>

                <TabsContent value="look-at">
                    <CheckboxSetting
                        label="Enable Look-At"
                        checked={lookAtTarget.isEnabled}
                        onChange={() => {
                            setLookAtTarget({
                                isEnabled: !lookAtTarget.isEnabled,
                            });
                        }}
                    />
                    <CheckboxSetting
                        label="Show Target Marker"
                        checked={lookAtTarget.isShowTargetMarker}
                        onChange={() =>
                            setLookAtTarget({
                                isShowTargetMarker: !lookAtTarget.isShowTargetMarker,
                            })
                        }
                    />
                    <SliderSetting
                        label="Target X"
                        value={lookAtTarget.position.x}
                        min={-5}
                        max={5}
                        step={0.1}
                        onChange={(value) =>
                            setLookAtTarget({
                                position: {
                                    ...lookAtTarget.position,
                                    x: value,
                                },
                            })
                        }
                        disabled={!lookAtTarget.isEnabled}
                    />
                    <SliderSetting
                        label="Target Y"
                        value={lookAtTarget.position.y}
                        min={-5}
                        max={5}
                        step={0.1}
                        onChange={(value) =>
                            setLookAtTarget({
                                position: {
                                    ...lookAtTarget.position,
                                    y: value,
                                },
                            })
                        }
                        disabled={!lookAtTarget.isEnabled}
                    />
                    <SliderSetting
                        label="Target Z"
                        value={lookAtTarget.position.z}
                        min={-5}
                        max={5}
                        step={0.1}
                        onChange={(value) =>
                            setLookAtTarget({
                                position: {
                                    ...lookAtTarget.position,
                                    z: value,
                                },
                            })
                        }
                        disabled={!lookAtTarget.isEnabled}
                    />
                    <div className="flex gap-2">
                        <ButtonSetting
                            onClick={resetLookAtTargetPosition}
                            disabled={!lookAtTarget.isEnabled}
                        >
                            Reset Target
                        </ButtonSetting>
                        <ButtonSetting onClick={lookAtObject} variant="success">
                            Look At Object
                        </ButtonSetting>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

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
        <CheckboxSetting
            label="Enable Look-At"
            checked={lookAtEnabled}
            onChange={() => setLookAtEnabled(!lookAtEnabled)}
        />
        <CheckboxSetting
            label="Show Target Marker"
            checked={showTarget}
            onChange={() => setShowTarget(!showTarget)}
        />
        <SliderSetting
            label="Target X"
            value={lookAtTarget.x}
            min={-5}
            max={5}
            step={0.1}
            onChange={(value) => setLookAtTarget({...lookAtTarget, x: value})}
            disabled={!lookAtEnabled}
        />
        <SliderSetting
            label="Target Y"
            value={lookAtTarget.y}
            min={-5}
            max={5}
            step={0.1}
            onChange={(value) => setLookAtTarget({...lookAtTarget, y: value})}
            disabled={!lookAtEnabled}
        />
        <SliderSetting
            label="Target Z"
            value={lookAtTarget.z}
            min={-5}
            max={5}
            step={0.1}
            onChange={(value) => setLookAtTarget({...lookAtTarget, z: value})}
            disabled={!lookAtEnabled}
        />
        <div className="flex gap-2">
            <ButtonSetting onClick={resetLookAt} disabled={!lookAtEnabled}>
                Reset Target
            </ButtonSetting>
            <ButtonSetting onClick={lookAtObject} variant="success">
                Look At Object
            </ButtonSetting>
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
        <SliderSetting
            label="Position X"
            value={objectPosition.x}
            min={-5}
            max={5}
            step={0.1}
            onChange={(value) => setObjectPosition({...objectPosition, x: value})}
        />
        <SliderSetting
            label="Position Y"
            value={objectPosition.y}
            min={-5}
            max={5}
            step={0.1}
            onChange={(value) => setObjectPosition({...objectPosition, y: value})}
        />
        <SliderSetting
            label="Position Z"
            value={objectPosition.z}
            min={-5}
            max={5}
            step={0.1}
            onChange={(value) => setObjectPosition({...objectPosition, z: value})}
        />
        <ButtonSetting onClick={resetObject}>Reset Object</ButtonSetting>
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
        <SliderSetting
            label="Scale X"
            value={objectScale.x}
            min={0.1}
            max={3}
            step={0.1}
            onChange={(value) => setObjectScale({...objectScale, x: value})}
        />
        <SliderSetting
            label="Scale Y"
            value={objectScale.y}
            min={0.1}
            max={3}
            step={0.1}
            onChange={(value) => setObjectScale({...objectScale, y: value})}
        />
        <SliderSetting
            label="Scale Z"
            value={objectScale.z}
            min={0.1}
            max={3}
            step={0.1}
            onChange={(value) => setObjectScale({...objectScale, z: value})}
        />
        <ButtonSetting onClick={resetObject}>Reset Object</ButtonSetting>
    </div>
);

const RotationTab = ({
                         objectRotation,
                         setObjectRotation,
                         resetObject,
                     }: {
    objectRotation: {
        x: number;
        y: number;
        z: number;
    };
    setObjectRotation: (rotation: { x: number; y: number; z: number }) => void;
    resetObject: () => void;
}) => {
    const rotateObject = (axis: "x" | "y" | "z", degrees: number) => {
        const radians = (degrees * Math.PI) / 180;

        setObjectRotation({
            ...objectRotation,
            [axis]: objectRotation[axis] + radians,
        });
    };

    return (
        <div>
            <h3 className="font-bold mb-2">Object Rotation</h3>
            <SliderSetting
                label="Rotation X"
                value={objectRotation.x}
                min={0}
                max={2 * Math.PI}
                step={0.1}
                onChange={(value) =>
                    setObjectRotation({
                        ...objectRotation,
                        x: value,
                    })
                }
            />
            <SliderSetting
                label="Rotation Y"
                value={objectRotation.y}
                min={0}
                max={2 * Math.PI}
                step={0.1}
                onChange={(value) =>
                    setObjectRotation({
                        ...objectRotation,
                        y: value,
                    })
                }
            />
            <SliderSetting
                label="Rotation Z"
                value={objectRotation.z}
                min={0}
                max={2 * Math.PI}
                step={0.1}
                onChange={(value) =>
                    setObjectRotation({
                        ...objectRotation,
                        z: value,
                    })
                }
            />

            <div className="mt-3 border-t border-gray-600 pt-3">
                <h4 className="font-semibold mb-2">Quick Rotation</h4>
                <div className="grid grid-cols-2 gap-2">
                    <ButtonSetting
                        size="small"
                        variant="danger"
                        onClick={() => rotateObject("x", 10)}
                    >
                        X +10°
                    </ButtonSetting>
                    <ButtonSetting
                        size="small"
                        variant="danger"
                        onClick={() => rotateObject("x", -10)}
                    >
                        X -10°
                    </ButtonSetting>
                    <ButtonSetting
                        size="small"
                        variant="success"
                        onClick={() => rotateObject("y", 10)}
                    >
                        Y +10°
                    </ButtonSetting>
                    <ButtonSetting
                        size="small"
                        variant="success"
                        onClick={() => rotateObject("y", -10)}
                    >
                        Y -10°
                    </ButtonSetting>
                    <ButtonSetting size="small" onClick={() => rotateObject("z", 10)}>
                        Z +10°
                    </ButtonSetting>
                    <ButtonSetting size="small" onClick={() => rotateObject("z", -10)}>
                        Z -10°
                    </ButtonSetting>
                </div>
            </div>
            <ButtonSetting onClick={resetObject}>Reset Object</ButtonSetting>
        </div>
    );
};

const ObjectTab = () => {
    const object = useTestingNewStore()((state) => state.object.data);
    const setObject = useTestingNewStore()((state) => state.object.setObject);
    const resetObject = useTestingNewStore()((state) => state.object.resetObject);
    const objectDefaults = useTestingNewStore()((state) => state.object.getDefaults)();

    const resetObjectPosition = () => {
        setObject({position: objectDefaults.position});
    };
    const resetObjectRotation = () => {
        setObject({rotation: objectDefaults.rotation});
    };
    const resetObjectScale = () => {
        setObject({scale: objectDefaults.scale});
    };

    return (
        <div className={"border p-2"}>
            <h3 className="font-bold mb-2">Object</h3>
            <Tabs defaultValue="model" className="w-full border p-2">
               <ScrollArea className={"w-full"}>
                   <TabsList className={"mb-4"}>
                       <TabsTrigger value="model">Model</TabsTrigger>
                       <TabsTrigger value="position">Position</TabsTrigger>
                       <TabsTrigger value="rotation">Rotation</TabsTrigger>
                       <TabsTrigger value="scale">Scale</TabsTrigger>
                   </TabsList>
                   <ScrollBar orientation="horizontal" />
               </ScrollArea>

                <TabsContent value="model">Mesh</TabsContent>
                <TabsContent value="position">
                    <PositionTab
                        objectPosition={object.position}
                        setObjectPosition={(data) => setObject({position: data})}
                        resetObject={resetObjectPosition}
                    />
                </TabsContent>
                <TabsContent value="rotation">
                    <RotationTab
                        objectRotation={object.rotation}
                        setObjectRotation={(data) => setObject({rotation: data})}
                        resetObject={resetObjectRotation}
                    />
                </TabsContent>
                <TabsContent value="scale">
                    <ScaleTab
                        objectScale={object.scale}
                        setObjectScale={(data) => setObject({scale: data})}
                        resetObject={resetObjectScale}
                    />
                </TabsContent>
            </Tabs>
            <Button onClick={resetObject}>Reset all</Button>
        </div>
    );
};

export type AnimationKeyframe = {
    t: number; // from 0 to 1
    config: {
        objectRotation: { x: number; y: number; z: number };
        objectPosition: { x: number; y: number; z: number };
        cameraPosition: { x: number; y: number; z: number };
        cameraFov: number;
        lookAtTargetPosition: { x: number; y: number; z: number };
    };
};

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

// in freeview
// in guided lessons
//  preview, gizmos(if can disable the clicking), animation stepper, option to show hide ground

function interpolateKeyframes(keyframes: AnimationKeyframe[], t: number) {
    // Find the two keyframes t is between
    let i = 0;
    while (i < keyframes.length - 1 && t > keyframes[i + 1].t) i++;

    const kf1 = keyframes[i];
    const kf2 = keyframes[i + 1] ?? kf1;
    const localT = (t - kf1.t) / (kf2.t - kf1.t || 1);

    // Interpolate rotation
    const rot1 = kf1.config.objectRotation;
    const rot2 = kf2.config.objectRotation;
    const newRotatation = {
        x: lerp(rot1.x, rot2.x, localT),
        y: lerp(rot1.y, rot2.y, localT),
        z: lerp(rot1.z, rot2.z, localT),
    };

    // Interpolate position
    const pos1 = kf1.config.objectPosition;
    const pos2 = kf2.config.objectPosition;
    const newPosition = {
        x: lerp(pos1.x, pos2.x, localT),
        y: lerp(pos1.y, pos2.y, localT),
        z: lerp(pos1.z, pos2.z, localT),
    };
    // Interpolate camera position
    const camPos1 = kf1.config.cameraPosition;
    const camPos2 = kf2.config.cameraPosition;
    const newCameraPosition = {
        x: lerp(camPos1.x, camPos2.x, localT),
        y: lerp(camPos1.y, camPos2.y, localT),
        z: lerp(camPos1.z, camPos2.z, localT),
    };
    // Interpolate camera FOV
    const fov1 = kf1.config.cameraFov;
    const fov2 = kf2.config.cameraFov;
    const newCameraFov = lerp(fov1, fov2, localT);

    // Interpolate lookAtTargetPosition
    const lookatPos1 = kf1.config.lookAtTargetPosition;
    const lookatPos2 = kf2.config.lookAtTargetPosition;
    const newLookAtTargetPos = {
        x: lerp(lookatPos1.x, lookatPos2.x, localT),
        y: lerp(lookatPos1.y, lookatPos2.y, localT),
        z: lerp(lookatPos1.z, lookatPos2.z, localT),
    };

    return {
        objectRotation: newRotatation,
        objectPosition: newPosition,
        cameraPosition: newCameraPosition,
        cameraFov: newCameraFov,
        lookAtTargetPosition: newLookAtTargetPos,
    };
}

const AnimationTab = () => {
    const setObjectRotation = useTestingNewStore()(state => state.object.setObjectRotation)
    const setObjectPosition =  useTestingNewStore()(state => state.object.setObjectPosition)
    const setCameraPosition = useTestingNewStore()(state => state.camera.setCameraDesiredPosition)
    const setCameraFov =useTestingNewStore()(state => state.camera.setCameraDesiredFov)
    const setLookAtTargetPosition =
        useTestingNewStore()(state => state.lookAtTarget.setLookAtTargetPosition)

    const [isAnimationStarted, setIsAnimationStarted] = useState(false);
    const [animationProgress, setAnimationProgress] = useState(0);
    const [steps, setSteps] = useState(10);
    const [selectedAnimationPreset, setSelectedAnimationPreset] = useState(
        animationPresets[0]
    );

    const startAnimation = () => {
        setIsAnimationStarted(true);

        setAnimationProgress(0);

        animate(selectedAnimationPreset.keyFrames, 0);
    };

    const resetAnimation = () => {
        setIsAnimationStarted(false);
        setAnimationProgress(0);
        animate(selectedAnimationPreset.keyFrames, 0);
    };

    const animate = (keyFrames: AnimationKeyframe[], t: number) => {
        const anim = interpolateKeyframes(keyFrames, t);
        setObjectRotation(anim.objectRotation);
        setObjectPosition(anim.objectPosition);
        setCameraPosition(anim.cameraPosition);
        setCameraFov(anim.cameraFov);
        setLookAtTargetPosition(anim.lookAtTargetPosition);
    };

    /**
     *
     * @param delta 0 to 1, where 0 is the start of the animation and 1 is the end.
     */
    const progressAnimation = (delta: number) => {
        if (!isAnimationStarted) return;
        if (delta < 0 || delta > 1) {
            console.warn("Delta must be between 0 and 1");
            return;
        }
        const newProgress = Math.min(animationProgress + delta, 1);
        setAnimationProgress(newProgress);

        animate(selectedAnimationPreset.keyFrames, newProgress);
    };

    const updateAnimationPreset = (preset: AnimationPreset) => {
        setSelectedAnimationPreset(preset);
        setAnimationProgress(0);
        animate(preset.keyFrames, 0);
    };

    const isSelectedPresetFirst =
        animationPresets[0].id == selectedAnimationPreset.id;
    const isSelectedPresetLast =
        animationPresets[animationPresets.length - 1].id ==
        selectedAnimationPreset.id;

    return (
        <div>
            <h3 className="font-bold mb-2">Animation</h3>
            {/* <Button onClick={() => startAnimation()} disabled={isAnimationStarted}>
        Start Animation
      </Button>
      <Button onClick={() => resetAnimation()} disabled={!isAnimationStarted}>
        Reset Animation
      </Button>
      <div>{animationProgress}</div>
      <SliderSetting
        label="Steps"
        value={steps}
        min={0}
        max={20}
        step={1}
        onChange={(value) => {
          setSteps(value);
        }}
        disabled={isAnimationStarted}
      />
      <SliderSetting
        label="Animation Progress"
        value={animationProgress}
        min={0}
        max={1}
        step={1 / steps}
        onChange={(value) => {
          setAnimationProgress(value);
          animate(selectedAnimationPreset.keyFrames, value);
        }}
        disabled={!isAnimationStarted}
      />

      <Button
        onClick={() => progressAnimation(1 / steps)}
        disabled={!isAnimationStarted}
      >
        Progress Animation
      </Button> */}
            <div className={"p-2 border"}>
                <div className="max-w-[300px] overflow-x-scroll">
                    <ul className="flex gap-8">
                        {animationPresets.map((preset) => {
                            let hasObjectRotationChanged = false;
                            let hasObjectPositionChanged = false;

                            let hasCameraPositionChanged = false;
                            let hasLookAtTargetPositionChanged = false;

                            if (preset.keyFrames.length > 0) {
                                const startState = preset.keyFrames[0];

                                for (let i = 1; i < preset.keyFrames.length; i++) {
                                    const kf = preset.keyFrames[i];
                                    if (
                                        kf.config.objectRotation.x !==
                                        startState.config.objectRotation.x ||
                                        kf.config.objectRotation.y !==
                                        startState.config.objectRotation.y ||
                                        kf.config.objectRotation.z !==
                                        startState.config.objectRotation.z
                                    ) {
                                        hasObjectRotationChanged = true;
                                        break; // No need to check further if we found a change
                                    }
                                }

                                for (let i = 1; i < preset.keyFrames.length; i++) {
                                    const kf = preset.keyFrames[i];
                                    if (
                                        kf.config.cameraPosition.x !==
                                        startState.config.cameraPosition.x ||
                                        kf.config.cameraPosition.y !==
                                        startState.config.cameraPosition.y ||
                                        kf.config.cameraPosition.z !==
                                        startState.config.cameraPosition.z
                                    ) {
                                        hasCameraPositionChanged = true;
                                        break; // No need to check further if we found a change
                                    }
                                }

                                for (let i = 1; i < preset.keyFrames.length; i++) {
                                    const kf = preset.keyFrames[i];
                                    if (
                                        kf.config.objectPosition.x !==
                                        startState.config.objectPosition.x ||
                                        kf.config.objectPosition.y !==
                                        startState.config.objectPosition.y ||
                                        kf.config.objectPosition.z !==
                                        startState.config.objectPosition.z
                                    ) {
                                        hasObjectPositionChanged = true;
                                        break; // No need to check further if we found a change
                                    }
                                }

                                for (let i = 1; i < preset.keyFrames.length; i++) {
                                    const kf = preset.keyFrames[i];
                                    if (
                                        kf.config.lookAtTargetPosition.x !==
                                        startState.config.lookAtTargetPosition.x ||
                                        kf.config.lookAtTargetPosition.y !==
                                        startState.config.lookAtTargetPosition.y ||
                                        kf.config.lookAtTargetPosition.z !==
                                        startState.config.lookAtTargetPosition.z
                                    ) {
                                        hasLookAtTargetPositionChanged = true;
                                        break; // No need to check further if we found a change
                                    }
                                }
                            }

                            return (
                                <li key={preset.id} className="mb-2">
                                    <Button
                                        variant={
                                            preset.id === selectedAnimationPreset.id
                                                ? "secondary"
                                                : "outline"
                                        }
                                        onClick={() => {
                                            updateAnimationPreset(preset);
                                        }}
                                    >
                                        {preset.name}
                                    </Button>
                                    <p className="text-sm text-gray-500">{preset.desc}</p>
                                    <p>
                                        {hasCameraPositionChanged ? "camera moves" : ""}
                                        {hasObjectRotationChanged ? "object rotates" : ""}
                                        {hasObjectPositionChanged ? "object moves" : ""}
                                        {hasLookAtTargetPositionChanged ? "Look at target changes" : ""}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="border p-4 flex flex-col items-center">
                    <div className="flex center items-center gap-1 mb-4 w-full justify-between">
                        <Button
                            size={"sm"}
                            variant={"ghost"}
                            disabled={isSelectedPresetFirst}
                            onClick={() =>
                                setSelectedAnimationPreset((prev) => {
                                    const selectedPresetIndex = animationPresets.findIndex(
                                        (it) => it.id == prev.id
                                    );
                                    return animationPresets[Math.max(0, selectedPresetIndex - 1)];
                                })
                            }
                        >
                            <CaretLeftIcon/>
                        </Button>
                        {selectedAnimationPreset.name}
                        <Button
                            size={"sm"}
                            variant={"ghost"}
                            disabled={isSelectedPresetLast}
                            onClick={() =>
                                setSelectedAnimationPreset((prev) => {
                                    const selectedPresetIndex = animationPresets.findIndex(
                                        (it) => it.id == prev.id
                                    );
                                    return animationPresets[
                                        Math.min(animationPresets.length - 1, selectedPresetIndex + 1)
                                        ];
                                })
                            }
                        >
                            <CaretRightIcon/>
                        </Button>
                    </div>
                    <AnimationPreviewer
                        duration={3}
                        keyframes={selectedAnimationPreset.keyFrames}
                        apply={(state) => {
                            setObjectRotation(state.objectRotation);
                            setObjectPosition(state.objectPosition);
                            setCameraPosition(state.cameraPosition);
                            setCameraFov(state.cameraFov);
                            setLookAtTargetPosition(state.lookAtTargetPosition);
                        }}
                    />

                </div>
            </div>
            <div className={"p-4 border mt-4"}>

                <AnimationStepper keyframes={selectedAnimationPreset.keyFrames} apply={(state) => {
                    setObjectRotation(state.objectRotation);
                    setObjectPosition(state.objectPosition);
                    setCameraPosition(state.cameraPosition);
                    setCameraFov(state.cameraFov);
                    setLookAtTargetPosition(state.lookAtTargetPosition);
                }}/>
            </div>

            {/* <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="min-w-[98vw]">
          <DialogHeader>
            <DialogTitle>Select animation preset</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="flex">
            <ul className="flex flex-col gap-2">
              {animationPresets.map((preset) => (
                <li key={preset.id}>
                  <Button
                    variant={
                      preset.id === selectedAnimationPreset.id
                        ? "secondary"
                        : "outline"
                    }
                    onClick={() => {
                      updateAnimationPreset(preset);
                    }}
                  >
                    {preset.name}
                  </Button>
                  <p className="text-sm text-gray-500">{preset.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog> */}
        </div>
    );
};

function AnimationStepper({keyframes, apply}: {
    keyframes: AnimationKeyframe[];
    apply: (state: any) => void;
}) {
    const [progress, setProgress] = useState(0);
    const [steps, setSteps] = useState(12)
    const stepSize = 1 / steps

    const increaseProgress = (by: number) => {
        let newProgress = progress + by
        if (newProgress < 0 ) newProgress = 0;
        if (newProgress > 1) newProgress = 1;

        setProgress(newProgress);
        apply(interpolateKeyframes(keyframes, newProgress));
    }

    return (
        <div>
            <Input type={"number"} value={steps} onChange={e => setSteps(parseInt(e.target.value))} />
            <Progress value={progress * 100}/>
            <Button size={"sm"} variant={"outline"} disabled={progress == 0} onClick={
                () => {
                    increaseProgress(-stepSize)
                }
            }>
                <CaretLeftIcon/>
            </Button>
            <Button size={"sm"} variant={"outline"} onClick={
                () =>{
                    increaseProgress(-1)
                }
            }>
                <ReloadIcon/>
            </Button>
            <Button size={"sm"} variant={"outline"}
                    disabled={progress == 1}
                    onClick={
                        () => {
                            increaseProgress(stepSize)
                        }
                    }>
                <CaretRightIcon/>
            </Button>
        </div>
    )
}

function AnimationPlayer({
                             duration = 2, // seconds
                             keyframes,
                             apply,
                         }: {
    duration?: number;
    keyframes: AnimationKeyframe[];
    apply: (state: ReturnType<typeof interpolateKeyframes>) => void;
}) {
    const startTime = useRef<number | null>(null);
    const [playing, setPlaying] = useState(true);

    useFrame((state) => {
        if (!playing) return;

        if (startTime.current === null)
            startTime.current = state.clock.getElapsedTime();
        const elapsed = state.clock.getElapsedTime() - startTime.current;
        const t = Math.min(elapsed / duration, 1);

        const interpolated = interpolateKeyframes(keyframes, t);
        apply(interpolated);

        if (t >= 1) setPlaying(false);
    });

    return null;
}

export function AnimationPreviewer({
                                       duration = 3,
                                       keyframes,
                                       apply,
                                   }: {
    duration?: number;
    keyframes: AnimationKeyframe[];
    apply: (state: any) => void;
}) {
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [loop, setLoop] = useState(true);
    const startTime = useRef<number | null>(null);

    useEffect(() => {
        setPlaying(false);
        setProgress(0);
        startTime.current = null;
    }, [keyframes]);
    useAnimationPlayer({
        duration: duration,
        loop,
        playing,
        onFrame: (t) => {
            setProgress(t);
            const result = interpolateKeyframes(keyframes, t);
            apply(result); // you send the result to your mesh however you like
        },
    });

    const handleScrub = (value: number) => {
        setProgress(value);
        apply(interpolateKeyframes(keyframes, value));
        setPlaying(false);
        startTime.current = null;
    };

    return (
        <div className="w-full  flex flex-col">
            <Slider
                min={0}
                max={1}
                step={0.001}
                value={[progress]}
                onValueChange={(value) => {
                    handleScrub(value[0]);
                }}
                className="w-full mb-2"
            />
            <div className="flex items-center justify-between mt-2">
                <Button
                    onClick={() => {
                        setPlaying((p) => !p);
                        if (!playing) startTime.current = null;
                    }}
                    size={"icon"}
                >
                    {playing ? <PauseIcon/> : <PlayIcon/>}
                </Button>

                <Toggle
                    variant="outline"
                    aria-label="Toggle loop"
                    className="w-fit"
                    pressed={loop}
                    onPressedChange={setLoop}
                    size={"sm"}
                >
                    <LoopIcon/>
                </Toggle>
            </div>
        </div>
    );
}

export function useAnimationPlayer({
                                       duration,
                                       loop,
                                       playing,
                                       onFrame,
                                   }: {
    duration: number;
    loop: boolean;
    playing: boolean;
    onFrame: (progress: number) => void;
}) {
    const startTime = useRef<number | null>(null);
    const frameId = useRef<number>();

    const tick = (now: number) => {
        if (!playing) return;

        if (startTime.current === null) startTime.current = now;
        const elapsed = (now - startTime.current) / 1000;
        let t = elapsed / duration;

        if (t >= 1) {
            if (loop) {
                startTime.current = now;
                t = 0;
            } else {
                t = 1;
            }
        }

        onFrame(Math.min(t, 1));
        if (t < 1 || loop) frameId.current = requestAnimationFrame(tick);
    };

    useEffect(() => {
        if (playing) {
            frameId.current = requestAnimationFrame(tick);
        } else {
            cancelAnimationFrame(frameId.current!);
            startTime.current = null;
        }

        return () => cancelAnimationFrame(frameId.current!);
    }, [playing, loop]);
}

const GroundTab = () => {
    const ground = useTestingNewStore()(state => state.ground)

    return(<div>
        <h3 className="font-bold mb-2">Ground</h3>
        <SliderSetting
            label="Ground Y"
            value={ground.data.position.y}
            min={-5}
            max={5}
            step={0.1}
            onChange={(value) => ground.setGroundPosition(
                {
                    ...ground.data.position,
                    y : value
                }
            )}
        />
        <Button onClick={() => ground.resetGround()}>
            Reset
        </Button>
    </div>)
}

const GizmosTab = () => {
   return (<div>
       <h3 className="font-bold mb-2">Gizmos</h3>
       <div>
           <CheckboxSetting label={"Gizmos"} checked={false} onChange={() => {
           }}/>
       </div>
   </div>)
}

export {
    AnimationTab,
    CameraTab,
    LookAtTab,
    ObjectTab,
    PositionTab,
    RotationTab,
    ScaleTab,
    GroundTab,
    GizmosTab
};
