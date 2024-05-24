import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Table, DatePicker, Space, message } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';

const AdmissionForm = () => {
  const [admissions, setAdmissions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [editingAdmission, setEditingAdmission] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingAdmission(null);
  };

  const addAdmission = (admission) => {
    try {
      const formattedAdmission = {
        ...admission,
        admission_date: admission.admission_date ? admission.admission_date.format('YYYY-MM-DD') : null,
        joining_date: admission.joining_date ? admission.joining_date.format('YYYY-MM-DD') : null,
        first_payment_date: admission.first_payment_date ? admission.first_payment_date.format('YYYY-MM-DD') : null,
        second_payment_date: admission.second_payment_date ? admission.second_payment_date.format('YYYY-MM-DD') : null,
        third_payment_date: admission.third_payment_date ? admission.third_payment_date.format('YYYY-MM-DD') : null,
        installments: parseInt(admission.installments) || 0,
        fee: parseInt(admission.fee) || 0,
      };
      setAdmissions([...admissions, { id: admissions.length + 1, ...formattedAdmission }]);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error adding admission:", error);
      message.error("An error occurred while adding the admission.");
    }
  };

  const editAdmission = (id) => {
    const admission = admissions.find(adm => adm.id === id);
    setEditingAdmission(admission);
    setIsModalVisible(true);
  };

  const updateAdmission = (values) => {
    try {
      const updatedAdmissions = admissions.map(admission => {
        if (admission.id === editingAdmission.id) {
          return {
            ...admission,
            ...values,
            admission_date: values.admission_date ? values.admission_date.format('YYYY-MM-DD') : null,
            joining_date: values.joining_date ? values.joining_date.format('YYYY-MM-DD') : null,
            first_payment_date: values.first_payment_date ? values.first_payment_date.format('YYYY-MM-DD') : null,
            second_payment_date: values.second_payment_date ? values.second_payment_date.format('YYYY-MM-DD') : null,
            third_payment_date: values.third_payment_date ? values.third_payment_date.format('YYYY-MM-DD') : null,
            installments: parseInt(values.installments),
            fee: parseInt(values.fee),
          };
        }
        return admission;
      });
      setAdmissions(updatedAdmissions);
      setIsModalVisible(false);
      setEditingAdmission(null);
    } catch (error) {
      console.error("Error updating admission:", error);
      message.error("An error occurred while updating the admission.");
    }
  };

  const deleteAdmission = (id) => {
    const updatedAdmissions = admissions.filter(admission => admission.id !== id);
    setAdmissions(updatedAdmissions);
  };

  const viewAdmission = (id) => {
    const admission = admissions.find(adm => adm.id === id);
    setSelectedAdmission(admission);
  };

  const closeAdmissionDetails = () => {
    setSelectedAdmission(null);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
    },
    {
      title: 'Date of Admission',
      dataIndex: 'admission_date',
      key: 'admission_date',
    },
    {
      title: 'Date of Joining',
      dataIndex: 'joining_date',
      key: 'joining_date',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => viewAdmission(record.id)}>View</Button>
          <Button onClick={() => editAdmission(record.id)}>Edit</Button>
          <Button onClick={() => deleteAdmission(record.id)} type="danger">Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="App" style={{ marginTop: '50px' }}>
      <h3 style={{ marginBottom: '50px' }}>Admission Form</h3>
      <Button type="primary" style={{ marginBottom: '50px' }} onClick={showModal}>
        Add New Admission
      </Button>
      <AdmissionFormModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onCreate={addAdmission}
        onUpdate={updateAdmission}
        editingAdmission={editingAdmission}
      />
      <Table dataSource={admissions} columns={columns} rowKey="id" />
      {selectedAdmission && (
        <AdmissionDetails 
          admission={selectedAdmission} 
          onClose={closeAdmissionDetails} 
        />
      )}
    </div>
  );
};

