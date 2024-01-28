"use client";

import { Dispatch, SetStateAction, useState } from "react";

import type { Option } from "@prisma/client";
import { cn, getVotePercentages } from "@/lib/utils";

import { useMutation } from "react-query";
import { VoteService } from "@/services/vote-service";

type OptionProps = Option & {
  totalVotes: number;
  userVoted: boolean;
  votedOptionId: number | null;
  setVoted: Dispatch<SetStateAction<boolean>>;
};

const OptionItem = ({
  id,
  text,
  vote,
  pollId,
  totalVotes,
  votedOptionId,
  setVoted,
}: OptionProps) => {
  const [currentVotes, setCurrentVotes] = useState(vote);
  const [currentTotalVotes, setCurrentTotalVotes] = useState(totalVotes);
  const votePercentage = getVotePercentages({
    currentVotes,
    totalVotes: currentTotalVotes,
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
          setVoted(true);
          setCurrentVotes(currentVotes + 1);
          setCurrentTotalVotes(currentTotalVotes + 1);
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
