import React, { useState } from 'react';

function Quotation() {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option) => {
    // Handle option click, you can use it to perform actions based on the selected option
    console.log("Selected Option:", option);
  };

  return (
    <div className="quotation">
      <div className="options">
        <div className="dropdown" onClick={toggleOptions}>
          <div className="dropdown-toggle">
            <span>QUATATIONS</span>
            <span className={`arrow ${showOptions ? 'up' : 'down'}`}></span>
          </div>
          {showOptions && (
            <div className="dropdown-options">
              <p onClick={() => handleOptionClick('Digital Marketing')}>Digital Marketing</p>
              <p onClick={() => handleOptionClick('Mobile App Development')}>Mobile App Development</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quotation;
