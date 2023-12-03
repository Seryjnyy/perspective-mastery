import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Typography } from "./components/ui/typography";
import boxRotateAboveY from "./assets/journey/boxRotateAboveY.png";
import boxRotateLevelY from "./assets/journey/boxRotateLevelY.png";
import boxRotateBelowY from "./assets/journey/boxRotateBelowY.png";

import boxRotateAboveX from "./assets/journey/boxRotateAboveX.png";
import boxRotateLevelX from "./assets/journey/boxRotateLevelX.png";
import boxRotateBelowX from "./assets/journey/boxRotateBelowX.png";

import boxRotateAboveZ from "./assets/journey/boxRotateAboveZ.png";
import boxRotateLevelZ from "./assets/journey/boxRotateLevelZ.png";
import boxRotateBelowZ from "./assets/journey/boxRotateBelowZ.png";

import cylinderRotateAboveY from "./assets/journey/cylinderRotateAboveY.png";
import cylinderRotateLevelY from "./assets/journey/cylinderRotateLevelY.png";
import cylinderRotateBelowY from "./assets/journey/cylinderRotateBelowY.png";

import cylinderRotateAboveX from "./assets/journey/cylinderRotateAboveX.png";
import cylinderRotateLevelX from "./assets/journey/cylinderRotateLevelX.png";
import cylinderRotateBelowX from "./assets/journey/cylinderRotateBelowX.png";

import cylinderRotateAboveZ from "./assets/journey/cylinderRotateAboveZ.png";
import cylinderRotateLevelZ from "./assets/journey/cylinderRotateLevelZ.png";
import cylinderRotateBelowZ from "./assets/journey/cylinderRotateBelowZ.png";

import boxCircleAboveY from "./assets/journey/boxCircleAboveY.png";
import boxCircleLevelY from "./assets/journey/boxCircleLevelY.png";
import boxCircleBelowY from "./assets/journey/boxCircleBelowY.png";

import boxCircleAboveX from "./assets/journey/boxCircleAboveX.png";
import boxCircleLevelX from "./assets/journey/boxCircleLevelX.png";
import boxCircleBelowX from "./assets/journey/boxCircleBelowX.png";

import boxCircleAboveZ from "./assets/journey/boxCircleAboveZ.png";
import boxCircleLevelZ from "./assets/journey/boxCircleLevelZ.png";
import boxCircleBelowZ from "./assets/journey/boxCircleBelowZ.png";

import cylinderCircleAboveY from "./assets/journey/cylinderCircleAboveY.png";
import cylinderCircleLevelY from "./assets/journey/cylinderCircleLevelY.png";
import cylinderCircleBelowY from "./assets/journey/cylinderCircleBelowY.png";

import cylinderCircleAboveX from "./assets/journey/cylinderCircleAboveX.png";
import cylinderCircleLevelX from "./assets/journey/cylinderCircleLevelX.png";
import cylinderCircleBelowX from "./assets/journey/cylinderCircleBelowX.png";

import cylinderCircleAboveZ from "./assets/journey/cylinderCircleAboveZ.png";
import cylinderCircleLevelZ from "./assets/journey/cylinderCircleLevelZ.png";
import cylinderCircleBelowZ from "./assets/journey/cylinderCircleBelowZ.png";

import {
    ArrowLeftIcon,
    CheckIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    LockClosedIcon,
} from "@radix-ui/react-icons";
import { Toggle } from "./components/ui/toggle";
import { Checkbox } from "./components/ui/checkbox";
import { Progress } from "./components/ui/progress";
import { useNavigate } from "react-router-dom";
import {
    addCompleteChallengeLevel,
    addCompletedChallenge,
    getCompletedChallenges,
    getCompletedLevelsInChallenge,
    removeChallengeLevel,
} from "./Services/challengeService";
import { useToast } from "./components/ui/use-toast";

