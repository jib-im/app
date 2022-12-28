"use client";
import Image from "next/image";
import Link from "next/link";
// import { getSession } from "../utils/getSession";
import HeaderProfile from "./HeaderProfile";
import type { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
  // const session = use(getSession());

  return (
    <header className="sticky top-0 mx-auto flex max-w-screen-lg justify-between gap-x-4 bg-gray-900 p-4">
      <div className="flex items-center gap-x-4">
        <Link href="/">
          <h3 className="text-lg font-bold">slash</h3>
        </Link>
        <div className="pointer-events-none hidden select-none text-gray-500 sm:block">
          /
        </div>

        <div className="hidden items-center gap-x-2 sm:flex">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt={`${session.user.name}'s profile picture`}
              width={24}
              height={24}
              className="rounded-full object-cover object-center"
            />
          )}

          <p className="truncate text-sm text-gray-400">
            {session?.user?.email}
          </p>
        </div>
      </div>
      <HeaderProfile session={session} />
    </header>
  );
};

export default Header;
