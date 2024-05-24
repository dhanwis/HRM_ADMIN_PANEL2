import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";

const WebAppDevelopmentPage = () => {
  const [companyName, setCompanyName] = useState("Stewart Business Academy");
  const [introduction, setIntroduction] = useState(
    "DHANWIS TECHINFO SOLUTIONS will provide the Dynamic Website Solution as soon as the agreement is penned. We look forward to providing solutions for your needs, with this proposal being the outline of how we intend to solve it. Based on our previous discussions and our experience working in this field, we have identified and listed below ..."
  );
  const [contact, setContact] = useState("8086 487 219");
  const [strategyData, setStrategyData] = useState([
    { key: "home", label: "Home", value: "Contains a search bar, Top 10 Brokers list, News, Ranking List, etc." },
    { key: "brokers", label: "Brokers", value: "Display all the brokers and their details." },
    { key: "rankingList", label: "Ranking List", value: "Display the brokers and their ranking score." },
    { key: "news", label: "News", value: "Display all the news related to brokers (text and image only)." },
    { key: "education", label: "Education", value: "Display all the educational details. Blogs Method (text and image only)." },
  ]);
  const [packageAmount, setPackageAmount] = useState(30000);
  const [gstRate] = useState(18);
  const [gstAmount, setGstAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const gst = (packageAmount * gstRate) / 100;
    setGstAmount(gst);
    setTotalAmount(packageAmount + gst);
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
    setPackageAmount(parseInt(e.target.value));
  };

  const handleStrategyInputChange = (key, e) => {
    const updatedStrategyData = strategyData.map((item) => {
      if (item.key === key) {
        return { ...item, value: e.target.value };
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
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Web App Development Services</title>
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
          <h1>Web App Development Services</h1>
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
              ${strategyData
                .map(
                  (item, index) => `
                <tr key=${index}>
                  <td>${item.label}</td>
                  <td>${item.value}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <h2>Payment Details</h2>
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Development Charge</td>
                <td>${packageAmount}</td>
              </tr>
              <tr>
                <td>GST Amount (${gstRate}%)</td>
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
            <li>40% of the project cost should be paid in advance in acceptance of the proposal. 30% After UI Design Final 30% Before project Delivery.</li>
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
    <Container style={{ paddingTop: "50px" }}>
      <h1>Web App Development Services</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="companyName">
          <Form.Label>Company Name:</Form.Label>
          <Form.Control type="text" value={companyName} onChange={handleCompanyNameChange} />
        </Form.Group>
        <Form.Group controlId="introduction">
          <Form.Label>Introduction:</Form.Label>
          <Form.Control as="textarea" rows={3} value={introduction} onChange={handleIntroductionChange} />
        </Form.Group>
        <Form.Group controlId="contact">
          <Form.Label>Issued By:</Form.Label>
          <Form.Control type="text" value={contact} onChange={handleContactChange} />
        </Form.Group>

        <h2>Strategy</h2>
        {strategyData.map((item) => (
          <Form.Group controlId={item.key} key={item.key}>
            <Form.Label>{item.label}:</Form.Label>
            <Form.Control type="text" value={item.value} onChange={(e) => handleStrategyInputChange(item.key, e)} />
          </Form.Group>
        ))}

        <h2>Payment Details</h2>
        <Form.Group controlId="packageAmount">
          <Form.Label>Development Charge:</Form.Label>
          <Form.Control type="number" value={packageAmount} onChange={handlePackageAmountChange} />
        </Form.Group>
        <Form.Group controlId="gstAmount">
          <Form.Label>GST Amount ({gstRate}%):</Form.Label>
          <Form.Control type="text" value={gstAmount} readOnly />
        </Form.Group>
        <Form.Group controlId="totalAmount">
          <Form.Label>Total Amount:</Form.Label>
          <Form.Control type="text" value={totalAmount} readOnly />
        </Form.Group>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Button variant="success" onClick={handlePrint} style={{ marginRight: "10px" }}>
            Print
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default WebAppDevelopmentPage;
