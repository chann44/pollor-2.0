import { serviceUrls } from "@/lib/network";
import { PollInput } from "@/types/poll";
import axios from "axios";

const createPollUrl = `${serviceUrls.poll}/create`;

export const createPollService = (data: PollInput) => {
  return axios.post(createPollUrl, data);
};
