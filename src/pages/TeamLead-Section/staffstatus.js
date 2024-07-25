import React, { useEffect, useState } from "react";
import "./staffstatus.css";
import stffbg from "../../assets/images/vectorteam5.png";
import axios from "axios";
import { baseUrlHr, baseUrlImg } from "../../url";
function ProjectDetailsViewer() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    // Simulate fetching data from an API or database
    const fetchData = async () => {
      // Replace this with your actual data fetching logic
      await axios
        .get(`${baseUrlHr}/staff/statusshare/`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setProjects(res.data);
          }
        });

      setLoading(false);
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ backgroundImage: `url(${stffbg})` }}>
      <div className="project-details-viewer">
        <h1 style={{ fontSize: "20px" }}>Project Status</h1>
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.project_name}</h3>
            <p>
              <strong>Employee ID:</strong> {project.Teamleadname}
            </p>
            <p>
              <strong>Description:</strong> {project.description}
            </p>
            {project.note_upload && (
              <img
                src={`${baseUrlImg}${project.note_upload}`}
                alt="Screenshot"
                width="200"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectDetailsViewer;
