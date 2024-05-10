import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, Table, Popconfirm, InputNumber,Row,Col,Upload } from "antd";
import moment from "moment";
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;

const EmployeeRegistrationForm = () => {
  const [form] = Form.useForm();
  const [submittedData, setSubmittedData] = useState([]);
  const [editingKey, setEditingKey] = useState(null);

//   useEffect(() => {
// ;    const savedData = JSON.parse(localStorage.getItem("submittedData")) || [];
//     setSubmittedData(savedData);
//   }, []);


useEffect(() => {
  const savedData = JSON.parse(localStorage.getItem("submittedData")) || [];
  // Convert date strings back to moment objects
  savedData.forEach(item => {
    if (item.dob) {
      item.dob = moment(item.dob, 'YYYY-MM-DD');
    }
    if (item.joinDate) {
      item.joinDate = moment(item.joinDate, 'YYYY-MM-DD');
    }
  });
  setSubmittedData(savedData);
}, []);

  const onFinish = (values) => {
    const key = Date.now(); 
    const newData = {
      ...values,
      key,
      dob: moment(values.dob).format('YYYY-MM-DD'), // Convert to the desired format
      joinDate: moment(values.joinDate).format('YYYY-MM-DD'), // Convert to the desired format
    };
    setSubmittedData([...submittedData, newData]);
    form.resetFields();
    localStorage.setItem("submittedData", JSON.stringify([...submittedData, newData]));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const deleteRecord = (key) => {
    const newData = submittedData.filter((item) => item.key !== key);
    setSubmittedData(newData);
    setEditingKey(null);
    localStorage.setItem("submittedData", JSON.stringify(newData));
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
  
  const edit = (key) => {
    setEditingKey(key);
    const recordToEdit = submittedData.find((record) => record.key === key);
    form.setFieldsValue(recordToEdit);
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...submittedData];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        newData[index] = { ...newData[index], ...row };
        setSubmittedData(newData);
        setEditingKey(null);
        localStorage.setItem("submittedData", JSON.stringify(newData));
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const cancel = () => {
    setEditingKey(null);
    form.resetFields();
  };

  

  const columns = [
   
     {
       title: 'Name',
       dataIndex: 'name',
       key: 'name',
     },
     {
       title: 'Email',
       dataIndex: 'email',
       key: 'email',
     },
     {
       title: 'Phone Number',
       dataIndex: 'phoneNumber',
       key: 'phoneNumber',
     },
     {
       title: 'Marital Status',
       dataIndex: 'maritalStatus',
       key: 'maritalStatus',
     },
    {
      title: 'Date of birth',
      dataIndex: 'dob',
      key: 'dob',
      // render: (dob) => moment(dob).format('YYYY-MM-DD'),
      render: (text, record) => {
        return <span>{moment(record.dob).format("YYYY-MM-DD")}</span>;
      }
    },


     {
       title: 'City',
       dataIndex: 'city',
       key: 'city',
     },
     {
       title: 'State',
       dataIndex: 'state',
       key: 'state',
     },
     {
       title: 'Country',
       dataIndex: 'country',
       key: 'country',
     },
     {
       title: 'Pin Code',
       dataIndex: 'pinCode',
       key: 'pinCode',
     },
     {
       title: 'Role',
       dataIndex: 'role',
       key: 'role',
     },
   

    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      // render: (joinDate) => moment(joinDate).format('YYYY-MM-DD'),
      render: (text, record) => {
        return <span>{moment(record.joinDate).format("YYYY-MM-DD")}</span>;
      }
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },


     {
       title: 'Experience',
       dataIndex: 'experience',
       key: 'experience',
     },
     
    // Add more columns as needed
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        const editable = record.key === editingKey;
        return editable ? (
          <span>
            <Button type="primary" onClick={() => save(record.key)} style={{ marginRight: 8 }}>Save</Button>
            <Button onClick={cancel}>Cancel</Button>
          </span>
        ) : (
          <span>
            <Button type="link"  onClick={() => edit(record.key)}>Edit</Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteRecord(record.key)}>
              <Button type="link">Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* Form fields */}
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
         <Col span={12}>
           <Form.Item
             label="Photo"
             name="photo"
             rules={[{ required: true, message: "Please upload your photo" }]}
           >
             <Upload maxCount={1}>
               <Button icon={<UploadOutlined />}>Upload Photo</Button>
             </Upload>
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
         <Form.Item label="dob" name="dob" rules={[{ required: true, message: "Please select DOB" }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
           
         </Col>
       </Row>
      
       {/* Address Information Section */}
       <h2>Address Information</h2>
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
               <Option value="Front office">Front office</Option>
               <Option value="Staff">Staff</Option>
               <Option value="Teamlead">Teamlead</Option>
             </Select>
          
           </Form.Item>
         </Col>
         <Col span={8}>
        
         <Form.Item label="joinDate" name="joinDate" rules={[{ required: true, message: "Please select join date" }]}>
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
       
        {/* Add more form items as needed */}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div>
        <h2>Submitted Employee Salary Information</h2>
        {/* <Table dataSource={submittedData} columns={columns} /> */}
        <Table dataSource={submittedData} columns={columns} scroll={{ x: true }} />
      </div>
    </div>
  );
};

export default EmployeeRegistrationForm; 