import {
  HiMiniHome,
  HiMiniUsers,
  HiFolderOpen,
  HiClipboardDocumentList,
} from "react-icons/hi2";

const FacultyTabLink = [
  {
    icon: HiMiniHome,
    label: "Dashboard",
    path: "/faculty/",
  },
  {
    icon: HiMiniUsers,
    label: "Manage Student",
    path: "/faculty/users",
  },
  {
    icon: HiClipboardDocumentList,
    label: "Manage School Year",
    path: "/faculty/schedule",
  },
  {
    icon: HiFolderOpen,
    label: "Transactions History",
    path: "/faculty/transactions",
  },
];

export default FacultyTabLink;
