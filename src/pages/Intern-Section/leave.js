import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'; // Import useHistory for redirection

const LeaveForm = () => {
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
    <div className="container mt-5">
    <Container >
      <h3>Leave Request Form</h3>
      <Form onSubmit={handleSubmit}>
        {/* Form fields */}
        <Row className="justify-content-center mt-4">
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
        <Button variant="primary" type="submit" style={{marginTop:"15px",marginLeft:"50%"}}>
          Submit
        </Button>
      </Form>
      <h3 style={{marginTop:"15px"}}>Status: {formData.requestStatus}</h3> {/* Display request status */}
    </Container>
    </div>
  );
};

export default LeaveForm;