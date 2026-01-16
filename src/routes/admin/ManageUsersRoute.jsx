import TableUsers from "../../components/dashboardComponents/TableUsers";
import { motion } from "framer-motion";
import StatCard from "../../components/dashboardComponents/StatCard";
import {
  HiOutlineUserGroup,
  HiOutlineBookOpen,
  HiOutlineCalendarDateRange,
} from "react-icons/hi2";

const ManageUsersRoute = () => {
  return (
    <>
      <div className="flex-1 overflow-auto relative z-10">
        <main className="max-w-7xl mx-auto py-4 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="grid grid-col-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          >
            <StatCard name="Users" icon={HiOutlineUserGroup} value="123" />
            <StatCard
              name="Active semester"
              icon={HiOutlineCalendarDateRange}
              value="2nd 2026"
            />
            <StatCard
              name="Active courses"
              icon={HiOutlineBookOpen}
              value="4"
            />
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <TableUsers />
          </div>
        </main>
      </div>
    </>
  );
};

export default ManageUsersRoute;
