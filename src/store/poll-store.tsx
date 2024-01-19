"use client";

import { Option } from "@prisma/client";

import {
  type ReactNode,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type PollContextType = {
  selectedOption: Option | null;
  setSelectedOption: Dispatch<SetStateAction<Option | null>>;
};

const PollContext = createContext<PollContextType>({} as PollContextType);

export function useSelectedOption() {
  return useContext(PollContext);
}

export function PollStore({ children }: { children: ReactNode }) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  return (
    <PollContext.Provider
      value={{
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </PollContext.Provider>
  );
}
