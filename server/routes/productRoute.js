import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { uploadImg } from "../middlewares/upload.js";
import { validateProduct } from "../validations/productValidation.js";
import {
  createProduct,
  deleteMultipleProducts,
  deleteProduct,
  getLimitedProducts,
  singleProduct,
  updateProduct,
} from "../controllers/productController.js";

const routes = express.Router();

routes.post("/bulk-delete", isAuthenticated, isAdmin, deleteMultipleProducts);

routes.post(
  "/",
  isAuthenticated,
  isAdmin,
  uploadImg,
  validateProduct,
  createProduct
);
routes.get("/", getLimitedProducts);
routes.get("/:slug", singleProduct);

routes.put(
  "/:proId",
  isAuthenticated,
  isAdmin,
  uploadImg,
  validateProduct,
  updateProduct
);

routes.delete("/:proId", isAuthenticated, isAdmin, deleteProduct);

export default routes;
