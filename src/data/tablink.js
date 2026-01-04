import {
  HiMiniHome,
  HiOutlineCog8Tooth,
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
    icon: HiFolderOpen,
    label: "Files",
    path: "/files",
  },

  {
    icon: HiClipboardDocumentList,
    label: "Schedule",
    path: "/schedule",
  },
  {
    icon: HiMiniUsers,
    label: "Manage Users",
    path: "/users",
  },
];

export default tabLinks;
