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
import { Typography } from "../components/ui/typography";
import { Separator } from "../components/ui/separator";
import { getImageSrcFor } from "@/utility/challengeImages";
import {
    getCompletedChallenges,
    makeChallengeID,
} from "@/Services/challengeService";
import { CheckIcon } from "@radix-ui/react-icons";

type ChallengeCardProps = {
    desc: string;
    title: string;
    shape: "box" | "cylinder";
    camPos: "below" | "above" | "level";
    axis: "x" | "y" | "z";
    animationType: "rotate" | "circle";
    // completed: boolean;
};
const ChallengeCard = ({
    desc,
    title,
    shape,
    camPos,
    animationType,
    axis,
}: ChallengeCardProps) => {
    const navigate = useNavigate();

    const handleBegin = () => {
        navigate(`/viewer/${shape}/${camPos}/${animationType}/${axis}`);
    };

    return (
        <Card className="w-[24rem]">
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between items-center">
                        <Typography variant="h3">{title}</Typography>

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
                <Button onClick={handleBegin} className="w-fit ml-auto">
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
    animationType: "rotate" | "circle";
    title: string;
    desc: string;
}[] = [
    {
        shape: "box",
        camPos: "above",
        axis: "y",
        title: "Above",
        desc: "Camera above the box. Rotate around y axis.",
        animationType: "rotate",
    },
    {
        shape: "box",
        camPos: "level",
        axis: "y",
        title: "Level",
        desc: "Camera level with box. Rotate around y axis.",
        animationType: "rotate",
    },
    {
        shape: "box",
        camPos: "below",
        axis: "y",
        title: "Below",
        desc: "Camera below the box. Rotate around y axis.",
        animationType: "rotate",
    },

    {
        shape: "box",
        camPos: "above",
        axis: "y",
        title: "Above",
        desc: "Camera above the box. Circle around y axis.",
        animationType: "circle",
    },
    {
        shape: "box",
        camPos: "level",
        axis: "y",
        title: "Level",
        desc: "Camera level with box. Circle around y axis.",
        animationType: "circle",
    },
    {
        shape: "box",
        camPos: "below",
        axis: "y",
        title: "Below",
        desc: "Camera below the box. Circle around y axis.",
        animationType: "circle",
    },
];

const cylinderChallenges: {
    shape: "cylinder";
    camPos: "below" | "level" | "above";
    axis: "x" | "y" | "z";
    animationType: "rotate" | "circle";
    title: string;
    desc: string;
}[] = [
    {
        shape: "cylinder",
        camPos: "above",
        axis: "y",
        title: "Above",
        desc: "Camera above the cylinder. Rotate around y axis.",
        animationType: "rotate",
    },
    {
        shape: "cylinder",
        camPos: "level",
        axis: "y",
        title: "Level",
        desc: "Camera level with cylinder. Rotate around y axis.",
        animationType: "rotate",
    },
    {
        shape: "cylinder",
        camPos: "below",
        axis: "y",
        title: "Below",
        desc: "Camera below the cylinder. Rotate around y axis.",
        animationType: "rotate",
    },
];

export default function ChallengesPage() {
    // TODO : none of this stuff is being used
    // const [completedChallenges, setCompletedChallenges] = useState<string[]>(
    //     []
    // );

    // useEffect(() => {
    //     setCompletedChallenges(getCompletedChallenges());
    // }, []);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col px-2 md:px-8 mt-8 pb-8">
            <Tabs defaultValue="box">
                <TabsList>
                    <TabsTrigger value="box">Box</TabsTrigger>
                    <TabsTrigger value="cylinder">Cylinder</TabsTrigger>
                    <TabsTrigger value="freeview">Freeview</TabsTrigger>
                </TabsList>
                <TabsContent value="box">
                    <div>
                        <div className="mt-6 mb-4">
                            <Typography variant="h1" as="h1">
                                Box Challenges
                            </Typography>
                            <Typography
                                variant="mutedText"
                                className="mt-3 ml-2 flex items-center"
                            >
                                0 / 33
                                <CheckIcon />
                            </Typography>
                        </div>
                        <Separator />
                        {/* <Typography variant={"h3"} as="h3">
                            Level 1 : rotation
                        </Typography> */}
                        <div className="flex p-0 gap-10 mt-8 flex-wrap justify-center md:justify-start">
                            {boxChallenges.map((x, index) => (
                                <ChallengeCard
                                    key={index}
                                    desc={x.desc}
                                    title={x.title}
                                    shape={x.shape}
                                    camPos={x.camPos}
                                    axis={x.axis}
                                    animationType={x.animationType}
                                    // completed={completedChallenges.includes(
                                    //     makeChallengeID(
                                    //         x.shape,
                                    //         x.camPos,
                                    //         x.axis
                                    //     )
                                    // )}
                                />
                            ))}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="cylinder">
                    <div>
                        <div className="mt-6 mb-4">
                            <Typography variant="h1" as="h1">
                                Cylinder Challenges
                            </Typography>
                            <Typography
                                variant="mutedText"
                                className="mt-3 ml-2 flex items-center"
                            >
                                0 / 33
                                <CheckIcon />
                            </Typography>
                        </div>
                        <Separator />
                        <div className="flex p-0 gap-10 mt-8 flex-wrap justify-center md:justify-start">
                            {cylinderChallenges.map((x, index) => (
                                <ChallengeCard
                                    key={index}
                                    desc={x.desc}
                                    title={x.title}
                                    shape={x.shape}
                                    camPos={x.camPos}
                                    axis={x.axis}
                                    animationType={x.animationType}
                                    // completed={completedChallenges.includes(
                                    //     makeChallengeID(
                                    //         x.shape,
                                    //         x.camPos,
                                    //         x.axis
                                    //     )
                                    // )}
                                />
                            ))}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="freeview">
                    <div>
                        <div className="mt-6 mb-4">
                            <Typography variant="h1" as="h1">
                                Freeview
                            </Typography>
                            <Typography
                                variant="mutedText"
                                className="mt-3 ml-2"
                            >
                                View as you want
                            </Typography>
                        </div>
                        <Separator />
                        <div className="flex items-center md:items-start flex-col">
                            <div className="flex p-0 gap-10 mt-8 flex-wrap justify-center md:justify-start">
                                <Card className="w-[24rem] ">
                                    <CardHeader>
                                        <CardTitle>Freeview</CardTitle>
                                        <CardDescription>
                                            You get to control the shape, axis
                                            of rotation, camera angle and much
                                            more.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-center">
                                            {/* img */}
                                        </div>
                                    </CardContent>

                                    <CardFooter>
                                        <Button
                                            onClick={() =>
                                                navigate("/freeview")
                                            }
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
