"use client";

import { type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

type AuthProvidersProps = {
  children: ReactNode;
};

export function AuthProviders(props: AuthProvidersProps) {
  return <SessionProvider>{props.children}</SessionProvider>;
}
