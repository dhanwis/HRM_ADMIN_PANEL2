import React, { useState, useEffect } from "react";
import { Table, Typography, Input, DatePicker, Button, Select, Modal, Form } from "antd";
import moment from "moment";
import bg from "../../assets/images/bgvector.png"

const { Title } = Typography;
const { Option } = Select;

function CustomerDetails() {
  const [customerDetails, setCustomerDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedData = localStorage.getItem("customerDetails");
    if (storedData) {
      setCustomerDetails(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("customerDetails", JSON.stringify(customerDetails));
  }, [customerDetails]);

  const showModal = () => {
    setIsModalVisible(true);
    setSelectedCustomer(null); // Reset selectedCustomer when opening modal for adding new customer
  };

  const handleEdit = (record) => {
    setSelectedCustomer(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      name: record.name,
      phoneNumber: record.phoneNumber,
      projectName: record.projectName,
      startDate: moment(record.startDate),
      deadline: moment(record.deadline),
    });
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (selectedCustomer) {
        // Edit existing customer
        const updatedCustomerDetails = customerDetails.map((customer) =>
          customer.id === selectedCustomer.id ? { ...customer, ...values } : customer
        );
        setCustomerDetails(updatedCustomerDetails);
      } else {
        // Add new customer
        const newCustomer = {
          id: customerDetails.length + 1,
          ...values,
          startDate: moment(values.startDate),
          deadline: moment(values.deadline),
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

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      editable: true,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      editable: true,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text, record) => moment(text).format("LL"),
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      render: (text, record) => moment(text).format("LL"),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" onClick={() => handlePrint(record)}>Print</Button>
        </span>
      ),
    },
  ];

  const handlePrint = (record) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<html><head><title>Customer Details</title></head><body><h1>${record.name}</h1><p>Phone Number: ${record.phoneNumber}</p><p>Project Name: ${record.projectName}</p><p>Start Date: ${moment(record.startDate).format("LL")}</p><p>Deadline: ${moment(record.deadline).format("LL")}</p></body></html>`);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div style={{backgroundImage:`url(${ bg })`,height:"800px"}}>
    <div className="customer-details"style={{paddingTop:"50px"}}>
      <Title level={5}>Confirmed Customer Details</Title>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add Customer
      </Button>
      <Button type="danger" onClick={handleDelete} style={{ marginBottom: 16, marginLeft: 16 }}>
        Delete Selected
      </Button>
      <Modal title={selectedCustomer ? "Edit Customer" : "Add Customer"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Customer Name" rules={[{ required: true, message: "Please enter customer name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: "Please enter phone number" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="projectName" label="Project Name" rules={[{ required: true, message: "Please select project name" }]}>
            <Select>
              <Option value="Mobile App Development">Mobile App Development</Option>
              <Option value="Website Redesign">Website Redesign</Option>
            </Select>
          </Form.Item>
          <Form.Item name="startDate" label="Start Date" rules={[{ required: true, message: "Please select start date" }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="deadline" label="Deadline" rules={[{ required: true, message: "Please select deadline" }]}>
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
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

export default CustomerDetails;
