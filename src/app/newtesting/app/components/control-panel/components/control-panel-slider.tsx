"use client";
import {Label} from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";

export const ControlPanelSlider = ({
                                       label,
                                       value,
                                       min,
                                       max,
                                       step,
                                       onChange,
                                       disabled = false,
                                   }: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    disabled?: boolean;
    onChange: (val: number) => void;
}) => {
    const id = `slider-${label}`;
    return (
        <div className="mb-2 space-y-2">
            <Label className="block" htmlFor={id}>
                {label}:
            </Label>
            <Slider
                id={id}
                min={min}
                max={max}
                step={step}
                value={[value]}
                onValueChange={(val) => {
                    if (val.length > 0) {
                        onChange(val[0]);
                    }
                }}
                disabled={disabled}
            />
            {value.toFixed(2)}
        </div>
    );
};
