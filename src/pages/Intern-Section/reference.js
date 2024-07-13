import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Modal } from 'antd';

import vector from "../../assets/images/vector_image.png"



const ReferenceForm = () => {
  const [form] = Form.useForm();
  const [submittedData, setSubmittedData] = useState([]);
  const [editingKey, setEditingKey] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('submittedReferences')) || [];
    setSubmittedData(savedData);
  }, []);

  const onFinish = (values) => {
    if (editingKey) {
      const newData = submittedData.map(item =>
        item.key === editingKey ? { ...item, ...values } : item
      );
      setSubmittedData(newData);
      localStorage.setItem('submittedReferences', JSON.stringify(newData));
      setEditingKey(null);
    } else {
      const key = Date.now();
      const newData = {
        ...values,
        key,
      };
      setSubmittedData([...submittedData, newData]);
      localStorage.setItem('submittedReferences', JSON.stringify([...submittedData, newData]));
    }
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const edit = (key) => {
    setEditingKey(key);
    const recordToEdit = submittedData.find((record) => record.key === key);
    form.setFieldsValue(recordToEdit);
  };

  const deleteRecord = (key) => {
    const newData = submittedData.filter((item) => item.key !== key);
    setSubmittedData(newData);
    localStorage.setItem('submittedReferences', JSON.stringify(newData));
    setEditingKey(null); // Clear editingKey if the record being edited is deleted
  };

  const viewResponse = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Phone',
      dataIndex: 'Phone',
      key: 'Phone',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },

    {
      title: 'Education Qualification',
      dataIndex: 'Education',
      key: 'Education',
    },


    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button type="link" onClick={() => edit(record.key)}>
            Edit
          </Button>
          <Button type="link" onClick={() => deleteRecord(record.key)}>
            Delete
          </Button>
          <Button type="link" onClick={() => viewResponse(record)}>
            View Response
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div className="container mt-5" style={{backgroundImage:`url(${vector})`}}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h3>Referral Information</h3>
        <Form.Item
          label="Name"
          name="Name"
          rules={[{ required: true, message: 'Please enter name', pattern: /^[a-zA-Z]+$/ }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="Email"
          rules={[{ required: true, message: 'Please enter email', type: 'email' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="Phone"
          rules={[{ required: true, message: 'Please enter phone number', pattern: /^\d{10}$/ }]}
        >
          <Input placeholder="Phone" />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          // rules={[{ required: true, message: 'Please enter location' }]}
        >
          <Input placeholder="Location" />
        </Form.Item>


        <Form.Item
          label="Education"
          name="Education"
          // rules={[{ required: true, message: 'Please enter Education Details' }]}
        >
          <Input placeholder="Education" />
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
      <Modal
        title="Response Details"
        visible={isModalVisible}
        onOk={handleOk}
        okText="Close"
      >
                {selectedRecord && (
          <div>
            {/* <p>{`${selectedRecord.Name} has provided the following contact details: Email - ${selectedRecord.Email}, Phone - ${selectedRecord.Phone}, Location - ${selectedRecord.location}.`}</p> */}
            <p>Considered</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReferenceForm;

