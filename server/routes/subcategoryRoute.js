import express from "express";
import { validateSubCat } from "../validations/validateSubCat.js";
import {
  createSubCategory,
  deleteMultipleSubCategories,
  deleteSubCategory,
  getAllSubCategories,
  getLimitedSubCategories,
  updateSubCategory,
} from "../controllers/subCatController.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/allSubCategories", getAllSubCategories);

router.post("/bulk-delete", deleteMultipleSubCategories);

router.post("/", validateSubCat, createSubCategory);

router.get("/", isAuthenticated, isAdmin, getLimitedSubCategories);

router.put("/:subCategoryId", validateSubCat, updateSubCategory);

router.delete("/:subCategoryId", deleteSubCategory);

export default router;
