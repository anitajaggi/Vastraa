import { createSlice } from "@reduxjs/toolkit";
import { addToCart, getCart, removeFromCart, updateCartQty } from "./cartThunk";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload || [];
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Error adding to cart";
      })
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.items = action.payload || [];
        state.loading = false;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Error fetching cart";
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload || [];
        state.loading = false;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Error removing from cart";
      })
      .addCase(updateCartQty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartQty.fulfilled, (state, action) => {
        state.items = action.payload || [];
        state.loading = false;
      })
      .addCase(updateCartQty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Error updating cart quantity";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
