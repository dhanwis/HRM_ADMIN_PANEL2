import { useState, useEffect } from "react";
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
      const newCustomer = {
        id: customerDetails.length + 1,
        projectName: values.projectName,
        employeeName: values.employeeName,
        projectDate: moment(values.projectDate),
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
    printWindow.document.write(`
      <html>
        <head><title>Customer Details</title></head>
        <body>
          <h1>${record.projectName}</h1>
          <p>Employee Name: ${record.employeeName}</p>
          <p>Project Date: ${moment(record.projectDate).format("LL")}</p>
          <p>Deadline: ${moment(record.deadline).format("LL")}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

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
      <Modal title="Add Customer" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
