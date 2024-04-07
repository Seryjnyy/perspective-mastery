import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Typography } from "../components/ui/typography";

import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { Toggle } from "../components/ui/toggle";
import { Checkbox } from "../components/ui/checkbox";
import { Progress } from "../components/ui/progress";
import { useNavigate } from "react-router-dom";
import {
  addCompleteChallengeLevel,
  addCompletedChallenge,
  getCompletedChallenges,
  getCompletedLevelsInChallenge,
  removeChallengeLevel,
} from "../utility/challengeService";
import { useToast } from "../components/ui/use-toast";
import { getAllChallengesInOrder } from "./journeyChallengesList";
import { cn } from "../lib/utils";

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
                handleCheck(checked == "indeterminate" ? false : checked)
              }
            />
          </div>
          <div className="absolute bottom-1 w-full flex justify-center">
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
  const [challengesCompleted, setChallengesCompleted] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setChallengesCompleted(getCompletedChallenges());
  }, []);

  const challenges = [...getAllChallengesInOrder()];

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
            className="mt-2 w-[50char] md:w-[28rem]"
          >
            Complete a challenge to unlock the next one. You will need to
            complete all levels in a challenge. Completing a level unlocks the
            next one.
          </Typography>
        </div>

        <div className="flex p-0 gap-10 mt-8 flex-wrap justify-center md:justify-start">
          {challenges.map((challenge, index) => {
            let locked = false;
            if (index - 1 >= 0) {
              locked = !challengesCompleted.includes(challenges[index - 1].id);
            }
            return (
              <JourneyCard
                key={index}
                challengeID={challenge.id}
                locked={locked}
                title={challenge.title}
                desc={challenge.desc}
                levels={challenge.levels}
                completed={challengesCompleted.includes(challenge.id)}
                onComplete={() => onCompleteChallenge(challenge.id)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
