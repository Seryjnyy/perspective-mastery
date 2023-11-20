import { MutableRefObject, createContext, useContext, useRef } from "react";

type FreeviewContextType = {
    // viewGismos: MutableRefObject<boolean>;
    // rotateAxis: MutableRefObject<string>;
    // rotateDegree: MutableRefObject<number>;
    // rotateForward: () => void;
    subscribeToEvents: (callback: (eventType: string) => void) => number;
    unsubscribeFromEvents: (index: number) => void;

    shape: MutableRefObject<"box" | "cylinder">;
    setShape: (newShape: "box" | "cylinder") => void;

    solidColour: MutableRefObject<boolean>;
    toggleSolidColour: (toggle: boolean) => void;

    edges: MutableRefObject<boolean>;
    toggleEdges: (toggle: boolean) => void;
};

const FreeviewerContext = createContext<FreeviewContextType>(
    {} as FreeviewContextType
);

export default function FreeviewContext({ children }: any) {
    // const viewGismos = useRef(false);

    // const rotateAxis = useRef("");
    // const rotateDegree = useRef(15);

    // box default
    const shape = useRef<"box" | "cylinder">("box");
    const solidColour = useRef<boolean>(false);
    const edges = useRef<boolean>(false);

    const updateSubscribers = (eventType: string) => {
        eventSubscribers.current.forEach((callback) => callback(eventType));
    };

    const toggleSolidColour = (toggle: boolean) => {
        solidColour.current = toggle;
        updateSubscribers("solidColour_change");
    };

    const toggleEdges = (toggle: boolean) => {
        edges.current = toggle;
        updateSubscribers("edges_change");
    };

    const setShape = (newShape: "box" | "cylinder") => {
        shape.current = newShape;

        updateSubscribers("shape_change");
    };

    // TODO : doesn't seem right
    const eventSubscribers = useRef<[(eventType: string) => void]>([() => {}]);

    const subscribeToEvents = (callback: (eventType: string) => void) => {
        eventSubscribers.current.push(callback);

        console.log("subscription");
        return eventSubscribers.current.length - 1;
    };

    const unsubscribeFromEvents = (index: number) => {
        eventSubscribers.current.splice(index, 1);
        console.log("unsubscription");
    };

    // const rotateForward = () => {
    //     rotationSubscribers.current.forEach((callback) => callback());
    // };

    return (
        <FreeviewerContext.Provider
            value={{
                subscribeToEvents,
                unsubscribeFromEvents,
                shape,
                setShape,
                solidColour,
                toggleSolidColour,
                edges,
                toggleEdges,
            }}
        >
            {children}
        </FreeviewerContext.Provider>
    );
}

export function useFreeviewContext() {
    return useContext(FreeviewerContext);
}
