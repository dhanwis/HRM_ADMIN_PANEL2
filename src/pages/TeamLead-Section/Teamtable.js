import React, { useState, useEffect } from 'react';
import { Table, Typography, Button, Modal, Form, Select } from 'antd';
import moment from 'moment';

const { Title } = Typography;
const { Option } = Select;

function Team_Table() {
  const [teams, setTeams] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [employees, setEmployees] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch employees from the backend
    fetch('/api/employees')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

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
      render: (text, record) => {
        // Render employee name dropdown
        return (
          <Form.Item name="name" noStyle>
            <Select defaultValue={text} style={{ width: 200 }} onChange={(value) => form.setFieldsValue({ name: value })}>
              {employees.map((employee) => (
                <Option key={employee.id} value={employee.name}>{employee.name}</Option>
              ))}
            </Select>
          </Form.Item>
        );
      },
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
    <div className="team-table" style={{ paddingTop: "50px", overflowX: "auto" }}>
      <Title level={5}>Team List</Title>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add New
      </Button>
      <Button type="danger" onClick={handleDelete} style={{ marginBottom: 16, marginLeft: 16 }}>
        Delete Selected
      </Button>
      <Modal title="Add Employee" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Employee Name" rules={[{ required: true, message: 'Please select employee name' }]}>
            <Select style={{ width: 200 }} placeholder="Select employee name">
              {employees.map((employee) => (
                <Option key={employee.id} value={employee.name}>{employee.name}</Option>
              ))}
            </Select>
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
