"use client"
import {Canvas} from "@react-three/fiber";
import React from "react";
import CameraControlsScene, {CameraControlsInScene, CameraDataCollector, Scene} from "@/app/newtesting/page";
import {CameraData, useGlobalSceneStore} from "@/app/newtesting/useGlobalSceneStore";

export default function Guided(){
//     const camera = useGlobalSceneStore((state) => state.camera.data);
//     const setCamera = useGlobalSceneStore((state) => state.camera.setCamera);
//     const object = useGlobalSceneStore((state) => state.object.data);
//     const ground = useGlobalSceneStore.use.ground().data
//     const lookAtTarget = useGlobalSceneStore((state) => state.lookAtTarget.data);
//
//     const handleCameraDataChange = (data: CameraData) => {
//         setCamera({
//             fov: data.fov,
//             position: data.position,
//             aspect: data.aspect,
//             far: data.far,
//             near: data.near,
//             rotation: data.rotation,
//             zoom: data.zoom,
//         });
//     };
//
//     return (<Canvas>
//         <Scene
//             objectPosition={object.position}
//             objectScale={object.scale}
//             groundPosition={ground.position}
//             objectRotation={object.rotation}
//             lookAtTarget={lookAtTarget.position}
//             showTarget={lookAtTarget.isEnabled && lookAtTarget.isShowTargetMarker}
//         />
//             <CameraControlsInScene
//                 cameraPosition={camera.desiredPosition}
//                 cameraFov={camera.desiredFov}
//                 lookAtTarget={lookAtTarget.position}
//                 lookAtEnabled={lookAtTarget.isEnabled}
//             />
//         <CameraDataCollector onCameraDataChange={handleCameraDataChange} />
//     </Canvas>
// )
    return <></>
}