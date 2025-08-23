import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../api/api";
import { toast } from "react-toastify";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, size, color, quantity }, { rejectWithValue }) => {
    console.log("Adding to cart:", { productId, size, color, quantity });
    try {
      const res = await axiosApi.post("/cart", {
        productId,
        size,
        color,
        quantity,
      });
      toast.success(
        res.data.message || "Product added to cart successfully! 😀"
      );
      return res.data.cart.items;
    } catch (error) {
      toast.error(error.response.data.message || "Error adding to cart");
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosApi.get("/cart");
      return res.data.cart.items;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axiosApi.delete(`/cart/${productId}`);
      toast.success(
        res.data?.message || "Product removed from cart successfully! 😀"
      );
      return res.data.cart.items;
    } catch (error) {
      toast.error(error.response.data.message || "Error removing from cart");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartQty = createAsyncThunk(
  "cart/updateQty",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axiosApi.put("/cart/update-quantity", {
        productId,
        quantity,
      });
      toast.success(
        res.data?.message || "Cart quantity updated successfully! 😀"
      );
      return res.data.cart.items;
    } catch (error) {
      toast.error(
        error.response.data.message || "Error updating cart quantity"
      );
      return rejectWithValue(error.response.data);
    }
  }
);
