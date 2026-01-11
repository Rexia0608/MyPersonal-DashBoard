import { useState } from "react";

const ManageUsersRoutes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shortCourse, setShortCourse] = useState("");
  const [yearProgram, setYearProgram] = useState("");
  const [seniorHighProgram, setSeniorHighProgram] = useState("");
  const [schoolYears, setSchoolYears] = useState([]);

  const handleSave = () => {
    if (!shortCourse && !yearProgram && !seniorHighProgram) return;

    const newYear = {
      id: `SY-${schoolYears.length + 1}`,
      shortCourse,
      yearProgram,
      seniorHighProgram,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setSchoolYears((prev) => [newYear, ...prev]);
    setShortCourse("");
    setYearProgram("");
    setSeniorHighProgram("");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex-1 overflow-auto relative z-10">
        <main className="max-w-7xl mx-auto py-4 px-4">
          <div className="grid grid-cols-1 gap-4">
            <h1 className="text-2xl font-semibold mb-4">Manage School Year</h1>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
            >
              Set New School Year
            </button>

            {/* Display school years as cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {schoolYears.map((sy) => (
                <div
                  key={sy.id}
                  className="bg-white shadow rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
                >
                  <h2 className="font-semibold text-gray-700 mb-2">{sy.id}</h2>
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-medium">Short Course:</span>{" "}
                    {sy.shortCourse || "-"}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-medium">Year Program:</span>{" "}
                    {sy.yearProgram || "-"}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-medium">Senior High Program:</span>{" "}
                    {sy.seniorHighProgram || "-"}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Created: {sy.createdAt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">Set New School Year</h2>

            {/* Form */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Course
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={shortCourse}
                  onChange={(e) => setShortCourse(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year Courses Program
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={yearProgram}
                  onChange={(e) => setYearProgram(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senior High Program
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={seniorHighProgram}
                  onChange={(e) => setSeniorHighProgram(e.target.value)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
              >
                Save
              </button>
            </div>

            {/* Close icon */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageUsersRoutes;
