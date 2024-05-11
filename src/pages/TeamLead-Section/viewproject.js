import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Include Bootstrap CSS
// import './Viewproject.css'; // Optional: Include your custom CSS for styling

function Viewproject() {
  const [projects, setProjects] = useState([]);
  const [companyName, setCompanyName] = useState(''); // State for company name

  // Fetch project data and company name from HR (replace with your actual API calls)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://your-api-endpoint/projects'); // Replace with API URL for projects
        const data = await response.json();
        setProjects(data);

        const companyResponse = await fetch('https://your-api-endpoint/company'); // Replace with API URL for company name
        const companyData = await companyResponse.json();
        setCompanyName(companyData.name); // Assuming the retrieved data has a "name" property
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProjects();
  }, []);

  const renderProjectCard = (project) => (
    <div className="col-md-4 project-card mb-3" key={project.id}>
      <h5 className="card-title">{project.name}</h5>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Project ID: {project.id}</li>
        <li className="list-group-item">Project Date: {project.date}</li>
        <li className="list-group-item">Deadline: {project.deadline}</li>
      </ul>
    </div>
  );

  return (
    <div className="container" style={{paddingTop:"50px"}}>
      <h1>Team Lead Project Assignments ({companyName})</h1>
      <hr />
      <div className="row">
        {projects.map(renderProjectCard)}
      </div>
    </div>
  );
}

export default Viewproject;