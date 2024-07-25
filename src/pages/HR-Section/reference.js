import React, { useEffect, useState } from "react";
import vector from "../../assets/images/vectorhr.png";
import axios from "axios";
import { baseUrl } from "../../url";

const appStyle = {
  fontFamily: "Arial, sans-serif",
  margin: "20px",
  marginTop: "80px",
  backgroundImage: `url(${vector})`,
  backgroundSize: "cover",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
};

const headerStyle = {
  textAlign: "center",
  color: "#333",
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
  marginBottom: "20px",
  backgroundColor: "white",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
};

const textareaStyle = {
  width: "100%",
  height: "100px",
  marginTop: "10px",
  marginBottom: "10px",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  fontSize: "16px",
};

const submitButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#6f42c1",
};

function ReferenceCard({ reference }) {
  const [showTextbox, setShowTextbox] = useState(false);
  const [response, setResponse] = useState("");

  const handleRespondClick = () => {
    setShowTextbox(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResponse("");
    setShowTextbox(false);
  };

  return (
    <div style={cardStyle}>
      <h2>{`Reference ${reference.id}`}</h2>
      <p><strong>Name:</strong> {reference.name}</p>
      <p><strong>Email:</strong> {reference.email}</p>
      <p><strong>Phone:</strong> {reference.phone}</p>
      <p><strong>Location:</strong> {reference.location}</p>
      <p><strong>Education:</strong> {reference.education}</p>
      <button style={buttonStyle} onClick={handleRespondClick}>
        RESPOND
      </button>
      {/* {showTextbox && (
        <form onSubmit={handleSubmit}>
          <textarea
            style={textareaStyle}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Your Response"
          />
          <button type="submit" style={submitButtonStyle}>
            SUBMIT RESPONSE
          </button>
        </form>
      )} */}
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRef = async () => {
      const response = await axios.get(`${baseUrl}/intern/reference/`);
      if (response.status === 200) {
        setData(response.data);
      }
    };
    fetchRef();
  }, []);

  return (
    <div style={appStyle}>
      <h1 style={headerStyle}>Intern References</h1>
      {data.map((reference) => (
        <ReferenceCard key={reference.id} reference={reference} />
      ))}
    </div>
  );
}

export default App;
