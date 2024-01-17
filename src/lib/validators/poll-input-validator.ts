import { z } from "zod";

export const PollInputValidator = z.object({
  title: z.string(),
  options: z.array(z.string()),
});
