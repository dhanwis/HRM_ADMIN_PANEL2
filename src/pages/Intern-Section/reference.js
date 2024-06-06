import React, { useState } from 'react';
import { Form, Button, Row, Col, Container, FormGroup } from 'react-bootstrap';

const ReferenceForm = () => {
  const [formData, setFormData] = useState({
    referrerFirstName: '',
    referrerLastName: '',
    department: '',
    title: '',
    referrerEmail: '',
    referralFirstName: '',
    referralLastName: '',
    referralEmail: '',
    referralDepartment: '',
    referralCV: '',
    referenceLetter: '',
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    if (type === 'file') {
      setFormData({ ...formData, [name]: event.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    // Simulate form submission (replace with your actual submission logic)
    console.log('Submitting reference:', formData);

    // Reset form after submission
    setFormData({
      referrerFirstName: '',
      referrerLastName: '',
      department: '',
      title: '',
      referrerEmail: '',
      referralFirstName: '',
      referralLastName: '',
      referralEmail: '',
      referralDepartment: '',
      referralCV: '',
      referenceLetter: '',
    });
  };

  const validateName = (name) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(name);
  };

  return (
    <Container >
    <div className="container mt-5">
      {/* <h3 className="text-center ">Reference </h3> */}
      <Form noValidate validated={validated} onSubmit={handleSubmit} >
        <h3>Referral Information</h3>
        <Row className="justify-content-center mt-4">
          <Form.Group as={Col} controlId="referralLastName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="referralLastName"
              value={formData.referralLastName}
              onChange={handleChange}
              required
              pattern="[a-zA-Z]+"
              isInvalid={validated && !validateName(formData.referralLastName)}
            />
            <Form.Control.Feedback type="invalid">Please provide a valid last name (only letters).</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="referralFirstName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="referralFirstName"
              value={formData.referralFirstName}
              onChange={handleChange}
              required
              pattern="[a-zA-Z]+"
              isInvalid={validated && !validateName(formData.referralFirstName)}
            />
            <Form.Control.Feedback type="invalid">Please provide a valid first name (only letters).</Form.Control.Feedback>
          </Form.Group>
        </Row>


        <Form.Group className="mb-3" controlId="referralEmail">
          <Form.Label>Referral Email</Form.Label>
          <Form.Control type="email" name="referralEmail" value={formData.referralEmail} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="referralDepartment">
          <Form.Label>Referral Department</Form.Label>
          <Form.Select name="referralDepartment" value={formData.referralDepartment} onChange={handleChange} required>
            <option value="">Please Select</option>
            <option value="human resource">Human Resource</option>
            <option value="operation">Operation</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
            <option value="product">Product</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">Please select a department.</Form.Control.Feedback>
        </Form.Group>


        <Form.Group classname="mb-3" controlId="referralAddress">
          <Form.Label>Street Address</Form.Label>
          <Form.Control type="address" name="referralAddress" value={formData.referralAddress} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">required</Form.Control.Feedback>
        </Form.Group>

        <Form.Group classname="mb-3" controlId="referralAddress">
          <Form.Label>Street Address Line 2</Form.Label>
          <Form.Control type="address" name="referralAddress" value={formData.referralAddress} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">required</Form.Control.Feedback>
        </Form.Group>

        <Row className="justify-content-center mt-4">
          <Form.Group as={Col} controlId="referral">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="referralCity"
              value={formData.referralCity}
              onChange={handleChange}
              required
              pattern="[a-zA-Z]+"
              isInvalid={validated && !validateName(formData.referralCity)}
            />
            <Form.Control.Feedback type="invalid">Please provide a valid city(only letters).</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="referralState">
            <Form.Label>State/Province</Form.Label>
            <Form.Control
              type="text"
              name="referralState"
              value={formData.referralState}
              onChange={handleChange}
              required
              pattern="[a-zA-Z]+"
              isInvalid={validated && !validateName(formData.referralState)}
            />
            <Form.Control.Feedback type="invalid">Please provide a valid State(only letters).</Form.Control.Feedback>
          </Form.Group>
        </Row>


        <Form.Group classname="mb-3" controlId="referralpincode">
          <Form.Label>Pin code</Form.Label>
          <Form.Control type="pincode" name="referralPincode" value={formData.referralpincode} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">required</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="referralCV">
          <Form.Label>Referral CV</Form.Label>
          <Form.Control type="file" name="referralCV" onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Please provide a CV.</Form.Control.Feedback>
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
    </Container>
  );
};

export default ReferenceForm;
