import express from "express";
import {
  createContact,
  deleteContact,
  deleteMultipleContacts,
  getContacts,
} from "../controllers/contactController.js";

import { isAuthenticated, isAdmin } from "../middlewares/auth.js";
import { validateContact } from "../validations/contactValidation.js";

const router = express.Router();

router.post("/bulk-delete", isAuthenticated, isAdmin, deleteMultipleContacts);

router.get("/", isAuthenticated, isAdmin, getContacts);

router.delete("/:contactId", isAuthenticated, isAdmin, deleteContact);

router.post("/", validateContact, createContact);

export default router;
