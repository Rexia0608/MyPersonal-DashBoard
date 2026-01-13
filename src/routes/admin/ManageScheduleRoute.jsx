// components/CourseTable.jsx
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  Plus,
} from "lucide-react";
import { useState, useMemo, useCallback, useId } from "react";
import courseData from "../../data/dummyCourseData";
import AddCourseModal from "../../components/AddCourseModal";

// Constants
const ITEMS_PER_PAGE = 10;
const MAX_VISIBLE_PAGES = 5;

const TABLE_HEADERS = [
  { key: "courseCode", label: "Course Code", sortable: true },
  { key: "category", label: "Category", sortable: true },
  { key: "schoolYear", label: "School Year", sortable: true },
  { key: "semester", label: "Semester", sortable: false },
  { key: "enrollment", label: "Enrollment", sortable: false },
  { key: "price", label: "Price", sortable: true },
  { key: "actions", label: "Action", sortable: false },
];

const FILTER_OPTIONS = [
  { value: "current", label: "Current Active" },
  { value: "all", label: "All" },
  { value: "Senior High", label: "Senior High" },
  { value: "Diploma and Certificate", label: "Diploma and Certificate" },
  { value: "Bachelor Degree", label: "Bachelor Degree" },
];

// Custom hooks for better separation
const useSorting = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = useCallback((key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  return { sortConfig, handleSort };
};

const usePagination = (totalItems, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const goToPage = useCallback(
    (page) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  }, []);

  const goToFirst = useCallback(() => setCurrentPage(1), []);
  const goToLast = useCallback(() => setCurrentPage(totalPages), [totalPages]);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    prevPage,
    goToFirst,
    goToLast,
  };
};

// Utility functions
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const getEnrollmentStatus = (isOpen) => {
  return {
    text: isOpen ? "Open" : "Closed",
    className: isOpen
      ? "bg-green-50 text-green-700 border border-green-200"
      : "bg-red-50 text-red-700 border border-red-200",
  };
};

const NoResults = () => (
  <motion.tr
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="hover:bg-transparent"
  >
    <td colSpan={TABLE_HEADERS.length} className="px-6 py-12 text-center">
      <div className="flex flex-col items-center justify-center">
        <Search className="h-12 w-12 text-gray-300 mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          No courses found
        </h3>
        <p className="text-sm text-gray-500">
          Try adjusting your search or filter criteria
        </p>
      </div>
    </td>
  </motion.tr>
);

