"use client";
import {Html, useProgress} from "@react-three/drei";

export function Loader() {
    const {progress} = useProgress();
    return (
        <Html center>
            <span className="text-white text-sm">{progress.toFixed(2)}%</span>
        </Html>
    );
}
