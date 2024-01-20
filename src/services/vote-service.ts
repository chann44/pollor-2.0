import axios from "axios";
import { z } from "zod";

import { serviceUrls } from "@/lib/network";
import { VoteInputValidator } from "@/lib/validators/vote-input-validator";

export function VoteService(data: z.infer<typeof VoteInputValidator>) {
  return axios.post(serviceUrls.vote, data);
}
