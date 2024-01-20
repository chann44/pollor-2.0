import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type getVotePercentagesParams = {
  currentVotes: number;
  totalVotes: number;
};

export function getVotePercentages(data: getVotePercentagesParams) {
  return (100 * data.currentVotes) / data.totalVotes;
}
