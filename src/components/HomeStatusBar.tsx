"use client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaCheck, FaChevronDown, FaStream } from "react-icons/fa";
import { STATUS_BAR } from "../contants/contants";

const HomeStatusBar = () => {
  return (
    <div className="flex items-center gap-x-4">
      {STATUS_BAR.map((menuItem) => (
        <Menu
          as="div"
          className="-sm relative inline-block text-left"
          key={menuItem.title}
        >
          <Menu.Button className="flex w-full items-center justify-between gap-x-2 rounded-md border border-gray-700/50 px-4 py-2 text-xs shadow transition-colors hover:bg-gray-800 sm:w-40 sm:text-sm">
            <div className="flex items-center gap-x-2">
              {menuItem.icon}
              {menuItem.title}
            </div>
            <FaChevronDown aria-hidden="true" />
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md border border-gray-700/50 bg-gray-800 p-1.5 shadow-xl">
              {menuItem.items.map((menuItemsItem) => (
                <Menu.Item key={menuItemsItem.title}>
                  <button className="flex w-full items-center gap-x-2 rounded-md p-2 text-left text-xs hover:bg-slate-700/50">
                    <div className="flex w-full items-center gap-x-2">
                      {menuItemsItem.icon}
                      {menuItemsItem.title}
                    </div>
                    {menuItemsItem.hasChecked && <FaCheck />}
                  </button>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      ))}
    </div>
  );
};

export default HomeStatusBar;
