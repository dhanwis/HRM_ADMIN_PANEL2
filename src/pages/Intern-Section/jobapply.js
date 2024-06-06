import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { BsBriefcaseFill, BsClockFill, BsGeoAltFill, BsArrowRight, BsCurrencyRupee } from 'react-icons/bs';

import vector from "../../assets/images/vector_image.png";

const JobCards = () => {
  const jobs = [
    {
      id: 1,
      title: 'Data Analyst',
      company: 'Summit Soft Solutions',
      location: 'Cannanore, Kerala',
      experience: '2+ years',
      salary: '₹25,000 - ₹35,000 per month',
      mode: 'Full-time',
      applyLink: 'https://www.example.com/apply/1', // Example apply link
    },
    {
      id: 2,
      title: 'Junior SEO Analyst',
      company: 'Mazi Diktyo International Private Limited',
      location: 'Cannanore, Kerala',
      experience: '1+ year',
      salary: '₹20,000 - ₹30,000 per month',
      mode: 'Part-time',
      applyLink: 'https://www.example.com/apply/2', // Example apply link
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'TechSol',
      location: 'Bangalore, Karnataka',
      experience: '3+ years',
      salary: '₹40,000 - ₹50,000 per month',
      mode: 'Remote',
      applyLink: 'https://www.example.com/apply/3', // Example apply link
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'DesignWorks',
      location: 'Hyderabad, Telangana',
      experience: '2+ years',
      salary: '₹30,000 - ₹40,000 per month',
      mode: 'Full-time',
      applyLink: 'https://www.example.com/apply/4', // Example apply link
    },
  ];

  const applyJob = (applyLink) => {
    window.open(applyLink, '_blank'); // Open the apply link in a new tab
  };

  return (
    <div className="container mt-5" style={{backgroundImage:`url(${vector})`}}>
      <Container>
        <h3 className="mb-4 text-center">Latest Job Openings</h3>
        <Row>
          {jobs.map((job) => (
            <Col key={job.id} md={6} className="d-flex align-items-stretch mb-4">
              <JobCard job={job} applyJob={applyJob} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

const JobCard = ({ job, applyJob }) => {
  return (
    <Card className="h-100 shadow job-card" style={{ backgroundColor: '#f8f9fa', width: '100%' }}>
      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <Card.Subtitle className="mb-4 text-muted">{job.company}</Card.Subtitle>
        <Card.Text style={{ fontSize: '16px' }}>
          <BsGeoAltFill /> {job.location}<br />
          <BsBriefcaseFill /> {job.mode}<br />
          <BsClockFill /> {job.experience}
          <BsCurrencyRupee /> {job.salary}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" onClick={() => applyJob(job.applyLink)}>
          <BsArrowRight /> Apply Now
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default JobCards;









