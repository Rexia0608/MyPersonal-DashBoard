import { motion, AnimatePresence } from "framer-motion";
import { Search, Trash2, Edit, ChevronDown, Plus } from "lucide-react";
import { useState, useMemo, useCallback, useId } from "react";
import courseData from "../../data/dummyCourseData";
import AddCourseModal from "../../components/AddCourseModal";
import Pagination from "../../components/Pagination";

/* ================= CONSTANTS ================= */

const ITEMS_PER_PAGE = 10;

const TABLE_HEADERS = [
  { key: "courseCode", label: "Course Code", sortable: true },
  { key: "schoolYear", label: "School Year", sortable: true },
  { key: "semester", label: "Semester", sortable: false },
  { key: "enrollment", label: "Enrollment", sortable: true },
  { key: "price", label: "Price", sortable: true },
  { key: "actions", label: "Actions", sortable: false },
];

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "Senior High", label: "Senior High" },
  { value: "Diploma and Certificate", label: "Diploma and Certificate" },
  { value: "Bachelor Degree", label: "Bachelor Degree" },
];

/* ================= HOOKS ================= */

const useSorting = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return { sortConfig, handleSort };
};

const usePagination = (totalItems, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage: (p) => setCurrentPage(Math.max(1, Math.min(p, totalPages))),
    nextPage: () => setCurrentPage((p) => Math.min(p + 1, totalPages)),
    prevPage: () => setCurrentPage((p) => Math.max(p - 1, 1)),
    goToFirst: () => setCurrentPage(1),
    goToLast: () => setCurrentPage(totalPages),
  };
};

/* ================= HELPERS ================= */

const formatPrice = (price) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(price);

/* ================= COMPONENT ================= */

