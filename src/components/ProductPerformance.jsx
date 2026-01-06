import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
} from "recharts";
import { motion } from "framer-motion";

const ProductPerformance = () => {
  const [productPerformanceData, setProductPerformanceData] = useState([]);

  useEffect(() => {
    const dummyData = [
      { name: "Education", value: 250 },
      { name: "Healthcare", value: 180 },
      { name: "Food", value: 400 },
      { name: "Rent", value: 800 },
      { name: "Travel", value: 300 },
      { name: "Shopping", value: 300 },
      { name: "Entertainment", value: 200 },
      { name: "Utilities", value: 150 },
      { name: "Savings", value: 350 },
      { name: "Others", value: 120 },
    ];

    setProductPerformanceData(dummyData);
  }, []);

  return (
    <motion.div className="bg-white backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#DFDDDD] mx-2 md:mx-0 z-10">
      <h2 className="text-lg font-medium mb-4 text-gray-600">
        Product Performance
      </h2>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={productPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
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
            <Legend />
            <Bar dataKey="value" fill="#ff7043" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ProductPerformance;
