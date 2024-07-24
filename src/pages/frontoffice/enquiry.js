import React, { useState } from "react";
import {
  Button,
  Column,
  DataCell,
  DataHeader,
  DataRow,
  DataTable,
  Form,
  FormContainer,
  Input,
  InstallmentContainer,
  InstallmentRow,
  Line,
  Select,
  Step,
  StepIndicators,
  StepLabel,
  StepNumber,
  TableContainer,
  Textarea,
  Title,
  Label,
  TwoColumnRow,
} from "./enquiryStyleData";

const Enquiryfront = () => {
  const [step, setStep] = useState(1);
  const [viewData, setViewData] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    dateOfBirth: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    category: "",
    requirement: "",
    educationalQualification: "",
    course: "",
    date: "",
    lastDate: "",
    photo: null,
    paymentOption: "",
    totalAmount: "",
    totalDate: "",
    installmentCount: "",
    installments: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const addInstallment = () => {
    setFormData({
      ...formData,
      installments: [...formData.installments, { amount: "", date: "" }],
    });
  };

  const handleInstallmentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedInstallments = [...formData.installments];
    updatedInstallments[index][name] = value;
    setFormData({
      ...formData,
      installments: updatedInstallments,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleViewData = () => {
    setViewData(true);
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Contact Information</Title>
        <StepIndicators>
          <Step>
            <StepNumber active={step >= 1}>1</StepNumber>
            <StepLabel>Personal Information</StepLabel>
          </Step>
          <Line />
          <Step>
            <StepNumber active={step >= 2}>2</StepNumber>
            <StepLabel>Enquiry and Followups</StepLabel>
          </Step>
          <Line />
          <Step>
            <StepNumber active={step >= 3}>3</StepNumber>
            <StepLabel>Admission</StepLabel>
          </Step>
          <Line />
          <Step>
            <StepNumber active={step >= 4}>4</StepNumber>
            <StepLabel>Fee</StepLabel>
          </Step>
        </StepIndicators>
        {step === 1 && (
          <TwoColumnRow>
            <Column>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Column>
            <Column>
              <Label>Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </Column>
            <Column>
              <Label>Date of Birth</Label>
              <Input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </Column>
            <Column>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Column>
            <Column>
              <Label>Address</Label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Column>
            <Column>
              <Label>City</Label>
              <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Column>
            <Column>
              <Label>State</Label>
              <Input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </Column>
            <Column>
              <Label>Country</Label>
              <Input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </Column>
            <Column>
              <Label>Zip Code</Label>
              <Input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </Column>
            <Column>
              <Label>Category</Label>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                <option value="product">Product</option>
                <option value="student">Student</option>
              </Select>
            </Column>
            <Column
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button type="button" onClick={nextStep} primary>
                Next
              </Button>
              <Button type="button">Save</Button>
              <Button type="button" onClick={handleViewData}>
                View
              </Button>
            </Column>
          </TwoColumnRow>
        )}
        {step === 2 && formData.category === "product" && (
          <div>
            <Label>Product Requirement</Label>
            <Textarea
              name="requirement"
              value={formData.requirement}
              onChange={handleChange}
              required
            />
            <Label>Name</Label>
            <Input type="text" name="name" value={formData.name} readOnly />
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              readOnly
            />
            <Label>Date</Label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="button" onClick={prevStep}>
                Previous
              </Button>
              <Button type="button">Save</Button>
              <Button type="button" onClick={handleViewData}>
                View
              </Button>
              <Button type="submit" primary>
                Submit
              </Button>
            </div>
          </div>
        )}
        {step === 2 && formData.category === "student" && (
          <div>
            <Label>Educational Qualification</Label>
            <Input
              type="text"
              name="educationalQualification"
              value={formData.educationalQualification}
              onChange={handleChange}
              required
            />
            <Label>Course</Label>
            <Input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            />
            <Label>Name</Label>
            <Input type="text" name="name" value={formData.name} readOnly />
            <Label>Date of Birth</Label>
            <Input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              readOnly
            />
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              value={formData.address}
              readOnly
            />
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              readOnly
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="button" onClick={prevStep}>
                Previous
              </Button>
              <Button type="button">Save</Button>
              <Button type="button" onClick={handleViewData}>
                View
              </Button>
              <Button type="button" onClick={nextStep} primary>
                Next
              </Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <Label>Course</Label>
            <Input type="text" name="course" value={formData.course} readOnly />
            <Label>Date of Join</Label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <Label>Last Date</Label>
            <Input
              type="date"
              name="lastDate"
              value={formData.lastDate}
              onChange={handleChange}
              required
            />
            <Label>Photo</Label>
            <Input
              type="file"
              name="photo"
              onChange={handleFileChange}
              required
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="button" onClick={prevStep}>
                Previous
              </Button>
              <Button type="button">Save</Button>
              <Button type="button" onClick={handleViewData}>
                View
              </Button>
              <Button type="button" onClick={nextStep} primary>
                Next
              </Button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div>
            <Label>Payment Option</Label>
            <Select
              name="paymentOption"
              value={formData.paymentOption}
              onChange={handleChange}
              required
            >
              <option value="">Please select</option>
              <option value="total">Total Amount</option>
              <option value="installment">Installment</option>
            </Select>
            {formData.paymentOption === "total" && (
              <div>
                <Label>Total Amount</Label>
                <Input
                  type="text"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  required
                />
                <Label>Date</Label>
                <Input
                  type="date"
                  name="totalDate"
                  value={formData.totalDate}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {formData.paymentOption === "installment" && (
              <div>
                <Label>Number of Installments</Label>
                <Input
                  type="number"
                  name="installmentCount"
                  value={formData.installmentCount}
                  onChange={handleChange}
                  required
                />
                <InstallmentContainer>
                  {formData.installments.map((installment, index) => (
                    <InstallmentRow key={index}>
                      <Input
                        type="text"
                        name="amount"
                        placeholder="Amount"
                        value={installment.amount}
                        onChange={(e) => handleInstallmentChange(index, e)}
                        required
                      />
                      <Input
                        type="date"
                        name="date"
                        value={installment.date}
                        onChange={(e) => handleInstallmentChange(index, e)}
                        required
                      />
                    </InstallmentRow>
                  ))}
                  {formData.installments.length < formData.installmentCount && (
                    <Button type="button" onClick={addInstallment}>
                      Add Installment
                    </Button>
                  )}
                </InstallmentContainer>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="button" onClick={prevStep}>
                Previous
              </Button>
              <Button type="button">Save</Button>
              <Button type="button" onClick={handleViewData}>
                View
              </Button>
              <Button type="submit" primary>
                Submit
              </Button>
            </div>
          </div>
        )}
      </Form>
      {viewData && (
        <TableContainer>
          <DataTable>
            <thead>
              <tr>
                <DataHeader>Field</DataHeader>
                <DataHeader>Value</DataHeader>
              </tr>
            </thead>
            <tbody>
              {Object.keys(formData).map((key) => (
                <DataRow key={key}>
                  <DataCell>{key}</DataCell>
                  <DataCell>{formData[key]?.toString()}</DataCell>
                </DataRow>
              ))}
            </tbody>
          </DataTable>
        </TableContainer>
      )}
    </FormContainer>
  );
};

export default Enquiryfront;
