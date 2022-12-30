export const TABS = [
  { name: "My Links", title: "My Jib Links", href: "/" },
  { name: "Settings", title: "Settings", href: "/settings" },
];

import { FaCircle, FaSortAmountDown, FaStream } from "react-icons/fa";
export const STATUS_BAR: {
  title: string;
  icon: JSX.Element;
  items: { title: string; icon: JSX.Element; hasChecked?: boolean }[];
}[] = [
  {
    title: "Sort by",
    icon: <FaStream className="h-3 w-3 sm:h-auto sm:w-auto" />,
    items: [
      { title: "Date Added", icon: <FaSortAmountDown /> },
      { title: "Number of Clicks", icon: <FaSortAmountDown /> },
    ],
  },
  {
    title: "Status",
    icon: (
      <div className="relative w-5">
        <div className="absolute left-[-.5rem] h-3 w-3 translate-y-[-50%] rounded-full border border-gray-800/25 bg-[#22c55e]" />
        <div className="absolute left-0 h-3 w-3 translate-y-[-50%] rounded-full border border-gray-800/25 bg-[#e5e7eb]" />
        <div className="absolute left-[.5rem] h-3 w-3 translate-y-[-50%] rounded-full border border-gray-800/25 bg-[#e5e7eb]" />
      </div>
    ),
    items: [
      {
        title: "Active",
        icon: <FaCircle className="h-2.5 w-2.5 text-[#22c55e]" />,
        hasChecked: true,
      },
      {
        title: "Expired",
        icon: <FaCircle className="h-2.5 w-2.5 text-[#f59e0b]" />,
      },
      {
        title: "Archived",
        icon: <FaCircle className="h-2.5 w-2.5 text-[#9ca3af]" />,
      },
    ],
  },
];
