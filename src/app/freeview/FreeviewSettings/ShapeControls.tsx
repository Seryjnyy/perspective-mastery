import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { ShapeControlsType, useFreeviewContext } from "../FreeviewContext";

export default function ShapeControls() {
    const { shapeControls, setShapeControls } = useFreeviewContext();
    const [radioValue, setRadioValue] = useState(
        `option-${shapeControls.current}`
    );

    const controls: ShapeControlsType[] = [
        "none",

        "translate",
        "scale",
        "rotate",
    ];

    const handleShapeControlChange = (newShapeControl: ShapeControlsType) => {
        setShapeControls(newShapeControl);
        setRadioValue(`option-${shapeControls.current}`);
    };

    return (
        <div>
            {/* note that camera will always looks at the center 0,0,0 pivot
            Controls translate scale rotate */}
            <RadioGroup value={radioValue}>
                {controls.map((item, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                        <RadioGroupItem
                            value={`option-${item}`}
                            id={`option-${item}`}
                            onClick={() => handleShapeControlChange(item)}
                        />
                        <Label htmlFor={`option-${item}`}>
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}
