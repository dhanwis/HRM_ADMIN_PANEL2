import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: #f2f2f2;
    padding: 20px;
`;

const Form = styled.form`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 800px; 
    width: 100%;
    margin-bottom: 20px;
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
        border-color: #0000FF;
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
    align-items: center;
    margin-bottom: 20px;
    position: relative;
    width: 100%;
`;

const Step = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
`;

const StepNumber = styled.div`
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    background-color: ${({ active }) => (active ? '#0000FF' : '#ddd')};
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

const Line = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #ddd;
    z-index: 0;
`;

const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
`;

const DataTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const DataRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const DataHeader = styled.th`
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #4caf50;
    color: white;
`;

const DataCell = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
`;

const Enquiryfront = () => {
    const [step, setStep] = useState(1);
    const [viewData, setViewData] = useState(false);
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
        photo: null,
        paymentOption: '',
        totalAmount: '',
        totalDate: '',
        installmentCount: '',
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
                            <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </Column>
                        <Column>
                            <Label>Phone Number</Label>
                            <Input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                        </Column>
                        <Column>
                            <Label>Date of Birth</Label>
                            <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                        </Column>
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
                            <Label>Zip Code</Label>
                            <Input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                        </Column>
                        <Column>
                            <Label>Category</Label>
                            <Select name="category" value={formData.category} onChange={handleChange} required>
                                <option value="">Select a category</option>
                                <option value="product">Product</option>
                                <option value="student">Student</option>
                            </Select>
                        </Column>
                        <Column style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="button" onClick={nextStep} primary>Next</Button>
                            <Button type="button">Save</Button>
                            <Button type="button" onClick={handleViewData}>View</Button>
                        </Column>
                    </TwoColumnRow>
                )}
                {step === 2 && formData.category === 'product' && (
                    <div>
                        <Label>Product Requirement</Label>
                        <Textarea name="requirement" value={formData.requirement} onChange={handleChange} required />
                        <Label>Name</Label>
                        <Input type="text" name="name" value={formData.name} readOnly />
                        <Label>Phone Number</Label>
                        <Input type="text" name="phoneNumber" value={formData.phoneNumber} readOnly />
                        <Label>Date</Label>
                        <Input type="date" name="date" value={formData.date} onChange={handleChange} required />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="button" onClick={prevStep}>Previous</Button>
                            <Button type="button">Save</Button>
                            <Button type="button" onClick={handleViewData}>View</Button>
                            <Button type="submit" primary>Submit</Button>
                        </div>
                    </div>
                )}
                {step === 2 && formData.category === 'student' && (
                    <div>
                        <Label>Educational Qualification</Label>
                        <Input type="text" name="educationalQualification" value={formData.educationalQualification} onChange={handleChange} required />
                        <Label>Course</Label>
                        <Input type="text" name="course" value={formData.course} onChange={handleChange} required />
                        <Label>Name</Label>
                        <Input type="text" name="name" value={formData.name} readOnly />
                        <Label>Date of Birth</Label>
                        <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} readOnly />
                        <Label>Address</Label>
                        <Input type="text" name="address" value={formData.address} readOnly />
                        <Label>Phone Number</Label>
                        <Input type="text" name="phoneNumber" value={formData.phoneNumber} readOnly />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="button" onClick={prevStep}>Previous</Button>
                            <Button type="button">Save</Button>
                            <Button type="button" onClick={handleViewData}>View</Button>
                            <Button type="button" onClick={nextStep} primary>Next</Button>
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <Label>Course</Label>
                        <Input type="text" name="course" value={formData.course} readOnly />
                        <Label>Date of Join</Label>
                        <Input type="date" name="date" value={formData.date} onChange={handleChange} required />
                        <Label>Last Date</Label>
                        <Input type="date" name="lastDate" value={formData.lastDate} onChange={handleChange} required />
                        <Label>Photo</Label>
                        <Input type="file" name="photo" onChange={handleFileChange} required />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="button" onClick={prevStep}>Previous</Button>
                            <Button type="button">Save</Button>
                            <Button type="button" onClick={handleViewData}>View</Button>
                            <Button type="button" onClick={nextStep} primary>Next</Button>
                        </div>
                    </div>
                )}
                {step === 4 && (
                    <div>
                        <Label>Payment Option</Label>
                        <Select name="paymentOption" value={formData.paymentOption} onChange={handleChange} required>
                            <option value="">Please select</option>
                            <option value="total">Total Amount</option>
                            <option value="installment">Installment</option>
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
                            <div>
                                <Label>Number of Installments</Label>
                                <Input type="number" name="installmentCount" value={formData.installmentCount} onChange={handleChange} required />
                                <InstallmentContainer>
                                    {formData.installments.map((installment, index) => (
                                        <InstallmentRow key={index}>
                                            <Input type="text" name="amount" placeholder="Amount" value={installment.amount} onChange={(e) => handleInstallmentChange(index, e)} required />
                                            <Input type="date" name="date" value={installment.date} onChange={(e) => handleInstallmentChange(index, e)} required />
                                        </InstallmentRow>
                                    ))}
                                    {formData.installments.length < formData.installmentCount && (
                                        <Button type="button" onClick={addInstallment}>Add Installment</Button>
                                    )}
                                </InstallmentContainer>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="button" onClick={prevStep}>Previous</Button>
                            <Button type="button">Save</Button>
                            <Button type="button" onClick={handleViewData}>View</Button>
                            <Button type="submit" primary>Submit</Button>
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