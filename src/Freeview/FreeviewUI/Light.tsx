import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { Typography } from "@/components/ui/typographyh3";
import React from "react";

export default function Light() {
    const availableLighting = ["ambient", "directional"];

    return (
        <div>
            <Typography variant="h4">
                <span className="mr-2">Lighting</span>
            </Typography>
            {availableLighting.map((item) => (
                <Toggle
                    key={item}
                    // pressed={item == currentShape}
                    // onPressedChange={(pressed) =>
                    //     handleChangeShape(item, pressed)
                    // }
                >
                    {item.toUpperCase()}
                </Toggle>
            ))}
        </div>
    );
}
