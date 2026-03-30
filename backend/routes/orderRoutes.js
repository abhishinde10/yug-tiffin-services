const express = require('express');
const router = express.Router();
const {
  getOrders,
  updateOrder,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.route('/')
  .get(protect, admin, getOrders); // Admin sees all orders

router.route('/:id')
  .put(protect, admin, updateOrder); // Admin updates order status

module.exports = router;
