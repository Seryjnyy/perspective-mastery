import { Button } from "./components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./components/ui/card";
import boxImage from "./assets/box.png";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col mx-1 md:mx-8 mt-8 ">
            <div className="px-8 pt-8">
                <div>
                    <h1 className="font-extrabold text-5xl md:text-7xl">
                        Master the tricky perspective.
                    </h1>
                </div>
                <div className="mt-4">
                    <p className="w-80 md:w-96 text-muted-foreground">
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

            <div className="flex gap-2 md:gap-3 mt-32 items-end flex-wrap justify-center md:justify-start">
                <div className="w-60">
                    <Card className="relative">
                        <CardContent className="p-2">
                            <img src={boxImage} className="rounded-2xl" />
                        </CardContent>
                        <CardFooter className="flex justify-between px-2 pb-2 items-start">
                            <p className="text-muted-foreground text-sm ml-2">
                                Rotating a box.
                            </p>
                            <Button
                                onClick={() => navigate("/viewer/box/above/y")}
                            >
                                Try
                            </Button>
                            {/* <div className="flex justify-end mb-2">
                            </div> */}
                        </CardFooter>
                    </Card>
                </div>

                <div className="w-60">
                    <Card className="relative">
                        <CardContent className="p-2">
                            <img src={boxImage} className="rounded-2xl" />
                        </CardContent>
                        <CardFooter className="flex justify-between px-2 pb-2 items-start">
                            <p className="text-muted-foreground text-sm ml-2">
                                Rotating a cylinder.
                            </p>
                            <Button
                                onClick={() =>
                                    navigate("/viewer/cylinder/above/y")
                                }
                            >
                                Try
                            </Button>
                            {/* <div className="flex justify-end mb-2">
                            </div> */}
                        </CardFooter>
                    </Card>
                </div>

                <div className="w-60">
                    <Card>
                        <CardHeader className="pt-2">
                            <CardTitle className="mt-0 text-3xl font-bold">
                                Freeview
                            </CardTitle>
                            <CardDescription>
                                Checkout freeview to freely explore shapes in
                                space.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="pb-2 pt-0">
                            <Button
                                className="ml-auto"
                                onClick={() => navigate("/freeview")}
                            >
                                Try
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
