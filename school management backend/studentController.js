// studentController.js
const db = require('./db'); // Adjust the path as necessary

const getAllStudents = (req, res) => {
  const sql = 'SELECT * FROM students';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error fetching students' });
    res.json(result);
  });
};

const addStudent = (req, res) => {
  const { name, grade } = req.body;
  const sql = 'INSERT INTO students (name, grade) VALUES (?, ?)';
  db.query(sql, [name, grade], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error adding student' });
    res.status(201).json({ message: 'Student added successfully' });
  });
};

module.exports = { getAllStudents, addStudent };