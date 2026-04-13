import express from "express";
import {
  getGallery,
  createGallery,
  deleteGallery,
} from "../controllers/galleryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: get gallery images
router.get("/", getGallery);

// Protected: admin-only gallery management
router.post("/", authMiddleware, createGallery);
router.delete("/:id", authMiddleware, deleteGallery);

export default router;
