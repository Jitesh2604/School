import express from "express";
import {
  createAdmission,
  getAdmissions,
  deleteAdmission,
  updateAdmissionStatus
} from "../controllers/admissionController.js";

import { authMiddleware } from "../middleware/authMiddleware.js"; 

const router = express.Router();

// PUBLIC → form submit
router.post("/", createAdmission);

// PROTECTED → admin only
router.get("/", authMiddleware, getAdmissions);
router.delete("/:id", authMiddleware, deleteAdmission);
router.patch("/:id", authMiddleware, updateAdmissionStatus);

export default router;