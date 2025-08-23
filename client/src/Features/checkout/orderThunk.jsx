import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosApi from "../../api/api";

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await axiosApi.post("/orders", orderData);
      toast.success(res.data.message || "Order placed successfully! 😀");
      return res.data.order;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error placing order");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getLimitedOrders = createAsyncThunk(
  "order/getLimitedOrders",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await axiosApi.get(`/orders?page=${page}&limit=${limit}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosApi.get("/orders/my-orders");
      return res.data.orders;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const res = await axiosApi.put(`/orders/${orderId}/status`, {
        status,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to update order"
      );
    }
  }
);
