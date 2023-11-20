import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { useFreeviewContext, useViewer } from "../FreeviewContext";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../components/ui/sheet";
import { Toggle } from "../../components/ui/toggle";
import { Typography } from "../../components/ui/typographyh3";
import { GearIcon } from "@radix-ui/react-icons";
import { Checkbox } from "../../components/ui/checkbox";
import ChangeShape from "./ChangeShape";

export default function FreeviewUI() {
    const { solidColour, toggleSolidColour } = useFreeviewContext();
    const [solidColourUI, setSolidColourUI] = useState(solidColour.current);
    // const { viewGismos, rotateAxis, rotateDegree, rotateForward } = useViewer();
    // const [something, setSomething] = useState(viewGismos.current);

    // const [rotationAxis, setRotationAxis] = useState(rotateAxis.current);
    // const [rotationDegree, setRotationDegree] = useState(rotateDegree.current);

    // const handlePress = (axis: string, pressed: boolean) => {
    //     if (!pressed) {
    //         rotateAxis.current = "";
    //         setRotationAxis(rotateAxis.current);
    //         return;
    //     }

    //     rotateAxis.current = axis;
    //     setRotationAxis(rotateAxis.current);
    // };

    // const handleRotateDegreePress = (degree: number, pressed: boolean) => {
    //     if (!pressed) {
    //         return;
    //     }

    //     rotateDegree.current = degree;
    //     setRotationDegree(rotateDegree.current);
    // };
    const handleSolidColourChange = (checked: boolean) => {
        console.log(checked);

        toggleSolidColour(checked);
        setSolidColourUI(solidColour.current);
    };

    return (
        <>
            {/* <div className="w-8 h-8 bg-red-600 absolute flex">
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
            </div> */}

            <Sheet>
                <SheetTrigger className="absolute left-3 bottom-3  z-20">
                    <GearIcon className="w-6 h-6" />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Settings</SheetTitle>
                        <SheetDescription>change stuff idk</SheetDescription>
                        {/* <div>
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
                        </div> */}

                        {/* <div>
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
                        </div> */}

                        <ChangeShape />

                        <div>
                            <Typography variant="h4">
                                <span className="mr-2">Solid colour</span>
                                <Checkbox
                                    checked={solidColourUI}
                                    onCheckedChange={(checked) =>
                                        handleSolidColourChange(checked)
                                    }
                                />
                            </Typography>
                            {/* on/off <Checkbox /> */}
                        </div>

                        {/* <div>
                            <Typography variant="h4">
                                Gismo helper <Checkbox />
                            </Typography>
                            on/off <Checkbox />
                        </div> */}
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
}
