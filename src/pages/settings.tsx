import { FaRegQuestionCircle } from "react-icons/fa";
import Balancer from "react-wrap-balancer";

export default function Settings() {
  return (
    <section className="mx-auto flex min-h-[38rem] max-w-screen-lg p-4">
      <div className="w-full">
        <div className="rounded-lg bg-gray-800">
          <div className="space-y-4 p-8">
            <h2 className="text-lg font-medium">Plan & Usage</h2>
            <p className="text-sm text-gray-300">
              You are currently on the{" "}
              <span className="rounded-xl bg-gray-900 px-2 py-1">Free</span>{" "}
              plan. Current billing cycle:{" "}
              <span className="truncate font-semibold">Dec 27 - Jan 26.</span>
            </p>
          </div>
          <hr className="border-gray-700/50" />
          <div className="space-y-2 p-8">
            <div className="flex items-center gap-x-2">
              <h5 className="font-medium">Total Link Clicks</h5>
              <div className="group relative cursor-pointer text-gray-300">
                <FaRegQuestionCircle />

                <p className="pointer-events-none absolute left-1/2 bottom-8 w-44 translate-x-[-50%] select-none rounded-lg bg-gray-900 p-4 text-center text-sm opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  Number of billable link clicks across all your projects.
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-300">100 / 1K clicks (10.0%)</p>
              <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-2.5 rounded-full bg-blue-600"
                  style={{ width: "10%" }}
                ></div>
              </div>
            </div>
          </div>
          <hr className="border-gray-700/50" />
          <div className="flex flex-col items-center justify-between gap-y-4 p-8 sm:flex-row">
            <Balancer>
              <p className="text-center text-sm text-gray-400 sm:text-left">
                For increased limits
                {/* <span className="cursor-pointer text-gray-200 underline underline-offset-4">
              increased limits
            </span> */}
                , upgrade to a Pro subscription.
              </p>
            </Balancer>
            <button className="rounded-md border border-transparent bg-gray-700 px-4 py-2 text-sm transition-colors hover:border-gray-700 hover:bg-transparent">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { default as getServerSideProps } from "../lib/serverProps";
