import express from "express";

import {
  createCategory,
  deleteCategory,
  deleteMultipleCategories,
  getAllCategories,
  getLimitedCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import { validateCategory } from "../validations/categoryValidation.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/allCategories", getAllCategories);

router.post("/bulk-delete", deleteMultipleCategories);

router.post("/", validateCategory, createCategory);

router.get("/", isAuthenticated, isAdmin, getLimitedCategories);

router.put("/:categoryId", validateCategory, updateCategory);

router.delete("/:categoryId", deleteCategory);

export default router;
