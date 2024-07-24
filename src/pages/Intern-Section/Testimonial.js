import React, { useState } from "react";
import vector from "../../assets/images/vector_image.png";

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    testimonial: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulate form submission (replace with your actual submission logic)
    console.log("Submitting testimonial:", formData);

    // Reset form after submission
    setFormData({
      testimonial: "",
    });
  };

  return (
    <div style={{ backgroundImage: `url(${vector})`, height: "750px" }}>
      <div className="container mt-5">
        <h3>Testimonial</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <div className="mb-3">
            <label htmlFor="testimonial" className="form-label">
              Testimonial
            </label>
            <textarea
              className="form-control"
              id="testimonial"
              name="testimonial"
              value={formData.testimonial}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;
