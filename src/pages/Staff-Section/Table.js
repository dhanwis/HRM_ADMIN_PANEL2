// src/components/Tablesstaff.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';

const Tablesstaff = () => {
  const [projects, setProjects] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTeamLead, setSelectedTeamLead] = useState('');
  const [statusDescription, setStatusDescription] = useState('');
  const [images, setImages] = useState([]);

  const x = localStorage.getItem('is_staff')

  console.log('is',x)

  useEffect(() => {
    // Fetch projects and team leads from the backend
    axios.get('/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));

    axios.get('/api/team-leads')
      .then(response => setTeamLeads(response.data))
      .catch(error => console.error('Error fetching team leads:', error));
  }, []);

  const handleImageUpload = (event) => {
    setImages([...event.target.files]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic, e.g., sending data to backend
    console.log({
      selectedProject,
      selectedTeamLead,
      statusDescription,
      images
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="formProjectName">
        <Form.Label column sm={2}>Project Name</Form.Label>
        <Col sm={10}>
          <Form.Control as="select" value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
            <option value="">Select a project</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formTeamLead">
        <Form.Label column sm={2}>Team Lead</Form.Label>
        <Col sm={10}>
          <Form.Control as="select" value={selectedTeamLead} onChange={(e) => setSelectedTeamLead(e.target.value)}>
            <option value="">Select a team lead</option>
            {teamLeads.map(teamLead => (
              <option key={teamLead.id} value={teamLead.id}>{teamLead.name}</option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formStatusDescription">
        <Form.Label column sm={2}>Status Description</Form.Label>
        <Col sm={10}>
          <Form.Control
            as="textarea"
            rows={3}
            value={statusDescription}
            onChange={(e) => setStatusDescription(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formImageUpload">
        <Form.Label column sm={2}>Upload Images</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="file"
            multiple
            onChange={handleImageUpload}
          />
        </Col>
      </Form.Group>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default Tablesstaff;
