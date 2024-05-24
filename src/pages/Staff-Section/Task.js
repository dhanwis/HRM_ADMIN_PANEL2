import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Viewprojectstaff = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchPendingTasks = async () => {
      try {
        // Simulate fetching pending tasks data from the backend API
        const response = await fetch('https://your-api-url/pending-tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch pending tasks');
        }
        const data = await response.json();
        setTasks(data); // Update tasks state with fetched data
      } catch (error) {
        console.error('Error fetching pending tasks:', error);
        // Handle error (e.g., show error message, retry logic, etc.)
      }
    };

    fetchPendingTasks();
  }, []);

  const updateTaskStatus = async (index, status) => {
    try {
      const taskToUpdate = tasks[index];
      const response = await fetch(`https://your-api-url/update-task/${taskToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }

      const updatedTask = await response.json();
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, status: updatedTask.status } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task status:', error);
      // Handle error (e.g., show error message, retry logic, etc.)
    }
  };

  const handleStart = (index) => {
    updateTaskStatus(index, 'In Progress');
  };

  const handleFinish = (index) => {
    updateTaskStatus(index, 'Completed');
  };

  return (
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
              <td>
                <Button 
                  variant="warning" 
                  onClick={() => handleStart(index)} 
                  disabled={task.status !== 'Pending'}
                  className="mr-2"
                >
                  Start
                </Button>
                <Button 
                  variant="success" 
                  onClick={() => handleFinish(index)} 
                  disabled={task.status !== 'In Progress'}
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
  );
};

export default Viewprojectstaff;
