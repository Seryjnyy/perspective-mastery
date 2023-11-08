import { Canvas, useFrame } from "@react-three/fiber";
import KeyCam from "./KeyCam";
import Three from "./Three";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import Navbar from "./navbar";
import {
    CameraControls,
    Edges,
    KeyboardControls,
    KeyboardControlsEntry,
    OrbitControls,
    useKeyboardControls,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import Test from "./test";
import Viewer from "./Viewer";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="h-full flex flex-col">
                <Navbar />
                <Separator />
                {/* <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-center">Lessons</h1>
                    <Card className="w-80">
                        <CardHeader>
                            <CardTitle>Get started with first lesson</CardTitle>
                            <CardDescription>some stuff</CardDescription>
                            <CardContent>this is a box</CardContent>
                            <CardFooter>
                                <Button>hello</Button>
                            </CardFooter>
                        </CardHeader>
                    </Card>
                </div> */}
                <Viewer />
            </div>
        </ThemeProvider>
    );
}

export default App;
