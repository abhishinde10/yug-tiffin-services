const express = require("express");
const router = express.Router();
const { sendFeedback, getAllFeedbacks } = require("../controllers/contactController");
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.post("/feedback", protect, sendFeedback);
router.get("/all", protect, admin, getAllFeedbacks);

router.put("/:id/review", protect, admin, async (req, res) => {
  try {
    const ContactFeedback = require("../models/ContactFeedback");
    const feedback = await ContactFeedback.findByIdAndUpdate(
      req.params.id,
      { isReviewed: true },
      { new: true }
    );

    res.json({ success: true, feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const ContactFeedback = require("../models/ContactFeedback");
    await ContactFeedback.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
