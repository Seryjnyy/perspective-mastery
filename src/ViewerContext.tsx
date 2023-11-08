import React, {
    MutableRefObject,
    createContext,
    useContext,
    useRef,
} from "react";

type ViewerContextType = {
    viewGismos: MutableRefObject<boolean>;
    rotateAxis: MutableRefObject<string>;
    rotateDegree: MutableRefObject<number>;
    rotateForward: () => void;
    subscribeToRotation: (callback: () => void) => number;
    unsubscribeFromRotation: (index: number) => void;
};

const ViewerUIContext = createContext<ViewerContextType>(
    {} as ViewerContextType
);

export default function ViewerContext({ children }: any) {
    const viewGismos = useRef(false);

    const rotateAxis = useRef("");
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

    const rotateForward = () => {
        rotationSubscribers.current.forEach((callback) => callback());
    };

    return (
        <ViewerUIContext.Provider
            value={{
                viewGismos,
                rotateAxis,
                rotateDegree,
                rotateForward,
                subscribeToRotation,
                unsubscribeFromRotation,
            }}
        >
            {children}
        </ViewerUIContext.Provider>
    );
}

export function useViewer() {
    return useContext(ViewerUIContext);
}
