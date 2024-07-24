import React, { useEffect } from "react";
import { Row, Col, Card, Radio, Table, Button } from "antd";
import { Container } from "react-bootstrap";

import vector from "../../assets/images/vector_image.png";
import axios from "axios";
import { baseUrlHr, baseUrl } from "../../url";

const Tables = () => {
  const token = localStorage.getItem("authToken");

  const [filter, setFilter] = React.useState("all");
  const [tasksData, setTasksData] = React.useState([
    {
      key: "1",
      name: "Task 1 Description",
      function: "2024-05-05",
      deadline: "2024-05-10",
      employed: "John Doe",
      status: "pending",
    },
    {
      key: "2",
      name: "Task 2 Description",
      function: "2024-05-06",
      deadline: "2024-05-12",
      employed: "Jane Smith",
      status: "pending",
    },
    {
      key: "3",
      name: "Task 3 Description",
      function: "2024-05-07",
      deadline: "2024-05-15",
      employed: "Emily Johnson",
      status: "Complete",
    },
  ]);

  useEffect(() => {
    // Fetch project details from the backend
    //fetching task
    axios
      .get(`${baseUrlHr}/studentassign/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("reponse.dat", response.data);
          setTasksData(response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the employees!", error);
      });
  }, [token]);

  const onChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasksData = tasksData.filter((task) => {
    if (filter === "all") return true;
    if (filter === "Pending") return task.status === "Pending";
    if (filter === "In progress") return task.status === "In progress";
    if (filter === "Complete") return task.status === "Complete";
    return true;
  });

  const columns = [
    {
      title: "Task Description",
      dataIndex: "task_details",
      width: "32%",
    },
    {
      title: "Task Date",
      dataIndex: "start_date",
    },
    {
      title: "Deadline",
      dataIndex: "end_date",
    },
    {
      title: "Assigned By",
      dataIndex: "guide_name",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "status",
      render: (_, record) => (
        <span>
          <Button
            type="primary"
            onClick={() => handleStart(record.id, "start")}
            disabled={record.status !== "Pending"}
          >
            Start
          </Button>
          <Button
            type="warning"
            onClick={() => handleFinish(record.id, "end")}
            disabled={record.status === "In Progress"}
          >
            Finish
          </Button>
        </span>
      ),
    },
  ];

  const handleStart = async (taskId, status) => {
    let response = await axios.patch(
      `${baseUrlHr}/studentassign/${taskId}/update-status/`,
      { action: status },
      { headers: { Authorization: `Token ${token}` } }
    );

    console.log("response when start", response);

    if (response.status === 200) {
      const updatedTasksData = tasksData.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: "In Progress" };
        }
        return task;
      });
      setTasksData(updatedTasksData);
    }
  };

  const handleFinish = async (taskId, status) => {
    let response = await axios.patch(
      `${baseUrlHr}/studentassign/${taskId}/update-status/`,
      { action: status },
      { headers: { Authorization: `Token ${token}` } }
    );

    console.log("response when start", response);

    if (response.status === 200) {
      const updatedTasksData = tasksData.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: "In Progress" };
        }
        return task;
      });
      setTasksData(updatedTasksData);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${vector})`, height: "700px" }}>
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
                      <Radio.Button value="Pending">Pending</Radio.Button>
                      <Radio.Button value="Complete">Complete</Radio.Button>
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
