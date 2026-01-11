import { motion } from "framer-motion";
import { Search, Trash2, Edit } from "lucide-react";
import userData from "../data/UsersData";
import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 10;
const MAX_VISIBLE_PAGES = 5;

const UsersTable = () => {
  const [users, setUsers] = useState(userData.users);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔍 Search filter (index-safe)
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      `${user.name} ${user.email} ${user.role} ${user.id}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  // 📄 Pagination (index-based)
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // 🔢 Windowed pagination
  const getVisiblePages = () => {
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let start = Math.max(currentPage - half, 1);
    let end = start + MAX_VISIBLE_PAGES - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - MAX_VISIBLE_PAGES + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // 🔄 Toggle user status (row-based)
  const toggleStatus = (id) => {
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
  };

  return (
    <motion.div
      className="bg-stone-50 shadow-lg rounded-xl p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-zinc-700">
          Users Management
        </h2>

        <div className="relative w-full md:w-64">
          <input
            className="bg-white text-zinc-700 shadow-sm rounded-lg pl-10 pr-4 py-2 w-full focus:ring-2 focus:ring-indigo-500 text-sm"
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Search className="absolute left-3 top-2.5 text-zinc-400" size={18} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="hidden md:table-header-group">
            <tr>
              {["User", "Role", "Email", "Status", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-semibold text-zinc-600 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            {currentUsers.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:table-row"
              >
                {/* User */}
                <td className="flex items-center px-6 py-4 gap-3">
                  <img
                    src={user.avatar}
                    className="w-10 h-10 rounded-full"
                    alt={user.name}
                  />
                  <div>
                    <p className="font-medium text-zinc-700">{user.name}</p>
                    <p className="text-xs text-zinc-400">{user.id}</p>
                  </div>
                </td>

                {/* Role */}
                <td className="px-6 py-4 text-zinc-600">{user.role}</td>

                {/* Email */}
                <td className="px-6 py-4 text-zinc-600">{user.email}</td>

                {/* Status */}
                <td
                  className={`px-6 py-4 font-medium ${
                    user.status === "inactive"
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {user.status}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={user.status === "active"}
                      onChange={() => toggleStatus(user.id)}
                    />
                    <div
                      className="w-11 h-6 bg-gray-400 rounded-full peer
                      peer-checked:bg-indigo-500
                      after:content-['']
                      after:absolute after:top-0.5 after:left-0.5
                      after:bg-white after:rounded-full
                      after:h-5 after:w-5
                      after:transition-transform
                      peer-checked:after:translate-x-5"
                    />
                  </label>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-sm text-zinc-600">
        <span>
          Showing {startIndex + 1}–
          {Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)} of{" "}
          {filteredUsers.length}
        </span>

        <div className="flex gap-1">
          {getVisiblePages().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-indigo-500 text-white"
                  : "bg-zinc-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default UsersTable;
