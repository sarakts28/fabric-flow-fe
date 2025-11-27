// Pagination.jsx
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({
  page,
  totalPages,
  pageLimit,
  onPageChange,
  onLimitChange,
}) => {
  const generatePages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row sm:gap-0 gap-3  items-start sm:items-center justify-between py-4! w-full px-4! border-t border-amber-50 bg-white">
      {/* Limit Dropdown */}
      <select
        value={pageLimit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
        className="border border-amber-50 rounded-lg px-3! py-1! text-sm shadow-sm"
      >
        {[5, 10, 20, 50].map((limit) => (
          <option key={limit} value={limit}>
            {limit} Rows
          </option>
        ))}
      </select>

      {/* Center Page Numbers */}
      <div className="flex items-center gap-2">
        {generatePages().map((num, index) => (
          <button
            key={index}
            disabled={num === "..."}
            onClick={() => num !== "..." && onPageChange(num)}
            className={`px-3! py-1! text-sm rounded-md shadow-sm transition ${
              num === page
                ? "bg-black text-white"
                : "hover:bg-gray-200 text-gray-700"
            } ${num === "..." && "cursor-default"}`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Next/Prev Buttons */}
      <div className="flex items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="flex items-center gap-1 border border-amber-50 rounded-lg px-3! py-1! text-sm shadow-sm hover:bg-gray-200 disabled:opacity-40"
        >
          <FiChevronLeft size={15} /> Previous
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex items-center gap-1 border border-amber-50 rounded-lg px-3! py-1! text-sm shadow-sm hover:bg-gray-200 disabled:opacity-40"
        >
          Next <FiChevronRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
