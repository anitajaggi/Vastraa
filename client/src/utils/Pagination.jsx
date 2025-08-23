export const Pagination = ({
  page,
  currentPage,
  totalPages,
  loading,
  onPageChange,
}) => {
  const isFirst = page === 1;
  const isLast = page === totalPages;

  return (
    <div className="flex justify-center items-center my-5 space-x-4">
      <button
        disabled={isFirst || loading}
        onClick={() => onPageChange(page - 1)}
        className={`px-5 py-2 text-sm border cursor-pointer font-medium rounded-full transition-colors duration-200 
          ${
            isFirst || loading
              ? "bg-black/10 text-black/40 cursor-not-allowed"
              : "bg-black text-white hover:bg-white hover:text-black"
          }`}
      >
        Prev
      </button>

      <span className="text-sm font-semibold text-black">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={isLast || loading}
        onClick={() => onPageChange(page + 1)}
        className={`px-5 py-2 text-sm border cursor-pointer font-medium rounded-full transition-colors duration-200 
          ${
            isLast || loading
              ? "bg-black/10 text-black/40 cursor-not-allowed"
              : "bg-black text-white hover:bg-white hover:text-black"
          }`}
      >
        Next
      </button>
    </div>
  );
};
