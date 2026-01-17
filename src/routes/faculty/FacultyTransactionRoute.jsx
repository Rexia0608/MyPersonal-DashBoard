import StatCard from "../../components/dashboardComponents/StatsCard";
import {
  HiCurrencyDollar,
  HiBookOpen,
  HiOutlineUserGroup,
  HiCalendar,
} from "react-icons/hi2";

import { motion } from "framer-motion";
import TableTransaction from "../../components/dashboardComponents/TableTransaction";

const FacultyTransactionRoute = () => {
  return (
    <>
      <div className="flex-1 overflow-auto relative z-10">
        <main className="max-w-7xl mx-auto py-4 px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Transaction History
              </h1>
              <p className="text-gray-600 mt-2">
                Monitor all payment, document, and enrollment activities
              </p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="grid grid-col-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          >
            <StatCard
              name="Users"
              icon={HiOutlineUserGroup}
              value={123}
              color="text-blue-600"
            />

            <StatCard
              name="Active semester"
              icon={HiCalendar}
              value="2nd 2026"
              color="text-green-600"
            />
            <StatCard
              name="courses"
              icon={HiBookOpen}
              value="4"
              color="text-purple-600"
            />
            <StatCard
              name="Income"
              icon={HiCurrencyDollar}
              value="₱123,330.00"
              color="text-yellow-600"
            />
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <TableTransaction />
          </div>
        </main>
      </div>
    </>
  );
};

export default FacultyTransactionRoute;
