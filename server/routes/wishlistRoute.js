import express from "express";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", isAuthenticated, getWishlist);
router.post("/:productId", isAuthenticated, addToWishlist);
router.delete("/:productId", isAuthenticated, removeFromWishlist);

export default router;
