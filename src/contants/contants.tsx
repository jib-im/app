export const TABS = [
  { name: "My Links", title: "My Slash Links", href: "/" },
  { name: "Settings", title: "Settings", href: "/settings" },
];

import { FaChevronDown, FaCircle, FaSortAmountDown } from "react-icons/fa";
export const STATUS_BAR: {
  title: string;
  icon: JSX.Element;
  items: { title: string; icon: JSX.Element; hasChecked?: boolean }[];
}[] = [
  {
    title: "Sort by",
    icon: <FaChevronDown aria-hidden="true" />,
    items: [
      { title: "Date Added", icon: <FaSortAmountDown /> },
      { title: "Number of Clicks", icon: <FaSortAmountDown /> },
    ],
  },
  {
    title: "Status",
    icon: <FaChevronDown aria-hidden="true" />,
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
