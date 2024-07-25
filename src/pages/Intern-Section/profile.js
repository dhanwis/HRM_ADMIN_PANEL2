import React, { useState } from "react";
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
import { MailOutlined } from "@ant-design/icons";

import profilePic from "./user.png";
import BgProfile from "./bg-profile.jpg";

// import vector from "../../assets/images/vector_image.png"

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

const ProfileInformation = () => {
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [profile, setProfile] = useState({
    name: "Devika J",
    email: "Devika123@gmail.com",
    dob: "13 June 2001",
    position: "Web developer Intern",
    address: "Sreenidhi",
    city: "Kannur",
    state: "Kerala",
    country: "India",
    qualification: "B.Tech(CSE)",
    keySkills: "Good Communication, Planning and research skills",
    languages: "English, German, Spanish",
    phone: "9823651425",
    industry: "IT Software / Developer",
    gender: "Female",
    maritalStatus: "Unmarried",
    permanentAddress: "USA",
    zipCode: "670694",
  });

  const user = JSON.parse(localStorage.getItem("intern"));

  console.log(user);

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

  return (
    <>
      {/* <div style={{backgroundImage:`url(${vector})`,height:"900px"}}> */}

      <div
        className="profile-nav-bg"
        style={{ backgroundImage: `url(${BgProfile})` }}
      ></div>
      <div style={styles.container}>
        <Card style={styles.card}>
          <Row>
            <Col span={4}>
              <img src={profilePic} alt="Profile" style={styles.profilePic} />
            </Col>
            <Col span={16}>
              <h2>{user.username}</h2>
              <p style={styles.profileInfo}>
                <MailOutlined /> {user.email} &nbsp;
                <span style={styles.profilePosition}>
                  | {profile.position}
                </span>{" "}
                &nbsp;
                <span style={styles.profileLocation}>| {user.city}</span>
              </p>
            </Col>
            <Col span={4} style={styles.profileProgress}>
              <span>Progress</span>
              <Progress percent={85} status="active" />
            </Col>
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
              <Form.Item label="Qualification" name="qualification">
                <Input />
              </Form.Item>
              <Form.Item label="Key Skills" name="keySkills">
                <Input />
              </Form.Item>
              <Form.Item label="Languages" name="languages">
                <Input />
              </Form.Item>
              <Form.Item label="Industry" name="industry">
                <Input />
              </Form.Item>
              <Form.Item label="Marital Status" name="maritalStatus">
                <Input />
              </Form.Item>
              <Form.Item label="Permanent Address" name="permanentAddress">
                <Input />
              </Form.Item>
              <Form.Item label="Zip code" name="zipCode">
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
                {user.username}
              </Descriptions.Item>
              <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
              <Descriptions.Item label="Date Of Birth">
                {user.dob}
              </Descriptions.Item>
              <Descriptions.Item label="Position">
                {user.profile.course}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {user.address}
              </Descriptions.Item>
              <Descriptions.Item label="City">{user.city}</Descriptions.Item>
              <Descriptions.Item label="State">{user.state}</Descriptions.Item>
              <Descriptions.Item label="Country">
                {user.country}
              </Descriptions.Item>
              <Descriptions.Item label="Qualification">
                {user.profile.educationalQualification}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {user.phone_number}
              </Descriptions.Item>

              <Descriptions.Item label="Zip code">
                {user.pincode}
              </Descriptions.Item>
              {/*               
              <Descriptions.Item label="Key Skills">
                {user.keySkills}
              </Descriptions.Item>
              <Descriptions.Item label="Languages">
                {profile.languages}
              </Descriptions.Item>
              
              <Descriptions.Item label="Industry">
                {user.industry}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {user.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Marital Status">
                {profile.maritalStatus}
              </Descriptions.Item> */}
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
      {/* </div> */}
    </>
  );
};

export default ProfileInformation;
