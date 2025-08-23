import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteMultipleProducts,
  deleteProduct,
  getLimitedProducts,
  getSingleProduct,
  updateProduct,
} from "./productThunk";

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    singleProduct: null,
    error: null,
    fieldErrors: {},
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  },
  reducers: {
    clearFieldError: (state, action) => {
      delete state.fieldErrors?.[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.fieldErrors = action.payload.errors || {};
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.fieldErrors = action.payload?.fieldErrors || {};
      })
      // Get limited products
      .addCase(getLimitedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLimitedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalProducts = action.payload.total;
      })
      .addCase(getLimitedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // bulk delete
      .addCase(deleteMultipleProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMultipleProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => !action.payload.includes(product._id)
        );
      })
      .addCase(deleteMultipleProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Single Product
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFieldError } = productSlice.actions;
export default productSlice.reducer;
