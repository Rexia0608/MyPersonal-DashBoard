import tabLinks from "../../data/tablink";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import {
  HiMiniArrowRightEndOnRectangle,
  HiMiniServerStack,
  HiOutlineCog8Tooth,
} from "react-icons/hi2";

const Sidebar = () => {
  const activeLink = ({ isActive }) =>
    classNames(
      "flex items-center p-4 text-sm font-medium rounded-lg mb-2 transition-colors cursor-pointer",
      {
        "bg-blue-50 text-blue-500": isActive,
        "bg-gray-100 hover:bg-[#dfdddd] text-gray-400": !isActive,
      }
    );

  const handleLogout = () => {
    alert("logout");
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
          <NavLink to="/maintinance" className={activeLink}>
            <HiMiniServerStack size={20} style={{ minWidth: "20px" }} />
            <span className="ml-4 whitespace-nowrap">Maintenance</span>
          </NavLink>
          <div
            onClick={handleLogout}
            className="flex items-center p-4 text-sm font-medium rounded-lg mb-2 transition-colors cursor-pointer bg-gray-100 hover:bg-[#dfdddd] text-gray-400"
          >
            <HiMiniArrowRightEndOnRectangle
              size={20}
              style={{ minWidth: "20px" }}
            />
            <span className="ml-4 whitespace-nowrap">Sign out</span>
          </div>
        </nav>
        <div className="text-center">
          <span className="text-gray-400 text-xs">
            Deveoped by: John Rey C.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
