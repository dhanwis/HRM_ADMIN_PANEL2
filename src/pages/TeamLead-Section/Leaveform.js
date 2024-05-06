import React, { useState } from 'react';
import { Form, FormGroup, FormLabel, FormControl, Row, Col, Button } from 'react-bootstrap';

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    to: '',
    from: '',
    details: '',
    status: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulate form submission (replace with your actual submission logic)
    console.log('Submitting leave request:', formData);

    // After submission, update status with a placeholder (replace with actual API call)
    setFormData({ ...formData, status: 'Pending' });
  };

  return (
    <div className="container mt-3">
      <h1>Leave Application Form</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>From</FormLabel>
              <FormControl type="date" name="From" value={formData.From} onChange={handleChange} required />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>To</FormLabel>
              <FormControl type="date" name="To" value={formData.To} onChange={handleChange} required />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <FormLabel>Details</FormLabel>
          <FormControl
            as="textarea"
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows={5}
            required
          />
        </FormGroup>
        <Button variant="primary" type="submit">
          Submit Leave Request
        </Button>
      </Form>
      <br />
      <p>Status: {formData.status}</p>
    </div>
  );
};

export default LeaveForm;