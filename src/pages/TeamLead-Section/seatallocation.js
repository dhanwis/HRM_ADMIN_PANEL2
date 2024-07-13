import React, { useState, useEffect } from 'react';
import './SeatingChart.css';
import setbg from "../../assets/images/vectorteam5.png";

const initialRows = 5;
const initialCols = 5;

const SeatingChart = () => {
  const [seats, setSeats] = useState(Array(initialRows).fill().map(() => Array(initialCols).fill(null)));
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [extraSeat, setExtraSeat] = useState('');
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    // Fetch students from the fake API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));

    // Fetch courses from the fake API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setCourses(data.map(course => ({ id: course.id, name: `Course ${course.id}` }))))
      .catch(error => console.error('Error fetching courses:', error));

    // Fetch time slots from the fake API
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setTimeSlots(data.map(slot => ({ id: slot.id, slot: `Time Slot ${slot.id}` }))))
      .catch(error => console.error('Error fetching time slots:', error));
  }, []);

  const allocateSeat = (row, col) => {
    if (selectedStudent === '') {
      alert('Please select a student before allocating a seat.');
      return;
    }
    if (selectedCourse === '') {
      alert('Please select a course before allocating a seat.');
      return;
    }
    if (selectedTimeSlot === '') {
      alert('Please select a time slot before allocating a seat.');
      return;
    }
    if (seats[row][col] === null) {
      const newSeats = seats.map((seatRow, r) =>
        seatRow.map((seat, c) => (r === row && c === col ? `${selectedStudent} - ${selectedCourse} (${selectedTimeSlot})` : seat))
      );
      setSeats(newSeats);
      alert(`Seat (${row * initialCols + col + 1}) has been allocated to ${selectedStudent} for ${selectedCourse} at ${selectedTimeSlot}.`);
      setAllocations([...allocations, { seatNumber: row * initialCols + col + 1, student: selectedStudent, course: selectedCourse, timeSlot: selectedTimeSlot }]);
      // Clear the input fields after alert
      setSelectedStudent('');
      setSelectedCourse('');
      setSelectedTimeSlot('');
    } else {
      alert(`Seat (${row * initialCols + col + 1}) is already occupied.`);
    }
  };

  const addExtraSeat = () => {
    if (extraSeat === '' || isNaN(extraSeat)) {
      alert('Please enter a valid seat number.');
      return;
    }
    const seatNumber = parseInt(extraSeat);
    const row = Math.floor((seatNumber - 1) / initialCols);
    const col = (seatNumber - 1) % initialCols;
    if (row >= seats.length || col >= initialCols) {
      alert('Invalid seat number.');
      return;
    }
    if (seats[row][col] === null) {
      alert(`Seat (${seatNumber}) is already vacant.`);
    } else {
      const newSeats = seats.map((seatRow, r) =>
        seatRow.map((seat, c) => (r === row && c === col ? null : seat))
      );
      setSeats(newSeats);
      alert(`Seat (${seatNumber}) has been made vacant.`);
      setAllocations(allocations.filter(allocation => allocation.seatNumber !== seatNumber));
    }
  };

  const addNewSeat = () => {
    if (seats.length === 0 || seats[seats.length - 1].length === initialCols) {
      setSeats(prevSeats => [...prevSeats, [null]]);
    } else {
      setSeats(prevSeats => {
        const newSeats = [...prevSeats];
        newSeats[newSeats.length - 1].push(null);
        return newSeats;
      });
    }
  };

  const deleteLastSeat = () => {
    setSeats(prevSeats => {
      const newSeats = [...prevSeats];
      const lastRow = newSeats[newSeats.length - 1];
      if (lastRow.length === 1) {
        // If the last row has only one seat, remove the entire row
        return newSeats.slice(0, -1);
      } else {
        // Otherwise, remove only the last seat in the last row
        lastRow.pop();
        return newSeats;
      }
    });
  };

  return (
    <div style={{ backgroundImage: `url(${setbg})`, marginTop: "-50px", height: "800px" }}>
      <div style={{ marginTop: "50px" }}>
        <h1 style={{ fontSize: "20px" }}>Office Seating Allocation</h1>
        <div className="card">
          <div style={{ paddingLeft: "35px" }}>
            <table className="input-table">
              <tbody>
                <tr>
                  <td>
                    <select
                      id="student"
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                      style={{ borderRadius: "10px", backgroundColor: "#f5f5f5", border: "1px solid rgba(15, 103, 15)", height: "40px" }}
                    >
                      <option value="" disabled>Select Student</option>
                      {students.map((student) => (
                        <option key={student.id} value={student.name}>
                          {student.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      id="course"
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      style={{ borderRadius: "10px", backgroundColor: "#f5f5f5", border: "1px solid rgba(15, 103, 15)", height: "40px" }}
                    >
                      <option value="" disabled>Select Course</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.name}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      id="timeSlot"
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      style={{ borderRadius: "10px", backgroundColor: "#f5f5f5", border: "1px solid rgba(15, 103, 15)", height: "40px" }}
                    >
                      <option value="" disabled>Select Time Slot</option>
                      {timeSlots.map((timeSlot) => (
                        <option key={timeSlot.id} value={timeSlot.slot}>
                          {timeSlot.slot}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td colSpan="3">
                    <input
                      type="text"
                      value={extraSeat}
                      onChange={(e) => setExtraSeat(e.target.value)}
                      placeholder="Enter seat number to vacate"
                      style={{ borderRadius: "10px", backgroundColor: "#f5f5f5", border: "1px solid rgba(15, 103, 15)", height: "40px", width: "calc(100% - 20px)" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="3">
                    <button onClick={addExtraSeat} style={{ borderRadius: "10px", backgroundColor: "#f5f5f5", border: "1px solid rgba(15, 103, 15)", height: "40px", marginLeft: "10px", marginTop: "20px" }}>Vacate Seat</button>
                    <button onClick={addNewSeat} style={{ borderRadius: "10px", backgroundColor: "#f5f5f5", border: "1px solid rgba(15, 103, 15)", height: "40px", marginLeft: "10px", marginTop: "20px" }}>Add New Seat</button>
                    <button onClick={deleteLastSeat} style={{ borderRadius: "10px", backgroundColor: "#f5f5f5", border: "1px solid rgba(15, 103, 15)", height: "40px", marginLeft: "10px", marginTop: "20px" }}>Delete Last Seat</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="seating-chart">
              {seats.map((seatRow, rowIndex) => (
                <div key={rowIndex} className="seat-row">
                  {seatRow.map((seat, colIndex) => {
                    const seatNumber = rowIndex * initialCols + colIndex + 1;
                    return (
                      <button
                        key={colIndex}
                        className={`seat ${seat === null ? 'vacant' : 'occupied'}`}
                        onClick={() => allocateSeat(rowIndex, colIndex)}
                      >
                        {seatNumber}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="allocation-table">
              <h2>Allocations</h2>
              <table>
                <thead>
                  <tr>
                    <th>Seat Number</th>
                    <th>Student Name</th>
                    <th>Course</th>
                    <th>Time Slot</th>
                  </tr>
                </thead>
                <tbody>
                  {allocations.map((allocation, index) => (
                    <tr key={index}>
                      <td>{allocation.seatNumber}</td>
                      <td>{allocation.student}</td>
                      <td>{allocation.course}</td>
                      <td>{allocation.timeSlot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatingChart;
