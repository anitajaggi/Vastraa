import express from "express";
import {
  createSubs,
  deleteMultipleSubs,
  deleteSubscriber,
  getLimitedSubs,
} from "../controllers/newsletterController.js";
import { validateSubs } from "../validations/newslerrterValidation.js";

const router = express.Router();

router.post("/bulk-delete", deleteMultipleSubs);

router.post("/", validateSubs, createSubs);

router.get("/", getLimitedSubs);

router.delete("/:subId", deleteSubscriber);

export default router;
