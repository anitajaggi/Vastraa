import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLimitedOrders,
  updateOrderStatus,
} from "../../Features/checkout/orderThunk";

export const useOrders = () => {
  const dispatch = useDispatch();

  const { orders, currentPage, totalPages, loading } = useSelector(
    (state) => state.orders
  );

  const [page, setPage] = useState(1);
  const limit = 10;

  const refreshOrders = (pageToFetch) => {
    dispatch(getLimitedOrders({ page: pageToFetch, limit }));
  };

  useEffect(() => {
    refreshOrders(page);
  }, [dispatch, page, limit]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await dispatch(
        updateOrderStatus({ orderId, status: newStatus })
      );
      if (updateOrderStatus.fulfilled.match(res)) {
        refreshOrders(page);
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return {
    orders,
    currentPage,
    totalPages,
    loading,
    page,
    limit,
    setPage,
    refreshOrders,
    handleStatusChange,
  };
};
