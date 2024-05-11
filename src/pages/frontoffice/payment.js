import React, { useState, useEffect } from "react";
import { Table, Typography, Input, DatePicker, Button, Select, Modal, Form, InputNumber } from "antd";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

function PaymentDetailsPage() {
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
      const totalAmount = calculateTotalAmount(values.firstPayment, values.secondPayment);
      const gstAmount = calculateGST(totalAmount);
      const newPayment = {
        id: editingPayment ? editingPayment.id : paymentDetails.length + 1,
        companyName: values.companyName,
        customerName: values.customerName,
        dateTime: moment().format("YYYY-MM-DD hh:mm:ss A"),
        firstPayment: values.firstPayment || 0,
        secondPayment: values.secondPayment || 0,
        paymentMethod: values.paymentMethod,
        totalAmount: totalAmount + gstAmount,
        gstAmount,
      };
      if (editingPayment) {
        const editedPaymentDetails = paymentDetails.map((payment) => (payment.id === editingPayment.id ? newPayment : payment));
        setPaymentDetails(editedPaymentDetails);
      } else {
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
        companyName: editingPayment.companyName,
        customerName: editingPayment.customerName,
        firstPayment: editingPayment.firstPayment,
        secondPayment: editingPayment.secondPayment,
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
    printWindow.document.write(`<html><head><title>Payment Details</title></head><body><h1>Payment Details</h1><p>Company Name: ${record.companyName}</p><p>Customer Name: ${record.customerName}</p><p>Date Time: ${record.dateTime}</p><p>1st Payment: ${record.firstPayment}</p><p>2nd Payment: ${record.secondPayment}</p><p>GST Amount: ${record.gstAmount}</p><p>Total Amount: ${record.totalAmount}</p><p>Payment Method: ${record.paymentMethod}</p></body></html>`);
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

  const calculateTotalAmount = (firstPayment, secondPayment) => {
    return (firstPayment || 0) + (secondPayment || 0);
  };

  const calculateGST = (totalAmount) => {
    const gstRate = 0.18; // GST rate in percentage
    return totalAmount * gstRate;
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Date Time",
      dataIndex: "dateTime",
      key: "dateTime",
      render: (text) => moment(text).format("YYYY-MM-DD hh:mm:ss A"),
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
    <div className="payment-details"style={{paddingTop:"50px"}}>
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
          <Form.Item name="companyName" label="Company Name" rules={[{ required: true, message: "Please enter company name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="customerName" label="Customer Name" rules={[{ required: true, message: "Please enter customer name" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="firstPayment"
            label="1st Payment"
            rules={[{ required: true, message: "Please enter 1st payment" }]}
          >
            <InputNumber defaultValue={0} />
          </Form.Item>
          <Form.Item
            name="secondPayment"
            label="2nd Payment"
          >
            <InputNumber defaultValue={0} />
          </Form.Item>
          <Form.Item name="totalAmount" label="Total Amount">
            <InputNumber disabled />
          </Form.Item>
          <Form.Item name="paymentMethod" label="Payment Method" rules={[{ required: true, message: "Please select payment method" }]}>
            <Select>
              <Option value="Credit Card">Credit Card</Option>
              <Option value="Debit Card">Debit Card</Option>
              <Option value="PayPal">PayPal</Option>
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

export default PaymentDetailsPage;
