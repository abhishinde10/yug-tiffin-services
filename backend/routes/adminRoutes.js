const express = require('express');
const router = express.Router();
const {
  getAdminDashboard,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/adminController');
// Removed getting bills here, handling it directly via billingRoutes
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

// Handle bills directly through /api/billing/

module.exports = router;
