import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';

const Jobapply = () => {
  return (
    <div className="container mt-5">
    <Container>
      <h3>Apply Job</h3>
      <Row className="justify-content-center mt-4">
      <Col md={6} lg={5} className="mb-4">
          <Card className="h-100 shadow bg-grey">
            <Card.Body style={{ padding: '2rem' }}>
              <Card.Title>Job Title</Card.Title>
              <Card.Text>
                Company name
              </Card.Text>
              <Card.Text>
                Location
              </Card.Text>
              <Button variant="primary">Salary</Button>
              <Button variant="primary" className="float-right" style={{marginLeft:"20px"}}>Mode of Work</Button>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" style={{marginLeft:"10px"}}>Apply Now</Button>
            </Card.Footer>
          </Card>
        </Col>

        <Col md={6} lg={5} className="mb-4">
          <Card className="h-100 shadow bg-grey">
            <Card.Body style={{ padding: '2rem' }}>
              <Card.Title>Job Title</Card.Title>
              <Card.Text>
                Company name
              </Card.Text>
              <Card.Text>
                Location
              </Card.Text>
              <Button variant="primary">Salary</Button>
              <Button variant="primary" className="float-right" style={{marginLeft:"20px"}}>Mode of Work</Button>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" style={{marginLeft:"10px"}}>Apply Now</Button>
            </Card.Footer>
          </Card>
        </Col>

        <Col md={6} lg={5} className="mb-4">
          <Card className="h-100 shadow bg-grey">
            <Card.Body style={{ padding: '2rem' }}>
              <Card.Title>Job Title</Card.Title>
              <Card.Text>
                Company name
              </Card.Text>
              <Card.Text>
                Location
              </Card.Text>
              <Button variant="primary">Salary</Button>
              <Button variant="primary" className="float-right" style={{marginLeft:"20px"}}>Mode of Work</Button>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" style={{marginLeft:"10px"}}>Apply Now</Button>
            </Card.Footer>
          </Card>
        </Col>

        <Col md={6} lg={5} className="mb-4">
          <Card className="h-100 shadow bg-grey">
            <Card.Body style={{ padding: '2rem' }}>
              <Card.Title>Job Title</Card.Title>
              <Card.Text>
                Company name
              </Card.Text>
              <Card.Text>
                Location
              </Card.Text>
              <Button variant="primary">Salary</Button>
              <Button variant="primary" className="float-right" style={{marginLeft:"20px"}}>Mode of Work</Button>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" style={{marginLeft:"10px"}}>Apply Now</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Jobapply;
