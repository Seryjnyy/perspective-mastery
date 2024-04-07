import { MutableRefObject, createContext, useContext, useRef } from "react";

type EventType = "frame_change" | "setting_change";

type AnimatedContextType = {
  subscribeToEvents: (callback: (eventType: string) => void) => number;
  unsubscribeFromEvents: (index: number) => void;

  currentFrame: MutableRefObject<number>;
  frameAmount: MutableRefObject<number>;
  updateFrame: (addFrame: number) => void;

  centerPointSetting: MutableRefObject<boolean>;
  axisSetting: MutableRefObject<boolean>;

  updateCenterPointSetting: (viewCenterPoint: boolean) => void;
  updateAxisSetting: (viewAxis: boolean) => void;
};

const animatedContext = createContext<AnimatedContextType>(
  {} as AnimatedContextType
);

export default function AnimatedContext({ children }: any) {
  const eventSubscribers = useRef<[(eventType: EventType) => void]>([() => {}]);
  const currentFrame = useRef<number>(0);
  const frameAmount = useRef<number>(20);

  const centerPointSetting = useRef<boolean>(false);
  const axisSetting = useRef<boolean>(false);

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

  const updateCenterPointSetting = (viewCenterPoint: boolean) => {
    if (centerPointSetting.current == viewCenterPoint) return;

    centerPointSetting.current = viewCenterPoint;
    updateSubscribers("setting_change");
  };

  const updateAxisSetting = (viewAxis: boolean) => {
    if (axisSetting.current == viewAxis) return;

    axisSetting.current = viewAxis;
    updateSubscribers("setting_change");
  };

  return (
    <animatedContext.Provider
      value={{
        subscribeToEvents,
        unsubscribeFromEvents,
        currentFrame,
        frameAmount,
        updateFrame,
        centerPointSetting,
        axisSetting,
        updateCenterPointSetting,
        updateAxisSetting,
      }}
    >
      {children}
    </animatedContext.Provider>
  );
}

export function useAnimatedContext() {
  return useContext(animatedContext);
}
