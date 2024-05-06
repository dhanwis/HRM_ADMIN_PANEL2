import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PasswordForm = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    // Show alert
    alert('Form submitted successfully!');
    // Clear error
    setError('');
  };

  return (
    <div className="container">
        <Row style={{marginTop:"25px"}}>
        <Col xs={5}></Col>
        <Col>
        <h2>RESET PASSWORD</h2>
        </Col>
      </Row>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={3} ></Col>
          <Col xs={4}>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
        <Col xs={3}></Col>
          <Col xs={4}>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row style={{marginTop:"15px"}}>
          <Col xs={4}></Col>
          <Col>
            <Button variant="primary" type="submit">
              submit to HR
            </Button>
          </Col>
          </Row>
          <Row>
            <Col xs={4}></Col>
          <Col>
            <Link to="/teamlead/login" className="btn btn-link">Back to Sign In</Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PasswordForm;
