import Admission from "../models/Admission.js";

export const createAdmission = async (req, res) => {
  try {
    const { childName, parentName, phone, email, age, message } = req.body;

    const admission = await Admission.create({
      childName,
      parentName,
      phone,
      email,
      age,
      message,
    });

    res.status(201).json({
      message: "Admission submitted successfully",
      admission,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAdmissions = async (req, res) => {
  try {
    const data = await Admission.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAdmission = async (req, res) => {
  try {
    await Admission.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};