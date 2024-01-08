import Link from "next/link";

import { cn } from "@/lib/utils";
import { siteRoutes } from "@/config/site";
import { type HTMLAttributes } from "react";

export function AuthNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href={siteRoutes.login}
        className="text-sm transition-colors hover:text-primary"
      >
        Login
      </Link>
      <Link
        href={siteRoutes.register}
        className="text-sm transition-colors hover:text-primary"
      >
        Register
      </Link>
    </div>
  );
}
