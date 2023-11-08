import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { useViewer } from "./ViewerContext";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./components/ui/sheet";
import { Toggle } from "./components/ui/toggle";
import { Typography } from "./components/ui/typographyh3";

export default function ViewerUI() {
    const { viewGismos, rotateAxis, rotateDegree, rotateForward } = useViewer();
    const [something, setSomething] = useState(viewGismos.current);

    const [rotationAxis, setRotationAxis] = useState(rotateAxis.current);
    const [rotationDegree, setRotationDegree] = useState(rotateDegree.current);

    const handlePress = (axis: string, pressed: boolean) => {
        if (!pressed) {
            rotateAxis.current = "";
            setRotationAxis(rotateAxis.current);
            return;
        }

        rotateAxis.current = axis;
        setRotationAxis(rotateAxis.current);
    };

    const handleRotateDegreePress = (degree: number, pressed: boolean) => {
        if (!pressed) {
            return;
        }

        rotateDegree.current = degree;
        setRotationDegree(rotateDegree.current);
    };

    return (
        <>
            <div className="w-8 h-8 bg-red-600 left-0 flex">
                <Button
                    onClick={() => {
                        console.log("hello");
                        viewGismos.current = !viewGismos.current;
                        setSomething(viewGismos.current);
                    }}
                >
                    {something ? "one state" : "other state"}
                </Button>
                {
                    <Button
                        disabled={rotateAxis.current == ""}
                        onClick={() => {
                            rotateForward();
                        }}
                    >
                        Rotate Forward
                    </Button>
                }
            </div>

            <Sheet>
                <SheetTrigger>Open</SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Settings</SheetTitle>
                        <SheetDescription>change stuff idk</SheetDescription>
                        <div>
                            <Typography variant="h4">Rotation</Typography>
                            <Toggle
                                pressed={rotationAxis == "x"}
                                onPressedChange={(pressed) =>
                                    handlePress("x", pressed)
                                }
                            >
                                X
                            </Toggle>
                            <Toggle
                                pressed={rotationAxis == "y"}
                                onPressedChange={(pressed) =>
                                    handlePress("y", pressed)
                                }
                            >
                                Y
                            </Toggle>
                            <Toggle
                                pressed={rotationAxis == "z"}
                                onPressedChange={(pressed) =>
                                    handlePress("z", pressed)
                                }
                            >
                                Z
                            </Toggle>
                        </div>

                        <div>
                            <Typography variant="h4">Step</Typography>
                            {[15, 30, 45, 60, 75, 90].map((degree) => (
                                <Toggle
                                    key={degree}
                                    pressed={rotationDegree == degree}
                                    onPressedChange={(pressed) =>
                                        handleRotateDegreePress(degree, pressed)
                                    }
                                >
                                    {degree}
                                </Toggle>
                            ))}
                        </div>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
}
