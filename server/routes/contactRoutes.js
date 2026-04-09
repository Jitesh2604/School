import express from "express";
import {
  createEnquiry,
  getEnquiries,
  deleteEnquiry,
  updateContactStatus
} from "../controllers/contactController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/", createEnquiry);

// Admin
router.get("/", authMiddleware, getEnquiries);
router.delete("/:id", authMiddleware, deleteEnquiry);
router.patch("/:id", authMiddleware, updateContactStatus);


export default router;