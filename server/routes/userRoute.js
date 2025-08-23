import express from "express";
import {
  currentUser,
  deleteMultipleUsers,
  deleteUserById,
  getLimitedUsers,
  login,
  logout,
  register,
  updateProfile,
  updateUserById,
} from "../controllers/userController.js";
import {
  validateLogin,
  validateRegister,
} from "../validations/userValidation.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//public routes
router.post("/login", validateLogin, login);
router.post("/", validateRegister, register);
router.get("/logout", logout);

router
  .route("/profile")
  .get(isAuthenticated, currentUser)
  .put(isAuthenticated, updateProfile);

//admin routes
router.post("/bulk-delete", isAuthenticated, isAdmin, deleteMultipleUsers);

router.get("/", isAuthenticated, isAdmin, getLimitedUsers);

router
  .route("/:id")
  .put(isAuthenticated, isAdmin, updateUserById)
  .delete(isAuthenticated, isAdmin, deleteUserById);

export default router;
