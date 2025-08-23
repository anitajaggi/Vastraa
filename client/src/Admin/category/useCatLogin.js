import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  deleteMultipleCategories,
  getLimitedCategories,
} from "../../Features/category/categoryThunk";

export const useCatLogin = () => {
  const dispatch = useDispatch();

  // Redux state
  const { categories, currentPage, totalPages, loading } = useSelector(
    (state) => state.categories
  );

  // Local state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isMultiConfirmOpen, setIsMultiConfirmOpen] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 10;

  const refreshCategories = (pageToFetch) => {
    dispatch(getLimitedCategories({ page: pageToFetch, limit }));
  };

  useEffect(() => {
    refreshCategories(page);
  }, [dispatch, page, limit]);

  // Handle clicking delete
  const handleDeleteClick = (id) => {
    setCategoryToDelete(id);
    setIsConfirmOpen(true);
  };

  // Handle confirming deletion
  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    const res = await dispatch(deleteCategory(categoryToDelete));
    if (deleteCategory.fulfilled.match(res)) {
      if (categories.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        refreshCategories(page);
      }
    }

    setIsConfirmOpen(false);
    setCategoryToDelete(null);
  };

  // Handle selecting categories for bulk actions
  const handleCheckboxChange = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  // Toggle all message selection
  const handleSelectAll = () => {
    const allIds = categories.map((cat) => cat._id);
    setSelectedCategories((prev) =>
      prev.length === categories.length ? [] : allIds
    );
  };

  const handleBulkDelete = () => {
    if (selectedCategories.length === 0) return;
    setIsMultiConfirmOpen(true);
  };

  const handleBulkDeleteConfirm = async () => {
    const res = await dispatch(deleteMultipleCategories(selectedCategories));

    if (deleteMultipleCategories.fulfilled.match(res)) {
      setSelectedCategories([]);
      if (categories.length === selectedCategories.length && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        refreshCategories(page);
      }
    }
    setIsMultiConfirmOpen(false);
  };

  return {
    categories,
    currentPage,
    totalPages,
    loading,
    page,
    limit,
    setPage,
    // single delete
    isConfirmOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    setIsConfirmOpen,
    // bulk actions
    handleCheckboxChange,
    handleSelectAll,
    selectedCategories,
    isMultiConfirmOpen,
    setIsMultiConfirmOpen,
    handleBulkDelete,
    handleBulkDeleteConfirm,
  };
};
