import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const StudentTasks = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    task: '',
    id: '',
    details: '',
    guide: '',
    machine: '',
    startdate: '',
    deadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudents([...students, formData]);
    setFormData({
      task: '',
      id: '',
      details: '',
      guide: '',
      machine: '',
      startdate: '',
      deadline: '',
    });
  };

  const handleDelete = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="Task">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the task"
                name="task"
                value={formData.task}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="id">
              <Form.Label>Student Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the studnet id"
                name="id"
                value={formData.id}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="details">
              <Form.Label>Task details</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the task"
                name="details"
                value={formData.details}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="guide">
              <Form.Label>Assigned guide</Form.Label>
              <Form.Control
                type="text"
                placeholder="Assigned guide name"
                name="guide"
                value={formData.guide}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="machine">
              <Form.Label>Machine Numder</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the allocated machine number"
                name="machine"
                value={formData.machine}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="startdate">
              <Form.Label>Start date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter the start date"
                name="startdate"
                value={formData.startdate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="deadline">
              <Form.Label>deadline</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter the deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
              />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              Add Student
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2>Student List</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Student ID</th>
                <th>Task Details</th>
                <th>Guide</th>
                <th>Start Date</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{student.task}</td>
                  <td>{student.id}</td>
                  <td>{student.details}</td>
                  <td>{student.guide}</td>
                  <td>{student.startdate}</td>
                  <td>{student.deadline}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentTasks;
