import React, {
    MutableRefObject,
    createContext,
    useContext,
    useRef,
} from "react";

type ViewerForcedContextType = {
    viewGismos: MutableRefObject<boolean>;
    rotateDegree: MutableRefObject<number>;
    rotateForward: (axis: "x" | "y" | "z") => void;
    rotateBackward: (axis: "x" | "y" | "z") => void;
    rotate: (axis: "x" | "y" | "z", degree: number) => void;
    subscribeToRotation: (callback: () => void) => number;
    unsubscribeFromRotation: (index: number) => void;
    xDegree: MutableRefObject<number>;
    yDegree: MutableRefObject<number>;
    zDegree: MutableRefObject<number>;
};

const ViewerForcedUIContext = createContext<ViewerForcedContextType>(
    {} as ViewerForcedContextType
);

// Assumes model is at rotation x y z of all 0
export default function ViewerForcedContext({ children }: any) {
    const viewGismos = useRef(false);

    const xDegree = useRef<number>(0);
    const yDegree = useRef(0);
    const zDegree = useRef(0);

    const rotateDegree = useRef(15);

    // TODO : doesn't seem right
    const rotationSubscribers = useRef<[() => void]>([() => {}]);

    const subscribeToRotation = (callback: () => void) => {
        rotationSubscribers.current.push(callback);

        console.log("subscription");
        return rotationSubscribers.current.length - 1;
    };

    const unsubscribeFromRotation = (index: number) => {
        rotationSubscribers.current.splice(index, 1);
        console.log("unsubscription");
    };

    const rotateForward = (axis: "x" | "y" | "z") => {
        switch (axis) {
            case "x":
                xDegree.current += (rotateDegree.current * Math.PI) / 180;
                if (xDegree.current > 6.2831853072) {
                    xDegree.current = 6.2831853072;
                }
                break;
            case "y":
                yDegree.current += (rotateDegree.current * Math.PI) / 180;
                if (yDegree.current > 6.2831853072) {
                    yDegree.current = 6.2831853072;
                }
                break;
            case "z":
                zDegree.current += (rotateDegree.current * Math.PI) / 180;
                if (zDegree.current > 6.2831853072) {
                    zDegree.current = 6.2831853072;
                }
                break;
        }

        rotationSubscribers.current.forEach((callback) => callback());
    };

    const rotateBackward = (axis: "x" | "y" | "z") => {
        switch (axis) {
            case "x":
                xDegree.current -= (rotateDegree.current * Math.PI) / 180;
                if (xDegree.current < 0) {
                    xDegree.current = 0;
                }
                break;
            case "y":
                yDegree.current -= (rotateDegree.current * Math.PI) / 180;
                if (yDegree.current < 0) {
                    yDegree.current = 0;
                }
                break;
            case "z":
                zDegree.current -= (rotateDegree.current * Math.PI) / 180;
                if (zDegree.current < 0) {
                    zDegree.current = 0;
                }
                break;
        }

        rotationSubscribers.current.forEach((callback) => callback());
    };

    const rotate = (axis: "x" | "y" | "z", degree: number) => {
        switch (axis) {
            case "x":
                xDegree.current = degree * (Math.PI / 180);
                break;
            case "y":
                yDegree.current = degree * (Math.PI / 180);
                break;
            case "z":
                zDegree.current = degree * (Math.PI / 180);
                break;
        }

        rotationSubscribers.current.forEach((callback) => callback());
    };

    return (
        <ViewerForcedUIContext.Provider
            value={{
                viewGismos: viewGismos,
                rotateDegree: rotateDegree,
                rotateForward: rotateForward,
                rotateBackward: rotateBackward,
                rotate,
                subscribeToRotation: subscribeToRotation,
                unsubscribeFromRotation: unsubscribeFromRotation,
                xDegree: xDegree,
                yDegree: yDegree,
                zDegree: zDegree,
            }}
        >
            {children}
        </ViewerForcedUIContext.Provider>
    );
}

export function useViewer() {
    return useContext(ViewerForcedUIContext);
}
