import { createSlice } from "@reduxjs/toolkit";
import {
  approveReview,
  deleteFeedback,
  deleteMultipleFeedbacks,
  fetchFeeds,
  sendFeedback,
} from "./feedbackThunk";

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    loading: false,
    feedbacks: [],
    error: null,
    fieldErrors: {},
    currentPage: 1,
    totalPages: 1,
    totalFeedbacks: 0,
  },
  reducers: {
    clearFieldError: (state, action) => {
      delete state.fieldErrors?.[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle sending feedback messages
      .addCase(sendFeedback.pending, (state) => {
        state.loading = true;
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(sendFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks.push(action.payload);
        state.fieldErrors = {};
      })
      .addCase(sendFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.fieldErrors = action.payload?.fieldErrors || {};
      })

      // Handle fetching feedbacks (with pagination support)
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload.feedbacks || [];
        state.currentPage = action.payload.currentPage || 1;
        state.totalPages = action.payload.totalPages || 1;
        state.totalFeedbacks = action.payload.totalFeedbacks || 0;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle deleting a feedback
      .addCase(deleteFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = state.feedbacks.filter(
          (feedback) => feedback._id !== action.payload
        );
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle deleting multiple feedback
      .addCase(deleteMultipleFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMultipleFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = state.feedbacks.filter(
          (contact) => !action.payload.includes(contact._id)
        );
      })
      .addCase(deleteMultipleFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle approve review
      .addCase(approveReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveReview.fulfilled, (state, action) => {
        const updated = action.payload.feedback;
        const index = state.feedbacks.findIndex((a) => a._id === updated._id);
        if (index !== -1) {
          state.feedbacks[index].approved = updated.approved;
        }
      })
      .addCase(approveReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default feedbackSlice.reducer;
export const { clearFieldError } = feedbackSlice.actions;
