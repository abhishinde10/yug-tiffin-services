const express = require('express');
const router = express.Router();
const {
  getStudentDashboard,
  createParcel,
  submitFeedback,
} = require('../controllers/studentController');
const { getMenus } = require('../controllers/menuController');
const { getPayments } = require('../controllers/paymentController');
// Handle bills directly through /api/billing/
const { protect } = require('../middleware/authMiddleware');

// Dashboard
router.get('/dashboard', protect, getStudentDashboard);

// Menu (Students view menu)
router.get('/menu', protect, getMenus);

// Parcel
router.post('/parcel', protect, createParcel);

// Payments (Students view their own payments)
router.get('/payments', protect, getPayments);

// Handle bills directly through /api/billing/

// Feedback
router.post('/feedback', protect, submitFeedback);

module.exports = router;
