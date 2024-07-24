import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import setbackg from "../../assets/images/bgall.png";
import axios from "axios";
import { baseUrlHr } from "../../url";

const Viewprojectstaff = () => {
  const token = localStorage.getItem("authToken");
  const [tasks, setTasks] = useState([]);
  const [projectDetails,setProjectDetails] = useState([])

  useEffect(() => {
    // Sample data for tasks
    const sampleTasks = [
      {
        id: "1",
        projectName: "Project Alpha",
        projectDate: "2024-01-01",
        deadline: "2024-06-01",
        status: "Pending",
      },
      {
        id: "2",
        projectName: "Project Beta",
        projectDate: "2024-02-01",
        deadline: "2024-07-01",
        status: "Pending",
      },
      {
        id: "3",
        projectName: "Project Gamma",
        projectDate: "2024-03-01",
        deadline: "2024-08-01",
        status: "In Progress",
      },
    ];

    // Set sample data
    setTasks(sampleTasks);
  }, []);

  useEffect(() => {
    // Fetch project details from the backend
    axios
      .get(`${baseUrlHr}/projectassign/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        const fetchedData = response.data.map((item) => ({
          ...item,
          status: item.status || "Pending", // Default status to "Pending" if not provided
        }));
        console.log("project", fetchedData);
        setProjectDetails(fetchedData);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the customer details!",
          error
        );
      });
  }, []);

  const updateTaskStatus = async (index, status) => {
    try {
      const taskToUpdate = tasks[index];

      // Simulate a successful response from backend API
      const updatedTask = { ...taskToUpdate, status };

      const updatedTasks = tasks.map((task, i) =>
        i === index ? updatedTask : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task status:", error);
      // Handle error (e.g., show error message, retry logic, etc.)
    }
  };

  const handleStart = (index) => {
    updateTaskStatus(index, "In Progress");
  };

  const handleFinish = (index) => {
    updateTaskStatus(index, "Completed");
  };

  return (
    <div style={{ marginTop: "50px", backgroundImage: `url(${setbackg})` }}>
      <div className="container mt-4">
        <h2>View Projects</h2>
        <Table striped bordered hover>
          <thead className="thead-dark">
            <tr>
              <th>Project Name</th>
              <th>Project Date</th>
              <th>Deadline</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.projectName}</td>
                <td>{task.projectDate}</td>
                <td>{task.deadline}</td>
                <td className="d-flex align-items-center">
                  <Button
                    variant="primary"
                    onClick={() => handleStart(index)}
                    disabled={task.status !== "Pending"}
                    className="me-2 btn-lg"
                  >
                    Start
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleFinish(index)}
                    disabled={task.status !== "In Progress"}
                    className="btn-lg"
                  >
                    Finish
                  </Button>
                </td>

                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Viewprojectstaff;