const AdmissionFormModal = ({ visible, onCancel, onCreate, onUpdate, editingAdmission }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingAdmission) {
      form.setFieldsValue({
        name: editingAdmission.name,
        phone: editingAdmission.phone,
        course: editingAdmission.course,
        fee: editingAdmission.fee.toString(),
        installments: editingAdmission.installments.toString(),
        admission_date: moment(editingAdmission.admission_date),
        joining_date: moment(editingAdmission.joining_date),
        first_payment: editingAdmission && editingAdmission.first_payment ? editingAdmission.first_payment.toString() : '',
        first_payment_date: editingAdmission.first_payment_date ? moment(editingAdmission.first_payment_date) : null, // Handle null case
        second_payment: editingAdmission && editingAdmission.second_payment ? editingAdmission.second_payment.toString() : '',
        second_payment_date: editingAdmission.second_payment_date ? moment(editingAdmission.second_payment_date) : null,
        third_payment: editingAdmission && editingAdmission.third_payment ? editingAdmission.third_payment.toString() : '',
        third_payment_date: editingAdmission.third_payment_date ? moment(editingAdmission.third_payment_date) : null,
      });
    } else {
      form.resetFields();
    }
  }, [editingAdmission, form]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      form.resetFields();
      try {
        if (editingAdmission) {
          onUpdate(values);
        } else {
          onCreate(values);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        message.error("An error occurred while submitting the form.");
      }
    }).catch(errorInfo => {
      console.error("Validation Failed:", errorInfo);
    });
  };

  return (
    <Modal 
      visible={visible}
      title={editingAdmission ? "Edit Admission" : "Add New Admission"}
      onCancel={onCancel}
      onOk={handleSubmit}
      width={1200}
    >
      <Form form={form} layout="vertical" name="admission_form">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the student name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: 'Please enter the phone number!' },
            { pattern: /^[0-9]{10}$/, message: 'Phone number must be exactly 10 digits!' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="course"
          label="Course"
          rules={[{ required: true, message: 'Please enter the course!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="fee"
          label="Fee"
          rules={[
            { required: true, message: 'Please enter the fee!' },
            { pattern: /^[0-9]+$/, message: 'Fee must contain only digits!' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="installments"
          label="Installments"
          rules={[
            { required: true, message: 'Please enter the installment details!' },
            { pattern: /^[0-9]+$/, message: 'Installments must contain only digits!' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="admission_date"
          label="Date of Admission"
          rules={[{ required: true, message: 'Please select the date of admission!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="joining_date"
          label="Date of Joining"
          rules={[{ required: true, message: 'Please select the date of joining!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="first_payment"
          label="First Payment"
          rules={[
            { required: true, message: 'Please enter the first payment details!' },
            { pattern: /^[0-9]+$/, message: 'First Payment must contain only digits!' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="first_payment_date"
          label="First Payment Date"
          rules={[{ required: true, message: 'Please select the first payment date!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="second_payment"
          label="Second Payment"
          rules={[
            { message: 'Please enter the second payment details!' },
            { pattern: /^[0-9]+$/, message: 'Second Payment must contain only digits!' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="second_payment_date"
          label="Second Payment Date"
          rules={[
            { required: !!form.getFieldValue('second_payment'), message: 'Please select the second payment date!' }
          ]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="third_payment"
          label="Third Payment"
          rules={[
            { message: 'Please enter the third payment details!' },
            { pattern: /^[0-9]+$/, message: 'Third Payment must contain only digits!' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="third_payment_date"
          label="Third Payment Date"
          rules={[{ message: 'Please select the third payment date!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AdmissionDetails = ({ admission, onClose }) => {
  return (
    <Modal
      visible={true}
      title="Admission Details"
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>
      ]}
      onCancel={onClose}
    >
      <p><strong>Name:</strong> {admission.name}</p>
      <p><strong>Phone:</strong> {admission.phone}</p>
      <p><strong>Course:</strong> {admission.course}</p>
      <p><strong>Fee:</strong> {admission.fee}</p>
      <p><strong>Installments:</strong> {admission.installments}</p>
      <p><strong>Date of Admission:</strong> {admission.admission_date}</p>
      <p><strong>Date of Joining:</strong>{admission.joining_date}</p>
      <p><strong>First Payment:</strong> {admission.first_payment}</p>
      <p><strong>First Payment Date:</strong> {admission.first_payment_date}</p>
      <p><strong>Second Payment:</strong> {admission.second_payment}</p>
      <p><strong>Second Payment Date:</strong> {admission.second_payment_date}</p>
      <p><strong>Third Payment:</strong> {admission.third_payment}</p>
      <p><strong>Third Payment Date:</strong> {admission.third_payment_date}</p>
    </Modal>
  );
};

export default AdmissionForm;
