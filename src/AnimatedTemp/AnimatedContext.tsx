import React, {
    MutableRefObject,
    createContext,
    useContext,
    useRef,
} from "react";

type EventType = "frame_change";

type AnimatedContextType = {
    subscribeToEvents: (callback: (eventType: string) => void) => number;
    unsubscribeFromEvents: (index: number) => void;

    currentFrame: MutableRefObject<number>;
    frameAmount: MutableRefObject<number>;
    updateFrame: (addFrame: number) => void;
};

const animatedContext = createContext<AnimatedContextType>(
    {} as AnimatedContextType
);

// Assumes model is at rotation x y z of all 0
export default function AnimatedContext({ children }: any) {
    const eventSubscribers = useRef<[(eventType: EventType) => void]>([
        () => {},
    ]);
    const currentFrame = useRef<number>(0);
    const frameAmount = useRef<number>(20);

    const subscribeToEvents = (callback: (eventType: EventType) => void) => {
        eventSubscribers.current.push(callback);
        return eventSubscribers.current.length - 1;
    };

    const unsubscribeFromEvents = (index: number) => {
        eventSubscribers.current.splice(index, 1);
    };

    const updateSubscribers = (eventType: EventType) => {
        eventSubscribers.current.forEach((callback) => callback(eventType));
    };

    const updateFrame = (addFrame: number) => {
        currentFrame.current += addFrame;
        if (currentFrame.current > frameAmount.current) {
            currentFrame.current = frameAmount.current;
        }

        if (currentFrame.current < 0) {
            currentFrame.current = 0;
        }

        updateSubscribers("frame_change");
    };

    return (
        <animatedContext.Provider
            value={{
                subscribeToEvents,
                unsubscribeFromEvents,
                currentFrame,
                frameAmount,
                updateFrame,
            }}
        >
            {children}
        </animatedContext.Provider>
    );
}

export function useAnimatedContext() {
    return useContext(animatedContext);
}
