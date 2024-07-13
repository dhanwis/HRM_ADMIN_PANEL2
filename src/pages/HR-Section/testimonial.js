import React from 'react';
import propic from '../../assets/images/face-2.jpg'
import vector from '../../assets/images/vectorhr.png'

const TestimonialCard = () => {
  const cardStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    width: '1400px',
    margin: '50px auto',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'left',
    marginRight:'500px',
    height:'200px',
  };

  const textContainerStyle = {
    marginLeft: '20px',
  };

  const quoteStyle = {
    fontStyle: 'italic',
    marginBottom: '10px',
  };

  const authorStyle = {
    fontWeight: 'bold',
    marginTop: '10px',
  };

  const imageStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
  };

  const quotesStyle = {
    color: '#3F51B5',
    fontSize: '40px',
    fontWeight: 'bold',
    lineHeight: '1',
    marginRight: '10px',
  };

  return (
    <div>
    <div style={cardStyle}>
      <img
        src={propic}
        alt="Stefano Petrangeli"
        style={imageStyle}
      />
      <div style={textContainerStyle}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={quotesStyle}>&ldquo;</div>
          <p style={quoteStyle}>
            Everybody at Adobe Research wants interns to have a fantastic experience.
            We’re thinking, ‘What kind of project are we going to do? How are we going
            to structure this project so we can make progress in three months?’
          </p>
        </div>
        <p style={authorStyle}>– Stefano Petrangeli, Research Scientist</p>
      </div>
    </div>
    <div style={cardStyle}>
      <img
        src={propic}
        alt="Stefano Petrangeli"
        style={imageStyle}
      />
      <div style={textContainerStyle}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={quotesStyle}>&ldquo;</div>
          <p style={quoteStyle}>
            Everybody at Adobe Research wants interns to have a fantastic experience.
            We’re thinking, ‘What kind of project are we going to do? How are we going
            to structure this project so we can make progress in three months?’
          </p>
        </div>
        <p style={authorStyle}>– Stefano Petrangeli, Research Scientist</p>
      </div>
    </div>
    <div style={cardStyle}>
      <img
        src={propic}
        alt="Stefano Petrangeli"
        style={imageStyle}
      />
      <div style={textContainerStyle}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={quotesStyle}>&ldquo;</div>
          <p style={quoteStyle}>
            Everybody at Adobe Research wants interns to have a fantastic experience.
            We’re thinking, ‘What kind of project are we going to do? How are we going
            to structure this project so we can make progress in three months?’
          </p>
        </div>
        <p style={authorStyle}>– Stefano Petrangeli, Research Scientist</p>
      </div>
    </div>
   
    </div>
    
  );
}

export default TestimonialCard;




