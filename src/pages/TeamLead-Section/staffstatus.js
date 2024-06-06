import React, { useEffect, useState } from 'react';
import './staffstatus.css'
import stffbg from "../../assets/images/vectorteam5.png";
function ProjectDetailsViewer() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from an API or database
    const fetchData = async () => {
      // Replace this with your actual data fetching logic
      const fetchedProjects = [
        {
          id: 1,
          projectName: 'Project Alpha',
          description: 'This is a sample project description.',
          employeeName: 'John Doe',
          screenshot: 'https://via.placeholder.com/150'
        },
        {
          id: 2,
          projectName: 'Project Beta',
          description: 'This is another project description.',
          employeeName: 'Jane Smith',
          screenshot: 'https://via.placeholder.com/150'
        }
      ];

      setProjects(fetchedProjects);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{backgroundImage:`url(${stffbg})`}}>
    <div className="project-details-viewer">
      <h1 style={{fontSize:"20px"}}>Project Status</h1>
      {projects.map(project => (
        <div key={project.id} className="project-card">
          <h3>{project.projectName}</h3>
          <p><strong>Employee Name:</strong> {project.employeeName}</p>
          <p><strong>Description:</strong> {project.description}</p>
          {project.screenshot && (
            <img src={project.screenshot} alt="Screenshot" width="200" />
          )}
        </div>
      ))}
    </div>
    </div>
  );
}

export default ProjectDetailsViewer;
