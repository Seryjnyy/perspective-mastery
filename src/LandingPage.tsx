import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import boxImage from "./assets/box.png";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col ml-8 mt-8 mr-8 ">
            <div className="p-8">
                <div>
                    <h1 className="font-extrabold text-7xl">
                        Master the tricky perspective.
                    </h1>
                </div>
                <div className="mt-4">
                    <p className="w-96 text-muted-foreground">
                        Improve your perspective knowledge by understanding how
                        to rotate shapes in 3D space. I offer no secrets here,
                        to progress you will have to put in work.
                    </p>
                </div>

                <div className="mt-8">
                    <Button
                        variant={"outline"}
                        onClick={() => navigate("/challenges")}
                    >
                        Begin the challenge
                    </Button>
                </div>
            </div>

            <div className="flex gap-8">
                <div className="mt-32 w-60">
                    <Card className="relative">
                        <img src={boxImage} className="p-2 rounded-3xl" />
                        <p className="absolute left-4 bottom-6 text-muted-foreground text-sm">
                            Rotating box.
                        </p>
                        <div className="flex justify-end mr-2 mb-2">
                            <Button className="ml-auto">Try</Button>
                        </div>
                    </Card>
                </div>

                <div className="mt-32 w-60">
                    <Card className="relative">
                        <img src={boxImage} className="p-2 rounded-3xl" />
                        <p className="absolute left-4 bottom-6 text-muted-foreground text-sm">
                            boxes
                        </p>
                        <div className="flex justify-end mr-2 mb-2">
                            <Button className="ml-auto">Try</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
