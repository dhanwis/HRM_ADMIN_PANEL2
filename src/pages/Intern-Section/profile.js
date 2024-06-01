import React from "react";
import { Row, Col, Card, Button, Descriptions } from "antd";
import {
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { Container } from "react-bootstrap";
import img from "./user.png";

function ProfileInformation() {
  return (
    <div className="container mt-5">
    <Container>
      <Row justify="center">
        <Col xs={24} md={16} lg={12}>
          <Card
            className="profile-card"
            bodyStyle={{ paddingTop: 0, textAlign: "center" }}
          >
            <div className="profile-image-container">
             <img src={img} alt="" style={{width:"100px" ,height:"100px",marginTop:"20px"}} />
              {/* <img
                src="https://via.placeholder.com/200" // Example image URL
                alt="Profile Image"
                className="profile-image rounded-circle"
              /> */}
            </div>
            <Descriptions bordered column={1} className="profile-descriptions mt-3">
              <Descriptions.Item label="Full Name" className="font-bold">
                Athira
              </Descriptions.Item>
              <Descriptions.Item label="Email" className="font-bold">
                athira123@gmail.com
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth" className="font-bold">
                9625458912
              </Descriptions.Item>
              <Descriptions.Item label="University" className="font-bold">
                Kannur university
              </Descriptions.Item>
              <Descriptions.Item label="Course" className="font-bold">
                MCA
              </Descriptions.Item>
              <Descriptions.Item label="Internship Position" className="font-bold">
                Web Developer
              </Descriptions.Item>
              <Descriptions.Item label="Start Date" className="font-bold">
                01/05/2022
              </Descriptions.Item>
              <Descriptions.Item label="End Date" className="font-bold">
                01/08/2022
              </Descriptions.Item>
              <Descriptions.Item label="Internship Type" className="font-bold">
                Paid
              </Descriptions.Item>
              <Descriptions.Item label="Social" className="font-bold">
                <a href="https://twitter.com/narendramodi" className="mx-2 px-2">
                  <TwitterOutlined />
                </a>
                <a href="#pablo" className="mx-2 px-2">
                  <FacebookOutlined style={{ color: "#3b5998" }} />
                </a>
                <a href="#pablo" className="mx-2 px-2">
                  <InstagramOutlined style={{ color: "#e4405f" }} />
                </a>
              </Descriptions.Item>
            </Descriptions>
            <Button type="primary" className="edit-profile-button mt-4">
              Edit Profile
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default ProfileInformation;