import { type ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return <main className="mx-auto max-w-lg py-4 md:py-20">{children}</main>;
}

export default AuthLayout;
