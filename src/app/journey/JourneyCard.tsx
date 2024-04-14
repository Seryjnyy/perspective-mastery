"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { useEffect, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  addCompleteChallengeLevel,
  getCompletedLevelsInChallenge,
  removeChallengeLevel,
} from "@/lib/challengeService";
import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
interface JourneyCardProps {
  axis: string;
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

export default function JourneyCard({
  challengeID,
  locked,
  title,
  desc,
  levels,
  completed,
  onComplete,
  axis,
}: JourneyCardProps) {
  const [currentLevel, setCurrentLevel] = useState(0);

  const [completedThings, setCompletedThings] = useState<string[]>([]);

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
    const found = completedThings.find((id) => id == levels[currentLevel].id);

    return found ? true : false;
  };

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
              <span className="text-sm opacity-80 pl-4">{axis} axis</span>
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
              <>
                <Image
                  key={index}
                  src={level.imgSrc}
                  alt={"box"}
                  width={930}
                  height={930}
                  className={
                    "w-[23rem] md:w-[28rem] h-auto rounded-2xl " +
                    (currentLevel == index ? "" : "hidden")
                  }
                />
              </>
            ))}
          </div>
          <div className="absolute top-0 w-full flex justify-end p-2  items-center opacity-100 gap-2">
            <Typography variant={"mutedText"}>
              {"Camera " + levels[currentLevel].camera}
            </Typography>
            <Checkbox
              checked={currentLevelCompleted()}
              onCheckedChange={(checked) =>
                handleCheck(checked == "indeterminate" ? false : checked)
              }
            />
          </div>
          <div className="absolute bottom-1 w-full flex justify-center flex-col items-center">
            <span className="text-sm opacity-70">{`${currentLevel + 1}/${
              levels.length
            }`}</span>
            <Progress
              value={(completedThings.length / levels.length) * 100}
              className="w-[8rem]"
            />
          </div>

          <Button
            className={cn("absolute top-2/4 left-1", {
              hidden: currentLevel == 0,
            })}
            variant={"outline"}
            onClick={handlePrev}
            disabled={currentLevel == 0}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </Button>
          <Button
            className={cn("absolute top-2/4 right-1", {
              hidden: currentLevel >= levels.length - 1,
            })}
            variant={"outline"}
            onClick={handleNext}
            disabled={
              currentLevel >= levels.length - 1 || !currentLevelCompleted()
            }
          >
            <ChevronRightIcon className="w-6 h-6" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="mt-3 pb-3">
        <Link
          href={`${levels[currentLevel].viewerLink}`}
          className={cn(buttonVariants({ variant: "secondary" }), "ml-auto")}
        >
          Attempt
        </Link>
      </CardFooter>
    </Card>
  );
}
