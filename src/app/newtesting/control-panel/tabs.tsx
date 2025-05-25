import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ButtonSetting, CheckboxSetting, SliderSetting } from "./base-ui";
import { CameraPosition } from "./camera/camera-sections";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Slider } from "@radix-ui/react-slider";
import { AnimationPreset, animationPresets } from "../animations";
import { useFrame } from "@react-three/fiber";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CameraTab = ({
  cameraPosition,
  setCameraPosition,
  cameraFov,
  setCameraFov,
  resetCamera,
}: {
  cameraPosition: { x: number; y: number; z: number };
  setCameraPosition: (pos: { x: number; y: number; z: number }) => void;
  cameraFov: number;
  setCameraFov: (fov: number) => void;
  resetCamera: () => void;
}) => (
  <div>
    <h3 className="font-bold mb-2">Camera Controls</h3>
    <Tabs defaultValue="camera">
      <TabsList>
        <TabsTrigger value="camera">Camera</TabsTrigger>
        <TabsTrigger value="look-at">Look At</TabsTrigger>
        <TabsTrigger value="object">Object</TabsTrigger>
      </TabsList>

      <TabsContent value="camera">
        {/* <CameraSettings
          cameraPosition={cameraPosition}
          setCameraPosition={setCameraPosition}
          cameraFov={cameraFov}
          setCameraFov={setCameraFov}
          resetCamera={resetCamera}
        /> */}
        <CameraPosition />
      </TabsContent>

      <TabsContent value="look-at">
        {/* LookAtTab will be defined later */}
      </TabsContent>

      <TabsContent value="object">
        {/* ObjectTab will be defined later */}
      </TabsContent>
    </Tabs>

    <SliderSetting
      label="Position X"
      value={cameraPosition.x}
      min={-10}
      max={10}
      step={0.1}
      onChange={(value) => setCameraPosition({ ...cameraPosition, x: value })}
    />
    <SliderSetting
      label="Position Y"
      value={cameraPosition.y}
      min={-10}
      max={10}
      step={0.1}
      onChange={(value) => setCameraPosition({ ...cameraPosition, y: value })}
    />
    <SliderSetting
      label="Position Z"
      value={cameraPosition.z}
      min={-10}
      max={10}
      step={0.1}
      onChange={(value) => setCameraPosition({ ...cameraPosition, z: value })}
    />
    <SliderSetting
      label="FOV"
      value={cameraFov}
      min={10}
      max={120}
      step={1}
      onChange={setCameraFov}
    />
    <ButtonSetting onClick={resetCamera}>Reset Camera</ButtonSetting>
  </div>
);

const LookAtTab = ({
  lookAtEnabled,
  setLookAtEnabled,
  showTarget,
  setShowTarget,
  lookAtTarget,
  setLookAtTarget,
  resetLookAt,
  lookAtObject,
}: {
  lookAtEnabled: boolean;
  setLookAtEnabled: (enabled: boolean) => void;
  showTarget: boolean;
  setShowTarget: (show: boolean) => void;
  lookAtTarget: { x: number; y: number; z: number };
  setLookAtTarget: (target: { x: number; y: number; z: number }) => void;
  resetLookAt: () => void;
  lookAtObject: () => void;
}) => (
  <div>
    <h3 className="font-bold mb-2">Look-At Target</h3>
    <CheckboxSetting
      label="Enable Look-At"
      checked={lookAtEnabled}
      onChange={() => setLookAtEnabled(!lookAtEnabled)}
    />
    <CheckboxSetting
      label="Show Target Marker"
      checked={showTarget}
      onChange={() => setShowTarget(!showTarget)}
    />
    <SliderSetting
      label="Target X"
      value={lookAtTarget.x}
      min={-5}
      max={5}
      step={0.1}
      onChange={(value) => setLookAtTarget({ ...lookAtTarget, x: value })}
      disabled={!lookAtEnabled}
    />
    <SliderSetting
      label="Target Y"
      value={lookAtTarget.y}
      min={-5}
      max={5}
      step={0.1}
      onChange={(value) => setLookAtTarget({ ...lookAtTarget, y: value })}
      disabled={!lookAtEnabled}
    />
    <SliderSetting
      label="Target Z"
      value={lookAtTarget.z}
      min={-5}
      max={5}
      step={0.1}
      onChange={(value) => setLookAtTarget({ ...lookAtTarget, z: value })}
      disabled={!lookAtEnabled}
    />
    <div className="flex gap-2">
      <ButtonSetting onClick={resetLookAt} disabled={!lookAtEnabled}>
        Reset Target
      </ButtonSetting>
      <ButtonSetting onClick={lookAtObject} variant="success">
        Look At Object
      </ButtonSetting>
    </div>
  </div>
);

