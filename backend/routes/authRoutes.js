const express = require('express');
const router = express.Router();
const {
  registerStudent,
  registerAdmin,
  loginUser,
} = require('../controllers/authController');

router.post('/register-student', registerStudent);
router.post('/register-admin', registerAdmin);
router.post('/login', loginUser);

module.exports = router;
