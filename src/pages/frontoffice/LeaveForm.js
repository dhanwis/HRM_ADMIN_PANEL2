import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'; // Import useHistory for redirection

const OfficeLeaveForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    department: '',
    phoneNumber: '',
    email: '',
    reason: '',
    startDate: '',
    endDate: '',
    description: '',
    requestStatus: 'Pending',
  });

  const history = useHistory(); // Initialize useHistory for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submit logic here
    // For demonstration, let's redirect after 1 second and set the status to 'Pending'
    setTimeout(() => {
      setFormData({
        ...formData,
        requestStatus: 'Pending',
      });
      history.push('/'); // Redirect to homepage
    }, 1000);
  };

  return (
    <Container style={{paddingTop:"50px"}}>
      <h1>Leave Request Form</h1>
      <Form onSubmit={handleSubmit}>
        {/* Form fields */}
        <Row>
          <Col>
            <Form.Group controlId="firstName">
              <Form.Label> Name</Form.Label>
              <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="department">
          <Form.Label>Department Name</Form.Label>
          <Form.Control type="text" name="department" value={formData.department} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group controlId="startDate">
              <Form.Label> Day of Absence</Form.Label>
              <Form.Control type="text" name="startDate" value={formData.startDate} onChange={handleChange} required />
            </Form.Group>
          </Col>
            <Form.Group controlId="endDate">
              <Form.Label>Work Assigned to </Form.Label>
              <Form.Control type="text" name="endDate" value={formData.endDate} onChange={handleChange} required />
            </Form.Group>
        </Row>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" style={{marginTop:"15px"}}>
          Submit
        </Button>
      </Form>
      <h3 style={{marginTop:"15px"}}>Status: {formData.requestStatus}</h3> {/* Display request status */}
    </Container>
  );
};

export default OfficeLeaveForm;