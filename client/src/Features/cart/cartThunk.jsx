// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axiosApi from "../../api/api";
// import { toast } from "react-toastify";

// // Fetch cart from session
// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axiosApi.get("/cart", { withCredentials: true });
//       console.log(data);

//       return data.cart || [];
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Error fetching cart 😐"
//       );
//     }
//   }
// );

// // Add to cart
// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async ({ productId, size, color, quantity }, { rejectWithValue }) => {
//     try {
//       const { data } = await axiosApi.post(
//         "/cart",
//         { productId, size, color, quantity },
//         { withCredentials: true }
//       );
//       toast.success(data?.message || "Added to cart!");
//       return data.cart || [];
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error adding to cart 😐");
//       return rejectWithValue(
//         error.response?.data?.message || "Error adding to cart 😐"
//       );
//     }
//   }
// );

// // Remove from cart
// export const removeFromCart = createAsyncThunk(
//   "cart/removeFromCart",
//   async ({ productId, size, color }, { rejectWithValue }) => {
//     try {
//       const { data } = await axiosApi.delete("/cart", {
//         data: { productId, size, color },
//         withCredentials: true,
//       });
//       toast.success("Product removed from cart successfully!");
//       return data.cart || [];
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Error removing from cart 😐"
//       );
//       return rejectWithValue(
//         error.response?.data?.message || "Error removing from cart 😐"
//       );
//     }
//   }
// );

// // Update quantity
// export const updateCartQty = createAsyncThunk(
//   "cart/updateCartQty",
//   async ({ productId, size, color, quantity }, { rejectWithValue }) => {
//     try {
//       const res = await axiosApi.put("/cart", {
//         productId,
//         size,
//         color,
//         quantity,
//       });
//       toast.success(res.data?.message);
//       return res.data.cart || [];
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Error updating cart 😐"
//       );
//     }
//   }
// );
