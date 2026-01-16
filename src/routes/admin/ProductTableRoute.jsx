import StatCard from "../../components/dashboardComponents/StatCard";
import {
  HiCurrencyDollar,
  HiBookOpen,
  HiOutlineUserGroup,
  HiCalendar,
} from "react-icons/hi2";
import { motion } from "framer-motion";
import ProductTable from "../../components/dashboardComponents/ProductTable";

const ProductTableRoute = () => {
  return (
    <>
      <div className="flex-1 overflow-auto relative z-10">
        <main className="max-w-7xl mx-auto py-4 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="grid grid-col-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          >
            <StatCard name="users" icon={HiOutlineUserGroup} value="123" />
            <StatCard
              name="Active semester"
              icon={HiCalendar}
              value="2nd 2026"
            />
            <StatCard name="courses" icon={HiBookOpen} value="4" />
            <StatCard
              name="Income"
              icon={HiCurrencyDollar}
              value="₱123,330.00"
            />
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <ProductTable />
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductTableRoute;
