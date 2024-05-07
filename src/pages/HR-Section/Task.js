import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Table } from "antd";

const Taskform = () => {
  const [form] = Form.useForm();
  const [internshipType, setInternshipType] = useState(null);
  const [tableData, setTableData] = useState([]);

  const onFinish = (values) => {
    console.log("Success:", values);
    setTableData([...tableData, values]);
    form.resetFields();
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

  const handleInternshipTypeChange = (e) => {
    setInternshipType(e.target.value);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Task Title",
      dataIndex: "taskTitle",
      key: "taskTitle",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Task Description",
      dataIndex: "taskDescription",
      key: "taskDescription",
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
        {/* Task Information Section */}
        <h2>Task Information</h2>
        <Form.Item
          label="ID"
          name="id"
          rules={[
            { required: true, message: "Please enter ID" },
          ]}
          style={{ width: '50%' }} 
        >
          <Input placeholder="ID" />
        </Form.Item>
        <Form.Item
          label="Task Title"
          name="taskTitle"
          rules={[
            { required: true, message: "Please enter task title" },
          ]}
          style={{ width: '50%' }} 
        >
          <Input placeholder="Task Title" />
        </Form.Item>
        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[
            { required: true, message: "Please select start date" },
          ]}
          style={{ width: '50%' }} 
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="End Date"
          name="endDate"
          rules={[
            { required: true, message: "Please select end date" },
          ]}
          style={{ width: '50%' }} 
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Task Description"
          name="taskDescription"
          rules={[
            { required: true, message: "Please enter task description" },
          ]}
          style={{ width: '50%' }} 
        >
          <Input.TextArea placeholder="Task Description" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* Table Section */}
      <h2>Task Data</h2>
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
};

export default Taskform;
