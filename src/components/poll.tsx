"use client";

import { useState, useMemo, useEffect } from "react";

import { useSession } from "next-auth/react";
import type { Option, Poll, Vote } from "@prisma/client";

import { PollStore } from "@/store/poll-store";
import OptionItem from "@/components/option";

type PollData = Poll & {
  Option: Option[];
  Vote: Vote[];
};

export function Poll(props: PollData) {
  const { title, Option: options, Vote: vote, votes } = props;
  const { data } = useSession();

  const votedOption = useMemo(() => {
    return vote.find((v) => v.voterId === data?.user?.id) || ({} as Vote);
  }, [vote, data?.user?.id]);

  const [userVoted, setUserVoted] = useState<boolean>(
    () => votedOption?.voterId === data?.user?.id
  );

  useEffect(() => {
    setUserVoted(votedOption?.voterId === data?.user?.id);
  }, [votedOption, data?.user?.id]);

  console.log("votedOption", votedOption, userVoted);

  return (
    <PollStore>
      <section className="p-3 border flex flex-col gap-y-2">
        <p className="text-sm">Current poll</p>
        <h2 className="text-2xl font-semibold">{title}</h2>
        {options?.map((option, index) => {
          return (
            <>
              <OptionItem
                setVoted={setUserVoted}
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
