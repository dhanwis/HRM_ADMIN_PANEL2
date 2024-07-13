import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bg from "../../assets/images/bgvector.png";

const Quotation = () => {
  const [companyName, setCompanyName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [contact, setContact] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [quotationType, setQuotationType] = useState("");
  const [addon, setAddon] = useState(new Date());
  const [expiredOn, setExpiredOn] = useState(new Date());
  const [strategyData, setStrategyData] = useState([]);
  const [packageAmount, setPackageAmount] = useState(30000);
  const [gstRate] = useState(18);
  const [gstAmount, setGstAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [quotations, setQuotations] = useState([]);
  const [viewingQuotation, setViewingQuotation] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const gst = (packageAmount * gstRate) / 100;
    setGstAmount(gst);
    setTotalAmount(packageAmount + gst);
  }, [packageAmount, gstRate]);

  useEffect(() => {
    const storedQuotations = localStorage.getItem("quotations");
    if (storedQuotations) {
      setQuotations(JSON.parse(storedQuotations));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quotations", JSON.stringify(quotations));
  }, [quotations]);

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  const handleQuotationTypeChange = (e) => {
    setQuotationType(e.target.value);
  };

  const handleAddonChange = (date) => {
    setAddon(date);
  };

  const handleExpiredOnChange = (date) => {
    setExpiredOn(date);
  };

  const handlePackageAmountChange = (e) => {
    setPackageAmount(parseInt(e.target.value));
  };

  const handleStrategyInputChange = (index, key, e) => {
    const updatedStrategyData = [...strategyData];
    updatedStrategyData[index][key] = e.target.value;
    setStrategyData(updatedStrategyData);
  };

  const handleAddStrategy = () => {
    setStrategyData([...strategyData, { key: "", value: "" }]);
  };

  const handleDeleteStrategy = (index) => {
    const updatedStrategyData = strategyData.filter((_, i) => i !== index);
    setStrategyData(updatedStrategyData);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!companyName) newErrors.companyName = "Company Name is required";
    if (!introduction) newErrors.introduction = "Introduction is required";
    if (!contact) newErrors.contact = "Contact is required";
    if (!customerName) newErrors.customerName = "Customer Name is required";
    if (!quotationType) newErrors.quotationType = "Quotation Type is required";
    if (!addon) newErrors.addon = "Addon date is required";
    if (!expiredOn) newErrors.expiredOn = "Expiry date is required";
    if (isNaN(packageAmount) || packageAmount <= 0)
      newErrors.packageAmount = "Valid package amount is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = {
      id: quotations.length + 1,
      companyName,
      introduction,
      contact,
      customerName,
      quotationType,
      addon,
      expiredOn,
      strategyData,
      packageAmount,
      gstAmount,
      totalAmount,
    };
    setQuotations([...quotations, formData]);
    setShowForm(false); // Hide form after submission
  };

  const handleViewQuotation = (id) => {
    const quotation = quotations.find((q) => q.id === id);
    setViewingQuotation(quotation);
  };

  const handleDeleteQuotation = (id) => {
    const updatedQuotations = quotations.filter((q) => q.id !== id);
    setQuotations(updatedQuotations);
    setViewingQuotation(null);
  };

  const handlePrint = () => {
    if (!viewingQuotation) return;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Web App Development Services</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              padding: 0;
              color: #333;
            }
            h1, h2, h3 {
              text-align: center;
              font-size: 20px;
              margin: 10px 0;
            }
            p, td, th, li {
              font-size: 16px;
              margin: 5px 0;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            ol {
              padding-left: 20px;
            }
            .field-container {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
            }
            .field-container p {
              margin: 0;
              width: 50%;
            }
            .field-container p.field-name {
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <h1>Quotation</h1>
          <div class="field-container">
            <p class="field-name">Company Name:</p>
            <p>${viewingQuotation.companyName}</p>
          </div>
          <div class="field-container">
            <p class="field-name">Customer Name:</p>
            <p>${viewingQuotation.customerName}</p>
          </div>
          <div class="field-container">
            <p class="field-name">Quotation Type:</p>
            <p>${viewingQuotation.quotationType}</p>
          </div>
          <div class="field-container">
            <p class="field-name">Addon:</p>
            <p>${new Date(viewingQuotation.addon).toDateString()}</p>
          </div>
          <div class="field-container">
            <p class="field-name">Expired On:</p>
            <p>${new Date(viewingQuotation.expiredOn).toDateString()}</p>
          </div>
          <div class="field-container">
            <p class="field-name">Introduction:</p>
            <p>${viewingQuotation.introduction}</p>
          </div>
          <h2>Strategy</h2>
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              ${viewingQuotation.strategyData
                .map(
                  (item, index) => `
                <tr key=${index}>
                  <td>${item.key}</td>
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
                <td>${viewingQuotation.packageAmount}</td>
              </tr>
              <tr>
                <td>GST Amount (${gstRate}%)</td>
                <td>${viewingQuotation.gstAmount}</td>
              </tr>
              <tr>
                <td>Total Amount</td>
                <td>${viewingQuotation.totalAmount}</td>
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
    <div style={{ backgroundImage: `url(${bg})`, height: "750px" }}>
      <Container style={{ paddingTop: "50px" }}>
        <Button variant="primary" onClick={() => setShowForm(!showForm)} style={{ marginBottom: "30px" }}>
          {showForm ? "Hide Quotation Form" : "Add Quotation"}
        </Button>

        {showForm && (
          <Form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <Form.Group controlId="companyName" className="mb-3">
              <Form.Label>Company Name:</Form.Label>
              <Form.Control type="text" value={companyName} onChange={handleCompanyNameChange} isInvalid={!!errors.companyName} />
              <Form.Control.Feedback type="invalid">{errors.companyName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="introduction" className="mb-3">
              <Form.Label>Introduction:</Form.Label>
              <Form.Control as="textarea" rows={3} value={introduction} onChange={handleIntroductionChange} isInvalid={!!errors.introduction} />
              <Form.Control.Feedback type="invalid">{errors.introduction}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="contact" className="mb-3">
              <Form.Label>Issued By:</Form.Label>
              <Form.Control type="text" value={contact} onChange={handleContactChange} isInvalid={!!errors.contact} />
              <Form.Control.Feedback type="invalid">{errors.contact}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="customerName" className="mb-3">
              <Form.Label>Customer Name:</Form.Label>
              <Form.Control type="text" value={customerName} onChange={handleCustomerNameChange} isInvalid={!!errors.customerName} />
              <Form.Control.Feedback type="invalid">{errors.customerName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="quotationType" className="mb-3">
              <Form.Label>Quotation Type:</Form.Label>
              <Form.Control as="select" value={quotationType} onChange={handleQuotationTypeChange} isInvalid={!!errors.quotationType}>
                <option value="">Select...</option>
                <option value="webappdevelopment">Web App Development</option>
                <option value="mobileappdevelopment">Mobile App Development</option>
                <option value="digitalmarket">Digital Marketing</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.quotationType}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="addon" className="mb-3">
              <Form.Label>Addon:</Form.Label>
              <DatePicker selected={addon} onChange={handleAddonChange} className={`form-control ${errors.addon && 'is-invalid'}`} />
              {errors.addon && <div className="invalid-feedback d-block">{errors.addon}</div>}
            </Form.Group>
            <Form.Group controlId="expiredOn" className="mb-3">
              <Form.Label>Expired On:</Form.Label>
              <DatePicker selected={expiredOn} onChange={handleExpiredOnChange} className={`form-control ${errors.expiredOn && 'is-invalid'}`} />
              {errors.expiredOn && <div className="invalid-feedback d-block">{errors.expiredOn}</div>}
            </Form.Group>

            {strategyData.map((item, index) => (
              <div key={index} className="mb-3 d-flex align-items-center">
                <Form.Group controlId={`strategyKey${index}`} className="me-2 flex-fill">
                  <Form.Label>Key:</Form.Label>
                  <Form.Control type="text" value={item.key} onChange={(e) => handleStrategyInputChange(index, 'key', e)} />
                </Form.Group>
                <Form.Group controlId={`strategyValue${index}`} className="me-2 flex-fill">
                  <Form.Label>Value:</Form.Label>
                  <Form.Control type="text" value={item.value} onChange={(e) => handleStrategyInputChange(index, 'value', e)} />
                </Form.Group>
                <Button variant="danger" onClick={() => handleDeleteStrategy(index)}>
                  Delete
                </Button>
              </div>
            ))}
            <Button variant="secondary" onClick={handleAddStrategy} className="mb-3">
              Add Strategy
            </Button>

            <h2>PAYMENT DETAILS</h2>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="packageAmount">
                  <Form.Label>Development Charge:</Form.Label>
                  <Form.Control type="number" value={packageAmount} onChange={handlePackageAmountChange} isInvalid={!!errors.packageAmount} />
                  <Form.Control.Feedback type="invalid">{errors.packageAmount}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="gstAmount">
                  <Form.Label>GST Amount (${gstRate}%):</Form.Label>
                  <Form.Control type="text" value={gstAmount} readOnly />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="totalAmount">
                  <Form.Label>Total Amount:</Form.Label>
                  <Form.Control type="text" value={totalAmount} readOnly />
                </Form.Group>
              </Col>
            </Row>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <Button variant="primary" type="submit" style={{ marginRight: "10px", marginBottom: "15px" }}>
                Save
              </Button>
            </div>
          </Form>
        )}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Quotation ID</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((quotation) => (
              <tr key={quotation.id}>
                <td>{quotation.id}</td>
                <td>
                  <Button variant="link" onClick={() => handleViewQuotation(quotation.id)}>
                    View Quotation
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {viewingQuotation && (
          <div style={{ marginTop: "20px" }}>
            <h2>Quotation Details</h2>
            <div className="field-container">
              <p className="field-name"><strong>Company Name:</strong></p>
              <p>{viewingQuotation.companyName}</p>
            </div>
            <div className="field-container">
              <p className="field-name"><strong>Customer Name:</strong></p>
              <p>{viewingQuotation.customerName}</p>
            </div>
            <div className="field-container">
              <p className="field-name"><strong>Quotation Type:</strong></p>
              <p>{viewingQuotation.quotationType}</p>
            </div>
            <div className="field-container">
              <p className="field-name"><strong>Addon:</strong></p>
              <p>{new Date(viewingQuotation.addon).toDateString()}</p>
            </div>
            <div className="field-container">
              <p className="field-name"><strong>Expired On:</strong></p>
              <p>{new Date(viewingQuotation.expiredOn).toDateString()}</p>
            </div>
            <div className="field-container">
              <p className="field-name"><strong>Introduction:</strong></p>
              <p>{viewingQuotation.introduction}</p>
            </div>
            <h3>Strategy</h3>
            <ul>
              {viewingQuotation.strategyData.map((item, index) => (
                <li key={index}><strong>{item.key}:</strong> {item.value}</li>
              ))}
            </ul>
            <h3>Payment Details</h3>
            <Table striped bordered>
              <tbody>
                <tr>
                  <td>Development Charge</td>
                  <td>{viewingQuotation.packageAmount}</td>
                </tr>
                <tr>
                  <td>GST Amount (${gstRate}%):</td>
                  <td>{viewingQuotation.gstAmount}</td>
                </tr>
                <tr>
                  <td>Total Amount</td>
                  <td>{viewingQuotation.totalAmount}</td>
                </tr>
              </tbody>
            </Table>
            <div>
              <Button variant="success" onClick={handlePrint} style={{ marginRight: "10px" }}>
                Print Quotation
              </Button>
              <Button variant="danger" onClick={() => handleDeleteQuotation(viewingQuotation.id)}>
                Delete Quotation
              </Button>
              <Button variant="secondary" onClick={() => setViewingQuotation(null)} style={{ marginLeft: "10px" }}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Quotation;
