import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Table, Select } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';

const EmployeeRegistrationForm = () => {

  const [employees, setEmployees] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);


  useEffect(() => {
    let fetchData = async () => {

      try {
        let response = await axios.get('http://127.0.0.1:8000/authapp/Staff/');

        if (response.status === 200) {
          setEmployees(response.data)
        }

      } catch (err) {
        console.error('error due to ', err);
      }
    }

    fetchData()
  }, [])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addEmployee = (employee) => {
    //  let x  = axios.post(`http://127.0.0.1:8000/auth/${select}`)
    setEmployees([...employees, employee]);
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

  const editEmployee = (id) => {
    const employee = employees.find(emp => emp.id === id);
    setSelectedEmployee(employee);
    setIsModalVisible(true);
  };

  const handleSelect = (x) => {
    console.log(x.target.value);
  }


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
          <Button style={{ marginLeft: 8 }} onClick={() => editEmployee(record.id)}>Edit</Button>
          {/* <Button style={{ marginLeft: 8 }} onClick={() => toggleEmployeeStatus(record.id)}>
            {record.enabled ? 'Disable' : 'Enable'}
          </Button> */}
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
        // setEmployees={setEmployees}
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

      axios.post(`http://127.0.0.1:8000/authapp/${values.role}/`, values, { method: { 'Content-Type': 'application/json' } })
        .then((ac) => {
          if (ac.status === 201) {
            onCreate(ac.data.user);
          }
        })
    });
  };

  const handleSelect = (y) => {

  }

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
      width={1000}
      maskClosable={false}
    >
      <Form form={form} layout="vertical" name="employee_form">
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select a role!' }]}
        >
          <Select onChange={handleSelect}>
            <Select.Option value="Teamlead">Teamlead</Select.Option>
            <Select.Option value="Staff">Staff</Select.Option>
            <Select.Option value="Frontoffice">Frontoffice</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ message: 'Please input the name!' },
          { pattern: /^[A-Za-z\s]+$/, message: 'Please enter a valid name.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="User Name"
          rules={[{ required: true, message: 'Please input the username!' },
          { pattern: /^[A-Za-z\s]+$/, message: 'Please enter a valid username.' }]}
        >
          <Input autoComplete="user_name" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{
            required: true, message: 'Please input the password!',
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            message: 'Please enter a valid password.'
          }]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Photo"
          rules={[{ message: 'Please upload a photo!' }]}
        >
          <Input type="file" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input the email!', type: 'email' }]}
        >
          <Input autoComplete="email" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ message: 'Please input the phone number!' },
          { pattern: /^\d{10}$/, message: 'Phone number should contain 10 digits.' }]}
        >
          <Input autoComplete="tel" />
        </Form.Item>
        <Form.Item
          name="maritalStatus"
          label="Marital Status"
          rules={[{ message: 'Please select marital status!' }]}
        >
          <Select>
            <Select.Option value="single">Single</Select.Option>
            <Select.Option value="married">Married</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ message: 'Please input the address!' }]}
        >
          <Input.TextArea autoComplete="street-address" />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[{ message: 'Please input the city!' }]}
        >
          <Input autoComplete="address-level2" />
        </Form.Item>
        <Form.Item
          name="state"
          label="State"
          rules={[{ message: 'Please input the state!' }]}
        >
          <Input autoComplete="address-level1" />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ message: 'Please input the country!' }]}
        >
          <Input autoComplete="country" />
        </Form.Item>
        <Form.Item
          name="pincode"
          label="Pin Code"
          rules={[{ message: 'Please input the pin code!' },
          { pattern: /^\d{6}$/, message: 'Pincode should contain 6 digits.' }]}
        >
          <Input autoComplete="postal-code" />
        </Form.Item>
        <Form.Item
          name="qualification"
          label="Qualification"
          rules={[{ message: 'Please input the qualification!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="experience"
          label="Experience"
          rules={[{ message: 'Please input the experience!' }]}
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
