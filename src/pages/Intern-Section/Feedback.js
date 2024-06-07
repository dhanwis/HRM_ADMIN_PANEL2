import { Container } from '@material-ui/core';
import React, { useState } from 'react';

import vector from "../../assets/images/vector_image.png"


const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    feedback: '',
    rating: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulate form submission (replace with your actual submission logic)
    console.log('Submitting feedback:', formData);

    // Reset form after submission
    setFormData({
      fullName: '',
      email: '',
      feedback: '',
      rating: '',
    });
  };

  return (
    <div className="container mt-5">
      <h3>Intern Feedback Form</h3>
      
      <form onSubmit={handleSubmit} style={{marginTop:"20px"}}>
        <div className="mb-3">
          <label htmlFor="feedback" className="form-label">Feedback</label>
          <textarea className="form-control" id="feedback" name="feedback" value={formData.feedback} onChange={handleChange} rows="5" required></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
     
    </div>
  );
};

export default FeedbackForm;