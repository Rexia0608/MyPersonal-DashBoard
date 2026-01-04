import { HiBell, HiAcademicCap } from "react-icons/hi2";
import admin from "/images/admin.jpg";

const TopHeader = () => {
  return (
    <>
      <header className="bg-white shadow-lg border border-gray-50 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HiAcademicCap
              className="text-blue-500"
              size={40}
              style={{ minWidth: "20px" }}
            />
            <div>
              <h1 className="text-2xl sm:text-xl lg:text-2xl font-semibold text-gray-600">
                EnrollPlus
              </h1>
              <span className="hidden sm:block text-[#675579] font-light">
                School Enrollment System
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="relative">
              <HiBell className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300 cursor-pointer hover:text-white" />
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img
                className="rounded-full border border-gray-600"
                src={admin}
                width={35}
                height={35}
                alt="user image"
              />
              <span className="hidden sm:block text-gray-400 font-medium">
                John Doe
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default TopHeader;
