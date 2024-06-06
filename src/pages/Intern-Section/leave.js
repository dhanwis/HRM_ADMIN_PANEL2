import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Pagination, DatePicker, Row, Col } from 'antd';
import moment from 'moment';

const LeaveForm = () => {
  const [form] = Form.useForm();
  const [submittedRequests, setSubmittedRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('submittedLeaves')) || [];
    savedData.forEach(item => {
      if (item.startDate) item.startDate = moment(item.startDate, 'YYYY-MM-DD');
      if (item.endDate) item.endDate = moment(item.endDate, 'YYYY-MM-DD');
    });
    setSubmittedRequests(savedData);
  }, []);

  const onFinish = (values) => {
    const newRequest = {
      ...values,
      key: Date.now(),
      startDate: moment(values.startDate).format('YYYY-MM-DD'),
      endDate: moment(values.endDate).format('YYYY-MM-DD'),
      requestStatus: 'Pending',
    };
    const updatedRequests = [...submittedRequests, newRequest];
    setSubmittedRequests(updatedRequests);
    form.resetFields();
    localStorage.setItem('submittedLeaves', JSON.stringify(updatedRequests));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = submittedRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(submittedRequests.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  const columns = [
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'requestStatus',
      key: 'requestStatus',
    },
  ];

  return (
    <div className='container mt-5'>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ margin: '0 auto' }}
      >
        <h3>Leave Request Form</h3>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: 'Please select the start date' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="End Date"
              name="endDate"
              rules={[{ required: true, message: 'Please select the end date' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ textAlign: 'center' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div>
        <h3 className="mt-5">Leave History</h3>
        <Table
          dataSource={currentItems}
          columns={columns}
          pagination={false}
          rowKey="key"
        />
        <Pagination
          className="mt-3"
          current={currentPage}
          total={submittedRequests.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default LeaveForm;