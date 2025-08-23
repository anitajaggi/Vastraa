import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/authSlice";
import categoryReducer from "../Features/category/categorySlice";
import subcategoryReducer from "../Features/category/subcatSlice";
import userReducer from "../Features/Auth/userSlice";
import contactReducer from "../Features/contact/contactSlice";
import subscribeReducer from "../Features/subscribe/subSlice";
import feedbackReducer from "../Features/feedback/feedbackSlice";
import productReducer from "../Features/products/productSlice";
import wishlistReducer from "../Features/wishlist/wishlistSlice";
import cartReducer from "../Features/cart/cartSlice";
import orderReducer from "../Features/checkout/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productReducer,
    subcategories: subcategoryReducer,
    users: userReducer,
    contacts: contactReducer,
    subscribe: subscribeReducer,
    feedback: feedbackReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});
