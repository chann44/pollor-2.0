"use client";

import { PollStore } from "@/store/poll-store";
import type { Option, Poll } from "@prisma/client";
import OptionItem from "./option";

type PollData = Poll & {
  Option: Option[];
};

export function Poll(props: PollData) {
  const { title, Option: options } = props;
  return (
    <PollStore>
      <section className="p-3 border flex flex-col gap-y-2">
        <p className="text-sm">Current poll</p>
        <h2 className="text-2xl font-semibold">{title}</h2>
        {options?.map((option, index) => {
          return (
            <OptionItem
              key={index}
              doVote={() => {}}
              totalVotes={100}
              {...option}
            />
          );
        })}
      </section>
    </PollStore>
  );
}
