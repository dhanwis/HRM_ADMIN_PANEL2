import React, { useState } from 'react';
import { Form, FormGroup, FormLabel, FormControl, Row, Col, Button } from 'react-bootstrap';

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    to: '',
    from: '',
    details: '',
  });

  const [approvalStatus, setApprovalStatus] = useState('Pending'); // Track approval status

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting leave request:', formData);
    // Simulate API call to HR approval process
    // For demo, let's simulate HR approval after form submission
    setTimeout(() => {
      setApprovalStatus('Approved');
    }, 2000); // Simulating API delay
  };

  return (
    <div className="container mt-3">
      <h1>Leave Application Form</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>From</FormLabel>
              <FormControl type="date" name="from" value={formData.from} onChange={handleChange} required />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>To</FormLabel>
              <FormControl type="date" name="to" value={formData.to} onChange={handleChange} required />
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
      <p>Status: {approvalStatus === 'Approved' ? 'Approved' : 'Pending'}</p>
      {approvalStatus === 'Approved' && (
        <p>Leave request has been approved. You're good to go!</p>
      )}
    </div>
  );
};

export default LeaveForm;
