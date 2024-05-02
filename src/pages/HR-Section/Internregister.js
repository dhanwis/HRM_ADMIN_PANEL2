import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Row, Col, Radio } from "antd";

const InternRegistrationForm = () => {
  const [internshipType, setInternshipType] = useState(null);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validateName = (_, value) => {
    if (!value || /^[a-zA-Z\s]*$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Please enter only letters"));
  };

  const handleInternshipTypeChange = (e) => {
    setInternshipType(e.target.value);
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {/* Personal Information Section */}
      <h2>Personal Information</h2>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              { required: true, message: "Please enter full name" },
              { validator: validateName }
            ]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>
        </Col>
  
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please enter phone number" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid phone number",
              },
            ]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[
              { required: true, message: "Please select date of birth" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>intern
      
      {/* Education Information Section */}
      <h2>Education Information</h2>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="University"
            name="university"
            rules={[
              { required: true, message: "Please enter university name" },
            ]}
          >
            <Input placeholder="University" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Degree Program"
            name="degreeProgram"
            rules={[
              { required: true, message: "Please enter degree program" },
            ]}
          >
            <Input placeholder="Degree Program" />
          </Form.Item>
        </Col>
      </Row>
      
      {/* Internship Information Section */}
      <h2>Internship Information</h2>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Internship Position"
            name="position"
            rules={[
              { required: true, message: "Please enter internship position" },
            ]}
          >
            <Input placeholder="Internship Position" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[
              { required: true, message: "Please select start date" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[
              { required: true, message: "Please select end date" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      
      {/* Internship Type Section */}
    
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="type"
            label="Internship Type"
            rules={[{ required: true, message: "Please select internship type" }]}
          >
            <Radio.Group onChange={handleInternshipTypeChange}>
              <Radio value="paid">Paid</Radio>
              <Radio value="unpaid">Unpaid</Radio>
              <Radio value="stipend">Stipend</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      
      {/* Amount Field (Display conditionally based on selected type) */}
      {internshipType === "paid" || internshipType === "stipend" ? (
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={internshipType === "paid" ? "Amount (Paid)" : "Amount (Stipend)"}
              name="amount"
              rules={[
                { required: true, message: "Please enter the amount" },
                { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: "Please enter a valid amount" },
              ]}
            >
              <Input placeholder="Amount" />
            </Form.Item>
          </Col>
        </Row>
      ) : null}
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InternRegistrationForm;
