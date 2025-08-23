import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../api/api";
import { toast } from "react-toastify";

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post(`/wishlist/${productId}`);
      toast.success("Product added to wishlist successfully!");
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error adding to wishlist 😐"
      );
      return rejectWithValue(
        error.response?.data?.message || "Error adding to wishlist 😐"
      );
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      await axiosApi.delete(`/wishlist/${productId}`);
      toast.success("Product removed from wishlist successfully!");
      return productId;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error removing from wishlist 😐"
      );
      return rejectWithValue(
        error.response?.data?.message || "Error removing from wishlist 😐"
      );
    }
  }
);

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/wishlist");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching wishlist 😐"
      );
    }
  }
);
