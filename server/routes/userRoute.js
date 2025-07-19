import express from "express";
import {
  currentUser,
  getAllUsers,
  login,
  logout,
  register,
  updateProfile,
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
router.get("/", isAuthenticated, isAdmin, getAllUsers);

export default router;
