import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'; // Import useHistory for redirection

const LeaveForm_Intern = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    phoneNumber: '',
    email: '',
    reason: '',
    startDate: '',
    endDate: '',
    numberOfDays: 0,
    employeeId: '',
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
    <div className="container mt-5">
    <Container>
      <h3>Leave Request Form</h3>
      <Form onSubmit={handleSubmit}>
        {/* Form fields */}
        {/* <Row>
          <Col>
            <Form.Group controlId="firstName">
              <Form.Label> Name</Form.Label>
              <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row> */}
        {/* <Form.Group controlId="department">
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
        </Form.Group> */}
        <Row>
          <Col>
            <Form.Group controlId="startDate">
              <Form.Label>First Day of Absence</Form.Label>
              <Form.Control type="text" name="startDate" value={formData.startDate} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="endDate">
              <Form.Label>Last Day of Absence</Form.Label>
              <Form.Control type="text" name="endDate" value={formData.endDate} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" style={{marginLeft:"50%",marginTop:"20px"}}>
          Submit
        </Button>
      </Form>
      <h3>Status: {formData.requestStatus}</h3> {/* Display request status */}
    </Container>
    </div>
  );
};

export default LeaveForm_Intern;