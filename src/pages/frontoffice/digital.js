import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Dropdown, Row, Col } from "react-bootstrap";

const DigitalMarketingPage = () => {
  const [companyName, setCompanyName] = useState("DHANWIS TECHINFO SOLUTION");
  const [introduction, setIntroduction] = useState("DHANWIS TECHINFO SOLUTIONS will provide the Digital Marketing Solution as soon as the agreement is penned. We look forward to providing solutions for your needs, with this proposal being the outline of how we intend to solve it. Based on our previous discussions and our experience working in this field, we have identified and listed below suitable solution in digital marketing we provide.");
  const [contact, setContact] = useState("8086 487 219");
  const [strategyData, setStrategyData] = useState([
    { key: "expectedReach", label: "Total Expected Reach", value: "10k", editable: true, options: ["10k", "20k", "50k", "1L", "2L"] },
    { key: "paidPromotions", label: "Paid Promotions", value: "10k", editable: true, options: ["10k", "20k", "50k", "1L", "2L"] },
    { key: "creationOfSocialMediaPlatform", label: "Creation of Social Media Platform", value: "Yes", editable: true, options: ["Yes", "No"] },
    { key: "schedulingAndOptimization", label: "Scheduling & publishing yes profile optimization", value: "Yes", editable: true, options: ["Yes", "No"] },
    { key: "fbTimelineStatusPosting", label: "Fb time line status posting", value: "Yes", editable: true, options: ["Yes", "No"] },
    { key: "paidBoost", label: "Paid boost with required attributes", value: "Yes", editable: true, options: ["Yes", "No"] },
    { key: "videoSharing", label: "VIDEO SHARING in FB & INSTA (PROVIDED BY CLIENT)", value: "Yes", editable: true, options: ["Yes", "No"] },
    { key: "deleteSpam", label: "Deleting unwanted spam", value: "Yes", editable: true, options: ["Yes", "No"] },
    { key: "fbInsightMonitoring", label: "Facebook insight monitoring", value: "Yes", editable: true, options: ["Yes", "No"] },
    { key: "instaImageSharing", label: "Instagram image sharing 14 stories, reposting, poll creations, reels etc", value: "Yes", editable: true, options: ["Yes", "No"] },
    { key: "hashtagTrendResearch", label: "#Hashtag trend research", value: "Yes", editable: true, options: ["Yes", "No"] },
    { key: "googleAdsCreation", label: "Google ads account creation", value: "Yes", editable: true, options: ["Yes", "No"] },
    { key: "googleAdCampaigns", label: "Google ad campaigns", value: "Yes", editable: true, options: ["Yes", "No"] },
    { key: "keywordResearch", label: "Keyword research", value: "Yes", editable: true, options: ["Yes", "No"] },
    // Add other strategy data as needed
  ]);

  const [packageAmount, setPackageAmount] = useState("");
  const [gstRate] = useState(18);
  const [gstAmount, setGstAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const packageAmountValue = parseFloat(packageAmount);
    const gst = isNaN(packageAmountValue) ? 0 : (packageAmountValue * gstRate) / 100;
    setGstAmount(gst);
    setTotalAmount(isNaN(packageAmountValue) ? 0 : packageAmountValue + gst);
  }, [packageAmount, gstRate]);

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
    setPackageAmount(e.target.value);
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
    setTotalAmount(0); // Reset total amount when dropdown is selected
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add functionality to save the form data
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Digital Marketing Services</title>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <h1>Digital Marketing Services</h1>
          <h2>Company Name:</h2>
          <p>${companyName}</p>
          <h2>Introduction:</h2>
          <p>${introduction}</p>
          <h2>Strategy</h2>
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              ${strategyData.map((item, index) => `
                <tr key=${index}>
                  <td>${item.label}</td>
                  <td>${item.value}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <h2>Payment Details</h2>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Package Amount</td>
                <td>${packageAmount}</td>
              </tr>
              <tr>
                <td>GST (${gstRate}%)</td>
                <td>${gstAmount}</td>
              </tr>
              <tr>
                <td>Total Amount</td>
                <td>${totalAmount}</td>
              </tr>
            </tbody>
          </table>
          <h2>Terms and Conditions</h2>
          <ol>
            <li>100% of the project cost (digital marketing) should be paid in advance in acceptance of the proposal. – (For One Month Contract)</li>
            <li>DHANWIS TECHINFO SOLUTIONS assumes the client has permission from the rightful owner to use any images or design elements that are provided by the client, and are not liable for any copyright infringement or such intellectual property claims or suits.</li>
            <li>DHANWIS TECHINFO SOLUTIONS retains the right to display graphics and other elements in their portfolio and as content features in other projects.</li>
            <li>The agreement contained in this contract constitutes the sole agreement between client and DHANWIS TECHINFO SOLUTIONS regarding all items included in the same.</li>
            <li>Contents of this proposal are strictly confidential and should not be shared</li>
            <li>Advance Amount is non-refundable</li>
          </ol>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Container style={{paddingTop:"50px"}}>
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
          {strategyData.map((item, index) => (
            <tr key={index}>
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
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Package Amount</td>
            <td>
              <Form.Control 
                type="text" 
                value={packageAmount} 
                onChange={handlePackageAmountChange} 
              />
            </td>
          </tr>
          <tr>
            <td>GST ({gstRate}%)</td>
            <td>{gstAmount}</td>
          </tr>
          <tr>
            <td>Total Amount</td>
            <td>{totalAmount}</td>
          </tr>
        </tbody>
      </Table>
      
      {/* Print and Save buttons */}
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Button variant="success" onClick={handlePrint} style={{ marginRight: "10px" }}>
            Print
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DigitalMarketingPage;
