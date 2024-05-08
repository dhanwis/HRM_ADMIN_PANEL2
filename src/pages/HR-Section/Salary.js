import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, Table, Popconfirm, InputNumber } from "antd";
import moment from "moment";
const { Option } = Select;

const Salaryform = () => {
  const [form] = Form.useForm();
  const [submittedData, setSubmittedData] = useState([]);
  const [editingKey, setEditingKey] = useState(null);

  // useEffect(() => {
  //   const savedData = JSON.parse(localStorage.getItem("submittedData")) || [];
  //   setSubmittedData(savedData);
  // }, []);


  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("submittedData")) || [];
    // Convert date strings back to moment objects
    savedData.forEach(item => {
      if (item.joinDate) {
        item.joinDate = moment(item.joinDate, 'YYYY-MM-DD');
      }
    });
    setSubmittedData(savedData);
  }, []);

  const onFinish = (values) => {
    const key = Date.now(); 
    const newData = [...submittedData, { ...values, key }];
    setSubmittedData(newData);
    form.resetFields();
    localStorage.setItem("submittedData", JSON.stringify(newData));
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

  // const edit = (key) => {
  //   setEditingKey(key);
  //   const recordToEdit = submittedData.find((record) => record.key === key);
  //   form.setFieldsValue(recordToEdit);
  // };

  const edit = (key) => {
    setEditingKey(key);
    const recordToEdit = submittedData.find((record) => record.key === key);
    
    // Convert date strings to moment objects before setting form fields
    const initialValues = { ...recordToEdit };
    initialValues.joinDate = moment(recordToEdit.joinDate);
  
    form.setFieldsValue(initialValues);
  };







  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...submittedData];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        newData[index] = { ...newData[index], ...row };
        newData[index].joinDate = moment(newData[index].joinDate);
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
       title: 'Email',
       dataIndex: 'email',
       key: 'email',
     },
     {
       title: 'Join Date',
       dataIndex: 'joinDate',
       key: 'joinDate',
       render: (joinDate) => moment(joinDate).format('YYYY-MM-DD'),
     },
     {
       title: 'Phone',
       dataIndex: 'phone',
       key: 'phone',
     },
     {
       title: 'Role',
       dataIndex: 'role',
       key: 'role',
     },
     {
       title: 'Salary',
       dataIndex: 'salary',
       key: 'salary',
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
            <Button type="link" onClick={() => edit(record.key)}>Edit</Button>
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
        <Form.Item label="ID" name="id" rules={[{ required: true, message: 'Please enter ID' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter name' }]}>
           <Input />
         </Form.Item>
         <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
           <Input />
         </Form.Item>

         {/* <Form.Item label="Join Date" name="joinDate" rules={[{ required: true, message: 'Please select join date' }]}>
           <DatePicker style={{ width: "100%" }} />
         </Form.Item> */}
{/* 
<Form.Item 
  label="Join Date" 
  name="joinDate" 
  rules={[{ required: true, message: 'Please select join date' }]}
>
  <DatePicker 
    style={{ width: "100%" }} 
    defaultValue={form.getFieldValue('joinDate') ? moment(form.getFieldValue('joinDate'), 'YYYY-MM-DD') : null} 
    onChange={(date, dateString) => form.setFieldsValue({ joinDate: dateString })} 
  />
</Form.Item> */}

<Form.Item 
  label="Join Date" 
  name="joinDate" 
  rules={[{ required: true, message: 'Please select join date' }]}
>
  <DatePicker 
    style={{ width: "100%" }} 
    onChange={(date, dateString) => {
      // Check if dateString is defined
      const formattedDate = dateString ? moment(dateString, 'YYYY-MM-DD') : null;
      form.setFieldsValue({ joinDate: formattedDate });
    }} 
  />
</Form.Item>





         <Form.Item label="Phone" name="phone" rules={[{ required: true, pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number' }]}>
           <Input />
         </Form.Item>

         <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please select role' }]}>
           <Select placeholder="Select role">
             <Option value="Teamlead">Teamlead</Option>
             <Option value="Staff">Staff</Option>
             <Option value="Frontoffice">Frontoffice</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Salary" name="salary" rules={[{ required: true, type: 'number', message: 'Please enter salary' }]}>
          <InputNumber />
        </Form.Item>

        {/* Add more form items as needed */}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div>
        <h2>Submitted Employee Salary Information</h2>
        <Table dataSource={submittedData} columns={columns} />
      </div>
    </div>
  );
};

export default Salaryform;