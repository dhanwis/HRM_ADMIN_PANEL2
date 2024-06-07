import { useState } from 'react';
import { Table, Typography, Input, DatePicker, Button, Modal, Form, Row, Col, message } from 'antd';
import moment from 'moment';
import vector1 from '../../assets/images/vectorteam5.png';

const { Title } = Typography;

function DigitalMarketingTable() {
  const [digital, setDigital] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editMode) {
        const updatedData = digital.map(item =>
          item.id === currentRecord.id ? { ...item, ...values } : item
        );
        setDigital(updatedData);
      } else {
        const newData = {
          id: digital.length + 1,
          ...values,
        };
        setDigital([...digital, newData]);
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditMode(false);
      setCurrentRecord(null);
    }).catch((info) => {
      message.error('Please check the form fields and try again.');
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditMode(false);
    setCurrentRecord(null);
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentRecord(record);
    form.setFieldsValue({
      ...record,
      startdate: moment(record.startdate),
      enddate: moment(record.enddate),
    });
    showModal();
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
      render: (text) => moment(text).format('YYYY-MM-DD'),
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
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Amount Spend',
      dataIndex: 'amountspend',
      key: 'amountspend',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" size="small" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div style={{ backgroundImage: `url(${vector1})`, width: "100%", height: "730px" }}>
      <div style={{ padding: '50px' }}>
        <Title level={5}>Digital Marketing Table</Title>
        <Row justify="space-between" align="middle">
          <Col>
            <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
              Add Customer
            </Button>
          </Col>
          <Col>
            <Button type="danger" onClick={handleDelete} style={{ marginBottom: 16 }}>
              Delete Selected
            </Button>
          </Col>
        </Row>
        <Modal
          title={editMode ? "Edit Customer" : "Add Customer"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="clientname"
              label="Client Name"
              rules={[
                { required: true, message: 'Please enter client name' },
                { min: 4, message: 'Client name must be at least 4 characters' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="customerid"
              label="Customer ID"
              rules={[
                { required: true, message: 'Please enter customer ID' },
                { pattern: /^\d{3,}$/, message: 'Customer ID must be numeric and at least 3 digits' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="post" label="Post" rules={[{ required: true, message: 'Please enter post' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="firmname"
              label="Firm Name"
              rules={[
                { required: true, message: 'Please enter firm name' },
                { min: 4, message: 'Firm name must be at least 4 characters' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="startdate"
              label="Start Date"
              rules={[
                { required: true, message: 'Please select start date' },
                {
                  validator: (_, value) =>
                    value && value.isBefore(moment().startOf('day'))
                      ? Promise.reject(new Error('Start date cannot be in the past'))
                      : Promise.resolve(),
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: 'Please enter location' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="enddate"
              label="End Date"
              rules={[
                { required: true, message: 'Please select end date' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || !getFieldValue('startdate') || value.isAfter(getFieldValue('startdate'))) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('End date must be after start date'));
                  },
                }),
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="amountspend"
              label="Amount Spend"
              rules={[
                { required: true, message: 'Please enter amount spend' },
                { pattern: /^\d+$/, message: 'Amount spend must be numeric' },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <div style={{ overflowX: 'auto' }}>
          <Table
            dataSource={digital}
            columns={columns}
            pagination={false}
            rowSelection={{ type: 'checkbox', ...rowSelection }}
            rowKey="id"
          />
        </div>
      </div>
    </div>
  );
}

export default DigitalMarketingTable;
