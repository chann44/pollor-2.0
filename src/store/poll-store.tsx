"use client";

import {
  type ReactNode,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type PollContextType = {
  selectedOption: number | null;
  setSelectedOption: Dispatch<SetStateAction<number | null>>;
};

const PollContext = createContext<PollContextType>({} as PollContextType);

export function useSelectedOption() {
  return useContext(PollContext);
}

export function PollStore({ children }: { children: ReactNode }) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
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
