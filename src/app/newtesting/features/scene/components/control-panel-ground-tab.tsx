"use client";
import {useTestingNewStore} from "@/app/newtesting/page-content";
import {Button} from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {LOCAL_GROUND_MODELS} from "../../animation/model-repo";
import {ControlPanelSlider} from "@/app/newtesting/app/components/control-panel/components/control-panel-slider";

export const ControlPanelGroundTab = () => {
    const ground = useTestingNewStore((state) => state.ground);
    const setGroundPosition = useTestingNewStore(
        (state) => state.setGroundPosition
    );
    const resetGround = useTestingNewStore((state) => state.resetGround);

    return (
        <div>
            <h3 className="font-bold mb-2">Ground</h3>
            <ControlPanelSlider
                label="Ground Y"
                value={ground.data.position.y}
                min={-5}
                max={5}
                step={0.1}
                onChange={(value) =>
                    setGroundPosition({
                        ...ground.data.position,
                        y: value,
                    })
                }
            />
            <Button onClick={() => resetGround()}>Reset</Button>
            <Select>
                <SelectTrigger>
                    <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                    {Object.values(LOCAL_GROUND_MODELS).map((model) => (
                        <SelectItem key={model} value={model}>
                            {model}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
