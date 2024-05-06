import { useState } from 'react';
import { Table, Typography, Input, DatePicker, Button, Modal, Form } from 'antd';
import moment from 'moment';

const { Title } = Typography;

function DigitalMarketingTable() {
  const [digital, setDigital] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newData = {
        id: digital.length + 1,
        clientname: values.clientname,
        customerid: values.customerid,
        post: values.post,
        firmname: values.firmname,
        startdate: values.startdate,
        location: values.location,
        enddate: values.enddate,
        amountspend: values.amountspend,
      };
      setDigital([...digital, newData]);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = () => {
    const filteredData = digital.filter((item) => !selectedRowKeys.includes(item.id));
    setDigital(filteredData);
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
      title: 'Client Name',
      dataIndex: 'clientname',
      key: 'clientname',
    },
    {
      title: 'Customer ID',
      dataIndex: 'customerid',
      key: 'customerid',
    },
    {
      title: 'Post',
      dataIndex: 'post',
      key: 'post',
    },
    {
      title: 'Firm Name',
      dataIndex: 'firmname',
      key: 'firmname',
    },
    {
      title: 'Start Date',
      dataIndex: 'startdate',
      key: 'startdate',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'End Date',
      dataIndex: 'enddate',
      key: 'enddate',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Amount Spend',
      dataIndex: 'amountspend',
      key: 'amountspend',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Button type="danger" size="small" onClick={() => handleDelete(index)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="customer-details">
      <Title level={5}>Confirmed Customer Details</Title>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add Customer
      </Button>
      <Button type="danger" onClick={handleDelete} style={{ marginBottom: 16, marginLeft: 16 }}>
        Delete Selected
      </Button>
      <Modal title="Add Customer" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="clientname" label="Client Name" rules={[{ required: true, message: 'Please enter client name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="customerid" label="Customer ID" rules={[{ required: true, message: 'Please enter customer ID' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="post" label="Post" rules={[{ required: true, message: 'Please enter post' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="firmname" label="Firm Name" rules={[{ required: true, message: 'Please enter firm name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="startdate" label="Start Date" rules={[{ required: true, message: 'Please select start date' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please enter location' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="enddate" label="End Date" rules={[{ required: true, message: 'Please select end date' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="amountspend" label="Amount Spend" rules={[{ required: true, message: 'Please enter amount spend' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={digital} columns={columns} pagination={false} rowSelection={{ type: 'checkbox', ...rowSelection }} />
    </div>
  );
}

export default DigitalMarketingTable;
