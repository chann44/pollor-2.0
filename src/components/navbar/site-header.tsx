import Link from "next/link";
import { siteRoutes } from "@/config/site";

import { Search } from "@/components/navbar/search";
import { UserNav } from "@/components/navbar/user-nav";
import { MainNav } from "@/components/navbar/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { AuthNav } from "@/components/navbar/auth-nav";

export function SiteHeader() {
  return (
    <header className="flex justify-between items-center h-11 border-b">
      <div className="flex items-center gap-4">
        <Link href={siteRoutes.root}>
          <h1 className="text-lg font-bold">Pollor</h1>
        </Link>
        <MainNav />
      </div>
      <div className="flex gap-4 items-center">
        <Search />
        <UserNav />
        <ModeToggle />
        <AuthNav />
      </div>
    </header>
  );
}
