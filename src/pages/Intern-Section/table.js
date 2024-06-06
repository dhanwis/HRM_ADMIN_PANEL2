import React from 'react';
import { Row, Col, Card, Radio, Table, Typography, Button } from 'antd';
import { Container } from 'react-bootstrap';

const { Title } = Typography;

const Tables = () => {
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);

    const columns = [
        {
            title: 'Task Description',
            dataIndex: 'name',
            width: '32%',
        },
        {
            title: 'Task Date',
            dataIndex: 'function',
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
        },
        {
            title: 'Assigned By',
            dataIndex: 'employed',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <span>
                    <Button type="primary" onClick={() => handleStart(record.key)} disabled={record.status !== 'pending'}>Start</Button>
                    <Button type="warning" onClick={() => handleFinish(record.key)} disabled={record.status !== 'In Progress'}>Finish</Button>
                </span>
            ),
        },
    ];

    const [tasksData, setTasksData] = React.useState([
        {
            key: '1',
            name: 'Task 1 Description',
            function: '2024-05-05',
            deadline: '2024-05-10',
            employed: 'John Doe',
            status: "pending",
        },
        {
            key: '2',
            name: 'Task 2 Description',
            function: '2024-05-06',
            deadline: '2024-05-12',
            employed: 'Jane Smith',
            status: "pending",
        },
    ]);

    const handleStart = (taskId) => {
        const updatedTasksData = tasksData.map(task => {
            if (task.key === taskId) {
                return { ...task, status: 'In Progress' };
            }
            return task;
        });
        setTasksData(updatedTasksData);
    };

    const handleFinish = (taskId) => {
        const updatedTasksData = tasksData.map(task => {
            if (task.key === taskId) {
                return { ...task, status: 'Complete' };
            }
            return task;
        });
        setTasksData(updatedTasksData);
    };

    return (
        <Container>
            <div className="tabled">
                <Row className="justify-content-center mt-4" gutter={[24, 0]}>
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
        </Container>
    );
};

export default Tables;
