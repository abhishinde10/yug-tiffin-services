const express = require('express');
const router = express.Router();
const {
  getPayments,
  createPayment,
  updatePayment,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.route('/')
  .get(protect, getPayments)            // Students see their own, Admin sees all
  .post(protect, admin, createPayment); // Admin creates payment records

router.route('/:id')
  .put(protect, admin, updatePayment);  // Admin updates payment status

module.exports = router;
