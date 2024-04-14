import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Typography } from "@/components/ui/typography";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useFreeviewContext } from "../FreeviewContext";

const shapes = [
  {
    value: "box",
    label: "Box",
  },
  {
    value: "cylinder",
    label: "Cylinder",
  },
  {
    value: "cone",
    label: "Cone",
  },
  {
    value: "capsule",
    label: "Capsule",
  },
  {
    value: "ring",
    label: "Ring",
  },
  {
    value: "circle",
    label: "Circle",
  },
  {
    value: "torus",
    label: "Torus",
  },
  {
    value: "torusKnot",
    label: "Torus Knot",
  },
];

export default function ChangeShape() {
  const { shape, setShape } = useFreeviewContext();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(shape.current);

  const handleChangeShape = (newShape: string) => {
    if (newShape == shape.current) return;
    // HACK : select passes in the value in all lower case for some reason
    if (newShape == "torusknot") {
      newShape = "torusKnot";
    }

    // TODO : I think I can use guard here instead of this, don't know how tho
    if (
      newShape != "box" &&
      newShape != "cylinder" &&
      newShape != "cone" &&
      newShape != "capsule" &&
      newShape != "ring" &&
      newShape != "circle" &&
      newShape != "torus" &&
      newShape != "torusKnot"
    )
      return;
    setShape(newShape);
    setValue(shape.current);
  };

  // TODO : context has type for this, should be created this array with it in mind
  const stuff = ["ah", "bet"];
  return (
    <div>
      <Typography variant="h4">Geometry</Typography>

      <div className="mt-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? shapes.find((item) => item.value === value)?.label
                : "Select shape..."}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            {shapes.map((item, index) => (
              <Button
                variant={"ghost"}
                key={item.value}
                className="w-full"
                onClick={() => {
                  handleChangeShape(item.value);
                  setOpen(false);
                }}
              >
                {item.label}
                {/* {item.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    /> */}
              </Button>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
