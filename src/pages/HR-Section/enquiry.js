import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: #f2f2f2;
`;

const TableContainer = styled.div`
    width: 90%;
    margin-top: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
`;

const TableHeader = styled.th`
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    background-color: #4caf50;
    color: white;
`;

const TableCell = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
`;

const Form = styled.form`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    width: 100%;
    margin: 20px;
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const TwoColumnRow = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const Column = styled.div`
    flex: 1;
    min-width: 45%;
    margin: 5px;
`;

const Label = styled.label`
    display: block;
    margin-top: 15px;
    font-weight: bold;
`;

const Input = styled.input`
    display: block;
    width: calc(100% - 20px);
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 15px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;

    &:focus {
        border-color: #4caf50;
    }
`;

const Textarea = styled.textarea`
    display: block;
    width: calc(100% - 20px);
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 15px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;

    &:focus {
        border-color: #4caf50;
    }
`;

const Select = styled.select`
    display: block;
    width: calc(100% - 20px);
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 15px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;

    &:focus {
        border-color: #4caf50;
    }
`;

const Button = styled.button`
    padding: 10px 20px;
    margin: 10px 5px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    ${({ primary }) =>
        primary
            ? `
        background-color: #4caf50;
        color: white;
    `
            : `
        background-color: #008cba;
        color: white;
    `}

    &:hover {
        opacity: 0.9;
    }
`;

const StepIndicators = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
`;

const Step = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StepNumber = styled.div`
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    background-color: ${({ active }) => (active ? '#4caf50' : '#ddd')};
    color: white;
    text-align: center;
    font-weight: bold;
    margin-bottom: 5px;
`;

const StepLabel = styled.div`
    font-size: 12px;
    text-align: center;
`;

const InstallmentContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const InstallmentRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
`;

const FollowupContainer = styled.div`
    margin-top: 20px;
