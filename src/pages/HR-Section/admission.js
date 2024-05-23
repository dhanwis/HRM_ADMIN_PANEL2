import React from 'react';
import { Form, Input, Button, DatePicker, TimePicker } from 'antd';

const AdmissionForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form Values:', values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter your name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone"
        rules={[{ required: true, message: 'Please enter your phone number' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="course"
        label="Course Title"
        rules={[{ required: true, message: 'Please enter the course title' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="fee"
        label="Total fee"
        rules={[{ required: true, message: 'Please enter the fee' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="installments"
        label="Installments"
        rules={[{ required: true, message: 'Please enter the installment details' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="time"
        label="Time"
        rules={[{ required: true, message: 'Please select the time' }]}
      >
        <TimePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="admission_date"
        label="Date of Admission"
        rules={[{ required: true, message: 'Please select the date of admission' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="joining_date"
        label="Date of Joining"
        rules={[{ required: true, message: 'Please select the date of joining' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="first_payment"
        label="First Payment"
        rules={[{ required: true, message: 'Please enter the first payment amount' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="first_payment_date"
        label="First Payment Date"
        rules={[{ required: true, message: 'Please select the first payment date' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="second_payment"
        label="Second Payment"
        rules={[{ required: true, message: 'Please enter the second payment amount' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="second_payment_date"
        label="Second Payment Date"
        rules={[{ required: true, message: 'Please select the second payment date' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="third_payment"
        label="Third Payment"
        rules={[{ required: true, message: 'Please enter the third payment amount' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="third_payment_date"
        label="Third Payment Date"
        rules={[{ required: true, message: 'Please select the third payment date' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdmissionForm;
