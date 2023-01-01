import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { FaCheck, FaChevronDown, FaCircle } from "react-icons/fa";
import { STATUS_BAR } from "../contants/contants";

const HomeStatusBar = ({ loading }: { loading?: boolean }) => {
  const { query, push } = useRouter();

  return (
    <div className="ml-auto flex items-center gap-x-4">
      {STATUS_BAR.map((menuItem) => (
        <Menu
          as="div"
          className="-sm relative inline-block text-left"
          key={menuItem.title}
        >
          <Menu.Button
            disabled={loading}
            className={`flex w-full items-center justify-between gap-x-2 rounded-md border border-gray-700/50 px-4 py-2 text-xs shadow transition-colors sm:w-44 sm:text-sm ${
              loading ? "animate-pulse" : "hover:bg-gray-800"
            }`}
          >
            <div className="flex items-center gap-x-2">
              {loading ? (
                <>
                  <div className="h-4 w-4 rounded-full bg-gray-700 sm:h-5 sm:w-5" />
                  <div className="h-4 w-9 bg-gray-700 p-2 sm:w-12" />
                </>
              ) : (
                <>
                  {menuItem.icon}
                  <p>{menuItem.title}</p>
                </>
              )}
            </div>
            {loading ? (
              <div className="h-4 w-4 rounded-full bg-gray-700 sm:h-5 sm:w-5" />
            ) : (
              <FaChevronDown aria-hidden="true" />
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md border border-gray-700/50 bg-gray-800 p-1.5 shadow-xl">
              {menuItem.items.map((menuItemsItem) => (
                <Menu.Item key={menuItemsItem.title}>
                  <button
                    className="flex w-full items-center gap-x-2 rounded-md p-2 text-left text-xs hover:bg-slate-700/50"
                    onClick={() => {
                      switch (menuItem.value) {
                        case "sort":
                          if (!menuItemsItem.value) {
                            delete query.sort;
                          } else {
                            query.sort = menuItemsItem.value;
                          }
                          push({
                            pathname: "/",
                            query,
                          });
                          break;
                        // case "status":
                        //   if (
                        //     !menuItemsItem.value ||
                        //     menuItemsItem.value === query.status
                        //   ) {
                        //     delete query.status;
                        //   } else {
                        //     query.status = query.status?.concat(
                        //       ",",
                        //       menuItemsItem.value
                        //     );
                        //   }
                        //   push({
                        //     pathname: "/",
                        //     query,
                        //   });
                        //   break;
                      }
                    }}
                  >
                    <div className="flex w-full items-center gap-x-2">
                      {menuItemsItem.icon}
                      <p>{menuItemsItem.title}</p>
                    </div>
                    {menuItemsItem.value === query.sort && <FaCheck />}
                  </button>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      ))}
      <Menu as="div" className="-sm relative inline-block text-left">
        <Menu.Button
          disabled={loading}
          className={`flex w-full items-center justify-between gap-x-2 rounded-md border border-gray-700/50 px-4 py-2 text-xs shadow transition-colors sm:w-44 sm:text-sm ${
            loading ? "animate-pulse" : "hover:bg-gray-800"
          }`}
        >
          <div className="flex items-center gap-x-2">
            {loading ? (
              <>
                <div className="h-4 w-4 rounded-full bg-gray-700 sm:h-5 sm:w-5" />
                <div className="h-4 w-9 bg-gray-700 p-2 sm:w-12" />
              </>
            ) : (
              <>
                <div className="relative w-5">
                  <div className="absolute left-[-.5rem] h-3 w-3 translate-y-[-50%] rounded-full border border-gray-800/25 bg-[#22c55e]" />
                  <div className="absolute left-0 h-3 w-3 translate-y-[-50%] rounded-full border border-gray-800/25 bg-[#e5e7eb]" />
                  <div className="absolute left-[.5rem] h-3 w-3 translate-y-[-50%] rounded-full border border-gray-800/25 bg-[#e5e7eb]" />
                </div>
                <p>Status</p>
              </>
            )}
          </div>
          {loading ? (
            <div className="h-4 w-4 rounded-full bg-gray-700 sm:h-5 sm:w-5" />
          ) : (
            <FaChevronDown aria-hidden="true" />
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md border border-gray-700/50 bg-gray-800 p-1.5 shadow-xl">
            <Menu.Item>
              <button
                className="flex w-full items-center gap-x-2 rounded-md p-2 text-left text-xs hover:bg-slate-700/50"
                onClick={() => {
                  if (!query.status || query.status === "active") {
                    query.status = "none";
                  } else if (query.status === "none") {
                    delete query.status;
                  } else if (query.status === "all") {
                    query.status = "expired,archived";
                  } else if (!query.status.includes("active")) {
                    query.status = query.status.concat(",active");
                  } else if (query.status.includes("active,")) {
                    query.status =
                      typeof query.status === "string"
                        ? query.status.replace("active,", "")
                        : query.status;
                  } else if (query.status.includes(",active")) {
                    query.status =
                      typeof query.status === "string"
                        ? query.status.replace(",active", "")
                        : query.status;
                  } else {
                    if (
                      query.status.includes("expired") &&
                      query.status.includes("archived")
                    ) {
                      query.status = "all";
                    }
                  }
                  push({
                    pathname: "/",
                    query,
                  });
                }}
              >
                <div className="flex w-full items-center gap-x-2">
                  <FaCircle className="h-2.5 w-2.5 text-[#22c55e]" />
                  <p>Active</p>
                </div>
                {(query.status?.includes("active") ||
                  !query.status ||
                  query.status === "all") && <FaCheck />}
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                className="flex w-full items-center gap-x-2 rounded-md p-2 text-left text-xs hover:bg-slate-700/50"
                onClick={() => {
                  if (query.status === "none") {
                    query.status = "expired";
                  } else if (query.status === "all") {
                    query.status = "active,archived";
                  } else if (!query.status) {
                    query.status = "active,expired";
                  } else if (query.status === "expired") {
                    query.status = "none";
                  } else if (query.status?.includes(",expired")) {
                    typeof query.status === "string"
                      ? (query.status = query.status.replace(",expired", ""))
                      : query.status;
                  } else if (query.status?.includes("expired,")) {
                    typeof query.status === "string"
                      ? (query.status = query.status.replace("expired,", ""))
                      : query.status;
                  } else {
                    if (
                      query.status.includes("active") &&
                      query.status.includes("archived")
                    ) {
                      query.status = "all";
                    } else {
                      query.status = query.status.concat(",expired");
                    }
                  }

                  if (query.status === "active") {
                    delete query.status;
                  }

                  push({
                    pathname: "/",
                    query,
                  });
                }}
              >
                <div className="flex w-full items-center gap-x-2">
                  <FaCircle className="h-2.5 w-2.5 text-[#f59e0b]" />
                  <p>Expired</p>
                </div>
                {(query.status?.includes("expired") ||
                  query.status === "all") && <FaCheck />}
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                className="flex w-full items-center gap-x-2 rounded-md p-2 text-left text-xs hover:bg-slate-700/50"
                onClick={() => {
                  if (query.status === "none") {
                    query.status = "archived";
                  } else if (query.status === "all") {
                    query.status = "active,expired";
                  } else if (!query.status) {
                    query.status = "active,archived";
                  } else if (query.status === "archived") {
                    query.status = "none";
                  } else if (query.status.includes(",archived")) {
                    typeof query.status === "string"
                      ? (query.status = query.status.replace(",archived", ""))
                      : query.status;
                  } else if (query.status.includes("archived,")) {
                    typeof query.status === "string"
                      ? (query.status = query.status.replace("archived,", ""))
                      : query.status;
                  } else {
                    if (
                      query.status.includes("active") &&
                      query.status.includes("expired")
                    ) {
                      query.status = "all";
                    } else {
                      query.status = query.status.concat(",archived");
                    }
                  }

                  if (query.status === "active") {
                    delete query.status;
                  }

                  push({
                    pathname: "/",
                    query,
                  });
                }}
              >
                <div className="flex w-full items-center gap-x-2">
                  <FaCircle className="h-2.5 w-2.5 text-[#9ca3af]" />
                  <p>Archived</p>
                </div>
                {(query.status?.includes("archived") ||
                  query.status === "all") && <FaCheck />}
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default HomeStatusBar;
