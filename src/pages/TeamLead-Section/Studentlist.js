import React, { useState } from 'react';
import { Table, Typography, Input, Button, Modal, Form } from 'antd';
import moment from 'moment';

const { Title } = Typography;

function StudentList() {
  const [students, setStudents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      setStudents([...students, values]);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = () => {
    const filteredData = students.filter((item) => !selectedRowKeys.includes(item.id));
    setStudents(filteredData);
    setSelectedRowKeys([]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    },
    {
      title: 'Student ID',
      dataIndex: 'id',
      key: 'id',
      editable: true,
    },
    {
      title: 'Student Details',
      dataIndex: 'details',
      key: 'details',
      editable: true,
    },
    {
      title: 'Guide',
      dataIndex: 'guide',
      key: 'guide',
      editable: true,
    },
    {
      title: 'Machine Number',
      dataIndex: 'machineNumber',
      key: 'machineNumber',
      editable: true,
    },
    {
      title: 'Time Slot',
      dataIndex: 'timeSlot',
      key: 'timeSlot',
      editable: true,
    },
  ];

  return (
    <div className="student-list" style={{paddingTop:"50px", overflowX: "auto"}}>
      <Title level={5}>Student List</Title>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add Student
      </Button>
      <Button type="danger" onClick={handleDelete} style={{ marginBottom: 16, marginLeft: 16 }}>
        Delete Selected
      </Button>
      <Modal title="Add Student" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Student Name" rules={[{ required: true, message: 'Please enter student name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="id" label="Student ID" rules={[{ required: true, message: 'Please enter student ID' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="details" label="Student Details" rules={[{ required: true, message: 'Please enter student details' }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="guide" label="Guide" rules={[{ required: true, message: 'Please enter guide' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="machineNumber" label="Machine Number" rules={[{ required: true, message: 'Please enter machine number' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="timeSlot" label="Time Slot" rules={[{ required: true, message: 'Please enter time slot' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        dataSource={students}
        columns={columns}
        pagination={false}
        rowKey="id"
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
      />
    </div>
  );
}

export default StudentList;
