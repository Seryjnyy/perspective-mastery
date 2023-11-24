import { Checkbox } from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typographyh3";
import { useState } from "react";
import { useFreeviewContext } from "../FreeviewContext";

export default function Gizmos() {
    const { gizmo, toggleGizmo } = useFreeviewContext();
    const [gizmoUI, setGizmoUI] = useState(gizmo.current);

    const handleGizmoChange = (checked: boolean) => {
        toggleGizmo(checked);
        setGizmoUI(gizmo.current);
    };

    return (
        <div>
            {/* <Separator /> */}
            <Typography variant="h4">
                <span className="mr-2">Gizmos</span>
                <Checkbox
                    checked={gizmoUI}
                    onCheckedChange={(checked) =>
                        handleGizmoChange(
                            checked == "indeterminate" ? false : checked
                        )
                    }
                />
            </Typography>
        </div>
    );
}
