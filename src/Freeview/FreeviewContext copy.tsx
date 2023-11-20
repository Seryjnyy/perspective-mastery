import { MutableRefObject, createContext, useContext, useRef } from "react";

type FreeviewContextType = {
    viewGismos: MutableRefObject<boolean>;
    rotateAxis: MutableRefObject<string>;
    rotateDegree: MutableRefObject<number>;
    rotateForward: () => void;
    subscribeToRotation: (callback: () => void) => number;
    unsubscribeFromRotation: (index: number) => void;

    shape: MutableRefObject<"box" | "cylinder">;
    setShape: (newShape: "box" | "cylinder") => void;
};

const FreeviewerContext = createContext<FreeviewContextType>(
    {} as FreeviewContextType
);

export default function FreeviewContext({ children }: any) {
    const viewGismos = useRef(false);

    const rotateAxis = useRef("");
    const rotateDegree = useRef(15);

    // box default
    const shape = useRef<"box" | "cylinder">("box");

    const setShape = (newShape: "box" | "cylinder") => {
        shape.current = newShape;
    };

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

    const rotateForward = () => {
        rotationSubscribers.current.forEach((callback) => callback());
    };

    return (
        <FreeviewerContext.Provider
            value={{
                viewGismos,
                rotateAxis,
                rotateDegree,
                rotateForward,
                subscribeToRotation,
                unsubscribeFromRotation,
                shape,
            }}
        >
            {children}
        </FreeviewerContext.Provider>
    );
}

export function useViewer() {
    return useContext(FreeviewerContext);
}