interface JourneyCardProps {
    challengeID: string;
    locked: boolean;
    title: string;
    desc: string;
    completed: boolean;
    onComplete: () => void;
    levels: {
        id: string;
        camera: string;
        imgSrc: string;
        viewerLink: string;
    }[];
}

const JourneyCard = ({
    challengeID,
    locked,
    title,
    desc,
    levels,
    completed,
    onComplete,
}: JourneyCardProps) => {
    const [currentLevel, setCurrentLevel] = useState(0);

    const [completedThings, setCompletedThings] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setCompletedThings(getCompletedLevelsInChallenge(challengeID));
    }, []);

    const handleNext = () => {
        if (currentLevel < levels.length - 1) {
            setCurrentLevel((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentLevel > 0) {
            setCurrentLevel((prev) => prev - 1);
        }
    };

    const handleCheck = (check: boolean) => {
        const id = levels[currentLevel].id;
        console.log(id);
        if (check) {
            if (!completedThings.includes(id))
                addCompleteChallengeLevel(challengeID, id);
            setCompletedThings(getCompletedLevelsInChallenge(challengeID));

            // if completed the last one in challenge then add challenge as completed
            // can only access the check for the last level if completed all others so should be fine doing it here
            if (currentLevel == levels.length - 1) {
                onComplete();
            }
        } else {
            if (completedThings.includes(id)) {
                removeChallengeLevel(challengeID, id);
                setCompletedThings(getCompletedLevelsInChallenge(challengeID));
            }
        }
    };

    const currentLevelCompleted = () => {
        const found = completedThings.find(
            (id) => id == levels[currentLevel].id
        );

        return found ? true : false;
    };

    useEffect(() => {});

    return (
        <Card className="w-[23rem] md:w-[28rem] relative">
            {locked && (
                <div className="absolute w-full h-full bg-black opacity-70 z-20 rounded-lg flex justify-center items-center">
                    <LockClosedIcon className="w-16 h-16" />
                </div>
            )}
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center">
                        <Typography variant={"h2nb"} className="w-full">
                            {title}
                            {/* <CheckIcon className="text-primary w-8 h-8" /> */}
                        </Typography>
                    </div>
                </CardTitle>
                {/* <CardDescription>{desc}</CardDescription> */}
            </CardHeader>
            <CardContent className="py-0 px-2 relative w-fit mx-auto">
                <div className="relative">
                    <div className="flex justify-center">
                        {levels.map((level, index) => (
                            <img
                                key={index}
                                src={level.imgSrc}
                                className={
                                    "w-[23rem] md:w-[28rem] h-auto rounded-2xl " +
                                    (currentLevel == index ? "" : "hidden")
                                }
                            />
                        ))}
                    </div>
                    <div className="absolute top-0 w-full flex justify-end p-2  items-center opacity-100 gap-2">
                        <Typography variant={"mutedText"}>
                            {"Camera " + levels[currentLevel].camera}
                        </Typography>
                        <Checkbox
                            checked={currentLevelCompleted()}
                            onCheckedChange={(checked) =>
                                handleCheck(
                                    checked == "indeterminate" ? false : checked
                                )
                            }
                        />
                    </div>
                    <div className="absolute bottom-1 w-full flex justify-center">
                        <Progress
                            value={
                                (completedThings.length / levels.length) * 100
                            }
                            className="w-[8rem]"
                        />
                    </div>

                    <Button
                        className="absolute top-2/4 left-1"
                        variant={"outline"}
                        onClick={handlePrev}
                        disabled={currentLevel == 0}
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </Button>
                    <Button
                        className="absolute top-2/4 right-1"
                        variant={"outline"}
                        onClick={handleNext}
                        disabled={
                            currentLevel >= levels.length - 1 ||
                            !currentLevelCompleted()
                        }
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </Button>
                </div>
            </CardContent>
            <CardFooter className="mt-3 pb-3">
                <Button
                    className="ml-auto"
                    onClick={() => navigate(levels[currentLevel].viewerLink)}
                >
                    Attempt
                </Button>
            </CardFooter>
        </Card>
    );
};

// TODO : challenges should be unlocked if you have some completion in it
// this could be a dev only problem
export default function Journey() {
    const [challengesCompleted, setChallengesCompleted] = useState<string[]>(
        []
    );
    const { toast } = useToast();

    useEffect(() => {
        setChallengesCompleted(getCompletedChallenges());
    }, []);

    const boxCircleChallenges = [
        {
            id: "boxCircleY",
            title: "Circling box",
            desc: "Circle around the y axis.",
            levels: [
                {
                    id: "boxCircleAboveY",
                    axis: "y",
                    camera: "above",
                    imgSrc: boxCircleAboveY,
                    viewerLink: "/viewer/box/circle/above/y",
                },
                {
                    id: "boxCircleLevelY",
                    axis: "y",
                    camera: "level",
                    imgSrc: boxCircleLevelY,
                    viewerLink: "/viewer/box/circle/level/y",
                },
                {
                    id: "boxCircleBelowY",
                    axis: "y",
                    camera: "below",
                    imgSrc: boxCircleBelowY,
                    viewerLink: "/viewer/box/circle/below/y",
                },
            ],
        },
        {
            id: "boxCircleX",
            title: "Circling box",
            desc: "Circle around the x axis.",
            levels: [
                {
                    id: "boxCircleAboveX",
                    axis: "x",
                    camera: "above",
                    imgSrc: boxCircleAboveX,
                    viewerLink: "/viewer/box/circle/above/x",
                },
                {
                    id: "boxCircleLevelX",
                    axis: "x",
                    camera: "level",
                    imgSrc: boxCircleLevelX,
                    viewerLink: "/viewer/box/circle/level/x",
                },
                {
                    id: "boxCircleBelowX",
                    axis: "x",
                    camera: "below",
                    imgSrc: boxCircleBelowX,
                    viewerLink: "/viewer/box/circle/below/x",
                },
            ],
        },
        {
            id: "boxCircleZ",
            title: "Circling box",
            desc: "Circle around the z axis.",
            levels: [
                {
                    id: "boxCircleAboveZ",
                    axis: "z",
                    camera: "above",
                    imgSrc: boxCircleAboveZ,
                    viewerLink: "/viewer/box/circle/above/z",
                },
                {
                    id: "boxCircleLevelZ",
                    axis: "z",
                    camera: "level",
                    imgSrc: boxCircleLevelZ,
                    viewerLink: "/viewer/box/circle/level/z",
                },
                {
                    id: "boxCircleBelowZ",
                    axis: "z",
                    camera: "below",
                    imgSrc: boxCircleBelowZ,
                    viewerLink: "/viewer/box/circle/below/z",
                },
            ],
        },
    ];

    const cylinderCircleChallenges = [
        {
            id: "cylinderCircleY",
            title: "Circling cylinder",
            desc: "Circle around the y axis.",
            levels: [
                {
                    id: "cylinderCircleAboveY",
                    axis: "y",
                    camera: "above",
                    imgSrc: cylinderCircleAboveY,
                    viewerLink: "/viewer/cylinder/circle/above/y",
                },
                {
                    id: "cylinderCircleLevelY",
                    axis: "y",
                    camera: "level",
                    imgSrc: cylinderCircleLevelY,
                    viewerLink: "/viewer/cylinder/circle/level/y",
                },
                {
                    id: "cylinderCircleBelowY",
                    axis: "y",
                    camera: "below",
                    imgSrc: cylinderCircleBelowY,
                    viewerLink: "/viewer/cylinder/circle/below/y",
                },
            ],
        },
        {
            id: "cylinderCircleX",
            title: "Circling cylinder",
            desc: "Circle around the x axis.",
            levels: [
                {
                    id: "cylinderCircleAboveX",
                    axis: "x",
                    camera: "above",
                    imgSrc: cylinderCircleAboveX,
                    viewerLink: "/viewer/cylinder/circle/above/x",
                },
                {
                    id: "cylinderCircleLevelX",
                    axis: "x",
                    camera: "level",
                    imgSrc: cylinderCircleLevelX,
                    viewerLink: "/viewer/cylinder/circle/level/x",
                },
                {
                    id: "cylinderCircleBelowX",
                    axis: "x",
                    camera: "below",
                    imgSrc: cylinderCircleBelowX,
                    viewerLink: "/viewer/cylinder/circle/below/x",
                },
            ],
        },
        {
            id: "cylinderCircleZ",
            title: "Circling cylinder",
            desc: "Circle around the z axis.",
            levels: [
                {
                    id: "cylinderCircleAboveZ",
                    axis: "z",
                    camera: "above",
                    imgSrc: cylinderCircleAboveZ,
                    viewerLink: "/viewer/cylinder/circle/above/z",
                },
                {
                    id: "cylinderCircleLevelZ",
                    axis: "z",
                    camera: "level",
                    imgSrc: cylinderCircleLevelZ,
                    viewerLink: "/viewer/cylinder/circle/level/z",
                },
                {
                    id: "cylinderCircleBelowZ",
                    axis: "z",
                    camera: "below",
                    imgSrc: cylinderCircleBelowZ,
                    viewerLink: "/viewer/cylinder/circle/below/z",
                },
            ],
        },
    ];

    const boxRotateChallenges = [
        {
            id: "boxRotationY",
            title: "Box rotation",
            desc: "Rotation around the y axis.",
            levels: [
                {
                    id: "boxRotationAboveY",
                    axis: "y",
                    camera: "above",
                    imgSrc: boxRotateAboveY,
                    viewerLink: "/viewer/box/rotate/above/y",
                },
                {
                    id: "boxRotationLevelY",
                    axis: "y",
                    camera: "level",
                    imgSrc: boxRotateLevelY,
                    viewerLink: "/viewer/box/rotate/level/y",
                },
                {
                    id: "boxRotationBelowY",
                    axis: "y",
                    camera: "below",
                    imgSrc: boxRotateBelowY,
                    viewerLink: "/viewer/box/rotate/below/y",
                },
            ],
        },
        {
            id: "boxRotationX",
            title: "Box rotation",
            desc: "Rotation around the x axis.",
            levels: [
                {
                    id: "boxRotationAboveX",
                    camera: "above",
                    imgSrc: boxRotateAboveX,
                    viewerLink: "/viewer/box/rotate/above/z",
                },
                {
                    id: "boxRotationLevelX",
                    camera: "level",
                    imgSrc: boxRotateLevelX,
                    viewerLink: "/viewer/box/rotate/level/z",
                },
                {
                    id: "boxRotationBelowX",
                    camera: "below",
                    imgSrc: boxRotateBelowX,
                    viewerLink: "/viewer/box/rotate/below/z",
                },
            ],
        },
        {
            id: "boxRotationZ",
            title: "Box rotation",
            desc: "Rotation around the z axis.",
            levels: [
                {
                    id: "boxRotationAboveZ",
                    camera: "above",
                    imgSrc: boxRotateAboveZ,
                    viewerLink: "/about",
                },
                {
                    id: "boxRotationLevelZ",
                    camera: "level",
                    imgSrc: boxRotateLevelZ,
                    viewerLink: "/about",
                },
                {
                    id: "boxRotationBelowZ",
                    camera: "below",
                    imgSrc: boxRotateBelowZ,
                    viewerLink: "/about",
                },
            ],
        },
    ];

    const cylinderRotateChallenges = [
        {
            id: "cylinderRotationY",
            title: "Cylinder rotation",
            desc: "Rotation around the y axis.",
            levels: [
                {
                    id: "cylinderRotationAboveY",
                    axis: "y",
                    camera: "above",
                    imgSrc: cylinderRotateAboveY,
                    viewerLink: "/viewer/cylinder/rotate/above/y",
                },
                {
                    id: "cylinderRotationLevelY",
                    axis: "y",
                    camera: "level",
                    imgSrc: cylinderRotateLevelY,
                    viewerLink: "/viewer/cylinder/rotate/level/y",
                },
                {
                    id: "cylinderRotationBelowY",
                    axis: "y",
                    camera: "below",
                    imgSrc: cylinderRotateBelowY,
                    viewerLink: "/viewer/cylinder/rotate/below/y",
                },
            ],
        },
        {
            id: "cylinderRotationX",
            title: "Cylinder rotation",
            desc: "Rotation around the x axis.",
            levels: [
                {
                    id: "cylinderRotationAboveX",
                    axis: "x",
                    camera: "above",
                    imgSrc: cylinderRotateAboveX,
                    viewerLink: "/viewer/cylinder/rotate/above/x",
                },
                {
                    id: "cylinderRotationLevelX",
                    axis: "x",
                    camera: "level",
                    imgSrc: cylinderRotateLevelX,
                    viewerLink: "/viewer/cylinder/rotate/level/x",
                },
                {
                    id: "cylinderRotationBelowX",
                    axis: "x",
                    camera: "below",
                    imgSrc: cylinderRotateBelowX,
                    viewerLink: "/viewer/cylinder/rotate/below/x",
                },
            ],
        },
        {
            id: "cylinderRotationZ",
            title: "Cylinder rotation",
            desc: "Rotation around the z axis.",
            levels: [
                {
                    id: "cylinderRotationAboveZ",
                    axis: "z",
                    camera: "above",
                    imgSrc: cylinderRotateAboveZ,
                    viewerLink: "/viewer/cylinder/rotate/above/z",
                },
                {
                    id: "cylinderRotationLevelZ",
                    axis: "z",
                    camera: "level",
                    imgSrc: cylinderRotateLevelZ,
                    viewerLink: "/viewer/cylinder/rotate/level/z",
                },
                {
                    id: "cylinderRotationBelowZ",
                    axis: "z",
                    camera: "below",
                    imgSrc: cylinderRotateBelowZ,
                    viewerLink: "/viewer/cylinder/rotate/below/z",
                },
            ],
        },
    ];

    const challenges = [
        ...boxRotateChallenges,
        ...cylinderRotateChallenges,
        ...boxCircleChallenges,
        ...cylinderCircleChallenges,
    ];

    const onCompleteChallenge = (challengeID: string) => {
        addCompletedChallenge(challengeID);

        setChallengesCompleted(getCompletedChallenges());

        toast({
            title: "Completed a challenge! 🎉",
            description: "Well done, on to the next one.",
            duration: 3000,
        });
    };

    return (
        <>
            <div className="flex flex-col md:px-8 mt-8 pb-8">
                <div className="ml-3 mb-5">
                    <Typography variant={"h1"} as="h1">
                        Journey
                    </Typography>
                    <Typography
                        variant={"mutedText"}
                        className="mt-2 w-[28rem]"
                    >
                        Complete a challenge to unlock the next one. You will
                        need to complete all levels in a challenge. Completing a
                        level unlocks the next one.
                    </Typography>
                </div>

                <div className="flex p-0 gap-10 mt-8 flex-wrap justify-center md:justify-start">
                    {challenges.map((challenge, index) => {
                        let locked = false;
                        if (index - 1 >= 0) {
                            locked = !challengesCompleted.includes(
                                challenges[index - 1].id
                            );
                        }
                        return (
                            <JourneyCard
                                key={index}
                                challengeID={challenge.id}
                                locked={locked}
                                title={challenge.title}
                                desc={challenge.desc}
                                levels={challenge.levels}
                                completed={challengesCompleted.includes(
                                    challenge.id
                                )}
                                onComplete={() =>
                                    onCompleteChallenge(challenge.id)
                                }
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}
