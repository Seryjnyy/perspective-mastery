import React from "react";
import AnimatedView from "./AnimatedView";
import AnimatedUI from "./AnimatedUI";
import AnimatedContext from "./AnimatedContext";

export default function AnimatedPage() {
    return (
        <div className="w-full h-screen relative">
            <AnimatedContext>
                <AnimatedUI />
                <AnimatedView />
            </AnimatedContext>
        </div>
    );
}
