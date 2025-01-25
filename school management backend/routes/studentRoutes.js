const express = require('express');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes
router.use(authMiddleware);

// Get all students
router.get('/', studentController.getAllStudents);

// Add a student
router.post('/', studentController.addStudent);

module.exports = router;