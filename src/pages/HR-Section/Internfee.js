import React, { useState, useEffect } from "react";
import { Table, Typography, Input, Button, Select, Modal, Form, InputNumber } from "antd";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

function Feeform() {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [form] = Form.useForm();
  const [paymentOption, setPaymentOption] = useState(null);

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
      const { paymentOption, ...restValues } = values;
      const totalAmount = paymentOption === "Installment" ? calculateTotalAmount(restValues.firstPayment, restValues.secondPayment, restValues.thirdPayment) : restValues.fullPayment;

      if (editingPayment) {
        const editedPaymentDetails = paymentDetails.map((payment) => {
          if (payment.id === editingPayment.id) {
            return {
              ...payment,
              ...restValues,
              totalAmount,
            };
          }
          return payment;
        });
        setPaymentDetails(editedPaymentDetails);
      } else {
        const newPayment = {
          id: paymentDetails.length + 1,
          ...restValues,
          totalAmount,
          dateTime: moment().format("YYYY-MM-DD hh:mm:ss A"),
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
      form.setFieldsValue(editingPayment);
    }
  };

  const handleDelete = () => {
    const filteredData = paymentDetails.filter((item) => !selectedRowKeys.includes(item.id));
    setPaymentDetails(filteredData);
    setSelectedRowKeys([]);
  };

  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const calculateTotalAmount = (firstPayment, secondPayment, thirdPayment) => {
    return (firstPayment || 0) + (secondPayment || 0) + (thirdPayment || 0);
  };

  const handlePaymentOptionChange = (value) => {
    setPaymentOption(value);
    form.resetFields(["firstPayment", "secondPayment", "thirdPayment", "fullPayment"]);
  };

  // const handlePrint = (record) => {
  //   const printWindow = window.open("", "_blank");
  //   printWindow.document.write(`<html><head><title>Payment Details</title></head><body><h1>Payment Details</h1><p>Name: ${record.studentName}</p><p>Course Name: ${record.courseName}</p><p>Date Time: ${record.dateTime}</p><p>1st Payment: ${record.firstPayment}</p><p>2nd Payment: ${record.secondPayment}</p><p>3rd Payment: ${record.thirdPayment}</p><p>Total Amount: ${record.totalAmount}</p><p>Payment Method: ${record.paymentMethod}</p></body></html>`);
  //   printWindow.document.close();
  //   printWindow.print();
  // };
  const handlePrint = (record) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Payment Receipt</title>
          <style>
            @page {
              size: A4;
              margin: 0;
            }
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .receipt-container {
              width: 100%;
              max-width: 800px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              box-sizing: border-box;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .header h1 {
              margin: 5px 0;
              color: #333;
            }
            .content {
              margin-bottom: 20px;
            }
            .content p {
              margin: 5px 0;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
            }
            .footer p {
              margin: 5px 0;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="header">
              <h1>Payment Receipt</h1>
              
            </div>
            <div class="content">
              <p><strong>Name:</strong> ${record.studentName}</p>
              <p><strong>Course Name:</strong> ${record.courseName}</p>
              <p><strong>Date Time:</strong> ${record.dateTime}</p>
              <p><strong>1st Payment:</strong> ${record.firstPayment || '-'}</p>
              <p><strong>2nd Payment:</strong> ${record.secondPayment || '-'}</p>
              <p><strong>3rd Payment:</strong> ${record.thirdPayment || '-'}</p>
              <p><strong>Total Amount:</strong> ${record.totalAmount || '-'}</p>
              <p><strong>Payment Method:</strong> ${record.paymentMethod}</p>
            </div>
            <div class="footer">
            <p>Thank you for your payment</p>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };
  
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
          <Form.Item name="courseName" label="Course" rules={[{ required: true, message: "Please enter course name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="paymentOption" label="Payment Option" rules={[{ required: true, message: "Please select payment option" }]}>
            <Select onChange={handlePaymentOptionChange}>
              <Option value="Installment">Installment</Option>
              <Option value="Full">Full Payment</Option>
            </Select>
          </Form.Item>
          {paymentOption === "Installment" && (
            <>
              <Form.Item name="firstPayment" label="1st Payment" rules={[{ required: true, message: "Please enter 1st payment" }]}>
                <InputNumber />
              </Form.Item>
              <Form.Item name="secondPayment" label="2nd Payment" rules={[{ required: true, message: "Please enter 2nd payment" }]}>
                <InputNumber />
              </Form.Item>
              <Form.Item name="thirdPayment" label="3rd Payment" rules={[{ required: true, message: "Please enter 3rd payment" }]}>
                <InputNumber />
              </Form.Item>
            </>
          )}
          {paymentOption === "Full" && (
            <Form.Item name="fullPayment" label="Full Payment" rules={[{ required: true, message: "Please enter full payment" }]}>
              <InputNumber />
            </Form.Item>
          )}
          <Form.Item name="paymentMethod" label="Payment Method" rules={[{ required: true, message: "Please select payment method" }]}>
            <Select>
              <Option value="Credit Card">Credit Card</Option>
              <Option value="Debit Card">Debit Card</Option>
              <Option value="Cash">Cash</Option>
              <Option value="UPI">UPI</Option>
              <Option value="Bank Transfer">Bank Transfer</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      
      <Table
        dataSource={paymentDetails}
        columns={[
          { title: "Student Name", dataIndex: "studentName", key: "studentName" },
          { title: "Course", dataIndex: "courseName", key: "courseName" },
          { title: "Date Time", dataIndex: "dateTime", key: "dateTime", render: (text) => moment(text).format("YYYY-MM-DD hh:mm:ss A") },
          // { title: "Payment Option", dataIndex: "paymentOption", key: "paymentOption" },
          { title: "1st Payment", dataIndex: "firstPayment", key: "firstPayment" },
          { title: "2nd Payment", dataIndex: "secondPayment", key: "secondPayment" },
          { title: "3rd Payment", dataIndex: "thirdPayment", key: "thirdPayment" },
          { title: "Full Payment", dataIndex: "fullPayment", key: "fullPayment" },
          { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount", render: (text) => (text ? `${text}` : "-") },
          { title: "Payment Method", dataIndex: "paymentMethod", key: "paymentMethod" },
          { title: "Print", key: "print", render: (text, record) => (<Button type="link" onClick={() => handlePrint(record)}>Print</Button>) },
        ]}
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
