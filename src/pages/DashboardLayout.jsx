import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import { Routes, Route } from "react-router-dom";
import ProductTableRoute from "../routes/admin/ProductTableRoute";
import AdminOverViewRoute from "../routes/admin/AdminOverviewRoute";
import ManageUsersRoutes from "../routes/admin/ManageUsersRoutes";

const DashboardLayout = () => {
  return (
    <>
      <TopHeader />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto w-full bg-gray-50">
            <main className="bg-indigo-50">
              <Routes>
                <Route path="/" element={<AdminOverViewRoute />} />
                <Route path="/home" element={<AdminOverViewRoute />} />
                <Route path="/files" element={<ProductTableRoute />} />
                <Route path="/users" element={<ManageUsersRoutes />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
