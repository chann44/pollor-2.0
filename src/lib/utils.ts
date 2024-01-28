import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type getVotePercentagesParams = {
  currentVotes: number;
  totalVotes: number;
};

export function getVotePercentages({
  currentVotes,
  totalVotes,
}: getVotePercentagesParams) {
  if (totalVotes === 0) {
    return 0;
  }

  return (100 * currentVotes) / totalVotes;
}
