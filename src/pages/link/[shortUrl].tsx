import { Menu, Transition } from "@headlessui/react";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { Fragment } from "react";
import {
  FaCheck,
  FaChevronDown,
  FaExternalLinkAlt,
  FaRegCalendar,
  FaRegChartBar,
} from "react-icons/fa";
import { lastTime } from "../../contants/contants";
import { trpc } from "../../utils/trpc";
import useScrollPosition from "../../hooks/useScrollPosition";

const LinkPage = ({ shortUrl }: { shortUrl: string }) => {
  const { data, isLoading } = trpc.link.getLink.useQuery({
    shortUrl,
  });
  const scrollPosition = useScrollPosition();

  if (data === null) return <>Not Found</>;

  const Card = ({
    title,
    buttons,
  }: {
    title: "Location" | "Devices" | "Referrers" | "Feedback";
    buttons?: { title: string; selected: boolean }[];
  }) => {
    return (
      <div className="space-y-4 rounded-md border border-gray-800 p-4 shadow-lg md:p-8">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{title}</h3>
          {buttons && (
            <div className="flex items-center gap-x-2 text-xs sm:gap-x-1 md:gap-x-2">
              {buttons.map((button) => (
                <button
                  key={button.title}
                  className={`rounded-md px-2 py-1 transition-colors ${
                    button.selected
                      ? "bg-gray-700 hover:bg-gray-700/90"
                      : "bg-gray-700/50 hover:bg-gray-800"
                  }`}
                >
                  {button.title}
                </button>
              ))}
            </div>
          )}
        </div>
        {title === "Feedback" ? (
          <form className="space-y-4 text-sm">
            <div className="flex w-full flex-col gap-y-1">
              <label
                htmlFor="email"
                className="w-full text-left text-sm text-gray-300"
              >
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                placeholder="brice@jib.im"
                className="w-full rounded-md border border-gray-500 bg-transparent p-3 text-white outline-none focus:border-gray-50"
                required={true}
                minLength={3}
              />
            </div>
            <div className="flex w-full flex-col gap-y-1">
              <label
                htmlFor="feedback"
                className="w-full text-left text-sm text-gray-300"
              >
                FEEDBACK
              </label>
              <textarea
                id="feedback"
                placeholder="What other data would you like to see?"
                className="w-full rounded-md border border-gray-500 bg-transparent p-3 text-white outline-none focus:border-gray-50"
                required={true}
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-black transition-colors hover:bg-transparent hover:text-gray-300"
            >
              Submit feedback
            </button>
          </form>
        ) : (
          <div className="flex h-64 items-center justify-center">
            <p className="text-sm">
              {isLoading ? "Loading..." : "No data available"}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-8">
      <div
        className={`sticky top-[6.98rem] z-10 border-b bg-gray-900 transition-colors ${
          scrollPosition > 32
            ? "border-gray-800 shadow-lg"
            : "border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-screen-md flex-col items-center justify-between gap-y-2 p-4 sm:flex-row">
          {isLoading ? (
            <h4 className="text-base font-medium sm:text-lg">Loading...</h4>
          ) : (
            <Link
              href={`https://jib.im/${data?.shortUrl}`}
              target="_blank"
              className="flex items-center gap-x-2 text-base font-medium hover:underline sm:text-lg"
            >
              jib.im/{data?.shortUrl}
              <FaExternalLinkAlt className="text-sm sm:text-base" />
            </Link>
          )}
          <Menu as="div" className="relative text-left">
            <Menu.Button className="flex w-44 items-center justify-between gap-x-2 rounded-md border border-gray-800/50 px-4 py-2 text-xs shadow transition-colors hover:bg-gray-800 sm:text-sm">
              <div className="flex items-center gap-x-2">
                <FaRegCalendar />
                <p className="text-xs">Last 24 hours</p>
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
              <Menu.Items className="absolute right-0 z-10 mt-1 w-44 origin-top-right rounded-md border border-gray-800/50 bg-gray-800 p-1.5 shadow-xl">
                {lastTime.map((menuItem) => (
                  <Menu.Item key={menuItem.title}>
                    <button className="flex w-full items-center justify-between gap-x-2 rounded-md p-2 text-left text-xs hover:bg-slate-700/50">
                      {menuItem.title}
                      {menuItem.hasChecked && <FaCheck />}
                    </button>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="relative mx-auto max-w-screen-md space-y-8 px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <div className="col-span-1 row-span-1 rounded-md border border-gray-800 p-4 shadow-lg sm:col-span-2 sm:row-span-2 md:p-8">
            <div className="">
              <div className="flex items-center gap-x-2">
                <h1 className="text-4xl font-bold">
                  {isLoading ? "-" : data?.clicks}
                </h1>
                {!isLoading && (
                  <FaRegChartBar className="text-2xl text-gray-300" />
                )}
              </div>
              <p className="text-gray-300">TOTAL CLICKS</p>
            </div>
          </div>
          <Card
            title="Location"
            buttons={[
              { title: "Country", selected: true },
              { title: "City", selected: false },
            ]}
          />
          <Card
            title="Devices"
            buttons={[
              { title: "Device", selected: true },
              { title: "Browser", selected: false },
              { title: "Bot", selected: false },
            ]}
          />
          <Card title="Referrers" />
          <Card title="Feedback" />
        </div>
      </div>
    </section>
  );
};

export default LinkPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { shortUrl } = context.params as { shortUrl: string };
  if (!shortUrl) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      shortUrl,
    },
  };
};
