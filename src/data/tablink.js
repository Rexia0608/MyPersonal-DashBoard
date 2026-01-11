import {
  HiMiniHome,
  HiMiniUsers,
  HiFolderOpen,
  HiClipboardDocumentList,
} from "react-icons/hi2";

const tabLinks = [
  {
    icon: HiMiniHome,
    label: "Home",
    path: "/",
  },
  {
    icon: HiMiniUsers,
    label: "Manage Users",
    path: "/users",
  },
  {
    icon: HiClipboardDocumentList,
    label: "Manage School Year",
    path: "/schedule",
  },
  {
    icon: HiFolderOpen,
    label: "Transactions History",
    path: "/transactions",
  },
];

export default tabLinks;
