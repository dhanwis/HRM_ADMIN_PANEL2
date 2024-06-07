import React, { useState } from 'react';
import { Card, Descriptions, Progress, Row, Col, Button, Form, Input } from 'antd';
// import { MailOutlined, PhoneOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { MailOutlined} from '@ant-design/icons';


import profilePic from "./user.png";
import BgProfile from "../../assets/images/bg-profile.jpg";


const styles = {
  container: {
    padding: '20px',
  },
  card: {
    marginBottom: '20px',
    borderRadius: '10px',
  },
  profilePic: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
  },
  profileInfo: {
    fontSize: '16px',
  },
  profilePosition: {
    marginLeft: '10px',
  },
  profileLocation: {
    marginLeft: '10px',
  },
  profileDescription: {
    fontSize: '14px',
    color: 'gray',
  },
  profileProgress: {
    textAlign: 'right',
  },
  profileFooter: {
    margin: '20px 0',
    fontSize: '16px',
  },
  profileActions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  fontt: {
    fontSize: '50px',
  },
};

const ProfileInformation = () => {
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [profile, setProfile] = useState({
    name: 'Athira',
    email: 'athira123@gmail.com',
    dob: '13 June 2000',
    position: 'Web developer Intern',
    address: 'Rose Villa',
    city: 'Kannur',
    state: 'Kerala',
    country: 'India',
    qualification: 'B.Tech(CSE)',
    keySkills: 'Good Communication, Planning and research skills',
    languages: 'English, German, Spanish',
    phone: '9823651425',
    industry: 'IT Software / Developer',
    gender: 'Female',
    maritalStatus: 'Unmarried',
    permanentAddress: 'USA',
    zipCode: '670694',
  });

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
      <div className="profile-nav-bg" style={{ backgroundImage: `url(${BgProfile}) `}}></div>
      <div style={styles.container}>
        <Card style={styles.card}>
          <Row>
            <Col span={4}>
              <img src={profilePic} alt="Profile" style={styles.profilePic} />
            </Col>
            <Col span={16}>
              <h2>{profile.name}</h2>
              <p style={styles.profileInfo}>
                <MailOutlined /> {profile.email} &nbsp;
                <span style={styles.profilePosition}>| {profile.position}</span> &nbsp;
                <span style={styles.profileLocation}>| {profile.city}</span>
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
                <Button type="primary" htmlType="submit">Save</Button>
                <Button type="default" onClick={() => setEditMode(false)}>Cancel</Button>
              </Form.Item>
            </Form>
          ) : (
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Name">{profile.name}</Descriptions.Item>
              <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
              <Descriptions.Item label="Date Of Birth">{profile.dob}</Descriptions.Item>
              <Descriptions.Item label="Position">{profile.position}</Descriptions.Item>
              <Descriptions.Item label="Address">{profile.address}</Descriptions.Item>
              <Descriptions.Item label="City">{profile.city}</Descriptions.Item>
              <Descriptions.Item label="State">{profile.state}</Descriptions.Item>
              <Descriptions.Item label="Country">{profile.country}</Descriptions.Item>
              <Descriptions.Item label="Qualification">{profile.qualification}</Descriptions.Item>
              <Descriptions.Item label="Key Skills">{profile.keySkills}</Descriptions.Item>
              <Descriptions.Item label="Languages">{profile.languages}</Descriptions.Item>
              <Descriptions.Item label="Phone">{profile.phone}</Descriptions.Item>
              <Descriptions.Item label="Industry">{profile.industry}</Descriptions.Item>
              <Descriptions.Item label="Gender">{profile.gender}</Descriptions.Item>
              <Descriptions.Item label="Marital Status">{profile.maritalStatus}</Descriptions.Item>
              {/* <Descriptions.Item label="Permanent Address">{profile.permanentAddress}</Descriptions.Item> */}
              <Descriptions.Item label="Zip code">{profile.zipCode}</Descriptions.Item>
            </Descriptions>
          )}
        </Card>

         <div style={styles.profileActions}>
           {/* <Button type="primary" icon={<MailOutlined />}>Download Resume</Button> */}
           {/* <Button type="dashed" icon={<PhoneOutlined />}>Contact</Button> */}
           {!editMode && (
             <Button type="primary"  onClick={handleUpdateClick}>Update Profile</Button>
           )}
         </div>
       </div>
     </>
   );
 }
 
export default ProfileInformation;