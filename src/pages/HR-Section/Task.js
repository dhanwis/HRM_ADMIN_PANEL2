import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Table, Popconfirm } from "antd";
import moment from "moment";

const Taskform = () => {
  const [form] = Form.useForm();
  const [submittedData, setSubmittedData] = useState([]);
  const [editingKey, setEditingKey] = useState(null);

    useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("submittedData")) || [];
    // Convert date strings back to moment objects
    savedData.forEach(item => {
      if (item.startDate) {
        item.startDate = moment(item.startDate, 'YYYY-MM-DD');
      }
      if (item.endDate) {
        item.endDate = moment(item.endDate, 'YYYY-MM-DD');
      }
    });
    setSubmittedData(savedData);
  }, []);

  const onFinish = (values) => {
    const key = Date.now();
    const newData = {
      ...values,
      key,
      startDate: moment(values.startDate).format("YYYY-MM-DD"), // Convert moment object to string
      endDate: moment(values.endDate).format("YYYY-MM-DD"),     // Convert moment object to string
    };
    setSubmittedData([...submittedData, newData]);
    form.resetFields();
    const updatedData = [...submittedData, newData];
    localStorage.setItem("submittedData", JSON.stringify(updatedData));
    console.log("Updated Data:", updatedData);
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
    initialValues.startDate = moment(recordToEdit.startDate);
    initialValues.endDate = moment(recordToEdit.endDate);
  
    form.setFieldsValue(initialValues);
  };
  

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...submittedData];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        newData[index] = { ...newData[index], ...row };
        newData[index].startDate = moment(newData[index].startDate);
        newData[index].endDate = moment(newData[index].endDate);
        setSubmittedData(newData);
        setEditingKey(null);
        localStorage.setItem("submittedData", JSON.stringify(newData));
        console.log("Updated Data:", newData);
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
      title: 'Task Title',
      dataIndex: 'taskTitle',
      key: 'taskTitle',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text, record) => {
        return <span>{moment(record.startDate).format("YYYY-MM-DD")}</span>;
      }
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text, record) => {
        return <span>{moment(record.endDate).format("YYYY-MM-DD")}</span>;
      }
    },
    {
      title: 'Task Description',
      dataIndex: 'taskDescription',
      key: 'taskDescription',
    },
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
        <h2>Task Information</h2>
        <Form.Item label="ID" name="id" rules={[{ required: true, message: "Please enter ID" }]}>
          <Input placeholder="ID" />
        </Form.Item>
        <Form.Item label="Task Title" name="taskTitle" rules={[{ required: true, message: "Please enter task title" }]}>
          <Input placeholder="Task Title" />
        </Form.Item>
        <Form.Item label="Start Date" name="startDate" rules={[{ required: true, message: "Please select start date" }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="End Date" name="endDate" rules={[{ required: true, message: "Please select end date" }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Task Description" name="taskDescription" rules={[{ required: true, message: "Please enter task description" }]}>
          <Input.TextArea placeholder="Task Description" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div>
        <h2>Submitted Task Information</h2>
        <Table dataSource={submittedData} columns={columns} />
      </div>
    </div>
  );
};

export default Taskform;