import { z } from "zod";

export const VoteInputValidator = z.object({
  optionId: z.number(),
  pollId: z.number(),
});
