import { createSlice } from "@reduxjs/toolkit";
import {
  createSubs,
  deleteMultipleSubscribers,
  deleteSubscriber,
  getLimitedSubscribers,
} from "./subsThunk";

const subscribeSlice = createSlice({
  name: "subscribe",
  initialState: {
    loading: false,
    subscribers: [],
    error: null,
    fieldErrors: {},
    currentPage: 1,
    totalPages: 1,
    totalSubscribers: 0,
  },
  reducers: {
    clearFieldError: (state, action) => {
      delete state.fieldErrors?.[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createSubs.pending, (state) => {
        state.loading = true;
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(createSubs.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribers.push(action.payload);
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(createSubs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.fieldErrors = action.payload?.fieldErrors || {};
      })
      // GET Limited subscribers
      .addCase(getLimitedSubscribers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLimitedSubscribers.fulfilled, (state, action) => {
        const { data, total, currentPage, totalPages } = action.payload;
        state.loading = false;
        state.subscribers = data;
        state.totalSubscribers = total;
        state.currentPage = currentPage;
        state.totalPages = totalPages;
        state.error = null;
      })
      .addCase(getLimitedSubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // DELETE
      .addCase(deleteSubscriber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubscriber.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribers = state.subscribers.filter(
          (category) => category._id !== action.payload._id
        );
      })
      .addCase(deleteSubscriber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // bulk delete
      .addCase(deleteMultipleSubscribers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMultipleSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribers = state.subscribers.filter(
          (category) => !action.payload.includes(category._id)
        );
      })
      .addCase(deleteMultipleSubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFieldError } = subscribeSlice.actions;
export default subscribeSlice.reducer;
