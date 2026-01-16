import tabLinks from "../../data/tablink";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import {
  HiMiniArrowRightEndOnRectangle,
  HiMiniServerStack,
  HiOutlineCog8Tooth,
} from "react-icons/hi2";
import { useState } from "react";
import SignoutModal from "../Modal/SignOutModal";

const Sidebar = () => {
  const [isSignoutModalOpen, setIsSignoutModalOpen] = useState(false);

  // Get user from auth context or localStorage
  const getUserData = () => {
    try {
      const userData = localStorage.getItem("userData");
      return userData
        ? JSON.parse(userData)
        : {
            name: "John Rey C.",
            role: "Administrator",
            email: "admin@enrollplus.edu",
          };
    } catch (error) {
      return {
        name: "John Rey C.",
        role: "Administrator",
        email: "admin@enrollplus.edu",
      };
    }
  };

  const [currentUser] = useState(getUserData());

  const activeLink = ({ isActive }) =>
    classNames(
      "flex items-center p-4 text-sm font-medium rounded-lg mb-2 transition-colors cursor-pointer",
      {
        "bg-blue-50 text-blue-500": isActive,
        "bg-gray-100 hover:bg-[#dfdddd] text-gray-400": !isActive,
      }
    );

  const handleSignout = () => {
    console.log("Signing out...");

    // Your actual signout logic here:
    // 1. Clear localStorage/sessionStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    sessionStorage.clear();

    // 2. Clear any cookies if you're using them
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // 3. Redirect to login page
    window.location.href = "/login";

    // Optional: Show success message
    // alert("Successfully signed out!");
  };

  return (
    <div className="relative z-10 transition-all shadow-lg duration-300 ease-in-out shrink-0 w-64">
      <div className="h-full bg-white backdrop-blur-md p-4 flex flex-col justify-between border-[#E5E7EB]">
        <nav className="mt-1 grow">
          {tabLinks.map(({ icon: Icon, label, path }) => (
            <NavLink key={label} to={path} className={activeLink}>
              <Icon size={20} style={{ minWidth: "20px" }} />
              <span className="ml-4 whitespace-nowrap">{label}</span>
            </NavLink>
          ))}
        </nav>

        <nav className="grow">
          <NavLink to="/settings" className={activeLink}>
            <HiOutlineCog8Tooth size={20} style={{ minWidth: "20px" }} />
            <span className="ml-4 whitespace-nowrap">Settings</span>
          </NavLink>
          <button
            onClick={() => setIsSignoutModalOpen(true)}
            className="flex items-center w-full p-4 text-sm font-medium rounded-lg mb-2 transition-colors cursor-pointer bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-400"
          >
            <HiMiniArrowRightEndOnRectangle
              size={20}
              style={{ minWidth: "20px" }}
            />
            <span className="ml-4 whitespace-nowrap">Sign out</span>
          </button>
        </nav>
        <div className="text-center">
          <span className="text-gray-400 text-xs">
            Developed by: John Rey C.
          </span>
        </div>
      </div>

      {/* Add the Signout Modal here */}
      <SignoutModal
        isOpen={isSignoutModalOpen}
        onClose={() => setIsSignoutModalOpen(false)}
        onSignout={handleSignout}
        user={currentUser}
      />
    </div>
  );
};

export default Sidebar;