const PositionTab = ({
  objectPosition,
  setObjectPosition,
  resetObject,
}: {
  objectPosition: { x: number; y: number; z: number };
  setObjectPosition: (pos: { x: number; y: number; z: number }) => void;
  resetObject: () => void;
}) => (
  <div>
    <h3 className="font-bold mb-2">Object Position</h3>
    <SliderSetting
      label="Position X"
      value={objectPosition.x}
      min={-5}
      max={5}
      step={0.1}
      onChange={(value) => setObjectPosition({ ...objectPosition, x: value })}
    />
    <SliderSetting
      label="Position Y"
      value={objectPosition.y}
      min={-5}
      max={5}
      step={0.1}
      onChange={(value) => setObjectPosition({ ...objectPosition, y: value })}
    />
    <SliderSetting
      label="Position Z"
      value={objectPosition.z}
      min={-5}
      max={5}
      step={0.1}
      onChange={(value) => setObjectPosition({ ...objectPosition, z: value })}
    />
    <ButtonSetting onClick={resetObject}>Reset Object</ButtonSetting>
  </div>
);

const ScaleTab = ({
  objectScale,
  setObjectScale,
  resetObject,
}: {
  objectScale: { x: number; y: number; z: number };
  setObjectScale: (scale: { x: number; y: number; z: number }) => void;
  resetObject: () => void;
}) => (
  <div>
    <h3 className="font-bold mb-2">Object Scale</h3>
    <SliderSetting
      label="Scale X"
      value={objectScale.x}
      min={0.1}
      max={3}
      step={0.1}
      onChange={(value) => setObjectScale({ ...objectScale, x: value })}
    />
    <SliderSetting
      label="Scale Y"
      value={objectScale.y}
      min={0.1}
      max={3}
      step={0.1}
      onChange={(value) => setObjectScale({ ...objectScale, y: value })}
    />
    <SliderSetting
      label="Scale Z"
      value={objectScale.z}
      min={0.1}
      max={3}
      step={0.1}
      onChange={(value) => setObjectScale({ ...objectScale, z: value })}
    />
    <ButtonSetting onClick={resetObject}>Reset Object</ButtonSetting>
  </div>
);

