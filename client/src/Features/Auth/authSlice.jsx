import { createSlice } from "@reduxjs/toolkit";
import {
  currentUser,
  editProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "./authThunk";

const initialState = {
  user: null,
  isAuthenticated: false,
  fieldErrors: {},
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearFieldError: (state, action) => {
      delete state.fieldErrors?.[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      //login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.fieldErrors = {};
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.fieldErrors = action.payload?.fieldErrors || {};
      })
      //current user
      .addCase(currentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      //register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.fieldErrors = {};
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.fieldErrors = action.payload?.fieldErrors || {};
      })
      //logout user
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      //Edit Profile
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || action.payload;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFieldError } = authSlice.actions;
export default authSlice.reducer;
