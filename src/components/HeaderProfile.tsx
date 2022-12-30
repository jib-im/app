"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { FaSignOutAlt } from "react-icons/fa";
import { useHydrationFailedHack } from "../hooks/useHydrationFailedHack";

type Props = { session: Session | null };

const HeaderProfile = ({ session }: Props) => {
  const { mounted } = useHydrationFailedHack();
  if (!mounted)
    return (
      <div className="m-1 h-9 w-9 animate-pulse rounded-full bg-gray-800" />
    );
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="h-10 min-h-[40px] w-10 min-w-[40px] rounded-full bg-gray-500 bg-opacity-20 p-1 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-50 focus-visible:ring-opacity-75">
        {session && session.user && session.user.image ? (
          <Image
            src={session.user.image}
            alt={`${session.user.name}'s profile picture`}
            width={32}
            height={32}
            className="rounded-full object-cover object-center"
          />
        ) : (
          <Image
            src="/images/jib-logo.png"
            alt="Jib.im's logo"
            width={32}
            height={32}
            className="rounded-full object-cover object-center"
          />
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-1 w-44 origin-top-right rounded-md bg-gray-800 p-2 shadow-lg">
          <Menu.Item>
            <button
              onClick={() => signOut()}
              className="flex w-full items-center gap-x-2 rounded-md px-2 py-2 text-sm text-gray-50 hover:bg-gray-700"
            >
              <FaSignOutAlt />
              Log out
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default HeaderProfile;
