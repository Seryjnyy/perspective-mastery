"use client";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    DotsVerticalIcon,
    EnterFullScreenIcon,
    ExitFullScreenIcon,
} from "@radix-ui/react-icons";
import {useState} from "react";
import SceneVisualisation, {
    SceneVisualisationProps,
} from "./scene-visualisation";
import {cn} from "@/lib/utils";

export default function SceneVisualisationPreview({
                                                      actions,
                                                      ...props
                                                  }: SceneVisualisationProps & {
    actions?: React.ReactNode;
}) {
    const [showFrustum, setShowFrustum] = useState(true);
    const [showGround, setShowGround] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const toggleFullscreen = () => {
        setIsFullscreen((prev) => !prev);
        console.log("Fullscreen toggled:", !isFullscreen);
    };

    return (
        <div
            className={cn(
                "relative w-[300px] h-[200px]",
                isFullscreen && "w-screen h-[calc(100vh-4rem)]"
            )}
        >
            <div className="absolute top-2 right-2 z-50 flex flex-col">
                {actions}
                <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                    {isFullscreen ? (
                        <ExitFullScreenIcon/>
                    ) : (
                        <>
                            <EnterFullScreenIcon/>
                        </>
                    )}
                </Button>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <DotsVerticalIcon/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium mb-2">Difficulty</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={"show-frustum-checkbox"}
                                            checked={showFrustum}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    setShowFrustum(true);
                                                } else {
                                                    setShowFrustum(false);
                                                }
                                            }}
                                        />
                                        <label
                                            htmlFor={"show-frustum-checkbox"}
                                            className="text-sm"
                                        >
                                            Show Frustum
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={"show-ground-checkbox"}
                                            checked={showGround}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    setShowGround(true);
                                                } else {
                                                    setShowGround(false);
                                                }
                                            }}
                                        />
                                        <label htmlFor={"show-ground-checkbox"} className="text-sm">
                                            Show Ground
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <SceneVisualisation
                {...props}
                showFrustum={showFrustum}
                showGround={showGround}
            />
        </div>
    );
}
