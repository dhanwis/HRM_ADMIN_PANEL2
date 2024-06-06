import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Pagination, DatePicker } from 'antd';
import moment from 'moment';
import bgleave from '../../assets/images/vectorteam3.png';

const { RangePicker } = DatePicker;

const LeaveForm = () => {
  const [form] = Form.useForm();
  const [submittedRequests, setSubmittedRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('submittedLeaves')) || [];
    const formattedData = savedData.map(item => ({
      ...item,
      startDate: item.startDate ? moment(item.startDate, 'YYYY-MM-DD') : null,
      endDate: item.endDate ? moment(item.endDate, 'YYYY-MM-DD') : null,
    }));
    setSubmittedRequests(formattedData);
  }, []);

  const onFinish = values => {
    const newRequest = {
      ...values,
      key: Date.now(),
      startDate: moment(values.dateRange[0]).format('YYYY-MM-DD'),
      endDate: moment(values.dateRange[1]).format('YYYY-MM-DD'),
      duration: moment(values.dateRange[1]).diff(moment(values.dateRange[0]), 'days') + 1,
      requestStatus: 'Pending',
    };
    const updatedRequests = [...submittedRequests, newRequest];
    setSubmittedRequests(updatedRequests);
    localStorage.setItem('submittedLeaves', JSON.stringify(updatedRequests));
    form.resetFields();
  };

  const onFinishFailed = errorInfo => {
    console.error('Failed:', errorInfo);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = submittedRequests.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = page => setCurrentPage(page);

  const columns = [
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: text => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: text => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    },
    {
      title: 'Duration (days)',
      dataIndex: 'duration',
      key: 'duration',
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
      <div style={{ 
        backgroundImage: `url(${bgleave})`, 
        width: "500px%", 
        height: "800px", 
        paddingTop: '2px', 
        paddingLeft:'-20px',
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat'
      }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ margin: '0 auto', maxWidth: 600 }}
        >
          <h3 style={{ marginTop: '20px' }}>Leave Request Form</h3>
          <Form.Item
            label="Leave Duration"
            name="dateRange"
            rules={[{ required: true, message: 'Please select the leave duration' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
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
    </div>
  );
};

export default LeaveForm;
