import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Container, Table } from 'react-bootstrap';
import axios from 'axios';
import setbackg from "../../assets/images/bgall.png";

const AttendanceTable = () => {
  const [projects, setProjects] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTeamLead, setSelectedTeamLead] = useState('');
  const [statusDescription, setStatusDescription] = useState('');
  const [images, setImages] = useState([]);
  const [sharedStatuses, setSharedStatuses] = useState([]);

  useEffect(() => {
    // Fetch projects and team leads from the backend
    axios.get('/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));

    axios.get('/api/team-leads')
      .then(response => setTeamLeads(response.data))
      .catch(error => console.error('Error fetching team leads:', error));

    // Fetch previously shared statuses
    axios.get('/api/shared-statuses')
      .then(response => setSharedStatuses(response.data))
      .catch(error => console.error('Error fetching shared statuses:', error));
  }, []);

  const handleImageUpload = (event) => {
    setImages([...event.target.files]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic, e.g., sending data to backend
    const formData = new FormData();
    formData.append('project', selectedProject);
    formData.append('teamLead', selectedTeamLead);
    formData.append('statusDescription', statusDescription);
    images.forEach((image, index) => {
      formData.append(`image_${index}`, image);
    });

    axios.post('/api/share-status', formData)
      .then(response => {
        alert('Status shared successfully');
        // Update shared statuses
        setSharedStatuses([...sharedStatuses, response.data]);
      })
      .catch(error => {
        console.error('Error sharing status:', error);
      });
  };

  const formLabelStyle = {
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const formControlStyle = {
    borderRadius: '0.25rem',
    marginBottom: '20px',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    marginTop: '20px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
    borderColor: '#004085',
  };

  return (
    <div style={{ marginTop: "50px",  backgroundImage:`url(${setbackg})`}}>
    <Container className="mt-4 form-container">
      <h2>Status Sharing to Team Lead</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formProjectName" className="mb-3">
          <Form.Label column sm={2} style={formLabelStyle}>Project Name</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              style={formControlStyle}
              required
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formTeamLead" className="mb-3">
          <Form.Label column sm={2} style={formLabelStyle}>Team Lead</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              value={selectedTeamLead}
              onChange={(e) => setSelectedTeamLead(e.target.value)}
              style={formControlStyle}
              required
            >
              <option value="">Select a team lead</option>
              {teamLeads.map(teamLead => (
                <option key={teamLead.id} value={teamLead.id}>{teamLead.name}</option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formStatusDescription" className="mb-3">
          <Form.Label column sm={2} style={formLabelStyle}>Status Description</Form.Label>
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
          <Form.Label column sm={2} style={formLabelStyle}>Upload Images</Form.Label>
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
            e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
            e.currentTarget.style.borderColor = buttonHoverStyle.borderColor;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
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
              <th>Date</th>
              <th>Project</th>
              <th>Team Lead</th>
              <th>Description</th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
            {sharedStatuses.map((status, index) => (
              <tr key={index}>
                <td>{new Date(status.date).toLocaleDateString()}</td>
                <td>{status.project.name}</td>
                <td>{status.teamLead.name}</td>
                <td>{status.description}</td>
                <td>
                  <ul>
                    {status.images.map((image, idx) => (
                      <li key={idx}>
                        <a href={image.url} target="_blank" rel="noopener noreferrer">Image {idx + 1}</a>
                      </li>
                    ))}
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
