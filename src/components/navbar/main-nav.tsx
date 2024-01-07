import Link from "next/link";

import { cn } from "@/lib/utils";
import { siteRoutes } from "@/config/site";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href={siteRoutes.explore}
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Explore
      </Link>
    </nav>
  );
}
