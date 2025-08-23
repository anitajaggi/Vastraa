import express from "express";

import { isAuthenticated, isAdmin } from "../middlewares/auth.js";
import { validateFeedback } from "../validations/feedbackValidation.js";
import {
  approveReview,
  createFeedback,
  deleteFeedback,
  deleteMultipleFeedback,
  getFeedback,
} from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/bulk-delete", isAuthenticated, isAdmin, deleteMultipleFeedback);

router.put("/:id/approve", isAuthenticated, isAdmin, approveReview);

router.get("/", getFeedback);

router.delete("/:feedId", isAuthenticated, isAdmin, deleteFeedback);

router.post("/", validateFeedback, createFeedback);

export default router;
