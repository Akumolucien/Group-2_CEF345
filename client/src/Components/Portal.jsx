import React, { useState, useEffect } from 'react';
import "./portal.css";
import img2 from "./images/classroom.jpg";

 
export default function Portal() {
          const [attendanceRecords, setAttendanceRecords] = useState([]);
          const [studentData, setStudentData] = useState([]);
          const [feeRecords, setFeeRecords] = useState([]);
          const [timetableRecords, setTimetableRecords] = useState([]);
        
          const handleAttendanceSubmit = (event) => {
            event.preventDefault();
            const studentName = event.target.studentName.value;
            const attendanceStatus = event.target.attendanceStatus.value;
            setAttendanceRecords([...attendanceRecords, `${studentName}: ${attendanceStatus}`]);
            event.target.reset();
          };
        
          const handleStudentSubmit = (event) => {
            event.preventDefault();
            const studentId = event.target.studentId.value;
            const studentName = event.target.studentNameInfo.value;
            const studentGrade = event.target.studentGrade.value;
            setStudentData([...studentData, { studentId, studentName, studentGrade }]);
            event.target.reset();
          };
        
          const handleFeeSubmit = (event) => {
            event.preventDefault();
            const feeStudentId = event.target.feeStudentId.value;
            const feeAmount = event.target.feeAmount.value;
            setFeeRecords([...feeRecords, `Student ID: ${feeStudentId}, Amount: $${feeAmount}`]);
            event.target.reset();
          };
        
          const handleTimetableSubmit = (event) => {
            event.preventDefault();
            const className = event.target.className.value;
            const classTime = event.target.classTime.value;
            setTimetableRecords([...timetableRecords, `${className} at ${classTime}`]);
            event.target.reset();
          };
        
          useEffect(() => {
            // You can load data from local storage or an API here if needed
            // For example:
            // const storedAttendance = localStorage.getItem('attendanceRecords');
            // if (storedAttendance) {
            //   setAttendanceRecords(JSON.parse(storedAttendance));
            // }
          }, []);
        
          useEffect(() => {
            // You can save data to local storage or an API here if needed
            // For example:
            // localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
          }, [attendanceRecords]);

    return(

   <div className='body'>

    <div className='header'>
      <h1>Schoolpaddy System</h1>
    </div>


    <div className='main'>
     
      <div className='section'>
        <h2>Attendance Management</h2>
        <form id="attendanceForm" onSubmit={handleAttendanceSubmit}>

          <label for="studentName">Student Name:</label>
          <input type="text" id="studentName" required />
          <label for="attendanceStatus">Status:</label>
          <select id="attendanceStatus" required>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          <button type="submit">Mark Attendance</button>
        </form>
        <h3>Attendance Records</h3>
        <ul id="attendanceRecords"> {attendanceRecords.map((record, index) => (
              <li key={index}>{record}</li>
            ))}
            </ul>
      </div>

    
      <div className='section'>
        <h2>Student Information</h2>
        <form id="studentForm" onSubmit={handleStudentSubmit}>
          <label for="studentId">Student ID:</label>
          <input type="text" id="studentId" required />
          <label for="studentNameInfo">Name:</label>
          <input type="text" id="studentNameInfo" required />
          <label for="studentGrade">Grade:</label>
          <input type="text" id="studentGrade" required />
          <button type="submit">Add Student</button>
        </form>
        <h3>Student List</h3>
        <table id="studentTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
          {studentData.map((student, index) => (
                <tr key={index}>
                  <td>{student.studentId}</td>
                  <td>{student.studentName}</td>
                  <td>{student.studentGrade}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

    
      <div className='section'>
        <h2>Fee Management</h2>
        <form id="feeForm" onSubmit={handleFeeSubmit}>
          <label for="feeStudentId">Student ID:</label>
          <input type="text" id="feeStudentId" required />
          <label for="feeAmount">Amount:</label>
          <input type="number" id="feeAmount" required />
          <button type="submit">Record Fee</button>
        </form>
        <h3>Fee Records</h3>
        <ul id="feeRecords"> {feeRecords.map((record, index) => (
              <li key={index}>{record}</li>
            ))}
         </ul>
      </div>

     
      <div className='section'>
        <h2>Timetable Scheduling</h2>
        <form id="timetableForm" onSubmit={handleTimetableSubmit}>
          <label for="className">Class Name:</label>
          <input type="text" id="className" required />
          <label for="classTime">Time:</label>
          <input type="text" id="classTime" required />
          <button type="submit">Add Class</button>
        </form>
        <h3>Class Schedule</h3>
        <ul id="timetableRecords"> {timetableRecords.map((record, index) => (
              <li key={index}>{record}</li>
            ))}
             </ul>
      </div>
</div>

  </div>
    );
}