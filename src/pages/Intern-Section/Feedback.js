import React, { useState } from 'react';
import vector from "../../assets/images/vector_image.png";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    feedback: '',
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
      feedback: '',
    });
  };

  return (
    <div style={{ backgroundImage: `url(${vector})`, height: "750px" }}>
      <div className="container mt-5">
        <h3>Feedback</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <div className="mb-3">
            <label htmlFor="feedback" className="form-label">Feedback</label>
            <textarea
              className="form-control"
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
