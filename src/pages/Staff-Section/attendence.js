import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Container, Table } from "react-bootstrap";
import axios from "axios";
import setbackg from "../../assets/images/bgall.png";
import { baseUrl, baseUrlHr, baseUrlImg } from "../../url";

const AttendanceTable = () => {
  const [projects, setProjects] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTeamLead, setSelectedTeamLead] = useState("");
  const [statusDescription, setStatusDescription] = useState("");
  const [images, setImages] = useState();
  const [sharedStatuses, setSharedStatuses] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    // Fetch projects and team leads from the backend
    axios
      .get(`${baseUrlHr}/projectassign/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setProjects(response.data);
        }
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the customer details!",
          error
        );
      });

    axios
      .get(`${baseUrl}/Teamlead/`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setTeamLeads(response.data);
        }
      })
      .catch((error) => console.error("Error fetching team leads:", error));

    // Fetch previously shared statuses
    axios
      .get(`${baseUrlHr}/staff/statusshare/`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setSharedStatuses(res.data);
        }
      });
  }, [token]);

  const handleImageUpload = (event) => {
    setImages(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Handle form submission logic, e.g., sending data to backend
    const formData = new FormData();
    formData.append("project_name", selectedProject);
    formData.append("Teamleadname", selectedTeamLead);
    formData.append("description", statusDescription);
    formData.append(`note_upload`, images);

    axios
      .post(`${baseUrlHr}/staff/statusshare/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log("response", response);
        if (response.status === 201) {
          alert("Status shared successfully");
          setSharedStatuses([...sharedStatuses, response.data]);
        }
      })
      .catch((error) => {
        console.error("Error sharing status:", error);
      });
  };

  const formLabelStyle = {
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const formControlStyle = {
    borderRadius: "0.25rem",
    marginBottom: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    marginTop: "20px",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
    borderColor: "#004085",
  };

  return (
    <div style={{ marginTop: "50px", backgroundImage: `url(${setbackg})` }}>
      <Container className="mt-4 form-container">
        <h2>Status Sharing to Team Lead</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formProjectName" className="mb-3">
            <Form.Label column sm={2} style={formLabelStyle}>
              Project Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                style={formControlStyle}
                required
              >
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.projectname}>
                    {project.projectname}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formTeamLead" className="mb-3">
            <Form.Label column sm={2} style={formLabelStyle}>
              Team Lead
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                value={selectedTeamLead}
                onChange={(e) => setSelectedTeamLead(e.target.value)}
                style={formControlStyle}
                required
              >
                <option value="">Select a team lead</option>
                {teamLeads.map((teamLead) => (
                  <option key={teamLead.id} value={teamLead.id}>
                    {teamLead.username}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            controlId="formStatusDescription"
            className="mb-3"
          >
            <Form.Label column sm={2} style={formLabelStyle}>
              Status Description
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                rows={3}
                value={statusDescription}
                onChange={(e) => setStatusDescription(e.target.value)}
                style={formControlStyle}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formImageUpload" className="mb-3">
            <Form.Label column sm={2} style={formLabelStyle}>
              Upload Images
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="file"
                multiple
                onChange={handleImageUpload}
                style={formControlStyle}
              />
            </Col>
          </Form.Group>

          <Button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor =
                buttonHoverStyle.backgroundColor;
              e.currentTarget.style.borderColor = buttonHoverStyle.borderColor;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor =
                buttonStyle.backgroundColor;
              e.currentTarget.style.borderColor = buttonStyle.borderColor;
            }}
          >
            Share
          </Button>
        </Form>

        <h3 className="mt-4">Previously Shared Statuses</h3>
        {sharedStatuses.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Project</th>
                <th>Team Lead</th>
                <th>Description</th>
                <th>Images</th>
              </tr>
            </thead>
            <tbody>
              {sharedStatuses.map((status, index) => (
                <tr key={index}>
                  {/* <td>{new Date(status.date).toLocaleDateString()}</td> */}
                  <td>{status.project_name}</td>
                  <td>{status.Teamleadname}</td>
                  <td>{status.description}</td>
                  <td>
                    <ul>
                      <li style={{ listStyleType: "none" }}>
                        <img
                          width={100}
                          height={100}
                          src={`${baseUrlImg}${status.note_upload}`}
                          alt="img"
                        />
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No statuses shared yet.</p>
        )}
      </Container>
    </div>
  );
};

export default AttendanceTable;
