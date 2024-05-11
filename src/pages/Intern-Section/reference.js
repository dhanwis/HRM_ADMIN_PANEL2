import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

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
    <Container>
    <div className="container mt-5">
      <h3 className="text-center ">Reference </h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div>
        <h3>Referrer Information</h3>
        </div>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="referrerLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="referrerLastName"
              value={formData.referrerLastName}
              onChange={handleChange}
              required
              pattern="[a-zA-Z]+"
              isInvalid={validated && !validateName(formData.referrerLastName)}
            />
            <Form.Control.Feedback type="invalid">Please provide a valid last name (only letters).</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="referrerFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="referrerFirstName"
              value={formData.referrerFirstName}
              onChange={handleChange}
              required
              pattern="[a-zA-Z]+"
              isInvalid={validated && !validateName(formData.referrerFirstName)}
            />
            <Form.Control.Feedback type="invalid">Please provide a valid first name (only letters).</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Select name="department" value={formData.department} onChange={handleChange} required>
            <option value="">Please Select</option>
            <option value="human resource">Human Resource</option>
            <option value="operation">Operation</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
            <option value="product">Product</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">Please select a department.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Please provide a title.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="referrerEmail">
          <Form.Label>Referrer Email</Form.Label>
          <Form.Control type="email" name="referrerEmail" value={formData.referrerEmail} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
        </Form.Group>

        <h3>Referral Information</h3>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="referralLastName">
            <Form.Label>Last Name</Form.Label>
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
            <Form.Label>First Name</Form.Label>
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
        <Form.Group className="mb-3" controlId="referralCV">
          <Form.Label>Referral CV</Form.Label>
          <Form.Control type="file" name="referralCV" onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Please provide a CV.</Form.Control.Feedback>
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="referenceLetter">
          <Form.Label>Reference Letter</Form.Label>
          <Form.Control type="file" name="referenceLetter" onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Please provide a reference letter.</Form.Control.Feedback>
        </Form.Group> */}
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
