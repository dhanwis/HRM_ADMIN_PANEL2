import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  Select,
  message,
  DatePicker,
} from "antd";

import "antd/dist/antd.css";
import vector from "../../assets/images/vectorhr.png";
import axios from "axios";
import { baseUrl, baseUrlHr, baseUrlImg } from "../../url";

const EmployeeRegistrationForm = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    // let fetchData = async () => {
    //   try {
    //     let response = await axios.get('http://127.0.0.1:8000/authapp/Staff/');
    //     if (response.status === 200) {
    //       setEmployees(response.data)
    //     }
    //   } catch (err) {
    //     console.error('error due to ', err);
    //   }
    // }
    // fetchData()
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addEmployee = (employee) => {
    console.log("add", employee);
    //  let x  = axios.post(`http://127.0.0.1:8000/auth/${select}`)
    setEmployees([...employees, employee]);
    setIsModalVisible(false);
  };

  useEffect(() => {
    console.log(employees.length);
    if (employees.length === 0) {
      fetch(`${baseUrl}/users/`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setEmployees(data);
          console.log(data);
        });
    }
  }, [employees]);

  const viewEmployee = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    setSelectedEmployee(employee);
  };

  const closeEmployeeDetails = () => {
    setSelectedEmployee(null);
  };

  const toggleEmployeeStatus = (id) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === id ? { ...emp, enabled: !emp.enabled } : emp
      )
    );
  };

  const editEmployee = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    setSelectedEmployee(employee);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Uname",
      dataIndex: "username",
      key: "uname",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "PhoneNumber",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },

    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
    },

    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => viewEmployee(record.id)}>
            View
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => editEmployee(record.id)}
          >
            Edit
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div style={{ backgroundImage: `url(${vector})`, height: "800px" }}>
      <div className="App" style={{ marginTop: "50px" }}>
        <h3 style={{ marginBottom: "50px" }}>Employee Registration</h3>
        <Button
          type="primary"
          style={{ marginBottom: "50px" }}
          onClick={showModal}
        >
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
    </div>
  );
};

const EmployeeForm = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  // const handleSubmit = async () => {
  //   setLoading(true);
  //   try {
  //     const values = await form.validateFields();
  //     console.log("va", values);
  //     //form.resetFields();

  //     const response = await axios.post(`${baseUrl}/${values.role}/`, values, {
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     console.log("res", response);

  //     if (response.status === 201) {
  //       onCreate(response.data.user);
  //       message.success("User created successfully!");
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 400) {
  //       console.error("Validation error:", error.response.data.message);
  //       message.error(error.response.data.message);
  //     } else {
  //       console.error("Submission error:", error);
  //       message.error("An error occurred while submitting the form.");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleFileChange = (file) => {
    setImage(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      console.log("values", values);

      // Convert the date format
      if (values.dob) {
        const date = new Date(values.dob);
        const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
        values.dob = formattedDate;
      }

      // Append all fields to FormData
      Object.keys(values).forEach((key) => {
        if (key !== "image") {
          formData.append(key, values[key]);
        }
      });

      // Append the image file separately
      formData.append("image", image); // Assuming `image` is the file object

      const response = await axios.post(
        `${baseUrl}/${values.role}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure this header is set for FormData
          },
        }
      );

      console.log("response", response);

      if (response.status === 201) {
        onCreate(response.data);
        message.success("User created successfully!");
      } else {
        message.error("Failed to create user. Please try again later.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Validation error:", error.response.data.message);
        message.error(
          error.response.data.message || "Validation error occurred."
        );
      } else {
        console.error("Submission error:", error);
        message.error("An error occurred while submitting the form.");
      }
    } finally {
      setLoading(false);
    }
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
      width={1000}
      maskClosable={false}
    >
      <Form form={form} layout="vertical" name="employee_form">
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select>
            <Select.Option value="Teamlead">Teamlead</Select.Option>
            <Select.Option value="Staff">Staff</Select.Option>
            <Select.Option value="Frontoffice">Frontoffice</Select.Option>
          </Select>
        </Form.Item>

        {/* <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please input the name!" },
            { pattern: /^[A-Za-z\s]+$/, message: "Please enter a valid name." },
          ]}
        >
          <Input />
        </Form.Item> */}

        <Form.Item
          name="username"
          label="User Name"
          rules={[
            { required: true, message: "Please input the username!" },
            {
              pattern: /^[A-Za-z\s]+$/,
              message: "Please enter a valid username.",
            },
          ]}
        >
          <Input autoComplete="user_name" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input the password!",
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              message: "Please enter a valid password.",
            },
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Photo"
          rules={[{ message: "Please upload a photo!" }]}
        >
          <input
            type="file"
            onChange={(e) => handleFileChange(e.target.files[0])}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input the email!",
              type: "email",
            },
          ]}
        >
          <Input autoComplete="email" />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input the phone number!" },
            {
              pattern: /^\d{10}$/,
              message: "Phone number should contain 10 digits.",
            },
          ]}
        >
          <Input autoComplete="tel" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please input the address!" }]}
        >
          <Input.TextArea autoComplete="street-address" />
        </Form.Item>

        <Form.Item
          name="dob"
          label="Date of Birth"
          rules={[
            { required: true, message: "Please input the date of birth!" },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: "Please input the city!" }]}
        >
          <Input autoComplete="address-level2" />
        </Form.Item>

        <Form.Item
          name="state"
          label="State"
          rules={[{ required: true, message: "Please input the state!" }]}
        >
          <Input autoComplete="address-level1" />
        </Form.Item>

        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: "Please input the country!" }]}
        >
          <Input autoComplete="country" />
        </Form.Item>

        <Form.Item
          name="pincode"
          label="Pin Code"
          rules={[
            { required: true, message: "Please input the pin code!" },
            { pattern: /^\d{6}$/, message: "Pincode should contain 6 digits." },
          ]}
        >
          <Input autoComplete="postal-code" />
        </Form.Item>

        <Form.Item
          name="department"
          label="Department"
          rules={[{ required: true, message: "Please input the department!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="experience"
          label="Experience"
          rules={[{ required: true, message: "Please input the experience!" }]}
        >
          <Select>
            <Select.Option value="0 year">0 year</Select.Option>
            <Select.Option value="1 year">1 year</Select.Option>
            <Select.Option value="2 years">2 years</Select.Option>
            <Select.Option value="more than 2 years">
              More than 2 years
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
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
        </Button>,
      ]}
      onCancel={onClose}
    >
      <p>
        <strong>ID:</strong> {employee.id}
      </p>
      <p>
        <strong>Username:</strong> {employee.username}
      </p>

      <p>
        <strong>Employee Image:</strong>{" "}
        <img src={`${baseUrlImg}${employee.image}`} alt="EmployeeImg" />
      </p>

      <p>
        <strong>Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Phone:</strong> +91 {employee.phone_number}
      </p>

      <p>
        <strong>Address:</strong> {employee.address}
      </p>

      <p>
        <strong>Role:</strong> {employee.role}
      </p>

      <p>
        <strong>Experience:</strong> {employee.experience}
      </p>
    </Modal>
  );
};

export default EmployeeRegistrationForm;
