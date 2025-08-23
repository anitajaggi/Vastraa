import { createSlice } from "@reduxjs/toolkit";
import {
  createSubCategory,
  deleteMultipleSubCategories,
  deleteSubCategory,
  getAllSubCategories,
  getLimitedSubCategories,
  updateSubCategory,
} from "./subcatThunk";

const subcategorySlice = createSlice({
  name: "subcategory",
  initialState: {
    loading: false,
    subcategories: [],
    allSubcategories: [],
    error: null,
    fieldErrors: {},
    currentPage: 1,
    totalPages: 1,
    totalSubcategories: 0,
  },
  reducers: {
    clearFieldError: (state, action) => {
      delete state.fieldErrors?.[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createSubCategory.pending, (state) => {
        state.loading = true;
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories.push(action.payload);
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(createSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.fieldErrors = action.payload?.fieldErrors || {};
      })
      // GET ALL
      .addCase(getAllSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.allSubcategories = action.payload.subcategories;
      })
      .addCase(getAllSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET LIMITED
      .addCase(getLimitedSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLimitedSubCategories.fulfilled, (state, action) => {
        const { data, total, currentPage, totalPages } = action.payload;
        state.loading = false;
        state.subcategories = data;
        state.totalSubcategories = total;
        state.currentPage = currentPage;
        state.totalPages = totalPages;
      })
      .addCase(getLimitedSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE SINGLE
      .addCase(deleteSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = state.subcategories.filter(
          (subcategory) => subcategory._id !== action.payload._id
        );
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateSubCategory.pending, (state) => {
        state.loading = true;
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.subcategories.findIndex(
          (subcategory) => subcategory._id === action.payload._id
        );
        if (index !== -1) {
          state.subcategories[index] = action.payload;
        }
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(updateSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.fieldErrors = action.payload?.fieldErrors || {};
      })

      // BULK DELETE
      .addCase(deleteMultipleSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMultipleSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = state.subcategories.filter(
          (subcategory) => !action.payload.includes(subcategory._id)
        );
      })
      .addCase(deleteMultipleSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFieldError } = subcategorySlice.actions;
export default subcategorySlice.reducer;
