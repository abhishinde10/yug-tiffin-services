const express = require('express');
const router = express.Router();
const {
  getMenus,
  getTodayMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} = require('../controllers/menuController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// Must be defined before /:id
router.route('/today')
  .get(getTodayMenu); // Public access

router.route('/')
  .get(protect, getMenus) // Students and Admins can view
  .post(protect, admin, createMenu); // Only admins can create

router.route('/:id')
  .put(protect, admin, updateMenu) // Only admins can update
  .delete(protect, admin, deleteMenu); // Only admins can delete

module.exports = router;
