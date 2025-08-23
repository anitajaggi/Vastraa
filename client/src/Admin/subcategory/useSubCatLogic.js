import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMultipleSubCategories,
  deleteSubCategory,
  getLimitedSubCategories,
} from "../../Features/category/subcatThunk";

export const useSubCatLogic = () => {
  const dispatch = useDispatch();

  // Redux state
  const { subcategories, currentPage, totalPages, loading } = useSelector(
    (state) => state.subcategories
  );

  // Local state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [isMultiConfirmOpen, setIsMultiConfirmOpen] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 10;

  const refreshSubCategories = (pageToFetch) => {
    dispatch(getLimitedSubCategories({ page: pageToFetch, limit }));
  };

  useEffect(() => {
    refreshSubCategories(page);
  }, [dispatch, page, limit]);

  // Handle clicking delete
  const handleDeleteClick = (id) => {
    setSubcategoryToDelete(id);
    setIsConfirmOpen(true);
  };

  // Handle confirming deletion
  const handleDeleteConfirm = async () => {
    if (!subcategoryToDelete) return;

    const res = await dispatch(deleteSubCategory(subcategoryToDelete));
    if (deleteSubCategory.fulfilled.match(res)) {
      if (subcategories.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        refreshSubCategories(page);
      }
    }

    setIsConfirmOpen(false);
    setSubcategoryToDelete(null);
  };

  // Handle selecting subcategories for bulk actions
  const handleCheckboxChange = (id) => {
    setSelectedSubcategories((prev) =>
      prev.includes(id)
        ? prev.filter((subCatId) => subCatId !== id)
        : [...prev, id]
    );
  };

  // Toggle all message selection
  const handleSelectAll = () => {
    const allIds = subcategories.map((subCat) => subCat._id);
    setSelectedSubcategories((prev) =>
      prev.length === subcategories.length ? [] : allIds
    );
  };

  const handleBulkDelete = () => {
    if (selectedSubcategories.length === 0) return;
    setIsMultiConfirmOpen(true);
  };

  const handleBulkDeleteConfirm = async () => {
    const res = await dispatch(
      deleteMultipleSubCategories(selectedSubcategories)
    );

    if (deleteMultipleSubCategories.fulfilled.match(res)) {
      setSelectedSubcategories([]);
      if (subcategories.length === selectedSubcategories.length && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        refreshSubCategories(page);
      }
    }
    setIsMultiConfirmOpen(false);
  };

  return {
    subcategories,
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
    selectedSubcategories,
    isMultiConfirmOpen,
    setIsMultiConfirmOpen,
    handleBulkDelete,
    handleBulkDeleteConfirm,
  };
};
