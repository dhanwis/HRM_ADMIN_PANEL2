import React, { useState, useEffect } from 'react';
import { Typography, Button, Modal, Form, Select, DatePicker, Input, message } from 'antd';
import moment from 'moment';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

function LeaveForm() {
  const [teams, setTeams] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [leaveStatus, setLeaveStatus] = useState(null);
  const [employees, setEmployees] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch employees from the backend
    fetch('/api/employees')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      // Simulate sending leave request to HR
      fetch('/api/submitLeaveRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'approved') {
            setLeaveStatus('Leave Approved');
            message.success('Leave request approved');
          } else {
            setLeaveStatus('Pending');
            message.info('Leave request is pending approval');
          }
        })
        .catch(error => {
          console.error('Error submitting leave request:', error);
          setLeaveStatus('Pending');
          message.error('Error submitting leave request');
        });

      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="leave-form" style={{ paddingTop: "50px", overflowX: "auto" }}>
      <Title level={5}>Leave Request Form</Title>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Request Leave
      </Button>
      <Modal title="Leave Request" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="date" label="Day of Absence" rules={[{ required: true, message: 'Please select the day of absence' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="workAssignment" label="Work Assignment" rules={[{ required: true, message: 'Please select a work assignment' }]}>
            <Select placeholder="Select work assignment">
              {employees.map((employee) => (
                <Option key={employee.id} value={employee.name}>{employee.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="leaveReason" label="Leave Reason" rules={[{ required: true, message: 'Please provide a reason for the leave' }]}>
            <TextArea rows={4} placeholder="Enter the reason for your leave" />
          </Form.Item>
        </Form>
      </Modal>
      {leaveStatus && (
        <div style={{ marginTop: 16 }}>
          <Title level={5}>Leave Status: {leaveStatus}</Title>
        </div>
      )}
    </div>
  );
}

export default LeaveForm;
