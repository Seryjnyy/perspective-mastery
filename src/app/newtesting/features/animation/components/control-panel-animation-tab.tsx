import { useTestingNewStore } from "@/app/newtesting/page";
import { animationPresets } from "@/app/newtesting/features/animation/animations";
import { AnimationKeyframe } from "@/app/newtesting/features/animation/types/types";
import { interpolateKeyframes } from "@/app/newtesting/features/animation/utils/utils";
import { AnimationPreset } from "@/app/newtesting/features/animation/animations";
import { Button } from "@/components/ui/button";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { AnimationPreviewer } from "@/app/newtesting/features/animation/components/animation-previewer";
import { AnimationStepper } from "@/app/newtesting/features/animation/components/animation-stepper";
import { useState } from "react";

export const ControlPanelAnimationTab = () => {
  const setObjectRotation = useTestingNewStore()(
    (state) => state.object.setRotation
  );
  const setObjectPosition = useTestingNewStore()(
    (state) => state.object.setPosition
  );
  const setCameraPosition = useTestingNewStore()(
    (state) => state.camera.setCameraDesiredPosition
  );
  const setCameraFov = useTestingNewStore()(
    (state) => state.camera.setCameraDesiredFov
  );
  const setLookAtTargetPosition = useTestingNewStore()(
    (state) => state.lookAtTarget.setLookAtTargetPosition
  );

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
                    {hasLookAtTargetPositionChanged
                      ? "Look at target changes"
                      : ""}
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
              <CaretLeftIcon />
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
                    Math.min(
                      animationPresets.length - 1,
                      selectedPresetIndex + 1
                    )
                  ];
                })
              }
            >
              <CaretRightIcon />
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
        <AnimationStepper
          keyframes={selectedAnimationPreset.keyFrames}
          recommendedSteps={12}
          canChangeSteps={true}
          apply={(state) => {
            setObjectRotation(state.objectRotation);
            setObjectPosition(state.objectPosition);
            setCameraPosition(state.cameraPosition);
            setCameraFov(state.cameraFov);
            setLookAtTargetPosition(state.lookAtTargetPosition);
          }}
        />
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
