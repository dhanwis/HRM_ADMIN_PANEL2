import React, { useState, useEffect } from 'react';
import { Table, Typography, Input, Button, Modal, Form, Select } from 'antd';
import moment from 'moment';

const { Title } = Typography;
const { Option } = Select;

function StudentList() {
  const [students, setStudents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch student data and categories from the API endpoint
    const fetchData = async () => {
      try {
        const studentsResponse = await fetch('/api/students'); // Replace '/api/students' with your actual API endpoint for students
        if (!studentsResponse.ok) {
          throw new Error('Failed to fetch student data.');
        }
        const studentsData = await studentsResponse.json();
        setStudents(studentsData);

        const categoriesResponse = await fetch('/api/categories'); // Replace '/api/categories' with your actual API endpoint for categories
        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories.');
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      editable: true,
      render: (category) => <span>{category}</span>,
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
          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select category' }]}>
            <Select>
              {categories.map((category) => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
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
