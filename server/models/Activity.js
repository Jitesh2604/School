import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    category: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);