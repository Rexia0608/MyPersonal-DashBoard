import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useMemo } from "react";

const MAX_VISIBLE_PAGES = 5;

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
  onFirst,
  onLast,
}) => {
  const visiblePages = useMemo(() => {
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + MAX_VISIBLE_PAGES - 1, totalPages);

    if (end - start + 1 < MAX_VISIBLE_PAGES) {
      start = Math.max(end - MAX_VISIBLE_PAGES + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination">
      <div className="flex items-center gap-1">
        <PageButton onClick={onFirst} disabled={currentPage === 1}>
          <ChevronsLeft size={18} />
        </PageButton>

        <PageButton onClick={onPrev} disabled={currentPage === 1}>
          <ChevronLeft size={18} />
        </PageButton>

        {visiblePages.map((page) => (
          <PageButton
            key={page}
            onClick={() => onPageChange(page)}
            isActive={page === currentPage}
          >
            {page}
          </PageButton>
        ))}

        <PageButton onClick={onNext} disabled={currentPage === totalPages}>
          <ChevronRight size={18} />
        </PageButton>

        <PageButton onClick={onLast} disabled={currentPage === totalPages}>
          <ChevronsRight size={18} />
        </PageButton>
      </div>
    </nav>
  );
};

const PageButton = ({ children, onClick, disabled, isActive }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      min-w-10 h-10 rounded-lg flex items-center justify-center
      transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500
      ${
        isActive
          ? "bg-indigo-600 text-white"
          : "text-gray-700 hover:bg-gray-100"
      }
      ${disabled ? "opacity-40 cursor-not-allowed" : ""}
    `}
  >
    {children}
  </button>
);

export default Pagination;
