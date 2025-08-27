import { createSlice } from "@reduxjs/toolkit";
import { getCartFromCookies, saveCartToCookies } from "../../utils/cartHelper";
import { fetchCartDetails } from "../products/productThunk";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getCartFromCookies(),
    loading: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const { productId, size, color, quantity } = action.payload;

      if (!productId || !size || !color || !quantity) return;

      const existing = state.items.find(
        (item) =>
          item.productId === productId &&
          item.size === size &&
          item.color === color
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ productId, size, color, quantity });
      }

      saveCartToCookies(state.items);
    },

    removeFromCart: (state, action) => {
      const { productId, size, color } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.size === size &&
            item.color === color
          )
      );
      saveCartToCookies(state.items);
    },

    updateCartQty: (state, action) => {
      const { productId, size, color, quantity } = action.payload;
      state.items = state.items.map((item) =>
        item.productId === productId &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity }
          : item
      );
      saveCartToCookies(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveCartToCookies([]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartDetails.fulfilled, (state, action) => {
        state.items = action.payload;

        // save minimal info to cookie
        saveCartToCookies(
          state.items.map((item) => ({
            productId: item.productId,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
          }))
        );

        state.loading = false;
      })

      .addCase(fetchCartDetails.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addToCart, removeFromCart, updateCartQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
