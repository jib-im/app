import Image from "next/image";
import Link from "next/link";
import type { Session } from "next-auth";
import HeaderTab from "./HeaderTab";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";
import PageTitle from "./PageTitle";
import { useRouter } from "next/router";

const Header = ({ session }: { session: Session | null }) => {
  const { pathname } = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-900">
      <div className="mx-auto max-w-screen-lg">
        <div className="flex justify-between gap-x-4 p-4 pb-0">
          <div className="flex items-center gap-x-4">
            <Link href="/">
              <h3 className="text-lg font-bold">jib</h3>
            </Link>
            {pathname !== "/link/[shortUrl]" && (
              <>
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
              </>
            )}
          </div>
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
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex w-full items-center gap-x-2 rounded-md px-2 py-2 text-sm text-gray-50 hover:bg-gray-700"
                  >
                    <FaSignOutAlt />
                    Log out
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <HeaderTab />
      </div>
      {(pathname === "/" || pathname === "/settings") && <PageTitle />}
    </header>
  );
};

export default Header;
