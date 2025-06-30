"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scroll, X } from "lucide-react";

import { AnimationKeyframe } from "../../features/animation/types/types";
import { AnimationPreviewer } from "../../features/animation/components/animation-previewer";
import { Label } from "@/components/ui/label";
import { NumberInput } from "./number-input";
import { isValidNumber } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ScrollAreaThumb } from "@radix-ui/react-scroll-area";
import { Slider } from "@/components/ui/slider";
import { v4 as uuidv4 } from "uuid";
import { Vec3 } from "../../scene-store/shared";

const defaultVec3 = (): Vec3 => ({ x: 0, y: 0, z: 0 });

const defaultKeyframe = (): AnimationKeyframe => ({
  id: uuidv4(),
  t: 0,
  config: {
    objectRotation: defaultVec3(),
    objectPosition: defaultVec3(),
    cameraPosition: defaultVec3(),
    cameraFov: 75,
    lookAtTargetPosition: defaultVec3(),
  },
});

export function Vec3Input({
  value,
  onChange,
}: {
  value: Vec3;
  onChange: (val: Vec3) => void;
}) {
  const [internal, setInternal] = useState<{ [K in keyof Vec3]: string }>({
    x: value.x.toString(),
    y: value.y.toString(),
    z: value.z.toString(),
  });

  // Keep local state in sync when external value changes
  useEffect(() => {
    setInternal({
      x: value.x.toString(),
      y: value.y.toString(),
      z: value.z.toString(),
    });
  }, [value]);

  const handleBlur = (axis: keyof Vec3) => {
    if (isValidNumber(internal[axis])) {
      const parsed = parseFloat(internal[axis]);
      onChange({ ...value, [axis]: parsed });
    } else {
      // fallback to previous valid value
      setInternal({ ...internal, [axis]: value[axis].toString() });
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex gap-2">
        {(["x", "y", "z"] as const).map((axis) => (
          <div key={axis} className="max-w-16">
            <NumberInput
              value={value[axis]}
              onValueChange={(val) => {
                onChange({ ...value, [axis]: val });
              }}
              label={axis}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function KeyframeEditor({
  applyKeyframe,
  getCurrentState,
  keyframes,
  setKeyframes,
}: {
  applyKeyframe: (
    objectRotation: Vec3,
    objectPosition: Vec3,
    cameraPosition: Vec3,
    lookAtTargetPosition: Vec3,
    cameraFov: number
  ) => void;
  getCurrentState: () => {
    objectRotation: Vec3;
    objectPosition: Vec3;
    cameraPosition: Vec3;
    lookAtTargetPosition: Vec3;
    cameraFov: number;
  };
  keyframes: AnimationKeyframe[];
  setKeyframes: (keyframes: AnimationKeyframe[]) => void;
}) {
  const [progress, setProgress] = useState(0);

  const updateKeyframe = (index: number, updated: AnimationKeyframe) => {
    const next = [...keyframes];
    next[index] = updated;
    setKeyframes(next);
  };

  const removeKeyframe = (index: number) => {
    setKeyframes(keyframes.filter((_, i) => i !== index));
  };

  const createKeyframeFromCurrentState = () => {
    const state = getCurrentState();
    const keyframe: AnimationKeyframe = {
      id: uuidv4(),
      t: progress,
      config: {
        ...state,
        lookAtTargetPosition: {
          x: roundToNPlacesNumber(state.lookAtTargetPosition.x, 2),
          y: roundToNPlacesNumber(state.lookAtTargetPosition.y, 2),
          z: roundToNPlacesNumber(state.lookAtTargetPosition.z, 2),
        },
      },
    };
    setKeyframes([...keyframes, keyframe]);
  };

  const duplicateKeyframe = (index: number) => {
    const copy = JSON.parse(JSON.stringify(keyframes[index]));
    setKeyframes([...keyframes, copy]);
  };

  return (
    <div className="flex w-full h-full">
      {/* Purple Section - fixed width */}
      <div className="w-[300px] bg-[#171717]">
        <div className="flex flex-col justify-end h-full ">
          <div className="flex gap-2 pt-2">
            <ScrollArea className="w-full h-full  whitespace-nowrap flex gap-2 pb-5">
              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    setKeyframes([...keyframes, defaultKeyframe()])
                  }
                  size={"sm"}
                >
                  Add Keyframe
                </Button>
                <Button
                  onClick={() => createKeyframeFromCurrentState()}
                  size={"sm"}
                >
                  Add Curr
                </Button>
                {keyframes.length > 0 && (
                  <Button
                    onClick={() => duplicateKeyframe(keyframes.length - 1)}
                    size={"sm"}
                  >
                    Duplicate Last
                  </Button>
                )}
                <Button size={"sm"} onClick={() => setKeyframes([])}>
                  Clear
                </Button>
                <Button
                  size={"sm"}
                  onClick={() => {
                    console.log(keyframes);
                  }}
                >
                  Export
                </Button>
              </div>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <div className="border p-2 m-2">
            <AnimationPreviewer
              keyframes={keyframes.toSorted((a, b) => a.t - b.t)}
              apply={(state) => {
                applyKeyframe(
                  state.objectRotation,
                  state.objectPosition,
                  state.cameraPosition,
                  state.lookAtTargetPosition,
                  state.cameraFov
                );
              }}
              duration={3}
              autoPlay={false}
              onProgressChange={(progress) => setProgress(progress)}
            />
          </div>
          <div className="flex gap-2 border-t">
            <div className="w-full p-2  h-12">
              <div className="max-w-[200px] bg-red-500 flex items-center relative h-full">
                {keyframes.map((kf, i) => (
                  <div
                    key={i}
                    className="absolute top-0 w-[2px] h-full bg-blue-500"
                    style={{
                      left: `${kf.t * 100}%`,
                    }}
                  />
                ))}
                <Slider
                  value={[progress]}
                  onValueChange={(val) => setProgress(val[0])}
                  max={1}
                  step={0.01}
                />
              </div>
            </div>
            <div className="flex gap-2 text-xs px-4 items-center">
              {progress.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Green Section - flex-grow, scrollable if overflow */}
      <div className="flex-1 overflow-x-auto bg-[#171717]">
        <div className="min-w-max h-fit">
          {/* Add wide content here, e.g.: */}
          <ScrollArea className="w-full h-full  whitespace-nowrap flex gap-2 ">
            <div className="flex w-max space-x-4 p-4">
              {keyframes.map((kf, i) => (
                <Keyframe
                  key={i}
                  kf={kf}
                  i={i}
                  applyKeyframe={applyKeyframe}
                  removeKeyframe={removeKeyframe}
                  updateKeyframe={updateKeyframe}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

const Keyframe = ({
  kf,
  i,
  removeKeyframe,
  updateKeyframe,
  applyKeyframe,
}: {
  kf: AnimationKeyframe;
  i: number;
  removeKeyframe: (i: number) => void;
  updateKeyframe: (i: number, kf: AnimationKeyframe) => void;
  applyKeyframe: (
    objectRotation: Vec3,
    objectPosition: Vec3,
    cameraPosition: Vec3,
    lookAtTargetPosition: Vec3,
    cameraFov: number
  ) => void;
}) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <Card key={i} className="bg-[#212121] border-t">
      <CardContent className="space-y-4 p-4 text-xs ">
        <div className="flex justify-between items-center">
          <div className="flex w-full justify-between items-center">
            {/* <h4 className="font-semibold">Keyframe {i + 1}</h4> */}
            <div className="max-w-14  ">
              <label className="opacity-80 sr-only">T</label>
              <NumberInput
                label="t (0 - 100)"
                min={0}
                max={100}
                value={kf.t * 100}
                onValueChange={(val) => {
                  updateKeyframe(i, {
                    ...kf,
                    t: val / 100,
                  });
                }}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() =>
                  applyKeyframe(
                    kf.config.objectRotation,
                    kf.config.objectPosition,
                    kf.config.cameraPosition,
                    kf.config.lookAtTargetPosition,
                    kf.config.cameraFov
                  )
                }
              >
                Apply
              </Button>
              <Switch checked={editMode} onCheckedChange={setEditMode} />
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => removeKeyframe(i)}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex gap-4  border-b py-2">
          <div className="flex flex-col gap-1">
            <label className="opacity-80">Object Rotation</label>
            {editMode ? (
              <Vec3Input
                value={kf.config.objectRotation}
                onChange={(val) =>
                  updateKeyframe(i, {
                    ...kf,
                    config: {
                      ...kf.config,
                      objectRotation: val,
                    },
                  })
                }
              />
            ) : (
              <div>{`${kf.config.objectRotation.x}, ${kf.config.objectRotation.y}, ${kf.config.objectRotation.z}`}</div>
            )}
          </div>

          <div className="flex flex-col gap-1 ">
            <label className="opacity-80">Object Position</label>
            {editMode ? (
              <Vec3Input
                value={kf.config.objectPosition}
                onChange={(val) =>
                  updateKeyframe(i, {
                    ...kf,
                    config: {
                      ...kf.config,
                      objectPosition: val,
                    },
                  })
                }
              />
            ) : (
              <div>{`${kf.config.objectPosition.x}, ${kf.config.objectPosition.y}, ${kf.config.objectPosition.z}`}</div>
            )}
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="opacity-80">Camera Position</label>
            {editMode ? (
              <Vec3Input
                value={kf.config.cameraPosition}
                onChange={(val) =>
                  updateKeyframe(i, {
                    ...kf,
                    config: {
                      ...kf.config,
                      cameraPosition: val,
                    },
                  })
                }
              />
            ) : (
              <div>{`${kf.config.cameraPosition.x}, ${kf.config.cameraPosition.y}, ${kf.config.cameraPosition.z}`}</div>
            )}
          </div>
        </div>

        <div className="flex gap-4 ">
          <div className="flex flex-col gap-1">
            <label className="opacity-80">LookAt Target Position</label>
            {editMode ? (
              <Vec3Input
                value={kf.config.lookAtTargetPosition}
                onChange={(val) =>
                  updateKeyframe(i, {
                    ...kf,
                    config: {
                      ...kf.config,
                      lookAtTargetPosition: val,
                    },
                  })
                }
              />
            ) : (
              <div>{`${kf.config.lookAtTargetPosition.x}, ${kf.config.lookAtTargetPosition.y}, ${kf.config.lookAtTargetPosition.z}`}</div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="opacity-80">Camera FOV</label>
            {editMode ? (
              <NumberInput
                min={0}
                max={100}
                value={kf.config.cameraFov}
                onValueChange={(val) => {
                  updateKeyframe(i, {
                    ...kf,
                    config: {
                      ...kf.config,
                      cameraFov: val,
                    },
                  });
                }}
              />
            ) : (
              <div>{kf.config.cameraFov}</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function roundToNPlacesNumber(num: number, n: number): number {
  const multiplier = Math.pow(10, n);
  return Math.round(num * multiplier) / multiplier;
}
