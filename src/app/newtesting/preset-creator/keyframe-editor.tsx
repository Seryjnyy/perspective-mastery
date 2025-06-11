"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { Vec3 } from "../useGlobalSceneStore";
import { AnimationKeyframe } from "../control-panel/tabs";

const defaultVec3 = (): Vec3 => ({ x: 0, y: 0, z: 0 });

const defaultKeyframe = (): AnimationKeyframe => ({
    t: 0,
    config: {
        objectRotation: defaultVec3(),
        objectPosition: defaultVec3(),
        cameraPosition: defaultVec3(),
        cameraFov: 75,
        lookAtTargetPosition: defaultVec3(),
    },
});

function Vec3Input({
    label,
    value,
    onChange,
}: {
    label: string;
    value: Vec3;
    onChange: (val: Vec3) => void;
}) {
    return (
        <div className="space-y-1">
            <label className="text-sm">{label}</label>
            <div className="flex gap-2">
                {(["x", "y", "z"] as const).map((axis) => (
                    <Input
                        key={axis}
                        type="number"
                        step="0.1"
                        value={value[axis]}
                        onChange={(e) => {
                            onChange({
                                ...value,
                                [axis]: parseFloat(e.target.value) || 0,
                            });
                        }}
                        placeholder={axis}
                    />
                ))}
            </div>
        </div>
    );
}

export default function KeyframeEditor() {
    const [keyframes, setKeyframes] = useState<AnimationKeyframe[]>([]);

    const updateKeyframe = (index: number, updated: AnimationKeyframe) => {
        const next = [...keyframes];
        next[index] = updated;
        setKeyframes(next);
    };

    const removeKeyframe = (index: number) => {
        setKeyframes(keyframes.filter((_, i) => i !== index));
    };

    const duplicateKeyframe = (index: number) => {
        const copy = JSON.parse(JSON.stringify(keyframes[index]));
        setKeyframes([...keyframes, copy]);
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <Button
                    onClick={() =>
                        setKeyframes([...keyframes, defaultKeyframe()])
                    }
                >
                    Add Keyframe
                </Button>
                {keyframes.length > 0 && (
                    <Button
                        onClick={() => duplicateKeyframe(keyframes.length - 1)}
                    >
                        Duplicate Last
                    </Button>
                )}
            </div>

            {keyframes.map((kf, i) => (
                <Card key={i}>
                    <CardContent className="space-y-4 p-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold">Keyframe {i + 1}</h4>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeKeyframe(i)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        <div>
                            <label className="text-sm">t (0 - 1)</label>
                            <Input
                                type="number"
                                step="0.01"
                                min={0}
                                max={1}
                                value={kf.t}
                                onChange={(e) => {
                                    updateKeyframe(i, {
                                        ...kf,
                                        t: parseFloat(e.target.value) || 0,
                                    });
                                }}
                            />
                        </div>

                        <Vec3Input
                            label="Object Rotation"
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
                        <Vec3Input
                            label="Object Position"
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
                        <Vec3Input
                            label="Camera Position"
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
                        <div>
                            <label className="text-sm">Camera FOV</label>
                            <Input
                                type="number"
                                step="1"
                                value={kf.config.cameraFov}
                                onChange={(e) =>
                                    updateKeyframe(i, {
                                        ...kf,
                                        config: {
                                            ...kf.config,
                                            cameraFov:
                                                parseFloat(e.target.value) || 0,
                                        },
                                    })
                                }
                            />
                        </div>
                        <Vec3Input
                            label="LookAt Target Position"
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
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
