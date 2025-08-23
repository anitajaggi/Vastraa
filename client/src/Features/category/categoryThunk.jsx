import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosApi from "../../api/api";

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axiosApi.get("/categories/allCategories");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const res = await axiosApi.post("/categories", categoryData);
      toast.success(res.data.message || "Category created successfully 😎");
      return res.data;
    } catch (err) {
      if (err.response?.data?.errors) {
        return rejectWithValue({ fieldErrors: err.response.data.errors });
      }
      toast.error(err.response?.data?.message || "Error creating category");
      return rejectWithValue(err.message || "Error creating category");
    }
  }
);

export const getLimitedCategories = createAsyncThunk(
  "category/getLimitedCategories",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await axiosApi.get(`/categories?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || "Error fetching categories");
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const res = await axiosApi.delete(`/categories/${categoryId}`);
      toast.success(res.data.message || "Category deleted successfully 😎");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || "Error deleting category");
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ categoryId, category }, { rejectWithValue }) => {
    try {
      const res = await axiosApi.put(`/categories/${categoryId}`, category);
      toast.success(res.data.message || "Category updated successfully 😎");
      return res.data;
    } catch (err) {
      if (err.response && err.response.data.errors) {
        return rejectWithValue({ fieldErrors: err.response.data.errors });
      }
      toast.error(err.response?.data?.message || "Error updating category 😎");
      return rejectWithValue(err.message || "Error updating category");
    }
  }
);

export const deleteMultipleCategories = createAsyncThunk(
  "category/deleteMultipleCategories",
  async (ids, { rejectWithValue }) => {
    try {
      const res = await axiosApi.post("/categories/bulk-delete", {
        ids,
      });
      toast.success(res.data.message || "Categories deleted successfully 😎");
      return ids;
    } catch (err) {
      return rejectWithValue(
        error.response?.data?.message || "Bulk delete failed"
      );
    }
  }
);