const RotationTab = ({
  objectRotation,
  setObjectRotation,
  resetObject,
}: {
  objectRotation: {
    x: number;
    y: number;
    z: number;
  };
  setObjectRotation: (rotation: { x: number; y: number; z: number }) => void;
  resetObject: () => void;
}) => {
  const rotateObject = (axis: "x" | "y" | "z", degrees: number) => {
    const radians = (degrees * Math.PI) / 180;

    setObjectRotation({
      ...objectRotation,
      [axis]: objectRotation[axis] + radians,
    });
  };

  return (
    <div>
      <h3 className="font-bold mb-2">Object Rotation</h3>
      <SliderSetting
        label="Rotation X"
        value={objectRotation.x}
        min={0}
        max={2 * Math.PI}
        step={0.1}
        onChange={(value) =>
          setObjectRotation({
            ...objectRotation,
            x: value,
          })
        }
      />
      <SliderSetting
        label="Rotation Y"
        value={objectRotation.y}
        min={0}
        max={2 * Math.PI}
        step={0.1}
        onChange={(value) =>
          setObjectRotation({
            ...objectRotation,
            y: value,
          })
        }
      />
      <SliderSetting
        label="Rotation Z"
        value={objectRotation.z}
        min={0}
        max={2 * Math.PI}
        step={0.1}
        onChange={(value) =>
          setObjectRotation({
            ...objectRotation,
            z: value,
          })
        }
      />

      <div className="mt-3 border-t border-gray-600 pt-3">
        <h4 className="font-semibold mb-2">Quick Rotation</h4>
        <div className="grid grid-cols-2 gap-2">
          <ButtonSetting
            size="small"
            variant="danger"
            onClick={() => rotateObject("x", 10)}
          >
            X +10°
          </ButtonSetting>
          <ButtonSetting
            size="small"
            variant="danger"
            onClick={() => rotateObject("x", -10)}
          >
            X -10°
          </ButtonSetting>
          <ButtonSetting
            size="small"
            variant="success"
            onClick={() => rotateObject("y", 10)}
          >
            Y +10°
          </ButtonSetting>
          <ButtonSetting
            size="small"
            variant="success"
            onClick={() => rotateObject("y", -10)}
          >
            Y -10°
          </ButtonSetting>
          <ButtonSetting size="small" onClick={() => rotateObject("z", 10)}>
            Z +10°
          </ButtonSetting>
          <ButtonSetting size="small" onClick={() => rotateObject("z", -10)}>
            Z -10°
          </ButtonSetting>
        </div>
      </div>
      <ButtonSetting onClick={resetObject}>Reset Object</ButtonSetting>
    </div>
  );
};

