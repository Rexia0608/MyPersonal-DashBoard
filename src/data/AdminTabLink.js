import {
  HiMiniHome,
  HiMiniUsers,
  HiFolderOpen,
  HiClipboardDocumentList,
} from "react-icons/hi2";

const AdminTabLink = [
  {
    icon: HiMiniHome,
    label: "Home",
    path: "/admin/",
  },
  {
    icon: HiMiniUsers,
    label: "Manage Users",
    path: "/admin/users",
  },
  {
    icon: HiClipboardDocumentList,
    label: "Manage School Year",
    path: "/admin/schedule",
  },
  {
    icon: HiFolderOpen,
    label: "Transactions History",
    path: "/admin/transactions",
  },
];

export default AdminTabLink;
