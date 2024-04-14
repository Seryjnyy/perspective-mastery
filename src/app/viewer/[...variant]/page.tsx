import React from "react";
import AnimatedContext from "./AnimatedContext";
import AnimatedUI from "./AnimatedUI";
import AnimatedView from "./AnimatedView";

const IncorrectParameters = () => {
  // TODO : Could do something more interesting for this
  return (
    <div className="w-full h-screen relative flex justify-center items-center">
      Incorrect parameters.
    </div>
  );
};

export default function page({ params }: { params: { variant: string } }) {
  if (
    !params.variant ||
    params.variant.length < 4 ||
    params.variant.length > 4
  ) {
    return <IncorrectParameters />;
  }
  const shape = params.variant[0];
  const animationType = params.variant[1];
  const cameraPos = params.variant[2];
  const axis = params.variant[3];

  console.log(params);
  if (shape != "box" && shape != "cylinder") {
    return <IncorrectParameters />;
  }

  if (animationType != "rotate" && animationType != "circle") {
    return <IncorrectParameters />;
  }

  if (cameraPos != "below" && cameraPos != "level" && cameraPos != "above") {
    return <IncorrectParameters />;
  }

  if (axis != "x" && axis != "y" && axis != "z") {
    return <IncorrectParameters />;
  }

  return (
    <div className="w-full h-screen relative">
      <AnimatedContext>
        <AnimatedUI
          shape={shape}
          animationType={animationType}
          camPos={cameraPos}
          axis={axis}
        />
        <AnimatedView
          shape={shape}
          animationType={animationType}
          camPos={cameraPos}
          axis={axis}
        />
      </AnimatedContext>
    </div>
  );
}
