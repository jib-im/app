"use client";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderTab = () => {
  const tabs = [
    { name: "My Links", href: "/" },
    { name: "Settings", href: "/settings" },
  ];
  const pathname = usePathname();

  const selected = tabs.findIndex((tab) => tab.href === pathname);

  return (
    <Tab.Group defaultIndex={selected}>
      <Tab.List className="flex gap-x-1 rounded-xl px-4">
        {tabs.map((tab, index) => (
          <Link
            key={tab.name}
            href={tab.href}
            className={`${
              selected === index && "border-b"
            } group border-gray-500 px-1 py-2 outline-none`}
          >
            <Tab className="w-full max-w-fit rounded-lg px-4 py-2 text-sm text-white outline-none group-hover:bg-gray-800">
              {tab.name}
            </Tab>
          </Link>
        ))}
      </Tab.List>
    </Tab.Group>
  );
};

export default HeaderTab;
