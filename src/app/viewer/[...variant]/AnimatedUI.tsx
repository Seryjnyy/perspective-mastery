"use client";
import {
  addCompleteChallengeLevel,
  createChallengeID,
  createLevelID,
} from "@/lib/challengeService";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ToastAction } from "@/components/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useAnimatedContext } from "./AnimatedContext";
import { AnimationType, Axis, CamPos, Shape } from "@/lib/types";
import Link from "next/link";

export default function AnimatedUI({
  shape,
  animationType,
  camPos,
  axis,
}: {
  shape: Shape;
  animationType: AnimationType;
  camPos: CamPos;
  axis: Axis;
}) {
  const [_, setStateForRefresh] = useState({});
  const [complete, setComplete] = useState(false);
  const {
    updateFrame,
    currentFrame,
    frameAmount,
    subscribeToEvents,
    unsubscribeFromEvents,
    centerPointSetting,
    axisSetting,
    updateCenterPointSetting,
    updateAxisSetting,
  } = useAnimatedContext();
  const { toast } = useToast();

  useEffect(() => {
    const index = subscribeToEvents((eventType) => {
      if (eventType == "frame_change") setStateForRefresh({});

      if (eventType == "setting_change") setStateForRefresh({});
    });

    function handleKeyDown(e: KeyboardEvent) {
      // left key
      if (e.code == "ArrowLeft") {
        handlePrevFrame();
      }

      // right key
      if (e.code == "ArrowRight") {
        handleNextFrame();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      unsubscribeFromEvents(index);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handlePrevFrame = () => {
    if (currentFrame.current <= 0) return;

    updateFrame(-1);
  };

  const handleNextFrame = () => {
    if (currentFrame.current >= frameAmount.current) return;

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
          <Link href={"/journey"}>
            <ToastAction altText="Journey">Journey</ToastAction>
          </Link>
        ),
      });

      // save completion
      addCompleteChallengeLevel(
        createChallengeID(shape, animationType, axis),
        createLevelID(shape, animationType, camPos, axis)
      );
    }
  }, [complete]);

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
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-2xl opacity-80 pb-8">
              Settings
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-screen ">
            <div className="flex items-center gap-2">
              <Label className="scroll-m-20 text-xl font-semibold tracking-tight">
                Center point
              </Label>

              <Checkbox
                checked={centerPointSetting.current}
                onCheckedChange={(checked) =>
                  updateCenterPointSetting(
                    checked == "indeterminate" ? false : checked
                  )
                }
              />
            </div>

            <div className="flex items-center gap-2">
              <Label className="scroll-m-20 text-xl font-semibold tracking-tight">
                Axis
              </Label>

              <Checkbox
                checked={axisSetting.current}
                onCheckedChange={(checked) =>
                  updateAxisSetting(
                    checked == "indeterminate" ? false : checked
                  )
                }
              />
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
                      handlePrevFrame();
                    }}
                    disabled={currentFrame.current <= 0}
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
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
                    disabled={currentFrame.current >= frameAmount.current}
                  >
                    <ChevronRightIcon className="w-4 h-4" />
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
              value={(currentFrame.current / frameAmount.current) * 100}
            />
          </div>
        </Card>
      </div>
    </>
  );
}
