import { Row, Col, Card, Radio, Table, Typography } from 'antd';

const { Title } = Typography;

const Tables = () => {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  const columns = [
    {
      title: 'Task Description',
      dataIndex: 'name', // Assuming 'name' corresponds to task description
      width: '32%',
    },
    {
      title: 'Task Date',
      dataIndex: 'function', // Assuming 'function' corresponds to task date
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline', // Assuming 'status' corresponds to deadline
    },
    {
      title: 'Assigned By',
      dataIndex: 'employed', // Assuming 'employed' corresponds to assigned by
    },
    {
      title: 'Status',
      dataIndex: 'status', // Assuming 'status' corresponds to status
    },
  ];

  const tasksData = [
    {
      key: '1',
      name: 'Task 1 Description',
      function: '2024-05-05', // Assuming this is the task date
      deadline: '2024-05-10', // Assuming this is the deadline
      employed: 'John Doe',
      status:"Active" // Assuming this is the assigned by
      // Add more properties as needed
    },
    {
      key: '2',
      name: 'Task 2 Description',
      function: '2024-05-06',
      deadline: '2024-05-12',
      employed: 'Jane Smith',
      status:"Inactive"
      // Add more properties as needed
    },
    // Add more task objects as needed
  ];

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Task Table"
            extra={
              <Radio.Group onChange={onChange} defaultValue="a">
                <Radio.Button value="a">All</Radio.Button>
                <Radio.Button value="b">ACTIVE</Radio.Button>
              </Radio.Group>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={tasksData}
                pagination={false}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Tables;
