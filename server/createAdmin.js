import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash("123456", 10);

    // 👤 Create admin
    const admin = await Admin.create({
      email: "jitesh@gmail.com",
      password: hashedPassword,
    });

    console.log("✅ Admin created successfully:");
    console.log(admin);

    process.exit();
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();