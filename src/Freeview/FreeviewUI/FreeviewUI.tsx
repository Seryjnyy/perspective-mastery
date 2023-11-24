import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { GearIcon } from "@radix-ui/react-icons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { Typography } from "../../components/ui/typography";
import { useFreeviewContext } from "../FreeviewContext";
import CameraTarget from "./CameraTarget";
import ChangeShape from "./ChangeShape";
import Edges from "./Edges";
import Fisheye from "./Fisheye";
import Gizmos from "./Gizmos";
import Lighting from "./Lighting";
import RotationAxis from "./RotationAxis";
import RotationStep from "./RotationStep";
import ShapeControls from "./ShapeControls";
import SolidColour from "./SolidColour";

export default function FreeviewUI() {
    const [rotationAxis, setRotationAxis] = useState<"x" | "y" | "z">("y");
    const [rotationDegree, setRotationDegree] = useState(15);
    const { rotate } = useFreeviewContext();

    const handleRotateBackward = () => {
        rotate(rotationAxis, -rotationDegree);
    };

    const handleRotateForward = () => {
        rotate(rotationAxis, rotationDegree);
    };

    return (
        <>
            <Sheet>
                <SheetTrigger className="absolute left-52 bottom-5  z-20">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <GearIcon className="w-6 h-6" />
                            </TooltipTrigger>
                            <TooltipContent align="center" side="right">
                                <p>Settings</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </SheetTrigger>
                <SheetContent className="p-0">
                    {/* <SheetHeader><SheetTitle>Settings</SheetTitle></SheetHeader> */}
                    <ScrollArea className="h-screen border px-4">
                        <div className="mb-10 mt-10">
                            <div className="mb-10">
                                <Typography variant={"h2"} as="h2">
                                    Shape
                                </Typography>
                                <div className="mt-4 flex flex-col gap-1">
                                    <ChangeShape />
                                    <Edges />
                                    <SolidColour />
                                </div>
                            </div>

                            <Typography variant={"h2"} as="h2">
                                Rotation
                            </Typography>
                            <div className="mt-4 flex flex-col gap-1">
                                <RotationAxis
                                    rotationAxis={rotationAxis}
                                    onRotationAxisChange={setRotationAxis}
                                />
                                <RotationStep
                                    rotationDegree={rotationDegree}
                                    onRotationDegreeChange={setRotationDegree}
                                />
                            </div>
                        </div>

                        <div className="mb-10">
                            <Typography variant={"h2"} as="h2">
                                Shape controls
                            </Typography>
                            <div className="mt-4 flex flex-col gap-1">
                                <ShapeControls />
                            </div>
                        </div>

                        <div className="mb-10">
                            <Typography variant={"h2"} as="h2">
                                Camera
                            </Typography>

                            <div className="mt-4 flex flex-col gap-1">
                                <CameraTarget />
                                <div>
                                    <Fisheye />
                                    <Typography
                                        variant={"mutedText"}
                                        className="text-yellow-400 ml-3"
                                    >
                                        warning: this will reset the position,
                                        rotation and scale of the shape.
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <Typography variant={"h2"} as="h2">
                                Lighting
                            </Typography>
                            <div className="mt-4 flex flex-col gap-1">
                                <Lighting />
                            </div>
                        </div>

                        <div className="mb-10">
                            <Typography variant={"h2"} as="h2">
                                Gizmos
                            </Typography>
                            <div className="mt-4 flex flex-col gap-1">
                                <Gizmos />
                            </div>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>

            <div className="absolute bottom-2 left-2 z-50">
                <Card className="h-fit w-48">
                    <div className="flex justify-center gap-4 p-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => {
                                            handleRotateBackward();
                                        }}
                                        // disabled={getAxisDegree()! <= 0}
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Previous frame</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {rotationAxis}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => {
                                            handleRotateForward();
                                        }}
                                        // disabled={getAxisDegree()! >= 6.2831853072}
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Next frame</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    {/* <div className="p-2">
                    <Progress
                        value={(0 + getAxisDegree()! / 6.2831853072) * 100}
                    />
                </div> */}
                </Card>
            </div>
        </>
    );
}
