import Link from "next/link";
import { siteRoutes } from "@/config/site";

import { Search } from "@/components/navbar/search";
import { UserNav } from "@/components/navbar/user-nav";
import { MainNav } from "@/components/navbar/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { AuthNav } from "@/components/navbar/auth-nav";
import { ModalCreatePoll } from "@/components/modals/modal-create-poll";
import { getAuthSession } from "@/lib/auth";

export async function SiteHeader() {
  // here we gonna check for if a user is authenticated or not
  const session = await getAuthSession();
  const isAuthenticated = session?.user.email ? true : false;
  return (
    <header className="flex justify-between items-center h-11 border-b">
      <div className="flex items-center gap-4">
        <Link href={siteRoutes.root}>
          <h1 className="text-lg font-bold">Pollor</h1>
        </Link>
        {/* <MainNav /> */}
      </div>
      <div className="flex gap-4 items-center">
        {/* <Search /> */}
        {isAuthenticated && <ModalCreatePoll />}
        {isAuthenticated && <UserNav />}

        <ModeToggle />
        {!isAuthenticated && <AuthNav />}
      </div>
    </header>
  );
}
