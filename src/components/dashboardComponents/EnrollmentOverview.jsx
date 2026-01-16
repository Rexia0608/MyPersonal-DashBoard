import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import data from "../../data/data";
import { motion } from "framer-motion";

const EnrollmentOverview = () => {
  const [enrolleesData, setEnrolleesData] = useState([]);

  useEffect(() => {
    setEnrolleesData(data);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="bg-white backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#DFDDDD] mx-2 md:mx-0 z-10"
    >
      <h2 className="text-base md:text-lg font-medium mb-4 text-gray-600 text-center md:text-left">
        Enrollees
      </h2>

      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={enrolleesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
            <XAxis
              dataKey="month"
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} width={40} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#F3F4F6",
                borderColor: "#dfdddd",
                fontSize: "12px",
                color: "#4a5565",
                borderRadius: "4px",
              }}
              itemStyle={{ color: "#4a5565" }}
            />
            <Line
              type="monotone"
              dataKey="enrollees"
              stroke="#38bdf8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default EnrollmentOverview;
