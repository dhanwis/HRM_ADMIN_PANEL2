import { useState } from "react";
import { Table, Typography, Input, DatePicker, Button, Select, Modal, Form } from "antd";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

function CustomerDetails() {
  const [customerDetails, setCustomerDetails] = useState([
    {
      id: 1,
      name: "Samyukth k",
      phoneNumber: "9192345678",
      projectName: "Website Redesign",
      startDate: moment("2024-05-01", "YYYY-MM-DD"),
      deadline: moment("2024-06-15", "YYYY-MM-DD"),
    },
    {
      id: 2,
      name: "Aswin kp",
      phoneNumber: "9996669966",
      projectName: "Mobile App Development",
      startDate: moment("2024-04-15", "YYYY-MM-DD"),
      deadline: moment("2024-07-01", "YYYY-MM-DD"),
    },
    // Add more customer details as needed
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newCustomer = {
        id: customerDetails.length + 1,
        name: values.name,
        phoneNumber: values.phoneNumber,
        projectName: values.projectName,
        startDate: moment(values.startDate),
        deadline: moment(values.deadline),
      };
      setCustomerDetails([...customerDetails, newCustomer]);
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
      title: "Print",
      key: "print",
      render: (text, record) => (
        <Button type="link" onClick={() => handlePrint(record)}>Print</Button>
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
  );
}

export default CustomerDetails;
