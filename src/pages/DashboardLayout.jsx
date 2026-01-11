import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import { Routes, Route } from "react-router-dom";
import ProductTableRoute from "../routes/admin/ProductTableRoute";
import AdminOverViewRoute from "../routes/admin/AdminOverviewRoute";
import ManageUsersRoute from "../routes/admin/ManageUsersRoute";
import ManageScheduleRoute from "../routes/admin/ManageScheduleRoute";

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
                <Route path="/users" element={<ManageUsersRoute />} />
                <Route path="/schedule" element={<ManageScheduleRoute />} />
                <Route path="/transactions" element={<ProductTableRoute />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
