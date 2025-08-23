import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosApi from "../../api/api";

export const createSubs = createAsyncThunk(
  "subscribe/createSubs",
  async (category, { rejectWithValue }) => {
    try {
      const res = await axiosApi.post("/subscribe", category);
      toast.success(res.data.message || "Subscribed successfully 😎");
      return res.data;
    } catch (err) {
      if (err.response && err.response.data.errors) {
        return rejectWithValue({ fieldErrors: err.response.data.errors });
      }
      toast.error(err.response.data.message || "Error subscribing!");
      return rejectWithValue(err.message || "Error subscribing!");
    }
  }
);

export const getLimitedSubscribers = createAsyncThunk(
  "subscribe/getLimitedSubscribers",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await axiosApi.get(`/subscribe?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || "Error fetching categories");
    }
  }
);

export const deleteSubscriber = createAsyncThunk(
  "subscribe/deleteSubscriber",
  async (subId, { rejectWithValue }) => {
    try {
      const res = await axiosApi.delete(`/subscribe/${subId}`);
      toast.success(res.data.message || "Subscriber deleted successfully 😎");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || "Error deleting subscriber");
    }
  }
);

export const deleteMultipleSubscribers = createAsyncThunk(
  "subscribe/deleteMultipleSubscribers",
  async (ids, { rejectWithValue }) => {
    try {
      const res = await axiosApi.post("/subscribe/bulk-delete", {
        ids,
      });
      toast.success(res.data.message || "Subscribers deleted successfully 😎");
      return ids;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Bulk delete failed"
      );
    }
  }
);
