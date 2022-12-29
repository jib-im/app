"use client";
import {
  FaArchive,
  FaEdit,
  FaEllipsisV,
  FaQrcode,
  FaRegChartBar,
  FaRegCopy,
  FaRegTrashAlt,
} from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";

const Links = () => {
  return (
    <div className="flex items-center justify-between gap-x-2 rounded-lg bg-gray-800 px-4 py-6 transition-all hover:bg-gray-700/50">
      <div className="">
        <div className="flex items-center gap-x-2 text-gray-300">
          <Link href="https://slash.ly/github">
            <h4 className="text-sm text-blue-500 sm:text-base">
              slash.ly/github
            </h4>
          </Link>
          <div className="hidden cursor-pointer rounded-full bg-gray-700 p-2 transition-all hover:scale-110 hover:bg-gray-600 hover:text-blue-200 sm:block">
            <FaRegCopy className="h-3 w-3 " />
          </div>
          <div className="hidden cursor-pointer rounded-full bg-gray-700 p-2 transition-all hover:scale-110 hover:bg-gray-600 hover:text-blue-200 sm:block">
            <FaQrcode className="h-3 w-3" />
          </div>
          <Link
            href="/links/github"
            className="flex items-center gap-x-2 rounded-md bg-gray-700 px-2 py-1 transition-all hover:scale-105 hover:bg-gray-600 hover:text-blue-200"
          >
            <FaRegChartBar className="h-3 w-3" />
            <p className="truncate text-xs">2 clicks</p>
          </Link>
        </div>
        <p className="w-52 truncate text-xs text-gray-300 sm:w-96 sm:text-sm md:w-[28rem] lg:w-[32rem]">
          https://github.com/slash-ly
        </p>
      </div>
      <div className="relative flex items-center gap-x-2 text-sm text-gray-400">
        <p className="hidden text-sm leading-none sm:block">5 hrs ago</p>
        <Menu>
          <Menu.Button className="rounded-md px-1.5 py-2 transition-colors hover:bg-gray-500">
            <FaEllipsisV />
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
            <Menu.Items className="absolute top-10 right-0 z-10 flex w-44 flex-col rounded-lg border border-gray-700/50 bg-gray-800 p-2 shadow-xl">
              {[
                { title: "Edit", icon: <FaEdit /> },
                { title: "Archive", icon: <FaArchive /> },
                {
                  title: "Delete",
                  icon: <FaRegTrashAlt />,
                },
              ].map((item) => (
                <Menu.Item key={item.title}>
                  <button
                    className={`flex flex-1 items-center gap-x-3 rounded-md px-4 py-2 hover:bg-gray-700 ${
                      item.title === "Delete" ? "text-red-400" : "text-gray-300"
                    }`}
                  >
                    {item.icon} {item.title}
                  </button>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Links;
