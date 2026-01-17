import AdminSidebar from "../components/dashboardComponents/AdminSidebar";
import TopHeader from "../components/dashboardComponents/TopHeader";
import { Routes, Route } from "react-router-dom";
import AdminTransactions from "../routes/admin/AdminTransactionRoute";
import AdminOverViewRoute from "../routes/admin/AdminOverviewRoute";
import AdminUsersRoute from "../routes/admin/AdminUsersRoute";
import AdminScheduleRoute from "../routes/admin/AdminScheduleRoute";
import AdminSettingsRoute from "../routes/admin/AdminSettingsRoute";

const DashboardLayout = () => {
  return (
    <>
      <TopHeader />
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <div className="flex flex-col flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto w-full bg-gray-50">
            <main className="bg-indigo-50">
              <Routes>
                <Route path="/admin/" element={<AdminOverViewRoute />} />
                <Route path="/admin/home" element={<AdminOverViewRoute />} />
                <Route path="/admin/users" element={<AdminUsersRoute />} />
                <Route
                  path="/admin/schedule"
                  element={<AdminScheduleRoute />}
                />
                <Route
                  path="/admin/transactions"
                  element={<AdminTransactions />}
                />
                <Route
                  path="/admin/settings"
                  element={<AdminSettingsRoute />}
                />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
