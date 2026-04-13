import express from "express";
import Gallery from "../models/Gallery.js";

const router = express.Router();

// ✅ GET all images
router.get("/", async (req, res) => {
  const images = await Gallery.find().sort({ createdAt: -1 });
  res.json(images);
});

// ✅ ADD image
router.post("/", async (req, res) => {
  const { src, alt, category } = req.body;

  const newImage = new Gallery({ src, alt, category });
  await newImage.save();

  res.json(newImage);
});

// ✅ DELETE image
router.delete("/:id", async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

export default router;