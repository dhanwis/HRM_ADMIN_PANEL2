import React, { useState, useEffect } from "react";
import { Row, Col, Card, Radio, Table, Typography } from "antd";
import axios from "axios"; // Import Axios for making HTTP requests

const { Title } = Typography;

const columns = [
  {
    title: "AUTHOR",
    dataIndex: "name",
    width: "32%",
  },
  {
    title: "TASK",
    dataIndex: "function",
  },
  {
    title: "STATUS",
    dataIndex: "status",
  },
  {
    title: "DATE",
    dataIndex: "employed",
  },
];

const projectColumns = [
  {
    title: "PROJECT",
    dataIndex: "name",
    width: "32%",
  },
  {
    title: "STATUS",
    dataIndex: "address",
  },
  {
    title: "COMPLETION",
    dataIndex: "completion",
  },
];

function Tablesstaff() {
  const [taskData, setTaskData] = useState([]); // State to hold task data
  const [projectData, setProjectData] = useState([]); // State to hold project data

  useEffect(() => {
    // Function to fetch task data from backend
    const fetchTaskData = async () => {
      try {
        const response = await axios.get("your_backend_endpoint_for_tasks");
        setTaskData(response.data); // Update taskData state with fetched data
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    // Function to fetch project data from backend
    const fetchProjectData = async () => {
      try {
        const response = await axios.get("your_backend_endpoint_for_projects");
        setProjectData(response.data); // Update projectData state with fetched data
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    // Call the fetch functions when component mounts
    fetchTaskData();
    fetchProjectData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const onChange = (e) => console.log(`Radio checked: ${e.target.value}`);

  return (
    <div className="tabled" style={{paddingTop:"50px"}}>
      <Row gutter={[24, 0]}>
        <Col xs={24} xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Task Table"
            // extra={
            //   <Radio.Group onChange={onChange} defaultValue="a">
            //     <Radio.Button value="a">All</Radio.Button>
            //     <Radio.Button value="b">ACTIVE</Radio.Button>
            //   </Radio.Group>
            // }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={taskData} // Use taskData as the dataSource
                pagination={false}
                className="ant-border-space"
              />
            </div>
          </Card>

          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Projects Table"
          >
            <div className="table-responsive">
              <Table
                columns={projectColumns}
                dataSource={projectData} // Use projectData as the dataSource
                pagination={false}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Tablesstaff;
