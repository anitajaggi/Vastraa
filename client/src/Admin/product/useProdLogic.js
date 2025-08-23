import { useDispatch, useSelector } from "react-redux";
import {
  deleteMultipleProducts,
  deleteProduct,
  getLimitedProducts,
} from "../../Features/products/productThunk";
import { useEffect, useState } from "react";

export const useProductLogic = () => {
  const dispatch = useDispatch();
  const { products, currentPage, totalPages, loading } = useSelector(
    (state) => state.products
  );

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isMultiConfirmOpen, setIsMultiConfirmOpen] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 10;

  const refreshProducts = (pageToFetch) => {
    dispatch(getLimitedProducts({ page: pageToFetch, limit }));
  };

  useEffect(() => {
    refreshProducts(page);
  }, [dispatch, page, limit]);

  // Handle clicking delete
  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setIsConfirmOpen(true);
  };

  // Handle confirming deletion
  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    const res = await dispatch(deleteProduct(productToDelete));
    if (deleteProduct.fulfilled.match(res)) {
      if (products.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        refreshProducts(page);
      }
    }

    setIsConfirmOpen(false);
    setProductToDelete(null);
  };

  const handleCheckboxChange = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((prodId) => prodId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allIds = products.map((product) => product._id);
    setSelectedProducts((prev) =>
      prev.length === products.length ? [] : allIds
    );
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) return;
    setIsMultiConfirmOpen(true);
  };

  const handleBulkDeleteConfirm = async () => {
    const res = await dispatch(deleteMultipleProducts(selectedProducts));

    if (deleteMultipleProducts.fulfilled.match(res)) {
      setSelectedProducts([]);
      if (products.length === selectedProducts.length && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        refreshProducts(page);
      }
    }
    setIsMultiConfirmOpen(false);
  };

  return {
    products,
    currentPage,
    totalPages,
    loading,
    setPage,
    page,
    limit,
    isConfirmOpen,
    setIsConfirmOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    isMultiConfirmOpen,
    setIsMultiConfirmOpen,
    handleCheckboxChange,
    handleSelectAll,
    selectedProducts,
    handleBulkDelete,
    handleBulkDeleteConfirm,
  };
};
