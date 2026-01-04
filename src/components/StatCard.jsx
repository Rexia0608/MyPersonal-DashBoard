import React from "react";

const StatCard = ({ name, icon: Icon, value }) => {
  return (
    <>
      <div className="bg-white backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-[#1e1e1e1e]">
        <div className="px-3 py-4 sm:p-5">
          <span className="flex items-center text-sm">
            <Icon size={30} className="mr-2 text-gray-600" />
            {name}
          </span>
          <p className="mt-1 text-3xl font-semibold text-gray-600">{value}</p>
        </div>
      </div>
    </>
  );
};

export default StatCard;
