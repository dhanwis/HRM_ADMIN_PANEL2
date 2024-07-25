import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Include Bootstrap CSS
import viewbg from "../../assets/images/vectorteam5.png";
import { baseUrl, baseUrlHr } from "../../url";

function Viewproject() {
  const [projects, setProjects] = useState([]);
  const [companyName, setCompanyName] = useState(""); // State for company name
  const token = localStorage.getItem("authToken");

  // Fetch project data and company name from HR (replace with your actual API calls)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch projects
        const response = await fetch(`${baseUrlHr}/teamleadassign/`, {
          method: "GET",
          headers: { Authorization: `Token ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);

        console.log('data',data)

        // Fetch company name
        const companyResponse = await fetch(
          "https://fakestoreapi.com/products/categories"
        ); // Replace with actual API URL for company name

        if (!companyResponse.ok) {
          throw new Error("Failed to fetch company data");
        }

        const companyData = await companyResponse.json();

        // Assuming companyData is an array and you need a specific category name
        // Replace 'name' with the correct key if the response is different
        if (Array.isArray(companyData) && companyData.length > 0) {
          setCompanyName(companyData[0]); // Adjust this as per your actual data structure
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchProjects();
  }, [token]); // Add 'token' as a dependency if it changes

  const renderProjectCard = (project) => (
    <div
      className="col-md-4 project-card mb-3"
      key={project.id}
      style={{ border: "1px solid rgba(0,0,0)", marginLeft: "50px" }}
    >
      <h5 className="card-title">{project.name}</h5>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Project ID: {project.id}</li>
        <li className="list-group-item">Project Name: {project.tasktitle}</li>
        <li className="list-group-item">Project startDate: {project.startdate}</li>
        <li className="list-group-item">Deadline: {project.enddate}</li>
        <li className="list-group-item">Description: {project.task_description}</li>
      </ul>
    </div>
  );

  return (
    <div style={{ backgroundImage: `url(${viewbg})`, height: "800px" }}>
      <div className="container" style={{ paddingTop: "50px" }}>
        <h1>Team Lead Project Assignments</h1>
        <hr />
        <div className="row">{projects.map(renderProjectCard)}</div>
      </div>
    </div>
  );
}

export default Viewproject;
