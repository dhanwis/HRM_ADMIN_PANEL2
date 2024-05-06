import { useState } from "react";
import { Table, Typography, Input, DatePicker, Button, Select, Modal, Form } from "antd";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

function Giveproject() {
  const [customerDetails, setCustomerDetails] = useState([
    // {
    //   id: 1,
    //   projectName: "Website Redesign",
    //   employeeId: "EMP001",
    //   projectDate: moment("2024-05-01", "YYYY-MM-DD"),
    //   deadline: moment("2024-06-15", "YYYY-MM-DD"),
    //   companyName: "Company A",
    // },
    // {
    //   id: 2,
    //   projectName: "Mobile App Development",
    //   employeeId: "EMP002",
    //   projectDate: moment("2024-04-15", "YYYY-MM-DD"),
    //   deadline: moment("2024-07-01", "YYYY-MM-DD"),
    //   companyName: "Company B",
    // },
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
        projectName: values.projectName,
        employeeId: values.employeeId,
        projectDate: moment(values.projectDate),
        deadline: moment(values.deadline),
        companyName: values.companyName,
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
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      editable: true,
    },
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
      editable: true,
    },
    {
      title: "Project Date",
      dataIndex: "projectDate",
      key: "projectDate",
      render: (text, record) => moment(text).format("LL"),
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      render: (text, record) => moment(text).format("LL"),
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      editable: true,
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
    printWindow.document.write(<html><head><title>Customer Details</title></head><body><h1>${record.projectName}</h1><p>Employee ID: ${record.employeeId}</p><p>Project Date: ${moment(record.projectDate).format("LL")}</p><p>Deadline: ${moment(record.deadline).format("LL")}</p><p>Company Name: ${record.companyName}</p></body></html>);
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
          <Form.Item name="projectName" label="Project Name" rules={[{ required: true, message: "Please enter project name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="employeeId" label="Employee ID" rules={[{ required: true, message: "Please enter employee ID" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="projectDate" label="Project Date" rules={[{ required: true, message: "Please select project date" }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="deadline" label="Deadline" rules={[{ required: true, message: "Please select deadline" }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="companyName" label="Company Name" rules={[{ required: true, message: "Please enter company name" }]}>
            <Input />
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

export default Giveproject;
