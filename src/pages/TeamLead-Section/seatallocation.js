import React, { useState, useEffect } from 'react';
import './SeatingChart.css';

const initialRows = 5;
const initialCols = 5;

const SeatingChart = () => {
  const [seats, setSeats] = useState(Array(initialRows).fill().map(() => Array(initialCols).fill(null)));
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [extraSeat, setExtraSeat] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  useEffect(() => {
    // Fetch categories from the backend
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const allocateSeat = (row, col) => {
    if (selectedCategory === '') {
      alert('Please select a category before allocating a seat.');
      return;
    }
    if (timeSlot === '') {
      alert('Please select a time slot before allocating a seat.');
      return;
    }
    if (seats[row][col] === null) {
      const newSeats = seats.map((seatRow, r) =>
        seatRow.map((seat, c) => (r === row && c === col ? `${selectedCategory} (${timeSlot})` : seat))
      );
      setSeats(newSeats);
      alert(`Seat (${row * initialCols + col + 1}) has been allocated to ${selectedCategory} for ${timeSlot}.`);
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
    <div style={{ marginTop: "50px" }}>
      <h1>Office Seating Allocation</h1>
      <div className="card">
        <div style={{ paddingLeft: "35px" }}>
          <div className="category-selector">
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ borderRadius: "25px", backgroundColor: "#7fffd4", borderColor: "transparent", height: "40px", boxShadow: "6px 6px 10px rgb(100, 157, 178)" }}
            >
              <option value="" disabled>Student name</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="time-slot-selector">
            <input
              type="text"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              placeholder="Enter time slot"
              style={{ borderRadius: "25px", backgroundColor: "#7fffd4", borderColor: "transparent", height: "40px", boxShadow: "6px 6px 10px rgb(100, 157, 178)", marginTop: "10px", width: "calc(100% - 50px)" }}
            />
          </div>
          <div className="extra-seat">
            <input
              type="text"
              value={extraSeat}
              onChange={(e) => setExtraSeat(e.target.value)}
              placeholder="Enter seat number to vacate"
              style={{ borderRadius: "25px", backgroundColor: "#7fffd4", borderColor: "transparent", height: "40px", boxShadow: "6px 6px 10px rgb(100, 157, 178)", marginTop: "10px", width: "calc(100% - 50px)" }}
            />
            <button onClick={addExtraSeat} style={{ borderRadius: "25px", backgroundColor: "#7fffd4", borderColor: "transparent", height: "40px", boxShadow: "6px 6px 10px rgb(100, 157, 178)", marginLeft: "10px", marginTop:"20px"}}>Vacate Seat</button>
            <button onClick={addNewSeat} style={{ borderRadius: "25px", backgroundColor: "#7fffd4", borderColor: "transparent", height: "40px", boxShadow: "6px 6px 10px rgb(100, 157, 178)", marginLeft: "10px" }}>Add New Seat</button>
            <button onClick={deleteLastSeat} style={{ borderRadius: "25px", backgroundColor: "#7fffd4", borderColor: "transparent", height: "40px", boxShadow: "6px 6px 10px rgb(100, 157, 178)", marginLeft: "10px" }}>Delete Last Seat</button>
          </div>
          <div className="seating-chart" >
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
        </div>
      </div>
    </div>
  );
};

export default SeatingChart;
