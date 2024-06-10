import React from 'react';
import { Row, Col, Card, Radio, Table, Typography, Button } from 'antd';
import { Container } from 'react-bootstrap';

import vector from "../../assets/images/vector_image.png";

const { Title } = Typography;

const Tables = () => {
    const [filter, setFilter] = React.useState('all');
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
        {
            key: '3',
            name: 'Task 3 Description',
            function: '2024-05-07',
            deadline: '2024-05-15',
            employed: 'Emily Johnson',
            status: "Complete",
        },
    ]);

    const onChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredTasksData = tasksData.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'pending') return task.status === 'pending';
        if (filter === 'finished') return task.status === 'Complete';
        return true;
    });

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
    <div style={{backgroundImage:`url(${vector})`,height:"700px"}}>

        <div className="container mt-5">
            <Container>
                <div className="tabled">
                    <Row className="justify-content-center mt-4" gutter={[24, 0]}>
                        <Col xs="24" xl={24}>
                            <Card
                                bordered={false}
                                className="criclebox tablespace mb-24"
                                title="Task Table"
                                extra={
                                    <Radio.Group onChange={onChange} defaultValue="all">
                                        <Radio.Button value="all">All</Radio.Button>
                                        <Radio.Button value="pending">Pending</Radio.Button>
                                        <Radio.Button value="finished">Finished</Radio.Button>
                                    </Radio.Group>
                                }
                            >
                                <div className="table-responsive">
                                    <Table
                                        columns={columns}
                                        dataSource={filteredTasksData}
                                        pagination={false}
                                        className="ant-border-space"
                                    />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    </div>
    );
};

export default Tables;
