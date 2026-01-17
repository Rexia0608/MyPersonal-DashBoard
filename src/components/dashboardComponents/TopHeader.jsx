import { HiOutlineUser } from "react-icons/hi2";
import logo from "/images/Logo.png";

const TopHeader = () => {
  return (
    <>
      <header className="bg-white shadow-lg border border-gray-50 z-10">
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              className="rounded-full"
              src={logo}
              width={60}
              height={60}
              alt="logo"
            />
            <div>
              <h1 className="text-2xl sm:text-xl lg:text-md font-semibold text-gray-600">
                EnrollPlus
              </h1>
              <span className="hidden sm:block text-[#675579] font-light">
                Laguna Science and Technology Colleges
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-linear-to-r from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
                <HiOutlineUser className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  John
                </p>
                <p className="text-xs text-gray-500 truncate">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default TopHeader;
