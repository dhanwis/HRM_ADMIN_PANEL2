import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import {
  BsBriefcaseFill,
  BsClockFill,
  BsGeoAltFill,
  BsArrowRight,
  BsCurrencyRupee,
} from "react-icons/bs";

import vector from "../../assets/images/vector_image.png";
import axios from "axios";
import { baseUrlHr } from "../../url";

const JobCards = () => {
  const [jobData, setJobData] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (jobData.length === 0) {
      let fetchJobs = async () => {
        let response = await axios.get(`${baseUrlHr}/hr/jobapply/`, {
          headers: { Authorization: `Token ${token}` },
        });

        if (response.status === 200) {
          console.log("all new jobs", response.data);
          setJobData(response.data);
        }
      };

      fetchJobs();
    }
  }, [jobData.length, token]);

  const applyJob = (applyLink) => {
    window.open(applyLink, "_blank"); // Open the apply link in a new tab
  };

  return (
    <div style={{ backgroundImage: `url(${vector})`, height: "900px" }}>
      <div className="container mt-5">
        <Container>
          <h3 className="mb-4 text-center">Latest Job Openings</h3>
          <Row>
            {jobData.map((job) => (
              <Col
                key={job.id}
                md={6}
                className="d-flex align-items-stretch mb-4"
              >
                <Card
                  className="h-100 shadow job-card"
                  style={{ backgroundColor: "#f8f9fa", width: "100%" }}
                >
                  <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Subtitle className="mb-4 text-muted">
                      {job.company_name}
                    </Card.Subtitle>
                    <Card.Text style={{ fontSize: "16px" }}>
                      <BsGeoAltFill /> {job.location}
                      <br />
                      <BsBriefcaseFill /> {job.mode_of_work}
                      <br />
                      <BsClockFill /> {job.experience}
                      <br />
                      <BsCurrencyRupee /> {job.salary}
                    </Card.Text>

                    <Card.Text>
                      Last Date to apply:{" "}
                      <span style={{ color: "blue",textDecoration :"underline" }}> {job.last_date}</span>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      variant="primary"
                      onClick={() => applyJob(job.applyLink)}
                    >
                      <BsArrowRight /> Apply Now
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default JobCards;
