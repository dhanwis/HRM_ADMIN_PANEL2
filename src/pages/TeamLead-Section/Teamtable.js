import React, { useState } from 'react';
import { Table, Typography, Input, Button, Modal, Form } from 'antd';
import moment from 'moment';

const { Title } = Typography;

function Team_Table() {
  const [teams, setTeams] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingRow !== null) {
        // Editing existing row
        const updatedTeams = [...teams];
        updatedTeams[editingRow] = values;
        setTeams(updatedTeams);
        setEditingRow(null);
      } else {
        // Adding new row
        setTeams([...teams, values]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingRow(null);
  };

  const handleDelete = () => {
    const filteredData = teams.filter((item) => !selectedRowKeys.includes(item.id));
    setTeams(filteredData);
    setSelectedRowKeys([]);
  };

  const handleEdit = (record, index) => {
    form.setFieldsValue(record);
    setEditingRow(index);
    setIsModalVisible(true);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const columns = [
    {
      title: 'Employee Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    },
    {
      title: 'Employee ID',
      dataIndex: 'id',
      key: 'id',
      editable: true,
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      editable: true,
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
      editable: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Button type="primary" onClick={() => handleEdit(record, index)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="team-table" style={{paddingTop:"50px", overflowX: "auto"}}>
      <Title level={5}>Team List</Title>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add New
      </Button>
      <Button type="danger" onClick={handleDelete} style={{ marginBottom: 16, marginLeft: 16 }}>
        Delete Selected
      </Button>
      <Modal title="Add Employee" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Employee Name" rules={[{ required: true, message: 'Please enter employee name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="id" label="Employee ID" rules={[{ required: true, message: 'Please enter employee ID' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="position" label="Position" rules={[{ required: true, message: 'Please enter the employee position' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="language" label="Language" rules={[{ required: true, message: 'Please enter language that employee dealing with' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        dataSource={teams}
        columns={columns}
        pagination={false}
        rowKey="id"
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
      />
    </div>
  );
}

export default Team_Table;
