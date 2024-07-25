import React, { useEffect, useState } from "react";
import propic from "../../assets/images/face-2.jpg";
import vector from "../../assets/images/vectorhr.png";
import axios from "axios";
import { baseUrl } from "../../url";

const cardStyle = {
  display: "flex",
  alignItems: "center",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  width: "1400px",
  margin: "50px auto",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  fontFamily: "Arial, sans-serif",
  textAlign: "left",
  marginRight: "500px",
  height: "200px",
};

const textContainerStyle = {
  marginLeft: "20px",
};

const quoteStyle = {
  fontStyle: "italic",
  marginBottom: "10px",
};

const authorStyle = {
  fontWeight: "bold",
  marginTop: "10px",
};

const imageStyle = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
};

const quotesStyle = {
  color: "#3F51B5",
  fontSize: "40px",
  fontWeight: "bold",
  lineHeight: "1",
  marginRight: "10px",
};

const TestimonialCard = () => {
  const [feedback, setFeedback] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    let fetchFeedback = async () => {
      let x = await axios.get(`${baseUrl}/intern/feedback/`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (x.status === 200) {
        console.log("feedback", x.data);
        setFeedback(x.data);
      }
    };

    fetchFeedback();
  }, [token]);

  return (
    <div>
      <div style={cardStyle}>
        {feedback.length > 0 ? (
          feedback.map((data, index) => (
            <React.Fragment>
              {/* <img src={propic} alt="Stefano Petrangeli" style={imageStyle} /> */}
              <div style={textContainerStyle}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <div style={quotesStyle}>&ldquo;</div>
                  <p style={quoteStyle}>{data.feedback}</p>
                </div>
                <p style={authorStyle}>Username :{data.username}</p>
                <p style={authorStyle}>ID: {data.id}</p>
              </div>
            </React.Fragment>
          ))
        ) : (
          <h1>Currently no feedback</h1>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;
