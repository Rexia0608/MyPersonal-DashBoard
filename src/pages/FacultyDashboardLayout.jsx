import Sidebar from "../components/dashboardComponents/Sidebar";
import TopHeader from "../components/dashboardComponents/TopHeader";
import { Routes, Route } from "react-router-dom";
import FacultyTransactionsRoute from "../routes/faculty/FacultyTransactionRoute";
import FacultyOverViewRoute from "../routes/faculty/FacultyOverviewRoute";
import FacultyUsersRoute from "../routes/faculty/FacultyUsersRoute";
import FacultyScheduleRoute from "../routes/faculty/FacultyScheduleRoute";
import FacultySettingsRoute from "../routes/faculty/FacultySettingsRoute";

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
                <Route path="/" element={<FacultyOverViewRoute />} />
                <Route path="/home" element={<FacultyOverViewRoute />} />
                <Route path="/users" element={<FacultyUsersRoute />} />
                <Route path="/schedule" element={<FacultyScheduleRoute />} />
                <Route
                  path="/transactions"
                  element={<FacultyTransactionsRoute />}
                />
                <Route path="/settings" element={<FacultySettingsRoute />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
