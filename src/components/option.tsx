"use client";

import { useState } from "react";
import type { Option } from "@prisma/client";
import { useSelectedOption } from "@/store/poll-store";

type OptionProps = Option & {
  doVote: CallableFunction;
  totalVotes: number;
};

const OptionItem = ({
  id,
  text,
  vote,
  pollId,
  createdAt,
  updatedAt,
  doVote,
  totalVotes,
}: OptionProps) => {
  const [currentVotes, setCurrentVotes] = useState(vote);
  const votePercentage = (100 * currentVotes) / totalVotes;
  const { selectedOption, setSelectedOption } = useSelectedOption();

  const currentlySelected = selectedOption?.id === id;

  console.log(currentlySelected);

  return (
    <>
      <div
        className="border relative w-full cursor-pointer flex items-center "
        onClick={(e) => {
          setCurrentVotes(currentVotes + 1);
          doVote(id, pollId, setCurrentVotes, currentVotes);
          setSelectedOption((value) => ({
            ...value,
            id,
            text,
            vote,
            pollId,
            createdAt,
            updatedAt,
          }));
        }}
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
