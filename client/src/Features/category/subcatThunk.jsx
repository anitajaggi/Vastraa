import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../api/api";
import { toast } from "react-toastify";

export const createSubCategory = createAsyncThunk(
  "subcategory/createSubCategory",
  async (subcategory, { rejectWithValue }) => {
    try {
      const res = await axiosApi.post("/subcategories", subcategory);
      toast.success(res.data.message || "Subcategory created successfully 😎");
      return res.data;
    } catch (err) {
      if (err.response?.data?.errors) {
        return rejectWithValue({ fieldErrors: err.response.data.errors });
      }
      toast.error(err.response?.data?.message || "Error creating subcategory");
      return rejectWithValue(err.message || "Error creating subcategory");
    }
  }
);

export const getLimitedSubCategories = createAsyncThunk(
  "subcategory/getLimitedSubCategories",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await axiosApi.get(
        `/subcategories?page=${page}&limit=${limit}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || "Error fetching subcategories");
    }
  }
);

export const updateSubCategory = createAsyncThunk(
  "subcategory/updateSubCategory",
  async ({ subcategoryId, subcategory }, { rejectWithValue }) => {
    try {
      const res = await axiosApi.put(
        `/subcategories/${subcategoryId}`,
        subcategory
      );
      toast.success(res.data.message || "Subcategory updated successfully 😎");
      return res.data;
    } catch (err) {
      if (err.response && err.response.data.errors) {
        return rejectWithValue({ fieldErrors: err.response.data.errors });
      }
      toast.error(
        err.response?.data?.message || "Error updating subcategory 😎"
      );
      return rejectWithValue(err.message || "Error updating subcategory");
    }
  }
);

export const getAllSubCategories = createAsyncThunk(
  "subcategory/getAllSubCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axiosApi.get("/subcategories/allSubCategories");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteSubCategory = createAsyncThunk(
  "subcategory/deleteSubCategory",
  async (subCategoryId, { rejectWithValue }) => {
    try {
      const res = await axiosApi.delete(`/subcategories/${subCategoryId}`);
      toast.success(res.data.message || "Subcategory deleted successfully 😎");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || "Error deleting subcategory");
    }
  }
);

export const deleteMultipleSubCategories = createAsyncThunk(
  "subcategory/deleteMultipleSubCategories",
  async (ids, { rejectWithValue }) => {
    try {
      const res = await axiosApi.post("/subcategories/bulk-delete", {
        ids,
      });
      toast.success(
        res.data.message || "Subcategories deleted successfully 😎"
      );
      return ids;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Bulk delete failed"
      );
    }
  }
);
