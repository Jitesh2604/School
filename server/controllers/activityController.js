import Activity from "../models/Activity.js";

// ✅ GET all
export const getActivities = async (req, res) => {
  const data = await Activity.find().sort({ createdAt: -1 });
  res.json(data);
};

// ✅ CREATE
export const createActivity = async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch {
    res.status(500).json({ message: "Error creating activity" });
  }
};

// ✅ UPDATE
export const updateActivity = async (req, res) => {
  try {
    const updated = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Error updating" });
  }
};

// ✅ DELETE
export const deleteActivity = async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting" });
  }
};