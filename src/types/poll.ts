import { PollInputValidator } from "@/lib/validators/poll-input-validator";
import { z } from "zod";

export type PollInput = z.infer<typeof PollInputValidator>;
