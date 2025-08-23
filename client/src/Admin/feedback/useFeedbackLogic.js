import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  approveReview,
  deleteFeedback,
  deleteMultipleFeedbacks,
  fetchFeeds,
} from "../../Features/feedback/feedbackThunk";

export const useFeedbackLogic = () => {
  const dispatch = useDispatch();

  const { feedbacks, currentPage, totalPages, loading } = useSelector(
    (state) => state.feedback
  );

  const [page, setPage] = useState(1);
  const [selectedFeedbacks, setSelectedFeedbacks] = useState([]);

  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isMultiConfirmOpen, setIsMultiConfirmOpen] = useState(false);

  const limit = 10;

  const refreshFeedbacks = (pageToFetch) => {
    dispatch(fetchFeeds({ page: pageToFetch, limit }));
  };

  useEffect(() => {
    refreshFeedbacks(page);
  }, [dispatch, page, limit]);

  // Handle single feedback deletion
  const handleDeleteClick = (id) => {
    setFeedbackToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!feedbackToDelete) return;

    const res = await dispatch(deleteFeedback(feedbackToDelete));
    setIsConfirmOpen(false);
    setFeedbackToDelete(null);

    if (deleteFeedback.fulfilled.match(res)) {
      if (feedbacks.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        refreshFeedbacks(page);
      }
    }
  };

  // Select/deselect individual feedback
  const handleCheckboxChange = (id) => {
    setSelectedFeedbacks((prev) =>
      prev.includes(id) ? prev.filter((feedId) => feedId !== id) : [...prev, id]
    );
  };

  // Toggle all feedback selection
  const handleSelectAll = () => {
    const allIds = feedbacks.map((feed) => feed._id);
    setSelectedFeedbacks((prev) =>
      prev.length === feedbacks.length ? [] : allIds
    );
  };

  // Bulk delete setup
  const handleBulkDelete = () => {
    if (selectedFeedbacks.length === 0) return;
    setIsMultiConfirmOpen(true);
  };

  const handleBulkDeleteConfirm = async () => {
    const res = await dispatch(deleteMultipleFeedbacks(selectedFeedbacks));

    if (deleteMultipleFeedbacks.fulfilled.match(res)) {
      setSelectedFeedbacks([]);

      // Refresh feedbacks after bulk delete
      if (feedbacks.length === selectedFeedbacks.length && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        refreshFeedbacks(page);
      }
    }

    setIsMultiConfirmOpen(false);
  };

  // Toggle approve review
  const handleToggleReview = async (id, newStatus) => {
    try {
      const res = await dispatch(approveReview({ id, approved: newStatus }));
      if (approveReview.fulfilled.match(res)) {
        refreshFeedbacks(page);
      }
    } catch (err) {
      console.error("Failed to approve", err);
    }
  };

  return {
    feedbacks,
    currentPage,
    totalPages,
    loading,
    page,
    setPage,
    selectedFeedbacks,
    isConfirmOpen,
    isMultiConfirmOpen,
    setIsConfirmOpen,
    setIsMultiConfirmOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCheckboxChange,
    handleSelectAll,
    handleBulkDelete,
    handleBulkDeleteConfirm,
    handleToggleReview,
  };
};
