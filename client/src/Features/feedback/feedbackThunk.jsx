import axiosApi from "../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const sendFeedback = createAsyncThunk(
  "feedback/sendFeedback",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/feedback", formData);
      toast.success(response.data.message || "Feedback sent successfully! 🚀");
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.errors) {
        return rejectWithValue({ fieldErrors: error.response.data.errors });
      }
      return rejectWithValue(
        error.response?.data?.message || "Error sending feedback"
      );
    }
  }
);

export const fetchFeeds = createAsyncThunk(
  "feedback/fetchFeeds",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(
        `/feedback?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching feedback"
      );
    }
  }
);

export const deleteFeedback = createAsyncThunk(
  "feedback/deleteFeedback",
  async (feedId, { rejectWithValue }) => {
    try {
      const response = await axiosApi.delete(`/feedback/${feedId}`);
      toast.success(
        response.data.message || "feedback deleted successfully! 🚀"
      );
      return feedId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting feedback"
      );
    }
  }
);

export const deleteMultipleFeedbacks = createAsyncThunk(
  "feedback/deleteMultipleFeedbacks",
  async (ids, { rejectWithValue }) => {
    try {
      const res = await axiosApi.post("/feedback/bulk-delete", {
        ids,
      });
      toast.success(res.data.message || "Feedbacks deleted successfully! 🚀");
      return ids;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Bulk delete failed"
      );
    }
  }
);

export const approveReview = createAsyncThunk(
  "feedback/approveReview",
  async ({ id, approved }, thunkAPI) => {
    try {
      const res = await axiosApi.put(`/feedback/${id}/approve`, { approved });
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
