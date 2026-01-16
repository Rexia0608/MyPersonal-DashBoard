import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  UserCheck,
  UserX,
} from "lucide-react";
import userData from "../../data/UsersData";
import { useState, useMemo, useCallback } from "react";

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 25, 50];
const MAX_VISIBLE_PAGES = 5;

const TableUsers = () => {
  const [users, setUsers] = useState(userData.users);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  // 🔍 Search filter with debounce-like effect
  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;

    const searchTerm = search.toLowerCase();
    return users.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchTerm)
      )
    );
  }, [users, search]);

  // 📊 Sorting functionality
  const sortedUsers = useMemo(() => {
    const sorted = [...filteredUsers];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [filteredUsers, sortConfig]);

  // 📄 Pagination
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);
  const endIndex = Math.min(startIndex + itemsPerPage, sortedUsers.length);

  // 🔢 Smart pagination with ellipsis
  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + MAX_VISIBLE_PAGES - 1, totalPages);

    if (end - start + 1 < MAX_VISIBLE_PAGES) {
      start = Math.max(end - MAX_VISIBLE_PAGES + 1, 1);
    }

    if (start > 1) pages.push(1, "...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) pages.push("...", totalPages);

    return pages;
  };

  // 🔄 Toggle user status
  const toggleStatus = useCallback((id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user
      )
    );
  }, []);

  // 🗑️ Delete user with confirmation
  const deleteUser = useCallback((id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  }, []);

  // 🔽 Sort handler
  const requestSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  // Reset to first page when search changes
  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  }, []);

  const visiblePages = getVisiblePages();

  return (
    <motion.div
      className="bg-white shadow-lg rounded-xl p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage your team members and their account permissions
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              className="bg-gray-50 border border-gray-200 text-gray-700 rounded-lg pl-10 pr-4 py-2.5 w-full md:w-64 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
              placeholder="Search users..."
              value={search}
              onChange={handleSearchChange}
              aria-label="Search users"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          </div>

          <select
            className="bg-gray-50 border border-gray-200 text-gray-700 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            aria-label="Items per page"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                Show {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                { key: "name", label: "User" },
                { key: "role", label: "Role" },
                { key: "email", label: "Email" },
                { key: "status", label: "Status" },
                { label: "Actions" },
              ].map(({ key, label }) => (
                <th
                  key={label}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {key ? (
                    <button
                      className="flex items-center gap-1 hover:text-gray-800 transition-colors"
                      onClick={() => requestSort(key)}
                      aria-label={`Sort by ${label}`}
                    >
                      {label}
                      {sortConfig.key === key && (
                        <motion.span
                          initial={{ rotate: 0 }}
                          animate={{
                            rotate: sortConfig.direction === "asc" ? 0 : 180,
                          }}
                          className="text-indigo-500"
                        >
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </motion.span>
                      )}
                    </button>
                  ) : (
                    label
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <AnimatePresence>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          className="w-10 h-10 rounded-full ring-2 ring-gray-100"
                          alt={`${user.name}'s avatar`}
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.name
                            )}&background=random`;
                          }}
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-400">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      <a
                        href={`mailto:${user.email}`}
                        className="hover:text-indigo-600 transition-colors"
                      >
                        {user.email}
                      </a>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            user.status === "active"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        />
                        <span
                          className={`font-medium ${
                            user.status === "active"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {user.status.charAt(0).toUpperCase() +
                            user.status.slice(1)}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleStatus(user.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          aria-label={
                            user.status === "active"
                              ? "Deactivate user"
                              : "Activate user"
                          }
                          title={
                            user.status === "active" ? "Deactivate" : "Activate"
                          }
                        >
                          {user.status === "active" ? (
                            <UserX className="w-4 h-4 text-gray-600" />
                          ) : (
                            <UserCheck className="w-4 h-4 text-gray-600" />
                          )}
                        </button>

                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          aria-label="Edit user"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>

                        <button
                          onClick={() => deleteUser(user.id)}
                          className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                          aria-label="Delete user"
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
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Search className="w-12 h-12 text-gray-300" />
                      <p className="text-gray-500 font-medium">
                        No users found
                      </p>
                      <p className="text-gray-400 text-sm">
                        {search
                          ? `No results for "${search}"`
                          : "Add users to get started"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </AnimatePresence>
        </table>
      </div>

      {/* Pagination Section */}
      {sortedUsers.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{startIndex + 1}</span>–
            <span className="font-medium">{endIndex}</span> of{" "}
            <span className="font-medium">{sortedUsers.length}</span> users
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-1">
              {visiblePages.map((page, index) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-3 py-1 text-gray-400"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      page === currentPage
                        ? "bg-indigo-500 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    aria-label={`Go to page ${page}`}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TableUsers;
