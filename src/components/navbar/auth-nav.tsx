"use client";

import { type HTMLAttributes } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { siteRoutes } from "@/config/site";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function AuthNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Button
        onClick={async () => {
          await signIn("google");
        }}
        className="text-sm transition-colors hover:text-primary"
      >
        Login
      </Button>
      <Link
        href={siteRoutes.register}
        className="text-sm transition-colors hover:text-primary"
      >
        Register
      </Link>
    </div>
  );
}
