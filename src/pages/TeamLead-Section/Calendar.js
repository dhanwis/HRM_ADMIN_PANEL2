import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to get the number of days in a month
  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to generate the calendar grid for the current month
  const generateCalendarGrid = () => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const grid = [];

    // Fill the grid with empty cells before the first day of the month
    for (let i = 0; i < firstDayIndex; i++) {
      grid.push(<div key={`empty-${i}`} className="empty-cell"></div>);
    }

    // Fill the grid with days of the month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const className = isAbsentDay(date) ? 'absent-day' : '';
      grid.push(<div key={date} className={`calendar-day ${className}`}>{i}</div>);
    }

    return grid;
  };

  // Function to handle navigation to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Function to handle navigation to the next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Function to check if a date is an absent day (dummy implementation)
  const isAbsentDay = (date) => {
    // Dummy implementation, replace with your logic to check for absent days
    const absentDays = ['2024-05-08', '2024-05-22'];
    return absentDays.includes(date.toISOString().split('T')[0]);
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', width: '300px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button onClick={goToPreviousMonth}>Previous</button>
        <span>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
        <button onClick={goToNextMonth}>Next</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
        {generateCalendarGrid()}
      </div>
    </div>
  );
};

export default Calendar;
