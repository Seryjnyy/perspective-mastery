"use client";
import {AnimationKeyframe} from "../types/types";

export function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

export function interpolateKeyframes(
    keyframes: AnimationKeyframe[],
    t: number
) {
    // Find the two keyframes t is between
    let i = 0;
    while (i < keyframes.length - 1 && t > keyframes[i + 1].t) i++;

    const kf1 = keyframes[i];
    const kf2 = keyframes[i + 1] ?? kf1;
    const localT = (t - kf1.t) / (kf2.t - kf1.t || 1);

    // Interpolate rotation
    const rot1 = kf1.config.objectRotation;
    const rot2 = kf2.config.objectRotation;
    const newRotatation = {
        x: lerp(rot1.x, rot2.x, localT),
        y: lerp(rot1.y, rot2.y, localT),
        z: lerp(rot1.z, rot2.z, localT),
    };

    // Interpolate position
    const pos1 = kf1.config.objectPosition;
    const pos2 = kf2.config.objectPosition;
    const newPosition = {
        x: lerp(pos1.x, pos2.x, localT),
        y: lerp(pos1.y, pos2.y, localT),
        z: lerp(pos1.z, pos2.z, localT),
    };
    // Interpolate camera position
    const camPos1 = kf1.config.cameraPosition;
    const camPos2 = kf2.config.cameraPosition;
    const newCameraPosition = {
        x: lerp(camPos1.x, camPos2.x, localT),
        y: lerp(camPos1.y, camPos2.y, localT),
        z: lerp(camPos1.z, camPos2.z, localT),
    };
    // Interpolate camera FOV
    const fov1 = kf1.config.cameraFov;
    const fov2 = kf2.config.cameraFov;
    const newCameraFov = lerp(fov1, fov2, localT);

    // Interpolate lookAtTargetPosition
    const lookatPos1 = kf1.config.lookAtTargetPosition;
    const lookatPos2 = kf2.config.lookAtTargetPosition;
    const newLookAtTargetPos = {
        x: lerp(lookatPos1.x, lookatPos2.x, localT),
        y: lerp(lookatPos1.y, lookatPos2.y, localT),
        z: lerp(lookatPos1.z, lookatPos2.z, localT),
    };

    return {
        objectRotation: newRotatation,
        objectPosition: newPosition,
        cameraPosition: newCameraPosition,
        cameraFov: newCameraFov,
        lookAtTargetPosition: newLookAtTargetPos,
    };
}
