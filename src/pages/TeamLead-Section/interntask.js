import React, { useState } from 'react';
import { Typography, Input, DatePicker, Button, Table } from 'antd';
import moment from 'moment';

const { Title } = Typography;

const StudentTasks = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    task: '',
    id: '',
    details: '',
    guide: '',
    machine: '',
    startdate: null,
    deadline: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudents([...students, formData]);
    setFormData({
      task: '',
      id: '',
      details: '',
      guide: '',
      machine: '',
      startdate: null,
      deadline: null,
    });
  };

  const handleDelete = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  const columns = [
    {
      title: 'Task Name',
      dataIndex: 'task',
      key: 'task',
    },
    {
      title: 'Student ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Task Details',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'Guide',
      dataIndex: 'guide',
      key: 'guide',
    },
    {
      title: 'Start Date',
      dataIndex: 'startdate',
      key: 'startdate',
      render: (date) => (date ? moment(date).format('YYYY-MM-DD') : '-'),
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (date) => (date ? moment(date).format('YYYY-MM-DD') : '-'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record, index) => (
        <Button type="danger" onClick={() => handleDelete(index)}>Delete</Button>
      ),
    },
  ];

  return (
    <div style={{ paddingTop: "50px", overflowX: "auto" }}>
      <Title level={4}>Student Tasks</Title>
      <form onSubmit={handleSubmit}>
        <Input placeholder="Task" name="task" value={formData.task} onChange={handleChange} />
        <Input type="number" placeholder="Student ID" name="id" value={formData.id} onChange={handleChange} style={{ marginTop: "10px" }} />
        <Input.TextArea placeholder="Task Details" name="details" value={formData.details} onChange={handleChange} style={{ marginTop: "10px" }} />
        <Input placeholder="Assigned Guide" name="guide" value={formData.guide} onChange={handleChange} style={{ marginTop: "10px" }} />
        <Input type="number" placeholder="Machine Number" name="machine" value={formData.machine} onChange={handleChange} style={{ marginTop: "10px" }} />
        <DatePicker placeholder="Start Date" name="startdate" value={formData.startdate} onChange={(date) => setFormData({ ...formData, startdate: date })} style={{ marginTop: "10px" }} />
        <DatePicker placeholder="Deadline" name="deadline" value={formData.deadline} onChange={(date) => setFormData({ ...formData, deadline: date })} style={{ marginTop: "10px", marginLeft: "10px" }} />
        <Button type="primary" htmlType="submit" style={{ marginTop: "10px", marginLeft: "10px" }}>Add Student</Button>
      </form>
      <Table dataSource={students} columns={columns} rowKey={(record, index) => index} />
    </div>
  );
};

export default StudentTasks;
