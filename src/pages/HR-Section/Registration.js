import React from "react";
import { Form, Input, Button, Select, DatePicker, Row, Col } from "antd";

const { Option } = Select;

const EmployeeRegistrationForm = () => {
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

  const validateNoNumbers = (_, value) => {
    if (!value || !/\d/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Field should not contain numbers"));
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
            label=" Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your name" },
              { validator: validateName }
            ]}
          >
            <Input placeholder="Name" />
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
            label="Marital Status"
            name="maritalStatus"
            rules={[{ required: true, message: "Please select marital status" }]}
          >
            <Select placeholder="Select marital status">
              <Option value="Single">Single</Option>
              <Option value="Married">Married</Option>
              <Option value="Divorced">Divorced</Option>
            </Select>
          </Form.Item>
        </Col>
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
      </Row>
      
      {/* Address Information Section */}
      <h2>Address Information</h2>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: "Please enter address" },
            ]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="City"
            name="city"
            rules={[
              { required: true, message: "Please enter city" },
              { validator: validateNoNumbers }
            ]}
          >
            <Input placeholder="City" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="State"
            name="state"
            rules={[
              { required: true, message: "Please enter state" },
              { validator: validateNoNumbers }
            ]}
          >
            <Input placeholder="State" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Country"
            name="country"
            rules={[
              { required: true, message: "Please enter country" },
              { validator: validateNoNumbers }
            ]}
          >
            <Input placeholder="Country" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Pin Code"
            name="pinCode"
            rules={[
              { required: true, message: "Please enter pin code" },
              {
                pattern: /^[0-9]{6}$/,
                message: "Please enter a valid pin code",
              },
            ]}
          >
            <Input placeholder="Pin Code" />
          </Form.Item>
        </Col>
      </Row>

      {/* Additional Information Section */}
      <h2>Additional Information</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Role"
            name="role"
            rules={[
              { required: true, message: "Please enter role" },
            ]}
          >
              <Select placeholder="Select role">
              <Option value="IT">Front office</Option>
              <Option value="HR">Staff</Option>
              <Option value="Finance">Teamlead</Option>
            </Select>
          
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Join Date"
            name="joinDate"
            rules={[
              { required: true, message: "Please select join date" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Department"
            name="department"
            rules={[
              { required: true, message: "Please select department" },
            ]}
          >
            <Select placeholder="Select department">
              <Option value="IT">IT</Option>
              <Option value="HR">HR</Option>
              <Option value="Finance">Finance</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Work Experience Section */}
      
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Experience"
            name="experience"
            rules={[
              { required: true, message: "Please select your work experience" },
            ]}
          >
            <Select placeholder="Select your work experience">
              <Option value="Less than 1 year">Less than 1 year</Option>
              <Option value="1-2 years">1-2 years</Option>
              <Option value="2-5 years">2-5 years</Option>
              <Option value="More than 5 years">More than 5 years</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmployeeRegistrationForm;
