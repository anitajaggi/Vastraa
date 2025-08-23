import { useDispatch, useSelector } from "react-redux";
import { fetchFeeds } from "../../Features/feedback/feedbackThunk";
import { useEffect, useState } from "react";

export const ShowReview = () => {
  const dispatch = useDispatch();
  const limit = 2;

  const { feedbacks, loading } = useSelector((state) => state.feedback);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchFeeds({ page: 1, limit: 1000 }));
  }, [dispatch]);

  // Filter for only approved
  const approvedFeedbacks = feedbacks.filter((fb) => fb.approved);
  const totalApproved = approvedFeedbacks.length;
  const totalPages = Math.ceil(totalApproved / limit);
  const paginatedFeedbacks = approvedFeedbacks.slice(
    (page - 1) * limit,
    page * limit
  );

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col justify-center gap-4 p-4">
      <div>
        <p className="text-lg font-semibold text-gray-700">
          Total Reviews - {totalApproved}
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading reviews...</p>
      ) : paginatedFeedbacks.length === 0 ? (
        <p className="text-center text-gray-500">
          No approved reviews to display.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {paginatedFeedbacks.map((feedback) => (
            <blockquote
              key={feedback._id}
              className="p-6 rounded-xl shadow-sm border-l-4 border-black relative bg-white"
            >
              <p className="text-lg italic text-gray-800">
                “{feedback.message}”
              </p>
              <footer className="mt-4 text-sm text-gray-600">
                — {feedback.username}
              </footer>
            </blockquote>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`px-3 py-1 rounded border cursor-pointer border-gray-300 text-gray-600 hover:bg-gray-100 ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &larr; Prev
        </button>
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white text-sm font-medium">
          {page} / {totalPages || 1}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded border cursor-pointer border-gray-300 text-gray-600 hover:bg-gray-100 ${
            page === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};
