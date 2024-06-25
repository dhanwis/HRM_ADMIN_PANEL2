import React, { useState, useEffect } from 'react';
import { Table, Typography, Button, Modal, Form, Select, Row, Col, message } from 'antd';
import teamimage from '../../assets/images/vectorteam5.png';

const { Title } = Typography;
const { Option } = Select;

function Team_Table() {
  const [teams, setTeams] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [selectedTeamLead, setSelectedTeamLead] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch employees from the backend
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching employees:', error));

    // Fetch team leads from the backend (assuming it's a different endpoint)
    fetch('https://fakestoreapi.com/users')
      .then(response => response.json())
      .then(data => setTeamLeads(data))
      .catch(error => console.error('Error fetching team leads:', error));
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newTeam = {
        id: teams.length ? teams[teams.length - 1].id + 1 : 1,
        teamLead: selectedTeamLead,
        staff: values.staff,
      };
      setTeams([...teams, newTeam]);
      setIsModalVisible(false);
      form.resetFields();
      setSelectedTeamLead(null);
    }).catch((errorInfo) => {
      console.log('Validation Failed:', errorInfo);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedTeamLead(null);
  };

  const handleDelete = () => {
    const filteredData = teams.filter((item) => !selectedRowKeys.includes(item.id));
    setTeams(filteredData);
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
      title: 'Team Lead',
      dataIndex: 'teamLead',
      key: 'teamLead',
    },
    {
      title: 'Staff Members',
      dataIndex: 'staff',
      key: 'staff',
      render: (staff) => staff.join(', '),
    },
  ];

  return (
    <div style={{ backgroundImage: `url(${teamimage})`, backgroundSize: "100%", width: "100%", height: "730px" }}>
      <div className="team-table" style={{ paddingTop: "50px", overflowX: "auto" }}>
        <Title level={5}>Team List</Title>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Button type="primary" onClick={showModal}>
              Add New
            </Button>
          </Col>
          <Col>
            <Button type="danger" onClick={handleDelete}>
              Delete Selected
            </Button>
          </Col>
        </Row>
        <Modal title="Add Team" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form form={form} layout="vertical">
            <Form.Item name="teamLead" label="Team Lead" rules={[{ required: true, message: 'Please select a team lead' }]}>
              <Select
                style={{ width: 200 }}
                placeholder="Select team lead"
                onChange={(value) => setSelectedTeamLead(value)}
              >
                {teamLeads.map((lead) => (
                  <Option key={lead.id} value={lead.username}>{lead.username}</Option>
                ))}
              </Select>
            </Form.Item>
            {selectedTeamLead && (
              <Form.Item
                name="staff"
                label="Staff Members"
                rules={[
                  { required: true, message: 'Please select staff members' },
                  { validator: (_, value) => value.length > 6 ? Promise.reject('You can select a maximum of 6 staff members.') : Promise.resolve() }
                ]}
              >
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Select staff members"
                >
                  {employees.map((employee) => (
                    <Option key={employee.id} value={employee.title}>{employee.title}</Option>
                  ))}
                </Select>
              </Form.Item>
            )}
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
    </div>
  );
}

export default Team_Table;
