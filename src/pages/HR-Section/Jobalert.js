import React, { useState } from 'react';
import { Form, Input, Radio, Button, Table, Space, Modal, Select, DatePicker } from 'antd';
import 'antd/dist/antd.css'; // Import Ant Design styles
import moment from 'moment';

const JobForm = () => {
  const [form] = Form.useForm();
  const [workLocation, setWorkLocation] = useState('Work from Home');
  const [jobData, setJobData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: 'Mode of working',
      dataIndex: 'workLocation',
      key: 'workLocation',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
    },
    {
      title: 'Last Date',
      dataIndex: 'lastDate',
      key: 'lastDate',
      render: (text, record) => {
        return <span>{moment(record.lastDate).format('YYYY-MM-DD')}</span>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setSelectedJob(record);
    setIsModalVisible(true);
    form.setFieldsValue({ ...record, lastDate: moment(record.lastDate) });
  };

  const handleDelete = (record) => {
    setJobData(jobData.filter((job) => job !== record));
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
    if (selectedJob) {
      const updatedJobs = jobData.map((job) => (job === selectedJob ? values : job));
      setJobData(updatedJobs);
      setSelectedJob(null);
    } else {
      setJobData([...jobData, values]);
    }
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Company Name" name="companyName" rules={[{ required: true, message: 'Please input company name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Job Title" name="jobTitle" rules={[{ required: true, message: 'Please input job title' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Salary" name="salary" rules={[{ required: true, message: 'Please input salary' }, { pattern: /^\d+$/, message: 'Salary must be a number' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Mode of working" name="workLocation" initialValue="Work from Home">
          <Radio.Group onChange={(e) => setWorkLocation(e.target.value)}>
            <Radio value="Work from Home">Work from Home</Radio>
            <Radio value="Work from Office">Work from Office</Radio>
          </Radio.Group>
        </Form.Item>
        {workLocation === 'Work from Office' && (
          <Form.Item label="Location" name="location" rules={[{ required: true, message: 'Please input location' }]}>
            <Input />
          </Form.Item>
        )}
        <Form.Item
          name="experience"
          label="Experience"
          rules={[{ required: true, message: 'Please input the experience!' }]}
        >
          <Select>
            <Select.Option value="0 year">0 year</Select.Option>
            <Select.Option value="1 year">1 year</Select.Option>
            <Select.Option value="2 years">2 years</Select.Option>
            <Select.Option value="more than 2 years">More than 2 years</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Last Date" name="lastDate" rules={[{ required: true, message: 'Please select last date' }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {selectedJob ? 'Update' : 'Apply'}
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={jobData} rowKey={(record) => record.companyName + record.jobTitle} />
      <Modal title="Edit Job" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item label="Company Name" name="companyName" rules={[{ required: true, message: 'Please input company name' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Job Title" name="jobTitle" rules={[{ required: true, message: 'Please input job title' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Salary" name="salary" rules={[{ required: true, message: 'Please input salary' },{ pattern: /^\d+$/, message: 'Salary must be a number' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mode of working" name="workLocation">
            <Radio.Group onChange={(e) => setWorkLocation(e.target.value)}>
              <Radio value="Work from Home">Work from Home</Radio>
              <Radio value="Work from Office">Work from Office</Radio>
            </Radio.Group>
          </Form.Item>
          {workLocation === 'Work from Office' && (
            <Form.Item label="Location" name="location" rules={[{ required: true, message: 'Please input location' }]}>
              <Input />
            </Form.Item>
          )}
          <Form.Item
            name="experience"
            label="Experience"
            rules={[{ required: true, message: 'Please input the experience!' }]}
          >
            <Select>
              <Select.Option value="0 year">0 year</Select.Option>
              <Select.Option value="1 year">1 year</Select.Option>
              <Select.Option value="2 years">2 years</Select.Option>
              <Select.Option value="more than 2 years">More than 2 years</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Last Date" name="lastDate" rules={[{ required: true, message: 'Please select last date' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default JobForm;