const ObjectTab = () => {
  return (
    <div>
      <h3 className="font-bold mb-2">Object</h3>
      <Tabs defaultValue="model">
        <TabsList>
          <TabsTrigger value="model">Model</TabsTrigger>
          <TabsTrigger value="position">Position</TabsTrigger>
          <TabsTrigger value="rotation">Rotation</TabsTrigger>
          <TabsTrigger value="scale">Scale</TabsTrigger>
        </TabsList>
        <TabsContent value="model">Mesh</TabsContent>
        <TabsContent value="position">
          <PositionTab
            objectPosition={{ x: 0, y: 0, z: 0 }}
            setObjectPosition={() => {}}
            resetObject={() => {}}
          />
        </TabsContent>
        <TabsContent value="rotation">
          <RotationTab
            objectRotation={{ x: 0, y: 0, z: 0 }}
            setObjectRotation={() => {}}
            resetObject={() => {}}
          />
        </TabsContent>
        <TabsContent value="scale">
          <ScaleTab
            objectScale={{ x: 1, y: 1, z: 1 }}
            setObjectScale={() => {}}
            resetObject={() => {}}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export type AnimationKeyframe = {
  t: number; // from 0 to 1
  config: {
    objectRotation: { x: number; y: number; z: number };
    objectPosition: { x: number; y: number; z: number };
    cameraPosition: { x: number; y: number; z: number };
    cameraFov: number;
    lookAtTargetPosition: { x: number; y: number; z: number };
  };
};

/**
 * Requires to have a config at t=0 and t=1.
 */
// const animKeyframes: AnimationKeyframe[] = [
//   {
//     t: 0,
//     config: {
//       objectRotation: { x: 0, y: 0, z: 0 },
//       objectPosition: { x: 0, y: 0, z: 0 },
//       cameraPosition: { x: 3, y: 3, z: 5 },
//       cameraFov: 50,
//       lookAtTargetPosition: { x: 0, y: 0, z: 0 },
//     },
//   },
//   {
//     t: 0.5,
//     config: {
//       objectRotation: { x: Math.PI, y: 0, z: 0 },
//       objectPosition: { x: 0, y: 0, z: 0 },
//       cameraPosition: { x: 4, y: 3, z: 5 },
//       cameraFov: 50,
//       lookAtTargetPosition: { x: 0, y: 0, z: 3 },
//     },
//   },
//   {
//     t: 1,
//     config: {
//       objectRotation: { x: Math.PI * 2, y: 0, z: 0 },
//       objectPosition: { x: 0, y: 0, z: 0 },
//       cameraPosition: { x: 5, y: 3, z: 5 },
//       cameraFov: 50,
//       lookAtTargetPosition: { x: 5, y: 0, z: 3 },
//     },
//   },
// ];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function interpolateKeyframes(keyframes: AnimationKeyframe[], t: number) {
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

const AnimationTab = ({
  setObjectPosition,
  setObjectRotation,
  setCameraPosition,
  setCameraFov,
  setLookAtTargetPosition,
}: {
  setObjectPosition: (pos: { x: number; y: number; z: number }) => void;
  setObjectRotation: (rotation: { x: number; y: number; z: number }) => void;
  setCameraPosition: (pos: { x: number; y: number; z: number }) => void;
  setCameraFov: (fov: number) => void;
  setLookAtTargetPosition: (target: {
    x: number;
    y: number;
    z: number;
  }) => void;
}) => {
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [steps, setSteps] = useState(10);
  const [selectedAnimationPreset, setSelectedAnimationPreset] = useState(
    animationPresets[0]
  );

  const startAnimation = () => {
    setIsAnimationStarted(true);

    setAnimationProgress(0);

    animate(selectedAnimationPreset.keyFrames, 0);
  };

  const resetAnimation = () => {
    setIsAnimationStarted(false);
    setAnimationProgress(0);
    animate(selectedAnimationPreset.keyFrames, 0);
  };

  const animate = (keyFrames: AnimationKeyframe[], t: number) => {
    const anim = interpolateKeyframes(keyFrames, t);
    setObjectRotation(anim.objectRotation);
    setObjectPosition(anim.objectPosition);
    setCameraPosition(anim.cameraPosition);
    setCameraFov(anim.cameraFov);
    setLookAtTargetPosition(anim.lookAtTargetPosition);
  };

  /**
   *
   * @param delta 0 to 1, where 0 is the start of the animation and 1 is the end.
   */
  const progressAnimation = (delta: number) => {
    if (!isAnimationStarted) return;
    if (delta < 0 || delta > 1) {
      console.warn("Delta must be between 0 and 1");
      return;
    }
    const newProgress = Math.min(animationProgress + delta, 1);
    setAnimationProgress(newProgress);

    animate(selectedAnimationPreset.keyFrames, newProgress);
  };

  const updateAnimationPreset = (preset: AnimationPreset) => {
    setSelectedAnimationPreset(preset);
    setAnimationProgress(0);
    animate(preset.keyFrames, 0);
  };

  return (
    <div>
      <h3 className="font-bold mb-2">Animation</h3>
      <Button onClick={() => startAnimation()} disabled={isAnimationStarted}>
        Start Animation
      </Button>
      <Button onClick={() => resetAnimation()} disabled={!isAnimationStarted}>
        Reset Animation
      </Button>
      <div>{animationProgress}</div>
      <SliderSetting
        label="Steps"
        value={steps}
        min={0}
        max={20}
        step={1}
        onChange={(value) => {
          setSteps(value);
        }}
        disabled={isAnimationStarted}
      />
      <SliderSetting
        label="Animation Progress"
        value={animationProgress}
        min={0}
        max={1}
        step={1 / steps}
        onChange={(value) => {
          setAnimationProgress(value);
          animate(selectedAnimationPreset.keyFrames, value);
        }}
        disabled={!isAnimationStarted}
      />

      <Button
        onClick={() => progressAnimation(1 / steps)}
        disabled={!isAnimationStarted}
      >
        Progress Animation
      </Button>
      <div className="max-w-[300px] overflow-x-scroll">
        <ul className="flex">
          {animationPresets.map((preset) => (
            <li key={preset.id} className="mb-2">
              <Button
                variant="outline"
                onClick={() => {
                  updateAnimationPreset(preset);
                }}
              >
                {preset.name}
              </Button>
              <p className="text-sm text-gray-500">{preset.desc}</p>
            </li>
          ))}
        </ul>
      </div>
      <AnimationPreviewer
        duration={3}
        keyframes={selectedAnimationPreset.keyFrames}
        apply={(state) => {
          setObjectRotation(state.objectRotation);
          setObjectPosition(state.objectPosition);
          setCameraPosition(state.cameraPosition);
          setCameraFov(state.cameraFov);
          setLookAtTargetPosition(state.lookAtTargetPosition);
        }}
      />

      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="min-w-[98vw]">
          <DialogHeader>
            <DialogTitle>Select animation preset</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="flex">
            <ul className="flex flex-col gap-2">
              {animationPresets.map((preset) => (
                <li key={preset.id}>
                  <Button
                    variant="outline"
                    onClick={() => {
                      updateAnimationPreset(preset);
                    }}
                  >
                    {preset.name}
                  </Button>
                  <p className="text-sm text-gray-500">{preset.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function AnimationPlayer({
  duration = 2, // seconds
  keyframes,
  apply,
}: {
  duration?: number;
  keyframes: AnimationKeyframe[];
  apply: (state: ReturnType<typeof interpolateKeyframes>) => void;
}) {
  const startTime = useRef<number | null>(null);
  const [playing, setPlaying] = useState(true);

  useFrame((state) => {
    if (!playing) return;

    if (startTime.current === null)
      startTime.current = state.clock.getElapsedTime();
    const elapsed = state.clock.getElapsedTime() - startTime.current;
    const t = Math.min(elapsed / duration, 1);

    const interpolated = interpolateKeyframes(keyframes, t);
    apply(interpolated);

    if (t >= 1) setPlaying(false);
  });

  return null;
}

export function AnimationPreviewer({
  duration = 3,
  keyframes,
  apply,
}: {
  duration?: number;
  keyframes: AnimationKeyframe[];
  apply: (state: any) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loop, setLoop] = useState(true);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    setPlaying(false);
    setProgress(0);
    startTime.current = null;
  }, [keyframes]);
  useAnimationPlayer({
    duration: duration,
    loop,
    playing,
    onFrame: (t) => {
      setProgress(t);
      const result = interpolateKeyframes(keyframes, t);
      apply(result); // you send the result to your mesh however you like
    },
  });

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseFloat(e.target.value);
    setProgress(t);
    apply(interpolateKeyframes(keyframes, t));
    setPlaying(false);
    startTime.current = null;
  };

  return (
    <div className="">
      <button
        onClick={() => {
          setPlaying((p) => !p);
          if (!playing) startTime.current = null;
        }}
      >
        {playing ? "Pause" : "Play"}
      </button>

      <button onClick={() => setLoop((l) => !l)}>
        Loop: {loop ? "On" : "Off"}
      </button>

      <input
        type="range"
        min={0}
        max={1}
        step={0.001}
        value={progress}
        onChange={handleScrub}
        style={{ width: 150 }}
      />
    </div>
  );
}

export function useAnimationPlayer({
  duration,
  loop,
  playing,
  onFrame,
}: {
  duration: number;
  loop: boolean;
  playing: boolean;
  onFrame: (progress: number) => void;
}) {
  const startTime = useRef<number | null>(null);
  const frameId = useRef<number>();

  const tick = (now: number) => {
    if (!playing) return;

    if (startTime.current === null) startTime.current = now;
    const elapsed = (now - startTime.current) / 1000;
    let t = elapsed / duration;

    if (t >= 1) {
      if (loop) {
        startTime.current = now;
        t = 0;
      } else {
        t = 1;
      }
    }

    onFrame(Math.min(t, 1));
    if (t < 1 || loop) frameId.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (playing) {
      frameId.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(frameId.current!);
      startTime.current = null;
    }

    return () => cancelAnimationFrame(frameId.current!);
  }, [playing, loop]);
}

export {
  CameraTab,
  LookAtTab,
  PositionTab,
  ScaleTab,
  RotationTab,
  ObjectTab,
  AnimationTab,
};
