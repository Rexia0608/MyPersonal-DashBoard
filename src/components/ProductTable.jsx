import { motion } from "framer-motion";
import { Search, Trash2, Edit } from "lucide-react";
import productData from "../data/productData";
import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 10;
const MAX_VISIBLE_PAGES = 5;

const ProductTable = () => {
  const [products, setProducts] = useState(productData.product);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔍 Search filter
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      `${product.name} ${product.category} ${product.id}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [products, search]);

  // 📄 Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // 🔢 Windowed page numbers
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

  return (
    <motion.div
      className="bg-stone-50 backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 mx-2 md:mx-0 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-lg md:text-xl font-semibold text-zinc-600">
          Product List
        </h2>

        <div className="relative w-full md:w-64">
          <input
            className="bg-white text-zinc-600 placeholder-zinc-600 shadow-sm rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset page on search
            }}
          />
          <Search className="absolute left-3 top-2.5 text-zinc-400" size={18} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-100">
          <thead className="hidden md:table-header-group">
            <tr>
              {[
                "Name",
                "Product ID",
                "Category",
                "Price",
                "Stock",
                "Sales",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            {currentProducts.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col md:table-row"
              >
                <td className="flex items-center px-6 py-4 text-zinc-500">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={product.image}
                    alt={product.name}
                  />
                  <span className="ml-4">{product.name}</span>
                </td>
                <td className="px-6 py-4 text-zinc-500">{product.id}</td>
                <td className="px-6 py-4 text-zinc-500">{product.category}</td>
                <td className="px-6 py-4 text-zinc-500">${product.price}</td>
                <td className="px-6 py-4 text-zinc-500">{product.stock}</td>
                <td className="px-6 py-4 text-zinc-500">{product.sales}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Edit
                      size={16}
                      className="text-indigo-400 cursor-pointer"
                    />
                    <Trash2 size={16} className="text-red-400 cursor-pointer" />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 text-sm text-gray-300">
        <span>
          Showing {startIndex + 1}–
          {Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)} of{" "}
          {filteredProducts.length}
        </span>

        <div className="flex items-center gap-1">
          {/* First */}
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded bg-[#2f2f2f] disabled:opacity-40"
          >
            «
          </button>

          {/* Prev */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded bg-[#2f2f2f] disabled:opacity-40"
          >
            ‹
          </button>

          {/* Leading ellipsis */}
          {getVisiblePages()[0] > 1 && <span className="px-1">…</span>}

          {/* Page numbers */}
          {getVisiblePages().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-indigo-500 text-white"
                  : "bg-[#2f2f2f]"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Trailing ellipsis */}
          {getVisiblePages().slice(-1)[0] < totalPages && (
            <span className="px-1">…</span>
          )}

          {/* Next */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded bg-[#2f2f2f] disabled:opacity-40"
          >
            ›
          </button>

          {/* Last */}
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded bg-[#2f2f2f] disabled:opacity-40"
          >
            »
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductTable;
