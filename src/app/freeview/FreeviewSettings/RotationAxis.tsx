import { Toggle } from "@/components/ui/toggle";
import { Typography } from "@/components/ui/typography";

type rotationAxisType = "x" | "y" | "z";

interface RotationAxisProps {
  rotationAxis: rotationAxisType;
  onRotationAxisChange: (newAxis: rotationAxisType) => void;
}
export default function RotationAxis({
  rotationAxis,
  onRotationAxisChange,
}: RotationAxisProps) {
  // const [rotationAxis, setRotationAxis] = useState("x");

  const handlePress = (axis: rotationAxisType, pressed: boolean) => {
    if (!pressed) {
      return;
    }

    onRotationAxisChange(axis);
  };

  return (
    <div>
      <Typography variant="h4">Axis</Typography>
      <Toggle
        pressed={rotationAxis == "x"}
        onPressedChange={(pressed) => handlePress("x", pressed)}
      >
        X
      </Toggle>
      <Toggle
        pressed={rotationAxis == "y"}
        onPressedChange={(pressed) => handlePress("y", pressed)}
      >
        Y
      </Toggle>
      <Toggle
        pressed={rotationAxis == "z"}
        onPressedChange={(pressed) => handlePress("z", pressed)}
      >
        Z
      </Toggle>
    </div>
  );
}
