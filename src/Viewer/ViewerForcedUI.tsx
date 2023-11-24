import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useViewer } from "./ViewerForcedContext";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export default function ViewerForcedUI() {
    const [_, setStateForRefresh] = useState({});
    const [complete, setComplete] = useState(false);

    const {
        rotateForward,
        rotateBackward,
        xDegree,
        yDegree,
        zDegree,
        subscribeToRotation,
        unsubscribeFromRotation,
    } = useViewer();

    useEffect(() => {
        const index = subscribeToRotation(() => {
            setStateForRefresh({});
        });

        function handleKeyDown(e: KeyboardEvent) {
            // left key
            if (e.code == "ArrowLeft") {
                handleRotateBackward();
            }

            // right key
            if (e.code == "ArrowRight") {
                handleRotateForward();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            unsubscribeFromRotation(index);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const { rotation_axis } = useParams();

    const { toast } = useToast();

    // TODO : need better way
    if (rotation_axis != "x" && rotation_axis != "y" && rotation_axis != "z") {
        return <div>UI error</div>;
    }

    const getAxisDegree = () => {
        // TODO : this could potentially crash UI, if actually undefined
        // having to use ! operator because it can be undefined, idk if this is the right approach
        if (rotation_axis == "x") return xDegree.current;

        if (rotation_axis == "y") return yDegree.current;

        if (rotation_axis == "z") return zDegree.current;
    };

    const handleRotateBackward = () => {
        rotateBackward(rotation_axis);
    };

    const handleRotateForward = () => {
        rotateForward(rotation_axis);

        // TODO : take away the amount of rotation per frame in context
        // so it considers the challenge complete on the last click on next frame
        if (getAxisDegree()! >= 6.2831853072) {
            setComplete(true);
            return;
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (complete) {
            toast({
                title: "Completed this challenge! 🎉",
                description: "Well done, on to the next one then.",
                action: (
                    <ToastAction
                        altText="challenges"
                        onClick={() => navigate("/challenges")}
                    >
                        Challenges
                    </ToastAction>
                ),
            });
        }
    }, [complete]);

    return (
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
                                    disabled={getAxisDegree()! <= 0}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="flex items-center gap-1">
                                    <ArrowLeftIcon className="w-3 h-3" />
                                    Previous frame
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    {rotation_axis}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                        handleRotateForward();
                                    }}
                                    disabled={getAxisDegree()! >= 6.2831853072}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="flex items-center gap-1">
                                    Next frame
                                    <ArrowRightIcon className="w-3 h-3" />
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <div className="p-2">
                    <Progress
                        value={(0 + getAxisDegree()! / 6.2831853072) * 100}
                    />
                </div>
            </Card>
        </div>
    );
}
