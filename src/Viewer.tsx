import React, { useState } from "react";
import Three from "./Freeview/FreeviewContent";
import ViewerUI from "./Freeview/FreeviewUI/FreeviewUI";
import ViewerContext from "./Freeview/FreeviewContext";
import ViewerForced from "./Viewer/ViewerForced";
import ViewerForcedUI from "./Viewer/ViewerForcedUI";
import ViewerForcedContext from "./Viewer/ViewerForcedContext";

export default function Viewer() {
    // TODO : should take parameter values here then pass to individual components i think
    // currently components are accessing it individually

    return (
        <div className="w-full h-screen relative">
            <ViewerContext>
                <ViewerUI />
                <Three viewGismos={false} />
            </ViewerContext>
            {/* <ViewerForcedContext>
                <ViewerForcedUI />
                <ViewerForced />
            </ViewerForcedContext> */}
        </div>
        // <div className="w-full h-scree">
        //     <ViewerForced />
        // </div>
    );
}
