import React, { useState } from 'react';
import vector from '../../assets/images/vectorhr.png';

function ReferenceCard({ title, content }) {
  const [showTextbox, setShowTextbox] = useState(false);
  const [response, setResponse] = useState('');

  const handleRespondClick = () => {
    setShowTextbox(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${title} Response:`, response);
    // Clear the response and hide the textbox after submitting
    setResponse('');
    setShowTextbox(false);
  };
const body={
  backgroundImage:` url($(vector))`
}
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '20px',
    marginBottom: '20px',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const textareaStyle = {
    width: '100%',
    height: '100px',
    marginTop: '10px',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
  };

  const submitButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6f42c1',
  };

  return (
    
      <div style={cardStyle}>
      <h2>{title}</h2>
      <p>{content}</p>
      <button style={buttonStyle} onClick={handleRespondClick}>RESPOND</button>
      {showTextbox && (
        <form onSubmit={handleSubmit}>
          <textarea
            style={textareaStyle}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Your Response"
          />
          <button type="submit" style={submitButtonStyle}>SUBMIT RESPONSE</button>
        </form>
      )}
    </div>
  
    
  );
}

function App() {
  const appStyle = {
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
    marginTop:'80px'
   
  };

  const headerStyle = {
    textAlign: 'center',
  };

  return (
    // <div  style={{backgroundImage:`url(${vector})`,height:'1000px'}}>
    <div style={appStyle} >
      {/* <h1 style={headerStyle}>Intern References</h1> */}
      <ReferenceCard title="Reference 1" content="This is the first reference." />
      <ReferenceCard title="Reference 2" content="This is the second reference." />
      <ReferenceCard title="Reference 3" content="This is the third reference." />
    </div>
    // </div>
  );
}

export default App;
