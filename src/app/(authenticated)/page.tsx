"use client";

import Links from "../../components/Links";
import HomeStatusBar from "../../components/HomeStatusBar";

export default function Page() {
  return (
    <section className="flex w-full flex-col items-end gap-y-4">
      <HomeStatusBar />
      <div className="flex w-full flex-col gap-y-4">
        <Links />
        <Links />
        <Links />
        <Links />
        <Links />
        <Links />
        <Links />
        <Links />
      </div>
    </section>
  );
}
