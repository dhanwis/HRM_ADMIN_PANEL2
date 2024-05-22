import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
// import { FaRegPaperPlane } from "react-icons/fa";

const Jobapply = () => {
  return (
    <div className="container mt-5">
    <Container>
      <h3>Apply Job</h3>
      <Row className="justify-content-center mt-4">
      <Col md={6} lg={5} className="mb-4">
          <Card className="h-100 shadow bg-grey">
            <Card.Body style={{ padding: '2rem' }}>
              <Card.Title>Data Analyst </Card.Title>
              <Card.Text>
              Summit Soft Solutions

              </Card.Text>
              <Card.Text>
              Cannanore, Kerala
              {/* <Button variant="secondary" className="float-right" >Full-time</Button> */}
              </Card.Text>
              {/* <Button variant="secondary">From ₹15,000 a month</Button> */}
              <Button variant="secondary" className="float-right" >Full-time</Button>
            </Card.Body>
            <Card.Footer>
          
              {/* <i class="fa-solid fa-paper-plane" style={{marginLeft:"10px"}}>Apply Now</i> */}
              <Button variant="success" style={{marginLeft:"10px"}}>Apply Now</Button>
            </Card.Footer>
          </Card>
        </Col>

        <Col md={6} lg={5} className="mb-4">
          <Card className="h-100 shadow bg-grey">
            <Card.Body style={{ padding: '2rem' }}>
              <Card.Title>Junior SEO Analyst</Card.Title>
              <Card.Text>
              Mazi Diktyo International Private Limited

              </Card.Text>
              <Card.Text>
              Cannanore, Kerala
              </Card.Text>
              {/* <Button variant="secondary">From ₹15,000 a month</Button> */}
              <Button variant="secondary" className="float-right" >Full-time</Button>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" style={{marginLeft:"10px"}}>Apply Now</Button>
            </Card.Footer>
          </Card>
        </Col>

        <Col md={6} lg={5} className="mb-4">
          <Card className="h-100 shadow bg-grey">
            <Card.Body style={{ padding: '2rem' }}>
              <Card.Title>Junior SEO Analyst</Card.Title>
              <Card.Text>
              Mazi Diktyo International Private Limited
              </Card.Text>
              <Card.Text>
              Cannanore, Kerala
              </Card.Text>
              
              {/* <Button variant="secondary">From ₹15,000 a month</Button> */}
              <Button variant="secondary" className="float-right" >Full-time</Button>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" style={{marginLeft:"10px"}}>Apply Now</Button>
            </Card.Footer>
          </Card>
        </Col>

        <Col md={6} lg={5} className="mb-4">
          <Card className="h-100 shadow bg-grey">
            <Card.Body style={{ padding: '2rem' }}>
              <Card.Title>Data Analyst</Card.Title>
              <Card.Text>
              Summit Soft Solutions
              </Card.Text>
              <Card.Text>
              Cannanore, Kerala
              </Card.Text>
              {/* <Button variant="secondary">From ₹15,000 a month</Button> */}
              <Button variant="secondary" className="float-right" >Full-time</Button>
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
