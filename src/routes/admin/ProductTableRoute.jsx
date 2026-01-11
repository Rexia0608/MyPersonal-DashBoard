import StatCard from "../../components/StatCard";
import {
  HiCurrencyDollar,
  HiBookOpen,
  HiOutlineUserGroup,
  HiCalendar,
} from "react-icons/hi2";
import { motion } from "framer-motion";
import ProductTable from "../../components/ProductTable";

const ProductTableRoute = () => {
  return (
    <>
      <div className="flex-1 overflow-auto relative z-10">
        <ProductTable />
      </div>
    </>
  );
};

export default ProductTableRoute;
