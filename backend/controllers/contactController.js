const ContactFeedback = require("../models/ContactFeedback");

// SUBMIT FEEDBACK
const sendFeedback = async (req, res) => {
  try {
    console.log("REQUEST:", req.body);

    const { name, mobile, message } = req.body;

    if (!name || !mobile || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    const feedback = await ContactFeedback.create({
      name,
      mobile,
      message
    });

    console.log("SAVED:", feedback);

    return res.status(200).json({
      success: true,
      message: "Feedback submitted successfully"
    });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// GET ALL FEEDBACKS
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await ContactFeedback.find().sort({ createdAt: -1 });
    return res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { sendFeedback, getAllFeedbacks };
