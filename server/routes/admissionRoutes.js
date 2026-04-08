import express from "express";
import {
  createAdmission,
  getAdmissions,
  deleteAdmission,
} from "../controllers/admissionController.js";

import { authMiddleware } from "../middleware/authMiddleware.js"; 

const router = express.Router();

// PUBLIC → form submit
router.post("/", createAdmission);

// PROTECTED → admin only
router.get("/", authMiddleware, getAdmissions);
router.delete("/:id", authMiddleware, deleteAdmission);

export default router;