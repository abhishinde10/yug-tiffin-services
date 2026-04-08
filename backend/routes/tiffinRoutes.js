const express = require('express');
const router = express.Router();
const { 
  addStudent, 
  getStudents, 
  deleteStudent, 
  getDailyRecords, 
  giveTiffin, 
  receiveTiffin 
} = require('../controllers/tiffinController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// Student CRD
router.post('/students', protect, admin, addStudent);
router.get('/students', protect, admin, getStudents);
router.delete('/students/:id', protect, admin, deleteStudent);

// Records
router.get('/records', protect, admin, getDailyRecords);

// Actions
router.put('/:id/give', protect, admin, giveTiffin);
router.put('/:id/receive', protect, admin, receiveTiffin);

module.exports = router;
