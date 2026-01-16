import { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { motion } from "framer-motion";

const COLORS = [
  "#38BDF8",
  "#F87171",
  "#34D399",
  "#FBBF24",
  "#A78BFA",
  "#FB923C",
  "#60A5FA",
  "#4ADE80",
  "#E879F9",
  "#FACC15",
];

const OrderDistribututionChart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [isSmallOrMediumScreen, setIsSmallOrMediumScreen] = useState(false);

  useEffect(() => {
    // Dummy data
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

    setCategoryData(dummyData);
  }, []);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallOrMediumScreen(window.innerWidth <= 768);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const outerRadius = isSmallOrMediumScreen ? 60 : 80;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="bg-white backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#DFDDDD] mx-2 md:mx-0 z-10"
    >
      <h2 className="text-base md:text-lg font-medium mb-4 text-gray-600 text-center md:text-left">
        Category Distribution
      </h2>

      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={outerRadius}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
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
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default OrderDistribututionChart;
