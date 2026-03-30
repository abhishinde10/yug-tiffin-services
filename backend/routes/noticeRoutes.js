const express = require('express');
const router = express.Router();
const {
  getNotices,
  createNotice,
} = require('../controllers/noticeController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.route('/')
  .get(protect, getNotices)            // Students and admins can view
  .post(protect, admin, createNotice); // Only admins can create

module.exports = router;
