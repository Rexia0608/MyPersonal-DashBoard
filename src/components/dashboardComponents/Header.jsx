import React from "react";
import Uk from "/images/uk.png";
import { HiBell } from "react-icons/hi2";
import admin from "/images/admin.jpg";

const Header = () => {
  return (
    <>
      <header className="bg-[#1e1e1e] shadow-lg border border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
          <h1 className="text-md sm:text-xs lg:text-2xl font-semibold text-gray-100">
            Dashboard
          </h1>
          <div className="flex items-center space-x-3 sm:space-x-6">
            <img
              className="rounded-full shadow-md cursor-pointer"
              src={Uk}
              width={25}
              height={18}
              alt="country flag"
            />

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
              <span className="hidden sm:block text-gray-100 font-medium">
                John Doe
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
