"use client";
import { Typography } from "@/components/ui/typography";
import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import {
  addCompletedChallenge,
  getCompletedChallenges,
} from "@/lib/challengeService";
import JourneyCard from "./JourneyCard";
import { getAllChallengesInOrder } from "./journeyChallengesList";

// TODO : should convert to server side???
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
                axis={challenge.axis}
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
