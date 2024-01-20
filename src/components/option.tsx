"use client";

import { useState } from "react";

import type { Option } from "@prisma/client";
import { cn, getVotePercentages } from "@/lib/utils";

import { useMutation } from "react-query";
import { VoteService } from "@/services/vote-service";

type OptionProps = Option & {
  totalVotes: number;
  userVoted: boolean;
  votedOptionId: number | null;
};

const OptionItem = ({
  id,
  text,
  vote,
  pollId,
  totalVotes,
  votedOptionId,
}: OptionProps) => {
  const [currentVotes, setCurrentVotes] = useState(vote);
  const votePercentage = getVotePercentages({
    currentVotes,
    totalVotes,
  });
  const [votedOption, setVotedOption] = useState<number | null>(
    () => votedOptionId
  );
  const voteMutation = useMutation(VoteService);
  const doVote = () => {
    voteMutation.mutate(
      {
        optionId: id,
        pollId: pollId,
      },
      {
        onSuccess: () => {
          setCurrentVotes(currentVotes + 1);
          setVotedOption(id);
        },
      }
    );
  };

  return (
    <>
      <div
        className={cn(
          "border relative w-full cursor-pointer flex items-center",
          (votedOption || votedOptionId) == id && "border-green-500"
        )}
        onClick={() => doVote()}
      >
        <p className="p-4 flex justify-between w-full">
          <span>{text}</span>
          <span>{isNaN(votePercentage) ? 0 : votePercentage.toFixed(0)}%</span>
        </p>
        <p
          style={{
            width: `${votePercentage}%`,
          }}
          className={"top-0 left-0 absolute bg-white bg-opacity-20 h-full"}
        ></p>
      </div>
    </>
  );
};

export default OptionItem;
