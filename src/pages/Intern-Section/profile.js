import React from "react";
import { Row, Col, Card, Button, Descriptions } from "antd";
import {
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { Container } from "react-bootstrap";

function ProfileInformation() {
  return (
    <div className="container mt-5">
      <h2 className="font-bold text-2xl mb-4 ">Profile Information</h2>
      <Container>
        <Row justify="center" style={{ minHeight: "100vh" }}>
          <Col span={24} md={12} className="mb-24">
            <Card
              bordered={false}
              className="header-solid h-full card-profile-information shadow"
              bodyStyle={{ paddingTop: 0, paddingBottom: 16, textAlign: "center" }}
              style={{ width: "90%", maxWidth: "500px", backgroundColor: "#f0f2f5", borderRadius: "10px" }}
            >
              <div style={{ marginBottom: "24px" }}>
                <img
                  src="https://via.placeholder.com/200" // Example image URL
                  alt="Profile Image"
                  style={{ width: "200px", borderRadius: "50%", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                />
              </div>
              <Descriptions bordered column={1}>
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
              <Button type="primary" className="mt-4">
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
