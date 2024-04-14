import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useFreeviewContext } from "../FreeviewContext";
import { Typography } from "@/components/ui/typography";

export default function Fisheye() {
    const { fisheye, toggleFisheye } = useFreeviewContext();
    const [fisheyeUI, setFisheyeUI] = useState(fisheye.current);

    const handleFisheyeChange = (checked: boolean) => {
        toggleFisheye(checked);
        setFisheyeUI(fisheye.current);
    };

    return (
        <div className="flex items-center">
            <Typography variant={"h5"} as="h5" className="mr-2">
                Fisheye
            </Typography>

            <Checkbox
                checked={fisheyeUI}
                onCheckedChange={(checked) =>
                    handleFisheyeChange(
                        checked == "indeterminate" ? false : checked
                    )
                }
            />
        </div>
    );
}
