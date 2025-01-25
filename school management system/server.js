const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'QwErTy098', // Replace with your MySQL password
  database: 'school_management'
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected');
});

// Routes
// Get all students
app.get('/students', (req, res) => {
  const sql = 'SELECT * FROM students';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Add a student
app.post('/students', (req, res) => {
  const { name, grade } = req.body;
  const sql = 'INSERT INTO students (name, grade) VALUES (?, ?)';
  db.query(sql, [name, grade], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Student added successfully' });
  });
});

// Add attendance
app.post('/attendance', (req, res) => {
  const { student_id, status, date } = req.body;
  const sql = 'INSERT INTO attendance (student_id, status, date) VALUES (?, ?, ?)';
  db.query(sql, [student_id, status, date], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Attendance recorded successfully' });
  });
});

// Add fee record
app.post('/fees', (req, res) => {
  const { student_id, amount, date } = req.body;
  const sql = 'INSERT INTO fees (student_id, amount, date) VALUES (?, ?, ?)';
  db.query(sql, [student_id, amount, date], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Fee recorded successfully' });
  });
});

// Add class schedule
app.post('/timetable', (req, res) => {
  const { class_name, class_time } = req.body;
  const sql = 'INSERT INTO timetable (class_name, class_time) VALUES (?, ?)';
  db.query(sql, [class_name, class_time], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Class added to timetable successfully' });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});