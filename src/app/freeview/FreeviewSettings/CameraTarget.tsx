import { useState } from "react";
import { useFreeviewContext } from "../FreeviewContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";

export default function CameraTarget() {
  const { cameraTarget, toggleCameraTarget } = useFreeviewContext();
  const [cameraTargetUI, setCameraTargetUI] = useState(cameraTarget.current);

  const handleCameraTargetChange = (checked: boolean) => {
    toggleCameraTarget(checked);
    setCameraTargetUI(cameraTarget.current);
  };

  return (
    <div className="flex items-center">
      <Typography variant={"h5"} as="h5" className="mr-2">
        Camera target
      </Typography>
      <Checkbox
        checked={cameraTargetUI}
        onCheckedChange={(checked) =>
          handleCameraTargetChange(checked == "indeterminate" ? false : checked)
        }
      />
    </div>
  );
}
