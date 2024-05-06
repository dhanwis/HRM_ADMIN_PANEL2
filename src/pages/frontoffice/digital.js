import React, { useState } from "react";
import { Container, Form, Button, Table, Dropdown } from "react-bootstrap";

const DigitalMarketingPage = () => {
  const [companyName, setCompanyName] = useState("DHANWIS TECHINFO SOLUTION");
  const [introduction, setIntroduction] = useState("DHANWIS TECHINFO SOLUTIONS will provide the Digital Marketing Solution as soon as the agreement is penned. We look forward to providing solutions for your needs, with this proposal being the outline of how we intend to solve it. Based on our previous discussions and our experience working in this field, we have identified and listed below suitable solution in digital marketing we provide.");
  const [contact, setContact] = useState("8086 487 219");
  const [strategyData, setStrategyData] = useState([
    { key: "expectedReach", label: "Total Expected Reach", value: "10k", editable: true, options: ["10k", "20k", "50k", "1L", "2L"] },
    { key: "paidPromotions", label: "Paid Promotions", value: "10k", editable: true, options: ["10k", "20k", "50k", "1L", "2L"] },
    { key: "creationOfSocialMediaPlatform", label: "Creation of Social Media Platform", value: "Yes", editable: true, options: ["Yes", "No"] },
    // Add other strategy data as needed
  ]);

  const [packageAmount, setPackageAmount] = useState("");
  const [gstRate] = useState(18);
  const [totalAmount, setTotalAmount] = useState("");

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handlePackageAmountChange = (e) => {
    const inputValue = e.target.value;
    const expression = inputValue.replace(/\s/g, ""); // Remove whitespace
    try {
      const result = eval(expression); // Evaluate the expression
      setPackageAmount(expression); // Store the expression
      const gstAmount = (result * gstRate) / 100;
      setTotalAmount(`${result} + ${gstAmount} = ${result + gstAmount}`);
    } catch (error) {
      // If the expression is invalid, set the total amount to an error message
      setTotalAmount("Invalid expression");
    }
  };

  const handleStrategyInputChange = (key, e) => {
    const updatedStrategyData = strategyData.map(item => {
      if (item.key === key) {
        return { ...item, value: e.target.value };
      }
      return item;
    });
    setStrategyData(updatedStrategyData);
  };

  const handleDropdownSelect = (key, value) => {
    const updatedStrategyData = strategyData.map(item => {
      if (item.key === key) {
        return { ...item, value };
      }
      return item;
    });
    setStrategyData(updatedStrategyData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add functionality to save the form data
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Container>
      <h1>Digital Marketing Services</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="companyName">
          <Form.Label>Company Name:</Form.Label>
          <Form.Control 
            type="text" 
            value={companyName} 
            onChange={handleCompanyNameChange} 
          />
        </Form.Group>
        <Form.Group controlId="introduction">
          <Form.Label>Introduction:</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            value={introduction} 
            onChange={handleIntroductionChange} 
          />
        </Form.Group>
        <Form.Group controlId="contact">
          <Form.Label>Issued By:</Form.Label>
          <Form.Control 
            type="text" 
            value={contact} 
            onChange={handleContactChange} 
          />
        </Form.Group>
      </Form>

      <h2>Strategy</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {strategyData.map(item => (
            <tr key={item.key}>
              <td>{item.label}</td>
              <td>
                {item.editable ? (
                  <Dropdown onSelect={(value) => handleDropdownSelect(item.key, value)}>
                    <Dropdown.Toggle variant="secondary">
                      {item.value}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {item.options && item.options.map(option => (
                        <Dropdown.Item key={option} eventKey={option}>{option}</Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <span>{item.value}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>Payment Details</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>For 2 Month Package</td>
            <td>{totalAmount}</td>
          </tr>
        </tbody>
      </Table>
      
      {/* Print button */}
      <Button variant="success" onClick={handlePrint}>
        Print
      </Button>

      {/* Section for printing data */}
      <div id="print-section" style={{ display: "none" }}>
        <h1>Digital Marketing Services</h1>
        <h2>Strategy</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {strategyData.map(item => (
              <tr key={item.key}>
                <td>{item.label}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h2>Payment Details</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>For 2 Month Package</td>
              <td>{totalAmount}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default DigitalMarketingPage;
