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

// Student CRD
router.post('/students', addStudent);
router.get('/students', getStudents);
router.delete('/students/:id', deleteStudent);

// Records
router.get('/records', getDailyRecords);

// Actions
router.put('/:id/give', giveTiffin);
router.put('/:id/receive', receiveTiffin);

module.exports = router;
