const express = require('express');
const router = express.Router();
const {
  generateBills,
  createBill,
  getAllBills,
  getStudentBills,
  markBillPaid,
} = require('../controllers/billingController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.get('/all', protect, admin, getAllBills);
router.get('/student/:id', protect, getStudentBills);

router.post('/generate', protect, admin, generateBills); // Keeping for batch sync if ever needed
router.post('/create', protect, admin, createBill);
router.put('/:id/pay', protect, admin, markBillPaid);

module.exports = router;
