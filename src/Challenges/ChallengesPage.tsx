import React, { useEffect, useState } from "react";
import Viewer from "./Viewer";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import firstChallenge from "../assets/test1.png";
import { Checkbox } from "../components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs";
import { Typography } from "../components/ui/typographyh3";
import { Separator } from "../components/ui/separator";
import { getImageSrcFor } from "@/utility/challengeImages";
import {
    getCompletedChallenges,
    makeChallengeID,
} from "@/Services/challengeService";

type ChallengeCardProps = {
    desc: string;
    title: string;
    shape: "box" | "cylinder";
    camPos: "below" | "above" | "level";
    axis: "x" | "y" | "z";
    completed: boolean;
};
const ChallengeCard = ({
    desc,
    title,
    shape,
    camPos,
    axis,
    completed,
}: ChallengeCardProps) => {
    const navigate = useNavigate();

    const handleBegin = () => {
        navigate(`/viewer/${shape}/${camPos}/${axis}`);
    };

    return (
        <Card className="w-80">
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between">
                        <h3>{title}</h3>
                        <Checkbox
                            id="terms"
                            checked={false}
                            onCheckedChange={() => console.log("change")}
                        />
                    </div>
                </CardTitle>
                <CardDescription>{desc}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center">
                    <img
                        src={getImageSrcFor(shape, camPos, axis)}
                        alt={`Camera ${camPos} ${shape}`}
                        loading="lazy"
                        className="rounded-lg w-64 h-64"
                    />
                </div>
            </CardContent>
            <CardFooter>
                {/* <div className="flex justify-between w-full">
                        <div className="flex items-center space-x-2"></div>
                    </div> */}
                <Button onClick={handleBegin} className="w-full">
                    Begin challenge
                </Button>
            </CardFooter>
        </Card>
    );
};

const boxChallenges: {
    shape: "box" | "cylinder";
    camPos: "below" | "level" | "above";
    axis: "x" | "y" | "z";
    title: string;
    desc: string;
}[] = [
    {
        shape: "box",
        camPos: "above",
        axis: "y",
        title: "Above",
        desc: "Camera above the box. Rotate around y axis.",
    },
    {
        shape: "box",
        camPos: "level",
        axis: "y",
        title: "Level",
        desc: "Camera level with box. Rotate around y axis.",
    },
    {
        shape: "box",
        camPos: "below",
        axis: "y",
        title: "Below",
        desc: "Camera below the box. Rotate around y axis.",
    },
];

const cylinderChallenges: {
    shape: "cylinder";
    camPos: "below" | "level" | "above";
    axis: "x" | "y" | "z";
    title: string;
    desc: string;
}[] = [
    {
        shape: "cylinder",
        camPos: "above",
        axis: "y",
        title: "Above",
        desc: "Camera above the cylinder. Rotate around y axis.",
    },
    {
        shape: "cylinder",
        camPos: "level",
        axis: "y",
        title: "Level",
        desc: "Camera level with cylinder. Rotate around y axis.",
    },
    {
        shape: "cylinder",
        camPos: "below",
        axis: "y",
        title: "Below",
        desc: "Camera below the cylinder. Rotate around y axis.",
    },
];

export default function ChallengesPage() {
    const [completedChallenges, setCompletedChallenges] = useState<string[]>(
        []
    );

    useEffect(() => {
        setCompletedChallenges(getCompletedChallenges());
    }, []);

    return (
        <div className="flex flex-col ml-8 mt-8 mr-8">
            <Tabs defaultValue="box">
                <TabsList>
                    <TabsTrigger value="box">Box</TabsTrigger>
                    <TabsTrigger value="cylinder">Cylinder</TabsTrigger>
                    <TabsTrigger value="freeview">Freeview</TabsTrigger>
                </TabsList>
                <TabsContent value="box">
                    <div>
                        <div className="mt-6 mb-4">
                            <Typography variant="h3">Box Challenges</Typography>
                            <Typography variant="muted">
                                0 / 333 complete
                            </Typography>
                        </div>
                        <Separator />
                        <div className="flex items-center md:items-start flex-col">
                            <div className="flex p-2 gap-10 w-fit flex-col md:flex-row mt-2 flex-wra">
                                {boxChallenges.map((x, index) => (
                                    <ChallengeCard
                                        key={index}
                                        desc={x.desc}
                                        title={x.title}
                                        shape={x.shape}
                                        camPos={x.camPos}
                                        axis={x.axis}
                                        completed={completedChallenges.includes(
                                            makeChallengeID(
                                                x.shape,
                                                x.camPos,
                                                x.axis
                                            )
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="cylinder">
                    <div>
                        <div className="mt-6 mb-4">
                            <Typography variant="h3">
                                Cylinder Challenges
                            </Typography>
                            <Typography variant="muted">
                                0 / 333 complete
                            </Typography>
                        </div>
                        <Separator />
                        <div className="flex items-center md:items-start flex-col">
                            <div className="flex p-2 gap-10 w-fit flex-col md:flex-row mt-2 flex-wra">
                                {cylinderChallenges.map((x, index) => (
                                    <ChallengeCard
                                        key={index}
                                        desc={x.desc}
                                        title={x.title}
                                        shape={x.shape}
                                        camPos={x.camPos}
                                        axis={x.axis}
                                        completed={completedChallenges.includes(
                                            makeChallengeID(
                                                x.shape,
                                                x.camPos,
                                                x.axis
                                            )
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="freeview">
                    <div>
                        <div className="mt-6 mb-4">
                            <Typography variant="h3">Freeview</Typography>
                            <Typography variant="muted">
                                View as you want{" "}
                            </Typography>
                        </div>
                        <Separator />
                        <div className="flex items-center md:items-start flex-col">
                            <div className="flex p-2 gap-10 w-fit flex-col md:flex-row mt-2 flex-wra">
                                <Card className="w-80">
                                    <CardHeader>
                                        <CardTitle>Free camera</CardTitle>
                                        <CardDescription>
                                            Control the camera freely.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-center">
                                            {/* img */}
                                        </div>
                                    </CardContent>

                                    <CardFooter>
                                        <Button
                                            // onClick={handleBegin}
                                            className="w-full"
                                        >
                                            Begin
                                        </Button>
                                    </CardFooter>
                                </Card>

                                <Card className="w-80">
                                    <CardHeader>
                                        <CardTitle>Controlled camera</CardTitle>
                                        <CardDescription>
                                            Control the camera with buttons.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-center">
                                            {/* img */}
                                        </div>
                                    </CardContent>

                                    <CardFooter>
                                        <Button
                                            // onClick={handleBegin}
                                            className="w-full"
                                        >
                                            Begin
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
