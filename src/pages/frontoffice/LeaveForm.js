import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Pagination, DatePicker } from 'antd';
import moment from 'moment';
import bg from "../../assets/images/bgvector.png"
import axios from 'axios';
import { baseUrlHr } from '../../url';

const { RangePicker } = DatePicker;

const OfficeLeaveForm = () => {
  const [form] = Form.useForm();
  const [submittedRequests, setSubmittedRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const token = localStorage.getItem('authToken')

  useEffect(() => {
    const fetchLeaveData = async () => {
      let response = await axios.get(`${baseUrlHr}/leaverequest/`, {
        headers: { Authorization: `Token ${token}` },
      });

      console.log("response", response);

      if (response.status === 200) {
        const formattedData = response.data?.map((item) => ({
          ...item,
          start_date: item.start_date
            ? moment(item.start_date, "YYYY-MM-DD")
            : null,
          end_date: item.end_date ? moment(item.end_date, "YYYY-MM-DD") : null,
        }));
        setSubmittedRequests(formattedData);
      }
    };

    fetchLeaveData();
  }, []);

  const onFinish = async (values) => {
    const newRequest = {
      ...values,
      key: Date.now(),
      start_date: moment(values.dateRange[0]).format("YYYY-MM-DD"),
      end_date: moment(values.dateRange[1]).format("YYYY-MM-DD"),
      duration:
        moment(values.dateRange[1]).diff(moment(values.dateRange[0]), "days") +
        1,
      status: "Pending",
    };
    let response = await axios.post(`${baseUrlHr}/leaverequest/`, newRequest, {
      headers: { Authorization: `Token ${token}` },
    });
    console.log("response", response);

    if (response.status === 201) {
      const updatedRequests = [...submittedRequests, response.data];
      setSubmittedRequests(updatedRequests);
    }

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
      dataIndex: 'duration_days',
      key: 'duration',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'requestStatus',
    },
  ];

  return (
    <div style={{backgroundImage:`url(${ bg })`,height:"800px"}}>
    <div className='container mt-5'>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ margin: '0 auto', maxWidth: 600 }}
      >
        <h3>Leave Request Form</h3>
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

export default OfficeLeaveForm;
