const express = require('express');
const router = express.Router();
const {
  getAdminDashboard,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/adminController');
const { getBills } = require('../controllers/billingController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// Dashboard
router.get('/dashboard', protect, admin, getAdminDashboard);

// Manage Students
router.route('/students')
  .get(protect, admin, getStudents);

router.post('/add-student', protect, admin, addStudent);
router.put('/update-student/:id', protect, admin, updateStudent);
router.delete('/delete-student/:id', protect, admin, deleteStudent);

// Manage Bills
router.get('/bills', protect, admin, getBills);

module.exports = router;
