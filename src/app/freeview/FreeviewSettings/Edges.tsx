import React, { useState } from "react";
import { useFreeviewContext } from "../FreeviewContext";
import { Typography } from "@/components/ui/typography";
import { Checkbox } from "@/components/ui/checkbox";

export default function Edges() {
  const { edges, toggleEdges } = useFreeviewContext();
  const [edgesUI, setEdgesUI] = useState(edges.current);

  const handleEdgesChange = (checked: boolean) => {
    toggleEdges(checked);
    setEdgesUI(edges.current);
  };

  return (
    <div>
      {/* <Separator /> */}
      <Typography variant="h4">
        <span className="mr-2">Edges</span>
        <Checkbox
          checked={edgesUI}
          onCheckedChange={(checked) =>
            handleEdgesChange(checked == "indeterminate" ? false : checked)
          }
        />
      </Typography>
    </div>
  );
}
