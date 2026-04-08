import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    childName: { type: String, required: true },
    parentName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: String, required: true }, // string because "2-3", "3-4"
    message: { type: String }, // optional
  },
  { timestamps: true }
);

export default mongoose.model("Admission", admissionSchema);