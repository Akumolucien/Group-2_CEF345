// Attendance Management
const attendanceForm = document.getElementById('attendanceForm');
const attendanceRecords = document.getElementById('attendanceRecords');

attendanceForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const studentName = document.getElementById('studentName').value;
  const attendanceStatus = document.getElementById('attendanceStatus').value;
  const record = document.createElement('li');
  record.textContent = `${studentName}: ${attendanceStatus}`;
  attendanceRecords.appendChild(record);
  attendanceForm.reset();
});

// Student Information Management
const studentForm = document.getElementById('studentForm');
const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];

studentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const studentId = document.getElementById('studentId').value;
  const studentName = document.getElementById('studentNameInfo').value;
  const studentGrade = document.getElementById('studentGrade').value;
  const row = studentTable.insertRow();
  row.insertCell(0).textContent = studentId;
  row.insertCell(1).textContent = studentName;
  row.insertCell(2).textContent = studentGrade;
  studentForm.reset();
});

// Fee Management
const feeForm = document.getElementById('feeForm');
const feeRecords = document.getElementById('feeRecords');

feeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const feeStudentId = document.getElementById('feeStudentId').value;
  const feeAmount = document.getElementById('feeAmount').value;
  const record = document.createElement('li');
  record.textContent = `Student ID: ${feeStudentId}, Amount: $${feeAmount}`;
  feeRecords.appendChild(record);
  feeForm.reset();
});

// Timetable Scheduling
const timetableForm = document.getElementById('timetableForm');
const timetableRecords = document.getElementById('timetableRecords');

timetableForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const className = document.getElementById('className').value;
  const classTime = document.getElementById('classTime').value;
  const record = document.createElement('li');
  record.textContent = `${className} at ${classTime}`;
  timetableRecords.appendChild(record);
  timetableForm.reset();
});
const API_URL = 'http://localhost:5000';

// Fetch and display students
async function fetchStudents() {
  const response = await fetch(`${API_URL}/students`);
  const students = await response.json();
  const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
  studentTable.innerHTML = '';
  students.forEach(student => {
    const row = studentTable.insertRow();
    row.insertCell(0).textContent = student.id;
    row.insertCell(1).textContent = student.name;
    row.insertCell(2).textContent = student.grade;
  });
}

// Add a student
document.getElementById('studentForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const studentId = document.getElementById('studentId').value;
  const studentName = document.getElementById('studentNameInfo').value;
  const studentGrade = document.getElementById('studentGrade').value;
  await fetch(`${API_URL}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: studentName, grade: studentGrade })
  });
  fetchStudents();
  e.target.reset();
});

// Fetch and display attendance
async function fetchAttendance() {
  const response = await fetch(`${API_URL}/attendance`);
  const attendance = await response.json();
  const attendanceRecords = document.getElementById('attendanceRecords');
  attendanceRecords.innerHTML = '';
  attendance.forEach(record => {
    const li = document.createElement('li');
    li.textContent = `Student ID: ${record.student_id}, Status: ${record.status}, Date: ${record.date}`;
    attendanceRecords.appendChild(li);
  });
}

// Add attendance
document.getElementById('attendanceForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const studentName = document.getElementById('studentName').value;
  const attendanceStatus = document.getElementById('attendanceStatus').value;
  await fetch(`${API_URL}/attendance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ student_id: 1, status: attendanceStatus, date: new Date().toISOString().split('T')[0] })
  });
  fetchAttendance();
  e.target.reset();
});

// Fetch and display fees
async function fetchFees() {
  const response = await fetch(`${API_URL}/fees`);
  const fees = await response.json();
  const feeRecords = document.getElementById('feeRecords');
  feeRecords.innerHTML = '';
  fees.forEach(fee => {
    const li = document.createElement('li');
    li.textContent = `Student ID: ${fee.student_id}, Amount: $${fee.amount}, Date: ${fee.date}`;
    feeRecords.appendChild(li);
  });
}

// Add fee record
document.getElementById('feeForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const feeStudentId = document.getElementById('feeStudentId').value;
  const feeAmount = document.getElementById('feeAmount').value;
  await fetch(`${API_URL}/fees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ student_id: feeStudentId, amount: feeAmount, date: new Date().toISOString().split('T')[0] })
  });
  fetchFees();
  e.target.reset();
});

// Fetch and display timetable
async function fetchTimetable() {
  const response = await fetch(`${API_URL}/timetable`);
  const timetable = await response.json();
  const timetableRecords = document.getElementById('timetableRecords');
  timetableRecords.innerHTML = '';
  timetable.forEach(record => {
    const li = document.createElement('li');
    li.textContent = `${record.class_name} at ${record.class_time}`;
    timetableRecords.appendChild(li);
  });
}

// Add class schedule
document.getElementById('timetableForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const className = document.getElementById('className').value;
  const classTime = document.getElementById('classTime').value;
  await fetch(`${API_URL}/timetable`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ class_name: className, class_time: classTime })
  });
  fetchTimetable();
  e.target.reset();
});

// Initial fetch
fetchStudents();
fetchAttendance();
fetchFees();
fetchTimetable();
const API_URL = 'http://localhost:5000/api';

// Fetch all students
async function fetchStudents() {
  const response = await fetch(`${API_URL}/students`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  const students = await response.json();
  console.log(students);
}

// Login
async function login(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
}