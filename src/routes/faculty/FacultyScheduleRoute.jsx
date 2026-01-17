import TableCourse from "../../components/dashboardComponents/TableCourse";

const MFacultyScheduleRoute = () => {
  return (
    <>
      <div className="flex-1 overflow-auto relative z-10">
        <main className="max-w-7xl mx-auto py-4 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <TableCourse />
          </div>
        </main>
      </div>
    </>
  );
};

export default MFacultyScheduleRoute;
