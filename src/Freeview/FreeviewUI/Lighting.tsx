import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { LightingType, useFreeviewContext } from "../FreeviewContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const LightPosition = () => {
    return (
        <div className="relative mt-4">
            <div className="absolute h-full w-full bg-background opacity-80 rounded-md"></div>
            <div className="flex gap-2 pt-2">
                <div className="flex flex-col items-center gap-2">
                    <Label htmlFor="light_x">x</Label>
                    <Input
                        type="number"
                        className="w-16"
                        id="light_x"
                        value={2}
                        onChange={() => {}}
                    />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Label htmlFor="light_y">y</Label>
                    <Input
                        type="number"
                        className="w-16"
                        id="light_y"
                        value={2}
                        onChange={() => {}}
                    />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Label htmlFor="light_z">z</Label>
                    <Input
                        type="number"
                        className="w-16"
                        id="light_z"
                        value={2}
                        onChange={() => {}}
                    />
                </div>
            </div>
        </div>
    );
};

export default function Lighting() {
    const { lighting, setLighting } = useFreeviewContext();
    const [radioValue, setRadioValue] = useState(`option-${lighting.current}`);

    const lights: LightingType[] = ["none", "ambient", "point", "directional"];

    const handleLightingChange = (newLightingType: LightingType) => {
        setLighting(newLightingType);
        setRadioValue(`option-${lighting.current}`);
    };

    return (
        <div className="mt-4 mb-4">
            {/* note that camera will always looks at the center 0,0,0 pivot
            Controls translate scale rotate */}
            <RadioGroup value={radioValue}>
                {lights.map((item, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                        <RadioGroupItem
                            value={`option-${item}`}
                            id={`option-${item}`}
                            onClick={() => handleLightingChange(item)}
                        />
                        <Label htmlFor={`option-${item}`}>
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
            <LightPosition />
        </div>
    );
}
