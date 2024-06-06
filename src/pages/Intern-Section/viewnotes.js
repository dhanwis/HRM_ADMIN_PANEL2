import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { ContainerOutlined } from '@ant-design/icons';

const FourCards = () => {
  return (
    <div className="container mt-5">
      <Container>
        <h3>Notes</h3>
        <Row className="justify-content-center mt-4">
          <Col md={6} lg={5} className="mb-4">
            <Card className="h-90 shadow" style={{ backgroundColor: 'white', color: 'black' }}>
              <Card.Body style={{ padding: '4rem' }}>
                <Card.Title>Title</Card.Title>
                <Card.Text>
                  Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut felis at mauris malesuada maximus.
                </Card.Text>
                <Button variant="primary">Download PDF</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={5} className="mb-4">
            <Card className="h-90 shadow" style={{ backgroundColor: 'white', color: 'black' }}>
              <Card.Body style={{ padding: '4rem' }}>
                <Card.Title>Title</Card.Title>
                <Card.Text>
                  Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut felis at mauris malesuada maximus.
                </Card.Text>
                <Button variant="primary">Download PDF</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={5} className="mb-4">
            <Card className="h-90 shadow" style={{ backgroundColor: 'white', color: 'black' }}>
              <Card.Body style={{ padding: '4rem' }}>
                <Card.Title>Title</Card.Title>
                <Card.Text>
                  Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut felis at mauris malesuada maximus.
                </Card.Text>
                <Button variant="primary">Download PDF</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={5} className="mb-4">
            <Card className="h-90 shadow" style={{ backgroundColor: 'white', color: 'black' }}>
              <Card.Body style={{ padding: '4rem' }}>
                <Card.Title>Title</Card.Title>
                <Card.Text>
                  Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut felis at mauris malesuada maximus.
                </Card.Text>
                <Button variant="primary">Download PDF</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FourCards;
