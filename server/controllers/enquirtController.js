export const createEnquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const enquiry = new Enquiry({ name, email, message });
    await enquiry.save();
    res.status(201).json({ message: "Enquiry created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    await Enquiry.findByIdAndDelete(id);
    res.json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};  