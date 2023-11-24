import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";
import { GearIcon } from "@radix-ui/react-icons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAnimatedContext } from "./AnimatedContext";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";

export default function AnimatedUI() {
    const [_, setStateForRefresh] = useState({});
    const [complete, setComplete] = useState(false);
    const {
        updateFrame,
        currentFrame,
        frameAmount,
        subscribeToEvents,
        unsubscribeFromEvents,
    } = useAnimatedContext();
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const index = subscribeToEvents((eventType) => {
            if (eventType == "frame_change") setStateForRefresh({});
        });

        function handleKeyDown(e: KeyboardEvent) {
            // left key
            if (e.code == "ArrowLeft") {
                updateFrame(-1);
            }

            // right key
            if (e.code == "ArrowRight") {
                updateFrame(1);
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            unsubscribeFromEvents(index);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handlePrevFrame = () => {
        updateFrame(-1);
    };

    const handleNextFrame = () => {
        updateFrame(1);

        if (currentFrame.current == frameAmount.current) {
            setComplete(true);
        }
    };

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
        <>
            {/* <Sheet>
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
                    <SheetHeader><SheetTitle>Settings</SheetTitle></SheetHeader>
                    <ScrollArea className="h-screen border px-4">
                        <div className="mb-10 mt-10">
                            <div className="mb-10">
                                <Typography variant={"h2"} as="h2">
                                    Shape
                                </Typography>
                                <div className="mt-4 flex flex-col gap-1"></div>
                            </div>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet> */}

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
                                            handlePrevFrame();
                                        }}
                                        disabled={currentFrame.current <= 0}
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Previous frame</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => {
                                            handleNextFrame();
                                        }}
                                        disabled={
                                            currentFrame.current >=
                                            frameAmount.current
                                        }
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

                    <div className="p-2">
                        <Progress
                            value={
                                (currentFrame.current / frameAmount.current) *
                                100
                            }
                        />
                    </div>
                </Card>
            </div>
        </>
    );
}
