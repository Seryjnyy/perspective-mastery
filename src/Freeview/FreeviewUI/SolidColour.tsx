import { useState } from "react";
import { Checkbox } from "../../components/ui/checkbox";
import { Typography } from "../../components/ui/typographyh3";
import { useFreeviewContext } from "../FreeviewContext";

export default function SolidColour() {
    const { solidColour, toggleSolidColour } = useFreeviewContext();
    const [solidColourUI, setSolidColourUI] = useState(solidColour.current);

    const handleSolidColourChange = (checked: boolean) => {
        toggleSolidColour(checked);
        setSolidColourUI(solidColour.current);
    };

    return (
        <div>
            <Typography variant="h4">
                <span className="mr-2">Solid colour</span>
                <Checkbox
                    checked={solidColourUI}
                    onCheckedChange={(checked) =>
                        handleSolidColourChange(
                            checked == "indeterminate" ? false : checked
                        )
                    }
                />
            </Typography>
        </div>
    );
}
