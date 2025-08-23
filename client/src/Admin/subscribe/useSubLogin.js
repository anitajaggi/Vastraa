import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMultipleSubscribers,
  deleteSubscriber,
  getLimitedSubscribers,
} from "../../Features/subscribe/subsThunk";

export const useSubsLogic = () => {
  const dispatch = useDispatch();

  const { subscribers, currentPage, totalPages, loading } = useSelector(
    (state) => state.subscribe
  );

  const [page, setPage] = useState(1);
  const [selectedSubs, setSelectedSubs] = useState([]);

  const [subsToDelete, setSubsToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isMultiConfirmOpen, setIsMultiConfirmOpen] = useState(false);

  const limit = 10;

  const refreshSubscribers = (pageToFetch) => {
    dispatch(getLimitedSubscribers({ page: pageToFetch, limit }));
  };

  useEffect(() => {
    refreshSubscribers(page);
  }, [dispatch, page, limit]);

  // Handle single subscriber deletion
  const handleDeleteClick = (id) => {
    setSubsToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!subsToDelete) return;

    const res = await dispatch(deleteSubscriber(subsToDelete));
    setIsConfirmOpen(false);
    setSubsToDelete(null);

    // Go back a page if last subscriber on current page is deleted
    if (deleteSubscriber.fulfilled.match(res)) {
      if (subscribers.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        refreshSubscribers(page);
      }
    }
  };

  // Select/deselect individual subscriber
  const handleCheckboxChange = (id) => {
    setSelectedSubs((prev) =>
      prev.includes(id) ? prev.filter((msgId) => msgId !== id) : [...prev, id]
    );
  };

  // Toggle all subscriber selection
  const handleSelectAll = () => {
    const allIds = subscribers.map((msg) => msg._id);
    setSelectedSubs((prev) =>
      prev.length === subscribers.length ? [] : allIds
    );
  };

  // Bulk delete setup
  const handleBulkDelete = () => {
    if (selectedSubs.length === 0) return;
    setIsMultiConfirmOpen(true);
  };

  const handleBulkDeleteConfirm = async () => {
    const res = await dispatch(deleteMultipleSubscribers(selectedSubs));

    if (deleteMultipleSubscribers.fulfilled.match(res)) {
      setSelectedSubs([]);

      // Refresh subscribe after bulk delete
      if (subscribers.length === selectedSubs.length && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        refreshSubscribers(page);
      }
    }

    setIsMultiConfirmOpen(false);
  };

  return {
    subscribers,
    currentPage,
    totalPages,
    loading,
    page,
    setPage,
    selectedSubs,
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
  };
};
