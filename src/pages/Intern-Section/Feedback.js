import { Container } from '@material-ui/core';
import React, { useState } from 'react';

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
        {/* <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div> */}
        <div className="mb-3">
          <label htmlFor="feedback" className="form-label">Feedback</label>
          <textarea className="form-control" id="feedback" name="feedback" value={formData.feedback} onChange={handleChange} rows="5" required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rating</label>
          <select className="form-select" id="rating" name="rating" value={formData.rating} onChange={handleChange} required>
            <option value="">Select Rating</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
     
    </div>
  );
};

export default FeedbackForm;
