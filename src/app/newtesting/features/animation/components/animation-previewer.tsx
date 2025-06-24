"use client";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { LoopIcon, PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { AnimationKeyframe } from "../types/types";
import { interpolateKeyframes } from "../utils/utils";

export function AnimationPreviewer({
  duration = 3,
  keyframes,
  apply,
  autoPlay = true,
  onProgressChange = () => {},
}: {
  duration?: number;
  keyframes: AnimationKeyframe[];
  apply: (state: any) => void;
  autoPlay?: boolean;
  onProgressChange?: (progress: number) => void;
}) {
  const [playing, setPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [loop, setLoop] = useState(true);
  const [animationId, setAnimationId] = useState("");
  // const startTime = useRef<number | null>(null);

  useEffect(() => {
    // setPlaying(false);
    // setProgress(0);
    // startTime.current = null;
    setAnimationId(Date.now().toString());
  }, [keyframes]);

  useAnimationPlayer({
    duration: duration,
    loop,
    playing,
    animationId: animationId,
    onFrame: (t) => {
      setProgress(t);
      onProgressChange(t);
      console.log(`${animationId} - ${keyframes.length}`);
      if (keyframes.length === 0) return;
      const result = interpolateKeyframes(keyframes, t);
      apply(result); // you send the result to your mesh however you like
      if (t === 1 && !loop) {
        setPlaying(false);
      }
    },
  });

  const handleScrub = (value: number) => {
    setProgress(value);
    onProgressChange(value);
    apply(interpolateKeyframes(keyframes, value));
    setPlaying(false);
    // startTime.current = null;
  };

  return (
    <div className="w-full  flex flex-col">
      <Slider
        min={0}
        max={1}
        step={0.001}
        value={[progress]}
        onValueChange={(value) => {
          handleScrub(value[0]);
        }}
        className="w-full mb-2"
      />
      <div className="flex items-center justify-between mt-2">
        <Button
          onClick={() => {
            setPlaying((p) => !p);
            // if (!playing) startTime.current = null;
          }}
          size={"icon"}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </Button>

        <Toggle
          variant="outline"
          aria-label="Toggle loop"
          className="w-fit"
          pressed={loop}
          onPressedChange={setLoop}
          size={"sm"}
        >
          <LoopIcon />
        </Toggle>
      </div>
    </div>
  );
}

export function useAnimationPlayer({
  duration,
  loop,
  playing,
  onFrame,
  animationId,
}: {
  duration: number;
  loop: boolean;
  playing: boolean;
  onFrame: (progress: number) => void;
  animationId: string;
}) {
  const startTime = useRef<number | null>(null);
  const frameId = useRef<number>();
  const frameAnimationId = useRef<string>();

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
  }, [playing, loop, animationId]);
}
