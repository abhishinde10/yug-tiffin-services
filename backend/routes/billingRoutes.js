const express = require('express');
const router = express.Router();
const {
  generateBills,
  createBill,
  getBills,
  updateBill,
} = require('../controllers/billingController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.route('/')
  .get(protect, getBills);

router.post('/generate', protect, admin, generateBills); // Keeping for batch sync if ever needed
router.post('/create', protect, admin, createBill);
router.put('/:id/pay', protect, admin, updateBill);

module.exports = router;
