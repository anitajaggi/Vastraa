import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosApi from "../../api/api";

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/products", productData);
      toast.success("Product created successfully");
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.errors) {
        return rejectWithValue({ errors: error.response.data.errors });
      }
      toast.error(error.response?.data || "Error creating product");
      return rejectWithValue({
        message: error.response?.data || "Error creating product",
      });
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const res = await axiosApi.put(`/products/${productId}`, productData);
      toast.success(res.data.message || "Product updated successfully 😎");
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.errors) {
        return rejectWithValue({ fieldErrors: error.response.data.errors });
      }
      return rejectWithValue(error.message || "Error updating products");
    }
  }
);

export const getLimitedProducts = createAsyncThunk(
  "products/getLimitedProducts",
  async (
    { page = 1, limit = 10, categorySlug = "", subcategorySlug = "" },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams({
        page,
        limit,
        ...(categorySlug && { categorySlug }),
        ...(subcategorySlug && { subcategorySlug }),
      });

      const response = await axiosApi.get(`/products?${params.toString()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching products");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (prodId, { rejectWithValue }) => {
    try {
      const res = await axiosApi.delete(`/products/${prodId}`);
      toast.success(res.data.message || "Product deleted successfully 😎");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || "Error deleting product");
    }
  }
);

export const deleteMultipleProducts = createAsyncThunk(
  "products/deleteMultipleProducts",
  async (ids, { rejectWithValue }) => {
    try {
      const res = await axiosApi.post("/products/bulk-delete", {
        ids,
      });
      toast.success(res.data.message || "Products deleted successfully 😎");
      return ids;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Bulk delete failed"
      );
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await axiosApi.get(`/products/${slug}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);
