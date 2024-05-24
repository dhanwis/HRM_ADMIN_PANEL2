import React, { useState } from 'react';
import { Button, Form, Input, Modal, Table, Select } from 'antd';
import 'antd/dist/antd.css';

const EmployeeRegistrationForm = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addEmployee = (employee) => {
    setEmployees([...employees, { id: employees.length + 1, enabled: true, ...employee }]);
    setIsModalVisible(false);
  };

  const viewEmployee = (id) => {
    const employee = employees.find(emp => emp.id === id);
    setSelectedEmployee(employee);
  };

  const closeEmployeeDetails = () => {
    setSelectedEmployee(null);
  };

  const toggleEmployeeStatus = (id) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, enabled: !emp.enabled } : emp
    ));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => viewEmployee(record.id)}>View</Button>
          <Button style={{ marginLeft: 8 }} onClick={() => toggleEmployeeStatus(record.id)}>
            {record.enabled ? 'Disable' : 'Enable'}
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div className="App" style={{ marginTop: '50px' }}>
      <h3 style={{ marginBottom: '50px' }}>Employee Registration</h3>
      <Button type="primary" style={{ marginBottom: '50px' }} onClick={showModal}>
        Add New Employee
      </Button>
      <EmployeeForm
        visible={isModalVisible}
        onCancel={handleCancel}
        onCreate={addEmployee}
      />
      <Table dataSource={employees} columns={columns} rowKey="id" />
      {selectedEmployee && (
        <EmployeeDetails 
          employee={selectedEmployee} 
          onClose={closeEmployeeDetails} 
        />
      )}
    </div>
  );
};

const EmployeeForm = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      form.resetFields();
      onCreate(values);
    });
  };

  return (
    <Modal 
      visible={visible}
      title="Add New Employee"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
      width={1200}
    >
      <Form form={form} layout="vertical" name="employee_form">
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select a role!' }]}
        >
          <Select>
            <Select.Option value="Teamlead">Teamlead</Select.Option>
            <Select.Option value="Staff">Staff</Select.Option>
            <Select.Option value="Salesexecutive">Sales Executive</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="User Name"
          rules={[{ required: true, message: 'Please input the username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input the password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="photo"
          label="Photo"
          rules={[{ required: true, message: 'Please upload a photo!' }]}
        >
          <Input type="file" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input the email!', type: 'email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: 'Please input the phone number!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="maritalStatus"
          label="Marital Status"
          rules={[{ required: true, message: 'Please select marital status!' }]}
        >
          <Select>
            <Select.Option value="single">Single</Select.Option>
            <Select.Option value="married">Married</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input the address!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: 'Please input the city!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="state"
          label="State"
          rules={[{ required: true, message: 'Please input the state!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: 'Please input the country!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="pincode"
          label="Pin Code"
          rules={[{ required: true, message: 'Please input the pin code!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="qualification"
          label="Qualification"
          rules={[{ required: true, message: 'Please input the qualification!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="experience"
          label="Experience"
          rules={[{ required: true, message: 'Please input the experience!' }]}
        >
          <Select>
            <Select.Option value="0 year">0 year</Select.Option>
            <Select.Option value="1 year">1 year</Select.Option>
            <Select.Option value="2 years">2 years</Select.Option>
            <Select.Option value="more than 2 years">More than 2 years</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EmployeeDetails = ({ employee, onClose }) => {
  return (
    <Modal
      visible={true}
      title="Employee Details"
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>
      ]}
      onCancel={onClose}
    >
      <p><strong>ID:</strong> {employee.id}</p>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Username:</strong> {employee.username}</p>
      <p><strong>Password:</strong> {employee.password}</p>
      <p><strong>Photo:</strong> {employee.photo}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Phone:</strong> {employee.phone}</p>
      <p><strong>Marital Status:</strong> {employee.maritalStatus}</p>
      <p><strong>Address:</strong> {employee.address}</p>
      <p><strong>City:</strong> {employee.city}</p>
      <p><strong>State:</strong> {employee.state}</p>
      <p><strong>Country:</strong> {employee.country}</p>
      <p><strong>Pin code:</strong> {employee.pincode}</p>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Qualification:</strong> {employee.qualification}</p>
      <p><strong>Experience:</strong> {employee.experience}</p>
    </Modal>
  );
};

export default EmployeeRegistrationForm;
