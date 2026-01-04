import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import AdminOverview from "../routes/AdminOverview";

const Dashboard = () => {
  return (
    <>
      <TopHeader />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto w-full bg-gray-50">
            <main className="bg-indigo-50">
              <AdminOverview />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
