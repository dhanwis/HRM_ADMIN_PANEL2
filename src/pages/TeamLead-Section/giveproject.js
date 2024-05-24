import React, { useState, useEffect } from "react";
import { Table, Typography, Input, DatePicker, Button, Modal, Form, Row, Col, Select } from "antd";
import axios from "axios";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

function Giveproject() {
  const [customerDetails, setCustomerDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form] = Form.useForm();
  const [editingRow, setEditingRow] = useState(null);

  useEffect(() => {
    // Fetch employees from the staff database
    axios.get("/api/staff")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the employees!", error);
      });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingRow) {
        const updatedData = customerDetails.map((item) =>
          item.id === editingRow.id ? { ...item, ...values } : item
        );
        setCustomerDetails(updatedData);
        setEditingRow(null);
      } else {
        const newCustomer = {
          id: customerDetails.length + 1,
          ...values,
          projectDate: moment(values.projectDate),
          deadline: moment(values.deadline),
          status: "Pending",
        };
        setCustomerDetails([...customerDetails, newCustomer]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = () => {
    const filteredData = customerDetails.filter((item) => !selectedRowKeys.includes(item.id));
    setCustomerDetails(filteredData);
    setSelectedRowKeys([]);
  };

  const handleEdit = (record) => {
    setEditingRow(record);
    form.setFieldsValue(record);
    showModal();
  };

  const handleStatusChange = (id, status) => {
    setCustomerDetails((prevDetails) =>
      prevDetails.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const columns = [
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      editable: true,
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
      editable: true,
    },
    {
      title: "Project Date",
      dataIndex: "projectDate",
      key: "projectDate",
      render: (text) => moment(text).format("LL"),
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      render: (text) => moment(text).format("LL"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select defaultValue={text} onChange={(value) => handleStatusChange(record.id, value)}>
          <Option value="Pending">Pending</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Finished">Finished</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
      ),
    },
  ];

  return (
    <div className="customer-details" style={{ paddingTop: "50px" }}>
      <Title level={5}>Assign Project</Title>
      <Row justify="space-between" align="middle">
        <Col>
          <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
            Assign project
          </Button>
        </Col>
        <Col>
          <Button type="danger" onClick={handleDelete} style={{ marginBottom: 16, marginLeft: 16 }}>
            Delete Selected
          </Button>
        </Col>
      </Row>
      <Modal title={editingRow ? "Edit Customer" : "Add Customer"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="projectName" label="Project Name" rules={[{ required: true, message: "Please enter project name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="employeeName" label="Employee Name" rules={[{ required: true, message: "Please select employee name" }]}>
            <Select placeholder="Select an employee">
              {employees.map((employee) => (
                <Option key={employee.id} value={employee.name}>
                  {employee.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="projectDate" label="Project Date" rules={[{ required: true, message: "Please select project date" }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="deadline" label="Deadline" rules={[{ required: true, message: "Please select deadline" }]}>
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
      <div style={{ overflowX: 'auto' }}>
        <Table
          dataSource={customerDetails}
          columns={columns}
          pagination={false}
          rowKey="id"
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
        />
      </div>
    </div>
  );
}

export default Giveproject;
