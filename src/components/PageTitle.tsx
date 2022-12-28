"use client";

import { usePathname } from "next/navigation";
import { TABS } from "../contants/contants";

const PageTitle = () => {
  const pathname = usePathname();
  return (
    <section className="border-b border-gray-800 ">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between py-12 px-4">
        <h1 className="text-2xl">
          {TABS.find((tab) => tab.href === pathname)?.title}
        </h1>
        {TABS.find((tab) => tab.href === pathname)?.href === "/" && (
          <button className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-black transition-colors hover:bg-transparent hover:text-gray-300">
            Add
          </button>
        )}
      </div>
    </section>
  );
};

export default PageTitle;
