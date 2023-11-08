import React, { useState } from "react";
import Three from "./Three";
import ViewerUI from "./ViewerUI";
import ViewerContext from "./ViewerContext";

export default function Viewer() {
    const [viewGismos, setViewGismos] = useState(true);

    return (
        <div>
            <ViewerContext>
                <ViewerUI />
                <Three viewGismos={viewGismos} />
            </ViewerContext>
        </div>
    );
}
