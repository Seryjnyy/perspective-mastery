import { Toggle } from "@/components/ui/toggle";
import { Typography } from "@/components/ui/typographyh3";
import React, { useState } from "react";
import { useFreeviewContext } from "../FreeviewContext";

const availableShapes = ["box", "cylinder"];

export default function ChangeShape() {
    const { shape, setShape } = useFreeviewContext();
    const [currentShape, setCurrentShape] = useState<"box" | "cylinder">(
        shape.current
    );

    const handleChangeShape = (newShape: string, pressedIn: boolean) => {
        if (!pressedIn) {
            return;
        }

        if (newShape != "box" && newShape != "cylinder") return;

        setShape(newShape);
        setCurrentShape(shape.current);
    };

    return (
        <div>
            <Typography variant="h4">Shape</Typography>
            {availableShapes.map((item) => (
                <Toggle
                    key={item}
                    pressed={item == currentShape}
                    onPressedChange={(pressed) =>
                        handleChangeShape(item, pressed)
                    }
                >
                    {item}
                </Toggle>
            ))}
        </div>
    );
}
