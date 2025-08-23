import express from "express";
import {
  addToCart,
  updateCartQty,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", isAuthenticated, addToCart);
router.get("/", isAuthenticated, getCart);
router.delete("/:productId", isAuthenticated, removeFromCart);
router.put("/update-quantity", isAuthenticated, updateCartQty);

export default router;
