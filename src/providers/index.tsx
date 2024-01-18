import { type ReactNode } from "react";
import { AuthProviders } from "@/providers/auth-providers";
import { AppQueryClientProvider } from "@/providers/query-client-provider";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders(props: AppProvidersProps) {
  return (
    <AuthProviders>
      <AppQueryClientProvider>{props.children}</AppQueryClientProvider>
    </AuthProviders>
  );
}
