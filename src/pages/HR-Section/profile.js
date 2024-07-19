import React, { useState, useEffect } from "react";
import {
  Card,
  Descriptions,
  Progress,
  Row,
  Col,
  Button,
  Form,
  Input,
} from "antd";
// import { MailOutlined, PhoneOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

import profilePic from "../../assets/images/face-1.jpg";
import BgProfile from "./bg-profile.jpg";
import axios from "axios";
import { baseUrl, baseUrlImg } from "../../url";

const styles = {
  container: {
    padding: "20px",
  },
  card: {
    marginBottom: "20px",
    borderRadius: "10px",
  },
  profilePic: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
  },
  profileInfo: {
    fontSize: "16px",
  },
  profilePosition: {
    marginLeft: "10px",
  },
  profileLocation: {
    marginLeft: "10px",
  },
  profileDescription: {
    fontSize: "14px",
    color: "gray",
  },
  profileProgress: {
    textAlign: "right",
  },
  profileFooter: {
    margin: "20px 0",
    fontSize: "16px",
  },
  profileActions: {
    display: "flex",
    justifyContent: "space-around",
  },
  fontt: {
    fontSize: "50px",
  },
};

const HR_Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [profile, setProfile] = useState([]);

  const handleUpdateClick = () => {
    setEditMode(true);
    form.setFieldsValue(profile);
  };

  const handleFormSubmit = (values) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      ...values,
    }));
    setEditMode(false);
  };

  useEffect(() => {
    let fetchProfile = async () => {
      let res = await axios.get(`${baseUrl}/Hr/`);

      if (res.status === 200) {
        console.log(res.data[0]);
        setProfile(res.data[0]);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: `url(${BgProfile}) ` }}
      ></div>
      <div style={styles.container}>
        <Card style={styles.card}>
          <Row>
            <Col span={4}>
              <img
                src={`${baseUrlImg}${profile.image}`}
                alt="Profile"
                style={styles.profilePic}
              />
            </Col>
            <Col span={16}>
              <h2>{profile.username}</h2>
              <p style={styles.profileInfo}>
                <MailOutlined /> {profile.email} &nbsp;
                <span style={styles.profilePosition}>| HR</span> &nbsp;
                <span style={styles.profileLocation}>| {profile.city}</span>
              </p>
            </Col>
            {/* <Col span={4} style={styles.profileProgress}>
              <span>Progress</span>
              <Progress percent={85} status="active" />
            </Col> */}
          </Row>
        </Card>

        <Card style={styles.card}>
          {editMode ? (
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
              <Form.Item label="Address" name="address">
                <Input />
              </Form.Item>
              <Form.Item label="City" name="city">
                <Input />
              </Form.Item>
              <Form.Item label="State" name="state">
                <Input />
              </Form.Item>
              <Form.Item label="Country" name="country">
                <Input />
              </Form.Item>

              <Form.Item label="Address" name="address">
                <Input />
              </Form.Item>
              <Form.Item label="Pin code" name="pincode">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button type="default" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Name">
                {profile.username}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {profile.email}
              </Descriptions.Item>
              <Descriptions.Item label="Date Of Birth">
                {profile.dob}
              </Descriptions.Item>

              <Descriptions.Item label="Address">
                {profile.address}
              </Descriptions.Item>
              <Descriptions.Item label="City">{profile.city}</Descriptions.Item>
              <Descriptions.Item label="State">
                {profile.state}
              </Descriptions.Item>
              <Descriptions.Item label="Country">
                {profile.country}
              </Descriptions.Item>

              <Descriptions.Item label="Phone">
                {profile.phone_number}
              </Descriptions.Item>

              <Descriptions.Item label="Zip code">
                {profile.pincode}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Card>

        {/* <div style={styles.profileActions}>
          <Button type="primary" icon={<MailOutlined />}>Download Resume</Button>
          <Button type="dashed" icon={<PhoneOutlined />}>Contact</Button>
          {!editMode && (
            <Button type="primary" onClick={handleUpdateClick}>
              Update Profile
            </Button>
          )}
        </div> */}
      </div>
    </>
  );
};

export default HR_Profile;
