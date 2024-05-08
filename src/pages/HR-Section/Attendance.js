import React, { useState } from 'react';
import './Attendance.css'; // Import the CSS file

const AttendanceMarkingPage = () => {
  // Initialize state for employee attendance data
  const [attendanceData, setAttendanceData] = useState([]);

  // Function to mark attendance
  const markAttendance = (employeeId) => {
    const updatedAttendanceData = attendanceData.map(employee => {
      if (employee.id === employeeId) {
        return {
          ...employee,
          present: true,
          signInTime: new Date().toLocaleString(), // Sign-in time
          signOutTime: null // Reset sign-out time
        };
      }
      return employee;
    });
    setAttendanceData(updatedAttendanceData);
  };

  // Function to sign out
  const signOut = (employeeId) => {
    const updatedAttendanceData = attendanceData.map(employee => {
      if (employee.id === employeeId && employee.present) {
        return {
          ...employee,
          signOutTime: new Date().toLocaleString() // Sign-out time
        };
      }
      return employee;
    });
    setAttendanceData(updatedAttendanceData);
  };

  // Function to fetch employee data (You can replace this with actual API call)
  const fetchEmployeeData = () => {
    // Example employee data, replace with actual API call
    const sampleData = [
      { id: 1, name: 'John Doe', present: false, signInTime: null, signOutTime: null },
      { id: 2, name: 'Jane Smith', present: false, signInTime: null, signOutTime: null },
      // Add more employees as needed
    ];
    setAttendanceData(sampleData);
  };

  // Function to render employee list
  const renderEmployeeList = () => {
    return (
      <table className="attendance-table"> {/* Apply class to the table */}
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Sign In Time</th>
            <th>Sign Out Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.signInTime || 'Not signed in'}</td>
              <td>{employee.signOutTime || 'Not signed out'}</td>
              <td>
                {!employee.present ? (
                  <button className="action-button" onClick={() => markAttendance(employee.id)}>Sign In</button>
                ) : (
                  <button className="action-button" onClick={() => signOut(employee.id)}>Sign Out</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container"> {/* Apply class to the container div */}
    <h2 className="heading">Employee Attendance Marking</h2> {/* Apply class to the heading */}
    <button className="load-button" onClick={fetchEmployeeData}>Load Employees</button> {/* Apply class to the button */}
    {attendanceData.length > 0 ? renderEmployeeList() : <p>No data available</p>}
  </div>
);
};

export default AttendanceMarkingPage;
