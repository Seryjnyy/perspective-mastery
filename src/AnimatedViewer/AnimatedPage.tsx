import React from "react";
import AnimatedView from "./AnimatedView";
import AnimatedUI from "./AnimatedUI";
import AnimatedContext from "./AnimatedContext";
import { useParams } from "react-router-dom";

const IncorrectParameters = () => {
  // TODO : Could do something more interesting for this
  return (
    <div className="w-full h-screen relative flex justify-center items-center">
      Incorrect parameters.
    </div>
  );
};

export default function AnimatedPage() {
  const { shape, animation_type, variant } = useParams();

  if (shape != "box" && shape != "cylinder") {
    return <IncorrectParameters />;
  }

  if (variant != "x" && variant != "y" && variant != "z") {
    return <IncorrectParameters />;
  }

  if (animation_type != "circle" && animation_type != "rotate") {
    return <IncorrectParameters />;
  }

  return (
    <div className="w-full h-screen relative">
      <AnimatedContext>
        <AnimatedUI />
        <AnimatedView />
      </AnimatedContext>
    </div>
  );
}
