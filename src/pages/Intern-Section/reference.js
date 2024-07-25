import React, { useState, useEffect } from "react";
import { Form, Input, Button, Table, Modal } from "antd";

import vector from "../../assets/images/vector_image.png";
import axios from "axios";
import { baseUrl } from "../../url";

const ReferenceForm = () => {
  const [form] = Form.useForm();
  const [submittedData, setSubmittedData] = useState([]);
  const [editingKey, setEditingKey] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    let fetchRef = async () => {
      let x = await axios.get(`${baseUrl}/intern/reference/`);

      if (x.status === 200) {
        console.log(x.data);
        setSubmittedData(x.data);
      }
    };
    fetchRef();
  }, []);

  // const onFinish = (values) => {
  //   if (editingKey) {
  //     const newData = submittedData.map((item) =>
  //       item.key === editingKey ? { ...item, ...values } : item
  //     );
  //     setSubmittedData(newData);
  //     localStorage.setItem("submittedReferences", JSON.stringify(newData));
  //     setEditingKey(null);
  //   } else {
  //     const key = Date.now();
  //     const newData = {
  //       ...values,
  //       key,
  //     };
  //     setSubmittedData([...submittedData, newData]);
  //   }
  //   form.resetFields();
  // };

  const onFinish = async (values) => {
    const key = Date.now();
    const newData = {
      ...values,
      key,
    };
    let response = await axios.post(`${baseUrl}/intern/reference/`, newData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("response", response);

    if (response.status === 201) {
      setSubmittedData([...submittedData, newData]);
    }
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const edit = (key) => {
    setEditingKey(key);
    const recordToEdit = submittedData.find((record) => record.key === key);
    form.setFieldsValue(recordToEdit);
  };

  const deleteRecord = async (key) => {
    let x = await axios.delete(`${baseUrl}/intern/referencedelete/${key}`);

    console.log(x);

    if (x.status === 200) {
      setSubmittedData(submittedData.filter((item) => item.key !== key));
    }
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
      title: "Name",
      dataIndex: "name",
      key: "Name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "Email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "Phone",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },

    {
      title: "Education Qualification",
      dataIndex: "education",
      key: "Education",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <span>
          {/* <Button type="link" onClick={() => edit(record.key)}>
            Edit
          </Button> */}
          <Button type="link" onClick={() => deleteRecord(record.id)}>
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
    <div
      className="container mt-5"
      style={{ backgroundImage: `url(${vector})` }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h3>Referral Information</h3>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter name",
              pattern: /^[a-zA-Z]+$/,
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email", type: "email" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please enter phone number",
              pattern: /^\d{10}$/,
            },
          ]}
        >
          <Input placeholder="Phone" />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please enter location" }]}
        >
          <Input placeholder="Location" />
        </Form.Item>

        <Form.Item
          label="Education"
          name="education"
          rules={[
            { required: true, message: "Please enter Education Details" },
          ]}
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
