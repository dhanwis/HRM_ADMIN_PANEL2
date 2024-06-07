import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Popconfirm } from 'antd';

const ReferenceForm = () => {
  const [form] = Form.useForm();
  const [submittedData, setSubmittedData] = useState([]);
  const [editingKey, setEditingKey] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('submittedReferences')) || [];
    setSubmittedData(savedData);
  }, []);

  const onFinish = (values) => {
    const key = Date.now();
    const newData = {
      ...values,
      key,
    };
    setSubmittedData([...submittedData, newData]);
    form.resetFields();
    const updatedData = [...submittedData, newData];
    localStorage.setItem('submittedReferences', JSON.stringify(updatedData));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const deleteRecord = (key) => {
    const newData = submittedData.filter((item) => item.key !== key);
    setSubmittedData(newData);
    setEditingKey(null);
    localStorage.setItem('submittedReferences', JSON.stringify(newData));
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
        localStorage.setItem('submittedReferences', JSON.stringify(newData));
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
      title: 'Referral First Name',
      dataIndex: 'referralFirstName',
      key: 'referralFirstName',
    },
    {
      title: 'Referral Last Name',
      dataIndex: 'referralLastName',
      key: 'referralLastName',
    },
    {
      title: 'Referral Email',
      dataIndex: 'referralEmail',
      key: 'referralEmail',
    },
    
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        const editable = record.key === editingKey;
        return editable ? (
          <span>
            <Button type="primary" onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Button>
            <Button onClick={cancel}>Cancel</Button>
          </span>
        ) : (
          <span>
            <Button type="link" onClick={() => edit(record.key)}>
              Edit
            </Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteRecord(record.key)}>
              <Button type="link">Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <div className="container mt-5">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h3>Referral Information</h3>
       
        <Form.Item
          label="Referral First Name"
          name="referralFirstName"
          rules={[{ required: true, message: 'Please enter referral first name', pattern: /^[a-zA-Z]+$/ }]}
        >
          <Input placeholder="Referral First Name" />
        </Form.Item>
        <Form.Item
          label="Referral Last Name"
          name="referralLastName"
          rules={[{ required: true, message: 'Please enter referral last name', pattern: /^[a-zA-Z]+$/ }]}
        >
          <Input placeholder="Referral Last Name" />
        </Form.Item>
        <Form.Item
          label="Referral Email"
          name="referralEmail"
          rules={[{ required: true, message: 'Please enter referral email', type: 'email' }]}
        >
          <Input placeholder="Referral Email" />
        </Form.Item>
        
        <Form.Item
          label="Referral Phone"
          name="referralPhone"
          rules={[{ required: true, message: 'Please enter referral phone number', pattern: /^\d{10}$/ }]}
        >
          <Input placeholder="Referral Phone" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div>
        <h2>Submitted Referral Information</h2>
        <Table dataSource={submittedData} columns={columns} />
      </div>
    </div>
  );
};

export default ReferenceForm;