const CourseTable = () => {
  const [courses, setCourses] = useState(courseData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("current");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { sortConfig, handleSort } = useSorting();
  const currentSchoolYear = "2026-2027";
  const filterSelectId = useId();
  const searchInputId = useId();

  // Handle adding new course
  const handleAddCourse = async (courseData) => {
    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newCourse = {
      id: `course-${Date.now()}`,
      ...courseData,
      enrollment: 0, // Start with 0 enrollment
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to the beginning of the list
    setCourses((prev) => [newCourse, ...prev]);
    setIsSubmitting(false);
    setIsAddModalOpen(false);
  };

  // Memoized filtered and sorted courses
  const filteredCourses = useMemo(() => {
    let result = courses.filter((course) => {
      const searchTerms =
        `${course.courseName} ${course.category} ${course.courseCode}`.toLowerCase();
      const matchesSearch = searchTerms.includes(search.toLowerCase());

      if (!matchesSearch) return false;

      if (filter === "current") {
        return (
          course.status === "active" && course.schoolYear === currentSchoolYear
        );
      }
      if (filter === "all") {
        return true;
      }
      return course.category === filter;
    });

    // Apply sorting
    if (sortConfig.key) {
      const direction = sortConfig.direction === "asc" ? 1 : -1;
      result = [...result].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return aValue.localeCompare(bValue) * direction;
        }

        return (aValue - bValue) * direction;
      });
    }

    return result;
  }, [courses, search, filter, sortConfig, currentSchoolYear]);

  const pagination = usePagination(filteredCourses.length, ITEMS_PER_PAGE);
  const currentCourses = filteredCourses.slice(
    pagination.startIndex,
    pagination.endIndex
  );

  // Get visible pages for pagination
  const visiblePages = useMemo(() => {
    const { currentPage, totalPages } = pagination;

    if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + MAX_VISIBLE_PAGES - 1, totalPages);

    if (end - start + 1 < MAX_VISIBLE_PAGES) {
      start = Math.max(end - MAX_VISIBLE_PAGES + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }, [pagination.currentPage, pagination.totalPages]);

  // Handlers
  const handleFilterChange = useCallback(
    (value) => {
      setFilter(value);
      pagination.goToPage(1);
    },
    [pagination.goToPage]
  );

  const handleSearchChange = useCallback(
    (value) => {
      setSearch(value);
      pagination.goToPage(1);
    },
    [pagination.goToPage]
  );

  return (
    <motion.div
      className="bg-white backdrop-blur-sm shadow-lg p-4 md:p-6 mx-2 md:mx-0 mb-8 border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      role="region"
      aria-label="Courses management"
    >
      {/* Header + Filters + Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Courses List
          </h2>
          <p className="text-gray-500 mt-1">
            Manage and view all courses in the system
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-start">
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <label htmlFor={filterSelectId} className="sr-only">
                Filter courses
              </label>
              <div className="relative">
                <select
                  id={filterSelectId}
                  className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer w-full min-w-45"
                  value={filter}
                  onChange={(e) => handleFilterChange(e.target.value)}
                >
                  {FILTER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="relative flex-1 min-w-60">
              <label htmlFor={searchInputId} className="sr-only">
                Search courses
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                  aria-hidden="true"
                />
                <input
                  id={searchInputId}
                  className="bg-white border border-gray-200 text-gray-900 placeholder-gray-500 rounded-lg pl-10 pr-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-shadow"
                  type="search"
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  aria-describedby="search-description"
                />
              </div>
              <p id="search-description" className="sr-only">
                Search by course name, code, or category
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors whitespace-nowrap"
            aria-label="Add new course"
          >
            <Plus size={18} />
            Add Course
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {TABLE_HEADERS.map(({ key, label, sortable }) => (
                  <th
                    key={key}
                    scope="col"
                    className={`px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider ${
                      sortable
                        ? "cursor-pointer hover:bg-gray-100 transition-colors"
                        : ""
                    }`}
                    onClick={sortable ? () => handleSort(key) : undefined}
                    aria-sort={
                      sortConfig.key === key
                        ? sortConfig.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <div className="flex items-center gap-2">
                      {label}
                      {sortable && sortConfig.key === key && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-gray-600"
                        >
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </motion.span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence mode="wait">
                {currentCourses.length > 0 ? (
                  currentCourses.map((course) => (
                    <motion.tr
                      key={course.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="px-2.5 py-1.5 text-xs font-mono bg-gray-100 text-gray-900 rounded-md border border-gray-200">
                          {course.courseCode}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {course.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {course.schoolYear}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                          {course.semester}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1.5 text-xs font-medium rounded-full border ${
                              getEnrollmentStatus(course.isEnrollmentOpen)
                                .className
                            }`}
                          >
                            {getEnrollmentStatus(course.isEnrollmentOpen).text}
                          </span>
                          {course.enrollment !== undefined && (
                            <span className="text-xs text-gray-500">
                              ({course.enrollment} enrolled)
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatPrice(course.price)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-1.5">
                          <button
                            className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                            aria-label={`Edit ${course.courseName}`}
                            title="Edit course"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                            aria-label={`Delete ${course.courseName}`}
                            title="Delete course"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <NoResults />
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 px-1">
        <div className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {pagination.startIndex + 1}
          </span>
          –
          <span className="font-semibold text-gray-900">
            {Math.min(pagination.endIndex, filteredCourses.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {filteredCourses.length}
          </span>{" "}
          courses
        </div>

        <nav aria-label="Pagination">
          <div className="flex items-center gap-1">
            <PaginationButton
              onClick={pagination.goToFirst}
              disabled={pagination.currentPage === 1}
              aria-label="First page"
            >
              <ChevronsLeft size={18} />
            </PaginationButton>

            <PaginationButton
              onClick={pagination.prevPage}
              disabled={pagination.currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </PaginationButton>

            <div className="flex items-center gap-1 mx-1">
              {visiblePages[0] > 1 && (
                <span className="px-2 text-gray-400" aria-hidden="true">
                  ...
                </span>
              )}

              {visiblePages.map((page) => (
                <PaginationButton
                  key={page}
                  onClick={() => pagination.goToPage(page)}
                  isActive={pagination.currentPage === page}
                  aria-label={`Page ${page}`}
                  aria-current={
                    pagination.currentPage === page ? "page" : undefined
                  }
                >
                  {page}
                </PaginationButton>
              ))}

              {visiblePages.slice(-1)[0] < pagination.totalPages && (
                <span className="px-2 text-gray-400" aria-hidden="true">
                  ...
                </span>
              )}
            </div>

            <PaginationButton
              onClick={pagination.nextPage}
              disabled={pagination.currentPage === pagination.totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </PaginationButton>

            <PaginationButton
              onClick={pagination.goToLast}
              disabled={pagination.currentPage === pagination.totalPages}
              aria-label="Last page"
            >
              <ChevronsRight size={18} />
            </PaginationButton>
          </div>
        </nav>
      </div>

      {/* Add Course Modal */}
      <AddCourseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCourse}
        isLoading={isSubmitting}
      />
    </motion.div>
  );
};

// Reusable Pagination Button Component
const PaginationButton = ({
  children,
  onClick,
  disabled,
  isActive = false,
  ...props
}) => (
  <button
    className={`
      min-w-10 h-10 flex items-center justify-center rounded-lg transition-all
      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
      ${
        isActive
          ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      }
      ${disabled ? "opacity-40 cursor-not-allowed hover:bg-transparent" : ""}
    `}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export default CourseTable;
