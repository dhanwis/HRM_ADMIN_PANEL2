import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import setbackg from "../../assets/images/bgall.png";
import axios from "axios";
import { baseUrlHr } from "../../url";
import Loading from "../../Loading";

const Viewprojectstaff = () => {
  const token = localStorage.getItem("authToken");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

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

        console.log("fetched pro", fetchedData);
        setTasks(fetchedData);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the customer details!",
          error
        );
      });
  }, [token]);

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

  const handleStart = async (taskId, status) => {
    let response = await axios.patch(
      `${baseUrlHr}/projectassign/${taskId}/update-status/`,
      { action: status },
      { headers: { Authorization: `Token ${token}` } }
    );

    if (response.status === 200) {
      const updatedTasksData = tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: "In Progress" };
        }

        return task;
      });

      setTasks(updatedTasksData);
      window.location.reload();
    }
  };

  const handleFinish = async (taskId, status) => {
    let response = await axios.patch(
      `${baseUrlHr}/projectassign/${taskId}/update-status/`,
      { action: status },
      { headers: { Authorization: `Token ${token}` } }
    );

    console.log("response when start", response);

    if (response.status === 200) {
      const updatedTasksData = tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: "In Progress" };
        }

        return task;
      });

      setTasks(updatedTasksData);

      window.location.reload();
    }
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
                <td>{task.projectname}</td>
                <td>{task.projectdate}</td>
                <td>{task.deadline}</td>
                <td className="d-flex align-items-center">
                  <Button
                    variant="primary"
                    onClick={() => handleStart(task.id, "start")}
                    disabled={task.status !== "Pending"}
                    className="me-2 btn-lg"
                  >
                    Start
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleFinish(task.id, "end")}
                    disabled={task.status === "Completed"}
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
