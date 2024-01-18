import { Option, Poll } from "@prisma/client";

type PollData = Poll & {
  Option: Option[];
};

export function Poll(props: PollData) {
  return (
    <section>
      <h2>{props.title}</h2>
      {props.Option?.map((option) => {
        return <p key={option.id}>{option.text}</p>;
      })}
    </section>
  );
}
