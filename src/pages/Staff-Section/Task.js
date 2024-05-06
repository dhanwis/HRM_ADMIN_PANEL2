import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Viewproject() {
  const [projects, setProjects] = useState([]);
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch all projects (replace with your API endpoint)
        const response = await fetch('https://your-api-endpoint/projects');
        const data = await response.json();
        setProjects(data);

        // Fetch company name (replace with your API endpoint)
        const companyResponse = await fetch('https://your-api-endpoint/company');
        const companyData = await companyResponse.json();
        setCompanyName(companyData.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProjects();
  }, []);

  // Define table header and rows based on project data
  const renderProjectTable = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Project Date</th>
          <th>Deadline</th>
          <th>Completion Status</th>
        </tr>
      </thead>
      <tbody>
        {projects.map(project => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{project.date}</td>
            <td>{project.deadline}</td>
            <td>{project.status ? 'Complete' : 'Pending'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container">
      <h1>Task Details View ({companyName})</h1>
      <hr />
      {projects.length > 0 ? (
        renderProjectTable()
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}

export default Viewproject;
