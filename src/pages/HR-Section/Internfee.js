import React, { useState, useEffect } from "react";
import { Form, Input, Button,  Radio, InputNumber, Table, Popconfirm } from "antd";

const Feeform = () => {
  const [form] = Form.useForm();
  const [submittedData, setSubmittedData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("submittedFees")) || [];
    setSubmittedData(savedData);
  }, []);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const onFinish = (values) => {
    const key = Date.now(); // Generate a unique key for each fee
    const newData = [...submittedData, { ...values, key }];
    setSubmittedData(newData);
    form.resetFields();
    setPaymentMethod(null);
    localStorage.setItem("submittedFees", JSON.stringify(newData));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const deleteFee = (key) => {
    const newData = submittedData.filter((item) => item.key !== key);
    setSubmittedData(newData);
    localStorage.setItem("submittedFees", JSON.stringify(newData));
  };

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'studentID',
      key: 'studentID',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Number of Installments',
      dataIndex: 'numInstallments',
      key: 'numInstallments',
    },
    {
      title: 'Installment Amount',
      dataIndex: 'installmentAmount',
      key: 'installmentAmount',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button type="primary" onClick={() => save(record.key)} style={{ marginRight: 8 }}>Save</Button>
            <Button onClick={cancel}>Cancel</Button>
          </span>
        ) : (
          <span>
            <Button type="link" disabled={editingKey !== ""} onClick={() => edit(record.key)}>Edit</Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteFee(record.key)}>
              <Button type="link" disabled={editingKey !== ""}>Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const isEditing = (record) => record.key === editingKey;

  const edit = (key) => {
    setEditingKey(key);
    const feeToEdit = submittedData.find(fee => fee.key === key);
    form.setFieldsValue(feeToEdit);
  };

  const cancel = () => {
    setEditingKey("");
    form.resetFields();
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...submittedData];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        newData[index] = { ...newData[index], ...row };
        setSubmittedData(newData);
        setEditingKey("");
        localStorage.setItem("submittedFees", JSON.stringify(newData));
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h2>Student Fee Payment</h2>
        <Form.Item label="Student ID" name="studentID" rules={[{ required: true, message: "Please enter student ID" }]}>
          <Input placeholder="Student ID" />
        </Form.Item>
        <Form.Item label="Total Amount" name="totalAmount" rules={[{ required: true, message: "Please enter total amount" }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Payment Method" name="paymentMethod" rules={[{ required: true, message: "Please select payment method" }]}>
          <Radio.Group onChange={handlePaymentMethodChange}>
            <Radio value="full">Full Payment</Radio>
            <Radio value="installment">Installment Payment</Radio>
          </Radio.Group>
        </Form.Item>
        {paymentMethod === "installment" && (
          <>
            <Form.Item label="Number of Installments" name="numInstallments">
              <InputNumber min={1} max={12} />
            </Form.Item>
            <Form.Item label="Installment Amount" name="installmentAmount">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
      <div>
        <h2>Submitted Fees</h2>
        <Table dataSource={submittedData} columns={columns} />
      </div>
    </div>
  );
};

export default Feeform;