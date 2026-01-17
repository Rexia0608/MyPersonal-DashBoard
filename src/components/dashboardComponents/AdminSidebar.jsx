import AdminTabLink from "../../data/AdminTabLink";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import {
  HiMiniArrowRightEndOnRectangle,
  HiOutlineCog8Tooth,
} from "react-icons/hi2";

const AdminSidebar = () => {
  const activeLink = ({ isActive }) =>
    classNames(
      "flex items-center p-4 text-sm font-medium rounded-lg mb-2 transition-colors cursor-pointer",
      {
        "bg-blue-50 text-blue-500": isActive,
        "bg-gray-100 hover:bg-[#dfdddd] text-gray-400": !isActive,
      },
    );

  // Get current user info
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

  const currentUser = getUserData();

  const handleLogout = () => {
    // Create a custom styled message
    const message =
      "🚪 SIGN OUT CONFIRMATION\n\n" +
      "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n\n" +
      `👤 User: ${currentUser.name}\n` +
      `📧 Email: ${currentUser.email}\n` +
      `🎯 Role: ${currentUser.role}\n\n` +
      "⚠️  WARNING:\n" +
      "• Any unsaved changes will be lost\n" +
      "• Current session will be terminated\n" +
      "• You'll need to login again to continue\n\n" +
      "Are you sure you want to sign out?";

    // Show browser's native confirmation dialog
    const isConfirmed = window.confirm(message);

    if (isConfirmed) {
      // Show a brief message before starting the logout process
      alert("🔄 Signing out... Please wait a moment.");

      // Step 1: Clear all authentication data
      const clearAuthData = () => {
        // Clear localStorage
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("sessionExpiry");

        // Clear sessionStorage
        sessionStorage.clear();

        // Clear cookies
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" +
                new Date().toUTCString() +
                ";path=/;domain=" +
                window.location.hostname,
            );
        });
      };

      clearAuthData();

      // Step 2: Redirect with a small delay for better UX
      setTimeout(() => {
        // Redirect to login page with timestamp to prevent caching
        const timestamp = new Date().getTime();
        window.location.href = `/login?signout=success&t=${timestamp}`;
      }, 300);
    } else {
      // User cancelled - provide feedback
      console.log("Logout cancelled by user");
      // Optional: Show a brief message
      // alert("Sign out cancelled. You're still logged in.");
    }
  };

  return (
    <div className="relative z-10 transition-all shadow-lg duration-300 ease-in-out shrink-0 w-64">
      <div className="h-full bg-white backdrop-blur-md p-4 flex flex-col justify-between border-[#E5E7EB]">
        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto">
          <nav className="mt-1 mb-8">
            {AdminTabLink.map(({ icon: Icon, label, path }) => (
              <NavLink key={label} to={path} className={activeLink}>
                <Icon size={20} style={{ minWidth: "20px" }} />
                <span className="ml-4 whitespace-nowrap">{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Bottom Navigation */}
          <nav>
            <NavLink to="/admin/settings" className={activeLink}>
              <HiOutlineCog8Tooth size={20} style={{ minWidth: "20px" }} />
              <span className="ml-4 whitespace-nowrap">Settings</span>
            </NavLink>

            {/* Sign Out Button */}
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-4 text-sm font-medium rounded-lg mb-2 transition-colors cursor-pointer bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-400 group"
              aria-label={`Sign out from ${currentUser.email}`}
              title={`Sign out (${currentUser.name})`}
            >
              <HiMiniArrowRightEndOnRectangle
                size={20}
                style={{ minWidth: "20px" }}
                className="group-hover:text-red-600 transition-colors"
              />
              <span className="ml-4 whitespace-nowrap group-hover:text-red-600 transition-colors">
                Sign out
              </span>
            </button>
          </nav>
        </div>

        {/* User Info & Footer */}
        <div className="mt-auto">
          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-200">
            <span className="text-gray-400 text-xs block">
              EnrollPlus System v2.1.0
            </span>
            <span className="text-gray-400 text-xs">
              Developed by: John Rey C.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
