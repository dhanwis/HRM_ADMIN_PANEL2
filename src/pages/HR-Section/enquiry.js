import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonDlt,
  Column,
  Form,
  FormContainer,
  Input,
  InstallmentContainer,
  InstallmentRow,
  Label,
  Select,
  Step,
  StepIndicators,
  StepLabel,
  StepNumber,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  Textarea,
  Title,
  TwoColumnRow,
} from "./enquiryStyle";
import { baseUrl } from "../../url";

const EnquiryAdmissionForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    dob: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    password: "",
    profile: {
      educationalQualification: "",
      course: "",
      start_date: "",
      end_date: "",
      category: "",
      payment: "",
      total_amount: "",
      payment_date: "",
      no_of_installments: 0,
      installments: [
        { amount: "", date: "" },
        { amount: "", date: "" },
      ],
    },
  });

  const [enquiries, setEnquiries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentEnquiry, setCurrentEnquiry] = useState(null);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const addFollowup = () => {
    setFormData({
      ...formData,
      followups: [...formData.followups, { date: "" }],
    });
  };

  const handleFollowupChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFollowups = [...formData.followups];
    updatedFollowups[index][name] = value;
    setFormData({
      ...formData,
      followups: updatedFollowups,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("value", value);
    const keys = name.split("."); // Support nested keys
    console.log("key", keys);
    const newFormData = { ...formData };

    let current = newFormData;
    for (let i = 0; i < keys.length - 1; i++) {
      console.log("i", i);
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
      console.log("current", current);
    }

    current[keys[keys.length - 1]] = value;

    console.log("herethedata", newFormData);
    setFormData(newFormData);
  };

  const addInstallment = () => {
    setFormData((prevState) => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        installments: [
          ...prevState.profile.installments,
          { amount: "", date: "" },
        ],
      },
    }));
  };

  const handleInstallmentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedInstallments = [...formData.profile.installments];
    updatedInstallments[index][name] = value;
    console.log(
      "updatedInstallments[index][name]",
      updatedInstallments[index][name]
    );
    setFormData((prevState) => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        installments: updatedInstallments,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEnquiry !== null) {
      const updatedEnquiries = enquiries.map((enquiry) =>
        enquiry.id === currentEnquiry.id ? { ...enquiry, ...formData } : enquiry
      );
      setEnquiries(updatedEnquiries);
    } else {
      const newEnquiry = {
        ...formData,
        id: enquiries.length + 1,
      };
      console.log("new en", newEnquiry);
      fetch(`${baseUrl}/intern-reg/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEnquiry),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      setEnquiries([...enquiries, newEnquiry]);
    }
    setShowForm(false);
    resetForm();
  };

  const getEnquiries = async () => {
    try {
      const response = await fetch(`${baseUrl}/intern-reg/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch enquiries");
      }

      const data = await response.json();
      console.log('data',data)
      setEnquiries(data);
    } catch (error) {
      console.error("Error fetching enquiries:", error.message);
    }
  };

  useEffect(() => {
    getEnquiries();
  }, []);

  const handleSave = () => {
    if (currentEnquiry) {
      const updatedEnquiries = enquiries.map((enquiry) =>
        enquiry.id === currentEnquiry.id ? { ...enquiry, ...formData } : enquiry
      );
      setEnquiries(updatedEnquiries);
      console.log("en", enquiries);
    } else {
      const newEnquiry = {
        ...formData,
        id: enquiries.length + 1,
      };
      setEnquiries([...enquiries, newEnquiry]);
    }
    resetForm();
    setShowForm(false);
  };

  const handleView = (index) => {
    const enquiry = enquiries[index];
    setFormData(enquiry);
    setCurrentEnquiry(enquiry);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    console.log("index", index);
  };

  const resetForm = () => {
    setFormData({
      username: "",
      phone_number: "",
      dob: "",
      email: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      password: "",
      profile: {
        university: "",
        degree_program: "",
        internship_position: "",
        start_date: "",
        end_date: "",
        category: "",
        payment: "",
        no_of_installments: 0,
        installments: [
          { amount: "", date: "" },
          { amount: "", date: "" },
        ],
      },
    });
    setCurrentEnquiry(null);
    setStep(1);
  };

  return (
    <FormContainer>
      <TableContainer>
        <Button
          onClick={() => {
            setShowForm(true);
            resetForm();
          }}
        >
          Add Enquiry
        </Button>
        <Table>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Phone Number</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>View</TableHeader>
              <TableHeader>Delete</TableHeader>
            </tr>
          </thead>
          <tbody>
            {enquiries &&
              enquiries.map((enquiry, index) => (
                <tr key={index}>
                  <TableCell>{enquiry.username}</TableCell>
                  <TableCell>{enquiry.phone_number}</TableCell>
                  <TableCell>{enquiry.profile.category}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleView(index)}>View</Button>
                  </TableCell>

                  <TableCell>
                    <ButtonDlt onClick={() => handleDelete(index)}>
                      Delete
                    </ButtonDlt>
                  </TableCell>
                </tr>
              ))}
          </tbody>
        </Table>
      </TableContainer>
      {showForm && (
        <Form onSubmit={handleSubmit}>
          <Title>Contact Information</Title>
          <StepIndicators>
            <Step>
              <StepNumber active={step >= 1}>1</StepNumber>
              <StepLabel>Personal Information</StepLabel>
            </Step>
            <Step>
              <StepNumber active={step >= 2}>2</StepNumber>
              <StepLabel>Enquiry and Followups</StepLabel>
            </Step>
            <Step>
              <StepNumber active={step >= 3}>3</StepNumber>
              <StepLabel>
                {formData.profile.category === "Product"
                  ? "Work Confirmation"
                  : "Admission"}
              </StepLabel>
            </Step>
            <Step>
              <StepNumber active={step >= 4}>4</StepNumber>
              <StepLabel>Fee</StepLabel>
            </Step>
          </StepIndicators>
          {step === 1 && (
            <TwoColumnRow>
              <Column>
                <Label>UserName</Label>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Column>
              <Column>
                <Label>Phone Number</Label>
                <Input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
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
                <Label>Pin Code</Label>
                <Input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </Column>
              <Column>
                <Label>Category</Label>
                <Select
                  name="profile.category" // Use dot notation to match nested structure
                  value={formData.profile.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Please select</option>
                  <option value="Product">Product</option>
                  <option value="Student">Student</option>
                </Select>
              </Column>

              <Column
                style={{
                  display: "flex",
                  height: "70px",
                  marginTop: "20px",
                  marginLeft: "500px",
                  gap: "30px",
                }}
              >
                <Button type="button" onClick={nextStep} primary>
                  Next
                </Button>
                <Button type="button" onClick={handleSave} primary>
                  Save
                </Button>
              </Column>
            </TwoColumnRow>
          )}

          {step === 2 && formData.profile.category === "Product" && (
            <div>
              <Label>Product Requirement</Label>
              <Textarea
                name="requirement"
                value={formData.requirement}
                onChange={handleChange}
                required
              />
              {/* <FollowupContainer>
                <Button type="button" onClick={addFollowup}>
                  Add Followup
                </Button>
                {formData.followups.map((followup, index) => (
                  <FollowupRow key={index}>
                    <Label>Followup {index + 1} Date</Label>
                    <Input
                      type="date"
                      name="date"
                      value={followup.date}
                      onChange={(e) => handleFollowupChange(index, e)}
                      required
                    />
                  </FollowupRow>
                ))}
              </FollowupContainer> */}
              <Button type="button" onClick={prevStep}>
                Previous
              </Button>
              <Button type="button" onClick={handleSave} primary>
                Save
              </Button>
              <Button type="button" onClick={() => setShowForm(false)}>
                Reject
              </Button>
              <Button type="button" onClick={nextStep} primary>
                Proceed
              </Button>
            </div>
          )}
          {step === 2 && formData.profile.category === "Student" && (
            <div>
              <Label>Educational Qualification</Label>
              <Input
                type="text"
                name="profile.educationalQualification"
                value={formData.educationalQualification}
                onChange={handleChange}
                required
              />
              <Label>Course</Label>
              {/* <Input type="text" name="name" value={formData.name} readOnly /> */}
              <Input
                type="text"
                name="profile.course"
                value={formData.course}
                onChange={handleChange}
                required
              />

              {/* <FollowupContainer>
                <Button type="button" onClick={addFollowup}>
                  Add Followup
                </Button>
                {formData.followups.map((followup, index) => (
                  <FollowupRow key={index}>
                    <Label>Followup {index + 1} Date</Label>
                    <Input
                      type="date"
                      name="date"
                      value={followup.date}
                      onChange={(e) => handleFollowupChange(index, e)}
                      required
                    />
                  </FollowupRow>
                ))}
              </FollowupContainer> */}
              <Button type="button" onClick={prevStep}>
                Previous
              </Button>
              <Button type="button" onClick={handleSave} primary>
                Save
              </Button>
              <Button type="button" onClick={() => setShowForm(false)}>
                Reject
              </Button>
              <Button type="button" onClick={nextStep} primary>
                Proceed
              </Button>
            </div>
          )}
          {step === 3 && formData.profile.category === "Product" && (
            <div>
              <Label>Confirm Date</Label>
              <Input
                type="date"
                name="confirmDate"
                value={formData.confirmDate}
                onChange={handleChange}
                required
              />
              <Label>Contact Person</Label>
              <Input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                required
              />
              <Label>Work Finishing Date</Label>
              <Input
                type="date"
                name="workFinishingDate"
                value={formData.workFinishingDate}
                onChange={handleChange}
                required
              />
              <Label>Final Requirement</Label>
              <Textarea
                name="finalRequirement"
                value={formData.finalRequirement}
                onChange={handleChange}
                required
              />
              <Label>Final Amount</Label>
              <Input
                type="text"
                name="finalAmount"
                value={formData.finalAmount}
                onChange={handleChange}
                required
              />
              <Button type="button" onClick={prevStep}>
                Previous
              </Button>
              <Button type="button" onClick={handleSave} primary>
                Save
              </Button>
              <Button type="button" onClick={nextStep} primary>
                Next
              </Button>
            </div>
          )}
          {step === 3 && formData.profile.category === "Student" && (
            <div>
              <Label>Date of Birth</Label>
              <Input
                type="date"
                name="dob"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />

              <Label>Date of Join</Label>
              <Input
                type="date"
                name="profile.start_date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <Label>Last Date</Label>
              <Input
                type="date"
                name="profile.end_date"
                value={formData.lastDate}
                onChange={handleChange}
                required
              />
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {/* <Label>Upload Photo</Label>
              <Input
                type="file"
                name="photo"
                onChange={handleFileChange}
                required
              /> */}
              <Button type="button" onClick={prevStep}>
                Previous
              </Button>
              <Button type="button" onClick={handleSave} primary>
                Save
              </Button>
              <Button type="button" onClick={nextStep} primary>
                Next
              </Button>
            </div>
          )}
          {step === 4 && (
            <div>
              <Label>Payment Method</Label>
              <Select
                name="profile.payment"
                value={formData.profile.payment}
                onChange={handleChange}
                required
              >
                <option value="">Please select</option>
                <option value="Installment">Installment</option>
                <option value="Total Amount">Total</option>
              </Select>
              {formData.profile.payment === "Total Amount" && (
                <div>
                  <Label>Total Amount</Label>
                  <Input
                    type="text"
                    name="profile.total_amount"
                    value={formData.profile.total_amount}
                    onChange={handleChange}
                    required
                  />
                  <Label>Payment Date</Label>
                  <Input
                    type="date"
                    name="payment_date"
                    value={formData.totalDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              {formData.profile.payment === "installment" && (
                <InstallmentContainer>
                  <Label>Number of Installments</Label>
                  <Input
                    type="number"
                    name="profile.no_of_installments"
                    value={formData.profile.no_of_installments}
                    onChange={handleChange}
                    required
                  />
                  <Button type="button" onClick={addInstallment}>
                    Add Installment
                  </Button>
                  {formData.profile.installments?.map((installment, index) => (
                    <InstallmentRow key={index}>
                      <Column>
                        <Label>Installment {index + 1} Amount</Label>
                        <Input
                          type="text"
                          name="amount"
                          value={installment.amount}
                          onChange={(e) => handleInstallmentChange(index, e)}
                          required
                        />
                      </Column>
                      <Column>
                        <Label>Installment {index + 1} Date</Label>
                        <Input
                          type="date"
                          name="date"
                          value={installment.date}
                          onChange={(e) => handleInstallmentChange(index, e)}
                          required
                        />
                      </Column>
                    </InstallmentRow>
                  ))}
                </InstallmentContainer>
              )}
              <Button type="button" onClick={prevStep}>
                Previous
              </Button>
              <Button type="button" onClick={handleSave} primary>
                Save
              </Button>
              <Button type="submit" primary>
                Submit
              </Button>
            </div>
          )}
        </Form>
      )}
    </FormContainer>
  );
};
export default EnquiryAdmissionForm;