`;

const FollowupRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const EnquiryAdmissionForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        dateOfBirth: '',
        email: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        category: '',
        requirement: '',
        educationalQualification: '',
        course: '',
        date: '',
        lastDate: '',
        slot: '',
        photo: null,
        paymentOption: '',
        totalAmount: '',
        totalDate: '',
        installmentCount: '',
        installments: [],
        followups: [],
        confirmDate: '',
        contactPerson: '',
        workFinishingDate: '',
        finalRequirement: '',
        finalAmount: '',
    });
    const [enquiries, setEnquiries] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentEnquiry, setCurrentEnquiry] = useState(null);

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
            installments: [...formData.installments, { amount: '', date: '' }],
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

    const addFollowup = () => {
        setFormData({
            ...formData,
            followups: [...formData.followups, { date: '' }],
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
            setEnquiries([...enquiries, newEnquiry]);
        }
        setShowForm(false);
        resetForm();
    };

    const handleSave = () => {
        if (currentEnquiry) {
            const updatedEnquiries = enquiries.map((enquiry) =>
                enquiry.id === currentEnquiry.id ? { ...enquiry, ...formData } : enquiry
            );
            setEnquiries(updatedEnquiries);
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

    const resetForm = () => {
        setFormData({
            name: '',
            phoneNumber: '',
            dateOfBirth: '',
            email: '',
            address: '',
            city: '',
            state: '',
            country: '',
            zipCode: '',
            category: '',
            requirement: '',
            educationalQualification: '',
            course: '',
            date: '',
            lastDate: '',
            slot: '',
            photo: null,
            paymentOption: '',
            totalAmount: '',
            totalDate: '',
            installmentCount: '',
            installments: [],
            followups: [],
            confirmDate: '',
            contactPerson: '',
            workFinishingDate: '',
            finalRequirement: '',
            finalAmount: '',
        });
        setCurrentEnquiry(null);
        setStep(1);
    };

    return (
        <FormContainer>
            <TableContainer>
                <Button onClick={() => {
                    setShowForm(true);
                    resetForm();
                }}>Add Enquiry</Button>
                <Table>
                    <thead>
                        <tr>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Phone Number</TableHeader>
                            <TableHeader>Category</TableHeader>
                            <TableHeader>Action</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {enquiries.map((enquiry, index) => (
                            <tr key={index}>
                                <TableCell>{enquiry.name}</TableCell>
                                <TableCell>{enquiry.phoneNumber}</TableCell>
                                <TableCell>{enquiry.category}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleView(index)}>View</Button>
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
                            <StepLabel>{formData.category === 'product' ? 'Work Confirmation' : 'Admission'}</StepLabel>
                        </Step>
                        <Step>
                            <StepNumber active={step >= 4}>4</StepNumber>
                            <StepLabel>Fee</StepLabel>
                        </Step>
                    </StepIndicators>
                    {step === 1 && (
                        <TwoColumnRow>
                            <Column>
                                <Label>Name</Label>
                                <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </Column>
                            <Column>
                                <Label>Phone Number</Label>
                                <Input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                            </Column>
                            {/* <Column> */}
                                {/* <Label>Date of Birth</Label>
                                <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required /> */}
                            {/* </Column> */}
                            <Column>
                                <Label>Email</Label>
                                <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </Column>
                            <Column>
                                <Label>Address</Label>
                                <Input type="text" name="address" value={formData.address} onChange={handleChange} required />
                            </Column>
                            <Column>
                                <Label>City</Label>
                                <Input type="text" name="city" value={formData.city} onChange={handleChange} required />
                            </Column>
                            <Column>
                                <Label>State</Label>
                                <Input type="text" name="state" value={formData.state} onChange={handleChange} required />
                            </Column>
                            <Column>
                                <Label>Country</Label>
                                <Input type="text" name="country" value={formData.country} onChange={handleChange} required />
                            </Column>
                            <Column>
                                <Label>ZIP Code</Label>
                                <Input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                            </Column>
                            <Column>
                                <Label>Category</Label>
                                <Select name="category" value={formData.category} onChange={handleChange} required>
                                    <option value="">Please select</option>
                                    <option value="product">Product</option>
                                    <option value="student">Student</option>
                                </Select>
                            </Column>
                            <Column style={{ display: 'flex', height:"70px",marginTop:'20px',marginLeft:'500px',gap:'30px'
                           }}>
                                <Button type="button" onClick={nextStep} primary>Next</Button>
                                <Button type="button" onClick={handleSave} primary>Save</Button>
                            </Column>
                        </TwoColumnRow>
                    )}



{step === 2 && formData.category === 'product' && (
                        <div>
                            <Label>Product Requirement</Label>
                            <Textarea name="requirement" value={formData.requirement} onChange={handleChange} required />
                            <FollowupContainer>
                                <Button type="button" onClick={addFollowup}>Add Followup</Button>
                                {formData.followups.map((followup, index) => (
                                    <FollowupRow key={index}>
                                        <Label>Followup {index + 1} Date</Label>
                                        <Input type="date" name="date" value={followup.date} onChange={(e) => handleFollowupChange(index, e)} required />
                                    </FollowupRow>
                                ))}
                            </FollowupContainer>
                            <Button type="button" onClick={prevStep}>Previous</Button>
                            <Button type="button" onClick={handleSave} primary>Save</Button>
                            <Button type="button" onClick={() => setShowForm(false)}>Reject</Button>
                            <Button type="button" onClick={nextStep} primary>Proceed</Button>
                        </div>
                    )}
                    {step === 2 && formData.category === 'student' && (
                        <div>
                            <Label>Educational Qualification</Label>
                            <Input type="text" name="educationalQualification" value={formData.educationalQualification} onChange={handleChange} required />
                            <Label>Course</Label>
                            {/* <Input type="text" name="name" value={formData.name} readOnly /> */}
                            <Input type="text" name="course" value={formData.course} onChange={handleChange} required />

                          
                            <FollowupContainer>
                                <Button type="button" onClick={addFollowup}>Add Followup</Button>
                                {formData.followups.map((followup, index) => (
                                    <FollowupRow key={index}>
                                        <Label>Followup {index + 1} Date</Label>
                                        <Input type="date" name="date" value={followup.date} onChange={(e) => handleFollowupChange(index, e)} required />
                                    </FollowupRow>
                                ))}
                            </FollowupContainer>
                            <Button type="button" onClick={prevStep}>Previous</Button>
                            <Button type="button" onClick={handleSave} primary>Save</Button>
                            <Button type="button" onClick={() => setShowForm(false)}>Reject</Button>
                            <Button type="button" onClick={nextStep} primary>Proceed</Button>
                        </div>
                    )}
                    {step === 3 && formData.category === 'product' && (
                        <div>
                            <Label>Confirm Date</Label>
                            <Input type="date" name="confirmDate" value={formData.confirmDate} onChange={handleChange} required />
                            <Label>Contact Person</Label>
                            <Input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
                            <Label>Work Finishing Date</Label>
                            <Input type="date" name="workFinishingDate" value={formData.workFinishingDate} onChange={handleChange} required />
                            <Label>Final Requirement</Label>
                            <Textarea name="finalRequirement" value={formData.finalRequirement} onChange={handleChange} required />
                            <Label>Final Amount</Label>
                            <Input type="text" name="finalAmount" value={formData.finalAmount} onChange={handleChange} required />
                            <Button type="button" onClick={prevStep}>Previous</Button>
                            <Button type="button" onClick={handleSave} primary>Save</Button>
                            <Button type="button" onClick={nextStep} primary>Next</Button>
                        </div>
                    )}
                    {step === 3 && formData.category === 'student' && (
                        <div>
                            <Label>Date of Birth</Label>
                            <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} readOnly />
                            <Label>Slot</Label>
                            <Input type="text" name="slot" value={formData.slot} onChange={handleChange} required />
                            <Label>Date of Join</Label>
                            <Input type="date" name="date" value={formData.date} onChange={handleChange} required />
                            <Label>Last Date</Label>
                            <Input type="date" name="lastDate" value={formData.lastDate} onChange={handleChange} required />
                            <Label>Upload Photo</Label>
                            <Input type="file" name="photo" onChange={handleFileChange} required />
                            <Button type="button" onClick={prevStep}>Previous</Button>
                            <Button type="button" onClick={handleSave} primary>Save</Button>
                            <Button type="button" onClick={nextStep} primary>Next</Button>
                        </div>
                    )}
                    {step === 4 && (
                        <div>
                            <Label>Payment Method</Label>
                            <Select name="paymentOption" value={formData.paymentOption} onChange={handleChange} required>
                                <option value="">Please select</option>
                                <option value="installment">Installment</option>
                                <option value="total">Total</option>
                            </Select>
                            {formData.paymentOption === 'total' && (
                                <div>
                                    <Label>Total Amount</Label>
                                    <Input type="text" name="totalAmount" value={formData.totalAmount} onChange={handleChange} required />
                                    <Label>Date</Label>
                                    <Input type="date" name="totalDate" value={formData.totalDate} onChange={handleChange} required />
                                </div>
                            )}
                            {formData.paymentOption === 'installment' && (
                                <InstallmentContainer>
                                    <Label>Number of Installments</Label>
                                    <Input type="number" name="installmentCount" value={formData.installmentCount} onChange={handleChange} required />
                                    <Button type="button" onClick={addInstallment}>Add Installment</Button>
                                    {formData.installments.map((installment, index) => (
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
                            <Button type="button" onClick={prevStep}>Previous</Button>
                            <Button type="button" onClick={handleSave} primary>Save</Button>
                            <Button type="submit" primary>Submit</Button>
                        </div>
                    )}
                </Form>
            )}
        </FormContainer>
    );
};


export default EnquiryAdmissionForm;






