const mongoose = require("mongoose");

const contactFeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  message: { type: String, required: true },
  isReviewed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ContactFeedback", contactFeedbackSchema);
