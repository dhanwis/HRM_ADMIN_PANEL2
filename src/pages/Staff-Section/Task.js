import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

const Viewprojectstaff = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchPendingTasks = async () => {
      try {
        // Simulate fetching pending tasks data from the HR section or backend API
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

  return (
    <div className="container mt-4">
      <h2>View Projects</h2>
      <Table striped bordered hover>
        <thead className="thead-dark">
          <tr>
            <th>Project Name</th>
            <th>Company Name</th>
            <th>Project Date</th>
            <th>Deadline</th>
            <th>Completion Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.projectName}</td>
              <td>{task.companyName}</td>
              <td>{task.projectDate}</td>
              <td>{task.deadline}</td>
              <td>{task.completionStatus}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Viewprojectstaff;
