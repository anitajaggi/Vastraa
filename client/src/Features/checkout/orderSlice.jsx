import { createSlice } from "@reduxjs/toolkit";
import {
  getLimitedOrders,
  getUserOrders,
  placeOrder,
  updateOrderStatus,
} from "./orderThunk";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    orders: [],
    currentPage: 1,
    totalPages: 1,
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to place order";
      })

      .addCase(getLimitedOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLimitedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data || [];
        state.currentPage = action.payload.currentPage || 1;
        state.totalPages = action.payload.totalPages || 1;
        state.total = action.payload.total || 0;
      })
      .addCase(getLimitedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch orders";
      })

      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload || [];
        state.total = action.payload.total || 0;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user orders";
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.orders.findIndex((o) => o._id === action.payload._id);
        if (idx !== -1) state.orders[idx] = action.payload;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
