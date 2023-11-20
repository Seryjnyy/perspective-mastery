import boxAboveY from "../assets/box/boxAboveY.png";
import boxLevelY from "../assets/box/boxLevelY.png";
import boxBelowY from "../assets/box/boxBelowY.png";

import cylinderAboveY from "../assets/cylinder/cylinderAboveY.png";
import cylinderLevelY from "../assets/cylinder/cylinderLevelY.png";
import cylinderBelowY from "../assets/cylinder/cylinderBelowY.png";

type Shape = "box" | "cylinder";

type CamPos = "below" | "level" | "above";

type RotationAxis = "x" | "y" | "z";

const getBoxImgSrc = (camPos: CamPos, rotation_axis: RotationAxis) => {
    if (camPos == "above") {
        switch (rotation_axis) {
            case "x":
            case "y":
                return boxAboveY;
            case "z":
        }
    }

    if (camPos == "level") {
        switch (rotation_axis) {
            case "x":
            case "y":
                return boxLevelY;
            case "z":
        }
    }

    if (camPos == "below") {
        switch (rotation_axis) {
            case "x":
            case "y":
                return boxBelowY;
            case "z":
        }
    }

    // TODO : default if nothing
    return boxAboveY;
};

const getCylinderImgSrc = (camPos: CamPos, rotation_axis: RotationAxis) => {
    if (camPos == "above") {
        switch (rotation_axis) {
            case "x":
            case "y":
                return cylinderAboveY;
            case "z":
        }
    }

    if (camPos == "level") {
        switch (rotation_axis) {
            case "x":
            case "y":
                return cylinderLevelY;
            case "z":
        }
    }

    if (camPos == "below") {
        switch (rotation_axis) {
            case "x":
            case "y":
                return cylinderBelowY;
            case "z":
        }
    }

    // TODO : default if nothing
    return cylinderAboveY;
};

const getImageSrcFor = (
    shape: Shape,
    camPos: CamPos,
    rotation_axis: RotationAxis
) => {
    // TODO : implement properly
    if (shape == "box") return getBoxImgSrc(camPos, rotation_axis);

    if (shape == "cylinder") return getCylinderImgSrc(camPos, rotation_axis);
};

export { getImageSrcFor };
