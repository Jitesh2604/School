import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    src: { type: String, required: true },
    alt: { type: String, default: "Gallery image" },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);