const CourseTable = () => {
  const [courses, setCourses] = useState(courseData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("current");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { sortConfig, handleSort } = useSorting();
  const filterId = useId();
  const searchId = useId();

  const filteredCourses = useMemo(() => {
    let result = courses.filter((c) =>
      `${c.courseName} ${c.courseCode} ${c.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    if (filter !== "all" && filter !== "current") {
      result = result.filter((c) => c.category === filter);
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        const dir = sortConfig.direction === "asc" ? 1 : -1;
        return a[sortConfig.key] > b[sortConfig.key] ? dir : -dir;
      });
    }

    return result;
  }, [courses, search, filter, sortConfig]);

  const pagination = usePagination(filteredCourses.length, ITEMS_PER_PAGE);
  const currentCourses = filteredCourses.slice(
    pagination.startIndex,
    pagination.endIndex
  );

  // Handle adding a new course
  const handleSubmitCourse = useCallback(
    async (newCourse) => {
      setIsSubmitting(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newCourseWithId = {
        ...newCourse,
        id: Date.now().toString(),
        enrollment: "0", // Default enrollment
      };

      setCourses((prev) => [...prev, newCourseWithId]);
      setIsAddModalOpen(false);
      setIsSubmitting(false);

      // Reset to first page to show the new course
      pagination.goToFirst();
    },
    [pagination]
  );

  // Handle deleting a course
  const handleDeleteCourse = useCallback((id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses((prev) => prev.filter((course) => course.id !== id));
    }
  }, []);

  // Reset to first page when search changes
  const handleSearchChange = useCallback(
    (e) => {
      setSearch(e.target.value);
      pagination.goToFirst();
    },
    [pagination]
  );

  // Reset to first page when filter changes
  const handleFilterChange = useCallback(
    (e) => {
      setFilter(e.target.value);
      pagination.goToFirst();
    },
    [pagination]
  );

  return (
    <div className="h-full flex flex-col">
      <motion.div
        className="bg-white shadow-lg rounded-xl p-6 flex flex-col h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        role="region"
        aria-label="Courses management"
      >
        {/* Header Section - Fixed Height */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Course Management
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage and organize all your academic courses
            </p>
          </div>

          <div className="flex items-center gap-4">
            <select
              id={filterId}
              className="bg-gray-50 border border-gray-200 text-gray-700 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              value={filter}
              onChange={handleFilterChange}
              aria-label="Filter courses"
            >
              {FILTER_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <div className="relative">
              <input
                id={searchId}
                type="search"
                className="bg-gray-50 border border-gray-200 text-gray-700 rounded-lg pl-10 pr-4 py-2.5 w-full md:w-64 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                placeholder="Search courses..."
                value={search}
                onChange={handleSearchChange}
                aria-label="Search courses"
              />
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors"
            >
              <Plus size={16} />
              Add Course
            </button>
          </div>
        </div>

        {/* Table Section - Flexible Height */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="overflow-hidden rounded-lg border border-gray-200 flex-1 flex flex-col">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {TABLE_HEADERS.map((h) => (
                      <th
                        key={h.key}
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-50 z-10"
                      >
                        {h.sortable ? (
                          <button
                            className="flex items-center gap-1 hover:text-gray-800 transition-colors"
                            onClick={() => handleSort(h.key)}
                            aria-label={`Sort by ${h.label}`}
                          >
                            {h.label}
                            {sortConfig.key === h.key && (
                              <motion.span
                                initial={{ rotate: 0 }}
                                animate={{
                                  rotate:
                                    sortConfig.direction === "asc" ? 0 : 180,
                                }}
                                className="text-indigo-500"
                              >
                                {sortConfig.direction === "asc" ? "↑" : "↓"}
                              </motion.span>
                            )}
                          </button>
                        ) : (
                          h.label
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>

                <AnimatePresence>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {currentCourses.length > 0 ? (
                      currentCourses.map((course) => (
                        <motion.tr
                          key={course.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-800">
                                {course.courseCode}
                              </p>
                              <p className="text-sm text-gray-500">
                                {course.courseName}
                              </p>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-gray-600 text-sm">
                            {course.schoolYear}
                          </td>

                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {course.semester}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-gray-600 text-center">
                            {course.isEnrollmentOpen ? (
                              <div className="px-1 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Open
                              </div>
                            ) : (
                              <div className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Closed
                              </div>
                            )}
                          </td>

                          <td className="px-6 py-4">
                            <span className="font-medium text-gray-800">
                              {formatPrice(course.price)}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Edit course"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4 text-gray-600" />
                              </button>

                              <button
                                onClick={() => handleDeleteCourse(course.id)}
                                className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                                aria-label="Delete course"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={TABLE_HEADERS.length}
                          className="px-6 py-12 text-center h-full"
                        >
                          <div className="flex flex-col items-center justify-center gap-3">
                            <Search className="w-12 h-12 text-gray-300" />
                            <p className="text-gray-500 font-medium">
                              No courses found
                            </p>
                            <p className="text-gray-400 text-sm">
                              {search
                                ? `No results for "${search}"`
                                : "Add courses to get started"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </AnimatePresence>
              </table>
            </div>
          </div>

          {/* Pagination Section - Fixed Height */}
          {filteredCourses.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 pt-4 border-t border-gray-200 shrink-0">
              <div className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-medium">{pagination.startIndex + 1}</span>
                –
                <span className="font-medium">
                  {Math.min(pagination.endIndex, filteredCourses.length)}
                </span>{" "}
                of <span className="font-medium">{filteredCourses.length}</span>{" "}
                courses
              </div>

              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={pagination.goToPage}
                onNext={pagination.nextPage}
                onPrev={pagination.prevPage}
                onFirst={pagination.goToFirst}
                onLast={pagination.goToLast}
              />
            </div>
          )}
        </div>

        {/* Add Course Modal - Fixed prop name */}
        <AddCourseModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleSubmitCourse}
          isLoading={isSubmitting}
        />
      </motion.div>
    </div>
  );
};

export default CourseTable;
