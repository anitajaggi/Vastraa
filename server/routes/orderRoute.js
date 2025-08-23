import express from "express";
import {
  getLimitedOrders,
  getUserOrders,
  placeOrder,
  updateStatus,
} from "../controllers/orderController.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", isAuthenticated, placeOrder);

router.get("/my-orders", isAuthenticated, getUserOrders);

router.put("/:id/status", isAuthenticated, isAdmin, updateStatus);

router.get("/", isAuthenticated, isAdmin, getLimitedOrders);

export default router;
