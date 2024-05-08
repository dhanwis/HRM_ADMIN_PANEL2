import React, { useState, useEffect } from "react";
import { Table, Typography, Input, DatePicker, Button, Select, Modal, Form, InputNumber } from "antd";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

function Feeform() {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedData = localStorage.getItem("paymentDetails");
    if (storedData) {
      setPaymentDetails(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("paymentDetails", JSON.stringify(paymentDetails));
  }, [paymentDetails]);

  const showModal = () => {
    setIsModalVisible(true);
    setEditingPayment(null);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingPayment) {
        const editedPaymentDetails = paymentDetails.map((payment) => {
          if (payment.id === editingPayment.id) {
            return {
              ...payment,
              studentName: values.studentName,
              courseName: values.courseName,
              firstPayment: values.firstPayment,
              secondPayment: values.secondPayment,
              thirdPayment: values.thirdPayment,
              paymentMethod: values.paymentMethod,
              totalAmount: calculateTotalAmount(values.firstPayment, values.secondPayment),
            };
          }
          return payment;
        });
        setPaymentDetails(editedPaymentDetails);
      } else {
        const newPayment = {
          id: paymentDetails.length + 1,
          studentName: values.studentName,
          courseName: values.courseName,
          dateTime: moment().format("YYYY-MM-DD hh:mm:ss A"), // Add current date and time in 12-hour format
          firstPayment: values.firstPayment,
          secondPayment: values.secondPayment,
          thirddPayment: values.thirdPayment,
          paymentMethod: values.paymentMethod,
          totalAmount: calculateTotalAmount(values.firstPayment, values.secondPayment),
        };
        setPaymentDetails([...paymentDetails, newPayment]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEdit = () => {
    const editingPayment = paymentDetails.find((payment) => payment.id === selectedRowKeys[0]);
    if (editingPayment) {
      setEditingPayment(editingPayment);
      setIsModalVisible(true);
      form.setFieldsValue({
        studentName: editingPayment.studentName,
        courseName: editingPayment.courseName,
        firstPayment: editingPayment.firstPayment,
        secondPayment: editingPayment.secondPayment,
        thirdPayment: editingPayment.thirdPayment,
        paymentMethod: editingPayment.paymentMethod,
      });
    }
  };

  const handleDelete = () => {
    const filteredData = paymentDetails.filter((item) => !selectedRowKeys.includes(item.id));
    setPaymentDetails(filteredData);
    setSelectedRowKeys([]);
  };

  const handlePrint = (record) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<html><head><title>Payment Details</title></head><body><h1>Payment Details</h1><p>Company Name: ${record.companyName}</p><p>Customer Name: ${record.customerName}</p><p>Date Time: ${record.dateTime}</p><p>1st Payment: ${record.firstPayment}</p><p>2nd Payment: ${record.secondPayment}</p><p>Total Amount: ${record.totalAmount}</p><p>Payment Method: ${record.paymentMethod}</p></body></html>`);
    printWindow.document.close();
    printWindow.print();
  };

  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const calculateTotalAmount = (firstPayment, secondPayment,thirdPayment) => {
    return (firstPayment || 0) + (secondPayment || 0) + (thirdPayment || 0);
  };

  const columns = [
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Course",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Date Time",
      dataIndex: "dateTime", // Add Date Time column
      key: "dateTime",
      render: (text) => moment(text).format("YYYY-MM-DD hh:mm:ss A"), // Format date time
    },
    {
      title: "1st Payment",
      dataIndex: "firstPayment",
      key: "firstPayment",
    },
    {
      title: "2nd Payment",
      dataIndex: "secondPayment",
      key: "secondPayment",
    },
    {
      title: "3nd Payment",
      dataIndex: "thirdPayment",
      key: "thirdPayment",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => (text ? `${text}` : "-"),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Print",
      key: "print",
      render: (text, record) => (
        <Button type="link" onClick={() => handlePrint(record)}>Print</Button>
      ),
    },
  ];

  return (
    <div className="payment-details">
      <Title level={5}>Payment Details</Title>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add Payment
      </Button>
      {selectedRowKeys.length === 1 && (
        <Button type="primary" onClick={handleEdit} style={{ marginBottom: 16, marginLeft: 16 }}>
          Edit
        </Button>
      )}
      {selectedRowKeys.length > 0 && (
        <Button type="danger" onClick={handleDelete} style={{ marginBottom: 16, marginLeft: 16 }}>
          Delete Selected
        </Button>
      )}
      <Modal title={editingPayment ? "Edit Payment" : "Add Payment"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="studentName" label="Student Name" rules={[{ required: true, message: "Please enter student name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="course" label="Course" rules={[{ required: true, message: "Please enter course name" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="firstPayment"
            label="1st Payment"
            rules={[{ required: true, message: "Please enter 1st payment" }]}
            dependencies={["firstPayment"]}
          >
            <InputNumber onChange={() => form.validateFields(["firstPayment"])} />
          </Form.Item>
          <Form.Item
            name="secondPayment"
            label="2nd Payment"
            rules={[{ required: true, message: "Please enter 2nd payment" }]}
            dependencies={["secondPayment"]}
          >
            <InputNumber onChange={() => form.validateFields(["secondPayment"])} />
          </Form.Item>
          <Form.Item
            name="tUncaught runtime errors:
            ERROR
            [object Object]
            handleError@http://localhost:3000/static/js/bundle.js:149502:58
            ./node_modules/webpack-dev-server/client/overlay.js/createOverlay/<@http://localhost:3000/static/js/bundle.js:149525:18
            hirdPayment"
            label="3nd Payment"
            rules={[{ required: true, message: "Please enter 3nd payment" }]}
            dependencies={["thirdPayment"]}
          >
            <InputNumber onChange={() => form.validateFields(["thirdPayment"])} />
          </Form.Item>
          <Form.Item name="totalAmount" label="Total Amount">
            <InputNumber disabled />
          </Form.Item>
          <Form.Item name="paymentMethod" label="Payment Method" rules={[{ required: true, message: "Please select payment method" }]}>
            <Select>
              <Option value="Credit Card">Credit Card</Option>
              <Option value="Debit Card">Debit Card</Option>
             < Option value="cash">cash</Option>
              <Option value="upi">upi</Option>
              <Option value="Bank Transfer">Bank Transfer</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        dataSource={paymentDetails}
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

export default Feeform;

	
