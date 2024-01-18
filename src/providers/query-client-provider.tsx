"use client";

import { QueryClient, QueryClientProvider } from "react-query";

import { type ReactNode } from "react";

const queryClient = new QueryClient();

type AppQueryClientProviderProps = {
  children: ReactNode;
};

export function AppQueryClientProvider(props: AppQueryClientProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
