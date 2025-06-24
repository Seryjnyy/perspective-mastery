"use client";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";

export const ControlPanelCheckbox = ({
                                         label,
                                         checked,
                                         onChange,
                                     }: {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}) => {
    const id = `checkbox-${label}`;
    return (
        <div className="mb-2">
            <Label className="flex items-center" htmlFor={id}>
                {label}
            </Label>
            <Checkbox
                checked={checked}
                onCheckedChange={(checked) => {
                    if (checked == "indeterminate") {
                        onChange(true);
                    } else {
                        onChange(checked);
                    }
                }}
                className="mr-2"
            />
        </div>
    );
};
