import React from "react";

const StatCard = ({ name, icon: Icon, value, color }) => {
  return (
    <>
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{name}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            {Icon && <Icon size={30} className={`${color}`} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default StatCard;
