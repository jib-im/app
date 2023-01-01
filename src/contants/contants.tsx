export const TABS = [
  { name: "My Links", title: "My Jib Links", href: "/" },
  { name: "Settings", title: "Settings", href: "/settings" },
];

export const lastTime = [
  { title: "Last hour", value: "last-hour" },
  { title: "Last 24 hours", value: "last-24-hours", hasChecked: true },
  { title: "Last 7 days", value: "last-7-days" },
  { title: "Last 30 days", value: "last-30-days" },
  { title: "Last 3 months", value: "last-4-months" },
  { title: "Last year", value: "last-year" },
];

import { FaSortAmountDown, FaStream } from "react-icons/fa";
export const STATUS_BAR: {
  title: string;
  value: "sort" | "status";
  icon: JSX.Element;
  items: { title: string; icon: JSX.Element; value?: string }[];
}[] = [
  {
    title: "Sort by",
    value: "sort",
    icon: <FaStream className="h-3 w-3 sm:h-auto sm:w-auto" />,
    items: [
      { title: "Date Added", icon: <FaSortAmountDown /> },
      {
        title: "Number of Clicks",
        icon: <FaSortAmountDown />,
        value: "clicks",
      },
    ],
  },
  // {
  //   title: "Status",
  //   value: "status",
  //   icon: (
  //     <div className="relative w-5">
  //       <div className="absolute left-[-.5rem] h-3 w-3 translate-y-[-50%] rounded-full border border-gray-800/25 bg-[#22c55e]" />
  //       <div className="absolute left-0 h-3 w-3 translate-y-[-50%] rounded-full border border-gray-800/25 bg-[#e5e7eb]" />
  //       <div className="absolute left-[.5rem] h-3 w-3 translate-y-[-50%] rounded-full border border-gray-800/25 bg-[#e5e7eb]" />
  //     </div>
  //   ),
  //   items: [
  //     {
  //       title: "Active",
  //       icon: <FaCircle className="h-2.5 w-2.5 text-[#22c55e]" />,
  //     },
  //     {
  //       title: "Expired",
  //       icon: <FaCircle className="h-2.5 w-2.5 text-[#f59e0b]" />,
  //       value: "expired",
  //     },
  //     {
  //       title: "Archived",
  //       icon: <FaCircle className="h-2.5 w-2.5 text-[#9ca3af]" />,
  //       value: "archived",
  //     },
  //   ],
  // },
];
