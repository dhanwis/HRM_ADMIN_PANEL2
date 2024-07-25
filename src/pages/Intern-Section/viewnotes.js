import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";

import vector from "../../assets/images/vector_image.png";
import axios from "axios";
import { baseUrlHr } from "../../url";

const FourCards = () => {
  const token = localStorage.getItem("authToken");

  const [note, setNote] = useState([]);

  useEffect(() => {
    let fetchNote = async () => {
      let x = await axios.get(`${baseUrlHr}/staff/noteshare/`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (x.status === 200) {
        console.log(x.data);
        setNote(x.data);
      }
    };
    fetchNote();
  }, [token]);

  return (
    <div
      style={{
        backgroundImage: `url(${vector})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "900px",
        paddingTop: "50px",
      }}
    >
      <div className="container">
        <Container>
          <h3 className="text-center mb-5" style={{ color: "#333" }}>
            Notes
          </h3>
          <Row className="justify-content-center">
            {note &&
              note.map((x, i) => (
                <Col md={6} className="mb-4" key={i}>
                  <Card
                    className="h-100 shadow-sm"
                    style={{ borderRadius: "15px" }}
                  >
                    <Card.Body style={{ padding: "2rem" }}>
                      <Card.Title
                        className="mb-3"
                        style={{ fontWeight: "bold", color: "#444" }}
                      >
                        {x.title}
                      </Card.Title>
                      <Card.Text style={{ color: "#555" }}>
                        {x.description}
                      </Card.Text>
                      <div className="text-center">
                        <a href={x.note_upload} download>
                          <Button
                            variant="primary"
                            style={{
                              borderRadius: "25px",
                              padding: "10px 20px",
                            }}
                          >
                            Download PDF
                          </Button>
                        </a>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default FourCards;
