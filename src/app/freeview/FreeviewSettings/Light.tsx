import { Toggle } from "@/components/ui/toggle";
import { Typography } from "@/components/ui/typography";

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
