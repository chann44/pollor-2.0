"use client";

import type { Option, Poll, Vote } from "@prisma/client";
import { PollStore } from "@/store/poll-store";

import OptionItem from "@/components/option";
import { useSession } from "next-auth/react";

type PollData = Poll & {
  Option: Option[];
  Vote: Vote[];
};

export function Poll(props: PollData) {
  const { title, Option: options, Vote: vote, votes } = props;
  const { data } = useSession();

  const votedOption = vote.reduce((accumulator, currentVote) => {
    if (currentVote.voterId === data?.user?.id) {
      return currentVote;
    }
    return accumulator;
  }, {} as Vote);

  const userVoted = votedOption?.voterId === data?.user?.id;

  return (
    <PollStore>
      <section className="p-3 border flex flex-col gap-y-2">
        <p className="text-sm">Current poll</p>
        <h2 className="text-2xl font-semibold">{title}</h2>
        {options?.map((option, index) => {
          return (
            <>
              <OptionItem
                userVoted={userVoted}
                votedOptionId={votedOption?.optionId}
                key={index}
                totalVotes={votes}
                {...option}
              />
            </>
          );
        })}
        <p>{userVoted && "Voted"}</p>
      </section>
    </PollStore>
  );
}
