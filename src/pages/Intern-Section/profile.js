// import React from "react";
// import { Row, Col, Card, Button, Descriptions } from "antd";
// import {
//   TwitterOutlined,
//   FacebookOutlined,
//   InstagramOutlined,
// } from "@ant-design/icons";
// import { Container } from "react-bootstrap";
// import img from "./user.png";

// function ProfileInformation() {
//   return (
//     <div className="container mt-5">
//     <Container>
//       <Row justify="center">
//         <Col xs={24} md={16} lg={12}>
//           <Card
//             className="profile-card"
//             bodyStyle={{ paddingTop: 0, textAlign: "center" }}
//           >
//             <div className="profile-image-container">
//              <img src={img} alt="" style={{width:"100px" ,height:"100px",marginTop:"20px"}} />
//               {/* <img
//                 src="https://via.placeholder.com/200" // Example image URL
//                 alt="Profile Image"
//                 className="profile-image rounded-circle"
//               /> */}
//             </div>
//             <Descriptions bordered column={1} className="profile-descriptions mt-3">
//               <Descriptions.Item label="Full Name" className="font-bold">
//                 Athira
//               </Descriptions.Item>
//               <Descriptions.Item label="Email" className="font-bold">
//                 athira123@gmail.com
//               </Descriptions.Item>
//               <Descriptions.Item label="Date of Birth" className="font-bold">
//                 9625458912
//               </Descriptions.Item>
//               <Descriptions.Item label="University" className="font-bold">
//                 Kannur university
//               </Descriptions.Item>
//               <Descriptions.Item label="Course" className="font-bold">
//                 MCA
//               </Descriptions.Item>
//               <Descriptions.Item label="Internship Position" className="font-bold">
//                 Web Developer
//               </Descriptions.Item>
//               <Descriptions.Item label="Start Date" className="font-bold">
//                 01/05/2022
//               </Descriptions.Item>
//               <Descriptions.Item label="End Date" className="font-bold">
//                 01/08/2022
//               </Descriptions.Item>
//               <Descriptions.Item label="Internship Type" className="font-bold">
//                 Paid
//               </Descriptions.Item>
//               <Descriptions.Item label="Social" className="font-bold">
//                 <a href="https://twitter.com/narendramodi" className="mx-2 px-2">
//                   <TwitterOutlined />
//                 </a>
//                 <a href="#pablo" className="mx-2 px-2">
//                   <FacebookOutlined style={{ color: "#3b5998" }} />
//                 </a>
//                 <a href="#pablo" className="mx-2 px-2">
//                   <InstagramOutlined style={{ color: "#e4405f" }} />
//                 </a>
//               </Descriptions.Item>
//             </Descriptions>
//             <Button type="primary" className="edit-profile-button mt-4">
//               Edit Profile
//             </Button>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//     </div>
//   );
// }

// export default ProfileInformation;
















// import React, { useState } from 'react';
// import { Descriptions ,Row,Col,Breadcrumb} from "antd";
// import { NavLink} from "react-router-dom";
// import img from "./user.png";
// // import { Card } from 'antd';

// import {
//       TwitterOutlined,
//       FacebookOutlined,
//       InstagramOutlined,
//       } from "@ant-design/icons";
// import { color } from 'chart.js/helpers';

// const ProfileInformation = () => {
//     const [user, setUser] = useState({
//         name: 'Athira',
//         surname: '',
//         specialty: 'Web Developer',
//         skills: 'HTML, JavaScript, PHP',
//         gender: 'Female',
//         phone: '9623541258',
//         email: 'athira@gmail.com',
//         country: 'India',
//         city: 'Kannur',
//         birth: '2017-06-04'
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUser({
//             ...user,
//             [name]: value
//         });
//     };

//     const styles = {
//         container: {
//             display: 'flex',
//             // justifyContent: 'center',
//             padding: '20px'
//         },
//         sidebar: {
//             width: '35%',
//             height:"30%",
//             padding: '20px',
//             backgroundColor: '#f4f4f4',
//             // textAlign: 'center',
//             borderRadius: '10px',
//             textAlign:"center"
//         },
//         profilePic: {
//             width: '100px',
//             height: '100px',
//             borderRadius: '50%',
//             // marginLeft:"60px",
//             padding:"10px"
//         },
//         stats: {
//             margin: '20px 0'
//         },
//         statItem: {
//             margin: '10px 0'
//         },
//         portfolio: {
//             margin: '20px 0'
//         },
//         portfolioButton: {
//             display: 'block',
//             width: '100%',
//             padding: '10px',
//             backgroundColor: 'orange',
//             border: 'none',
//             color: 'white',
//             borderRadius: '5px',
//             marginBottom: '10px',
            
//         },
//         form: {
//             width: '100%',
//             padding: '20px',
//             backgroundColor: 'white',
//             borderRadius: '10px',
//             marginLeft: '20px',
//             backgroundColor: '#f4f4f4',
//         },
//         formTitle: {
//             marginBottom: '20px'
//         },
//         formGroup: {
//             marginBottom: '15px'
//         },
//         formLabel: {
//             display: 'block',
//             marginBottom: '5px'
//         },
//         formInput: {
//             width: '100%',
//             padding: '10px',
//             border: '1px solid #ccc',
//             borderRadius: '5px'
//         },
//         updateButton: {
//             backgroundColor: 'orange',
//             border: 'none',
//             color: 'white',
//             padding: '10px 20px',
//             borderRadius: '5px',
//             cursor: 'pointer'
//         },
//         forgotPassword: {
//             display: 'block',
//             marginTop: '20px',
//             color: 'red',
//             textAlign: 'right'
//         }
//     };

//     return (
//       <div className='container-fluid'>
//         <div className='row page-titles'>
//         <Row gutter={[24, 0]} style={{marginTop:"20px",marginLeft:"5px"}}>
//         <Col span={24} md={6}>
//           <Breadcrumb>
//             <Breadcrumb.Item>
//               <NavLink to="/"  style={{textDecoration:"none"}}>Profile</NavLink>
//             </Breadcrumb.Item>
//             <Breadcrumb.Item>
//               <NavLink to="/"  style={{textDecoration:"none",color:"blue"}}>View Profile</NavLink>
//             </Breadcrumb.Item>
//             {/* <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
//               {name.replace("/", "")}
//             </Breadcrumb.Item> */}
//           </Breadcrumb>
//           </Col>
//           </Row>
         
        
           
//         <div style={styles.container}>
//             <div style={styles.sidebar}>
//                 <img src={img} alt="Profile" style={styles.profilePic} />
//                 <h2>{user.name}</h2>
//                 <p>{user.specialty}</p>
//                 {/* <div style={styles.stats}>
//                     <div style={styles.statItem}>Models <span>36</span></div>
//                     <div style={styles.statItem}>Gallery <span>3</span></div>
//                     <div style={styles.statItem}>Lessons <span>1</span></div>
//                 </div> */}
//                 <div style={styles.portfolio}>
//                     {/* <button style={styles.portfolioButton}>Portfolio</button> */}

                    
//                     <Descriptions bordered column={1} className="profile-descriptions mt-3">
//                     <Descriptions.Item >
//                 <a href="https://twitter.com/narendramodi" className="mx-2 px-2">
//                    <TwitterOutlined />
//                  </a>
//                  <a href="#pablo" className="mx-2 px-2">
//                    <FacebookOutlined style={{ color: "#3b5998" }} />
//                  </a>
//                  <a href="#pablo" className="mx-2 px-2">
//                    <InstagramOutlined style={{ color: "#e4405f" }} />
//                  </a>
//                </Descriptions.Item>   
//                     </Descriptions>


//                     {/* <a href="https://www.dexignlab.com/">https://www.dexignlab.com/</a> */}
//                 </div>
//             </div>
//             <div style={styles.form}>
//                 <h3 style={styles.formTitle}>Account Setup</h3>
//                 <form>
//                     <div style={styles.formGroup}>
//                         <label style={styles.formLabel}  >Name</label>
//                         <input type="text" name="name" value={user.name} onChange={handleChange} style={styles.formInput} />
//                     </div>
//                     {/* <div style={styles.formGroup}>
//                         <label style={styles.formLabel}>Surname</label>
//                         <input type="text" name="surname" value={user.surname} onChange={handleChange} style={styles.formInput} />
//                     </div> */}
//                     <div style={styles.formGroup}>
//                         <label style={styles.formLabel}>Position</label>
//                         <input type="text" name="specialty" value={user.specialty} onChange={handleChange} style={styles.formInput} />
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label style={styles.formLabel}>Skills</label>
//                         <input type="text" name="skills" value={user.skills} onChange={handleChange} style={styles.formInput} />
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label style={styles.formLabel}>Gender</label>
//                         <select name="gender" value={user.gender} onChange={handleChange} style={styles.formInput}>
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                         </select>
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label style={styles.formLabel}>Birth</label>
//                         <input type="date" name="birth" value={user.birth} onChange={handleChange} style={styles.formInput} />
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label style={styles.formLabel}>Phone</label>
//                         <input type="tel" name="phone" value={user.phone} onChange={handleChange} style={styles.formInput} />
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label style={styles.formLabel}>Email</label>
//                         <input type="email" name="email" value={user.email} onChange={handleChange} style={styles.formInput} />
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label style={styles.formLabel}>Country</label>
//                         <input type="text" name="country" value={user.country} onChange={handleChange} style={styles.formInput} />
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label style={styles.formLabel}>City</label>
//                         <input type="text" name="city" value={user.city} onChange={handleChange} style={styles.formInput} />
//                     </div>
//                     <button type="button" style={styles.updateButton}>Update</button>
//                 </form>
//                 {/* <a href="#" style={styles.forgotPassword}>Forgot your password?</a> */}
//             </div>
//         </div>
//         </div>
//         </div>
//     );
// };

// export default ProfileInformation;

















// import React from 'react';
// import { Card, Descriptions, Progress, Row, Col, Button } from 'antd';
// import { MailOutlined, PhoneOutlined, InfoCircleOutlined } from '@ant-design/icons';
// import profilePic from './user.png'; // Assuming you have this image in the same directory
// import BgProfile from './bg-profile.jpg';


// const styles = {
//   container: {
//     padding: '20px',
   
//   },
//   card: {
//     marginBottom: '20px',
//     borderRadius: '10px',
//   },
//   profilePic: {
//     width: '100px',
//     height: '100px',
//     borderRadius: '50%',
//   },
//   profileInfo: {
//     fontSize: '16px',
//   },
//   profilePosition: {
//     marginLeft: '10px',
//   },
//   profileLocation: {
//     marginLeft: '10px',
//   },
//   profileDescription: {
//     fontSize: '14px',
//     color: 'gray',
//   },
//   profileProgress: {
//     textAlign: 'right',
//   },
//   profileFooter: {
//     margin: '20px 0',
//     fontSize: '16px',
//   },
//   profileActions: {
//     display: 'flex',
//     justifyContent: 'space-around',
//   },
//   fontt : {
//     fontSize:'50px',
//   },
// };

// const ProfileInformation = () => {
//   return (
//     <>
//     <div className="profile-nav-bg" style={{ backgroundImage: "url(" + BgProfile + ")"}}>
//     </div>
//     <div style={styles.container}>
//       <Card style={styles.card}>
//         <Row>
//           <Col span={4}>
//             <img src={profilePic} alt="Profile" style={styles.profilePic} />
//           </Col>
//           <Col span={16}>
//             <h2>Athira</h2>
//             <p style={styles.profileInfo}>
//               <MailOutlined /> athira123@gmail.com &nbsp;
//               <span style={styles.profilePosition}>|  Intern</span> &nbsp;
//               <span style={styles.profileLocation}>|  Kannur</span>
//             </p>
//             {/* <p style={styles.profileDescription}>
//               A data analyst collects, interprets and visualizes data to uncover insights.
//               A data analyst assigns a numerical value to business functions so performance.
//             </p> */}
//           </Col>
//           <Col span={4} style={styles.profileProgress}>
//             <span>Progress</span>
//             <Progress percent={85} status="active" />
//           </Col>
//         </Row>
//       </Card>

//       <Card style={styles.card}>
//         {/* <h3>Description</h3> */}
       
//         <Descriptions bordered column={2}  >
//           <Descriptions.Item style={{fontSize:'15px'}} label="Name" >Athira</Descriptions.Item>
//           <Descriptions.Item style={{fontSize:'15px'}}label="Email" >athira123@gmail.com</Descriptions.Item>
//           <Descriptions.Item style={{fontSize:'15px'}}label="Date Of Birth" >13 June 2000</Descriptions.Item>
//           <Descriptions.Item style={{fontSize:'15px'}}label="Position" >Web developer Intern</Descriptions.Item>


//           <Descriptions.Item style={{fontSize:'15px'}}label="Address" >rose villa</Descriptions.Item>
//           <Descriptions.Item style={{fontSize:'15px'}}label="City" >kannur</Descriptions.Item>
//           <Descriptions.Item style={{fontSize:'15px'}}label="State" >kerala</Descriptions.Item>
//           <Descriptions.Item style={{fontSize:'15px'}}label="Country" >India</Descriptions.Item>
//           <Descriptions.Item style={{fontSize:'15px'}}label="Qualification">B.Tech(CSE)</Descriptions.Item>
          
          
//           {/* <Descriptions.Item label="Resume Title">Searching For PHP Developer</Descriptions.Item> */}
//           {/* <Descriptions.Item label="Annual Salary">$7.5Lacs</Descriptions.Item> */}
//           {/* <Descriptions.Item label="Current Company">Abcd pvt Ltd</Descriptions.Item> */}
//           {/* <Descriptions.Item label="Experience">3 Yrs</Descriptions.Item> */}
//           {/* <Descriptions.Item label="Location">Kannur</Descriptions.Item> */}
//           {/* <Descriptions.Item label="Preferred Location">AUSA</Descriptions.Item> */}
          
//           <Descriptions.Item style={{fontSize:'15px'}}label="Key Skills" >Good Communication, Planning and research skills</Descriptions.Item>
//           <Descriptions.Item style={{fontSize:'15px'}}label="Languages">English, German, Spanish</Descriptions.Item>
          
//           <Descriptions.Item style={{fontSize:'15px'}}label="Phone" >9823651425</Descriptions.Item>
//           <Descriptions.Item style={{fontSize:'15px'}}label="Industry" >IT Software / Developer</Descriptions.Item>
         
//           <Descriptions.Item style={{fontSize:'15px'}}label="Gender" >Female</Descriptions.Item>
//           <Descriptions.Item style={{fontSize:'15px'}}label="Marital Status">Unmarried</Descriptions.Item>
//           <Descriptions.Item style={{fontSize:'15px'}}label="Permanent Address" >USA</Descriptions.Item>
//           <Descriptions.Item style={{fontSize:'15px'}}label="Zip code" >670694</Descriptions.Item>
//         </Descriptions>
     
//       </Card>

//       {/* <div style={styles.profileFooter}>
//         <span>Currently Working at <strong>Abcd Pvt Ltd</strong></span> &nbsp;
//         <span>3 Yrs Of Working Experience in <strong>Abcd Pvt Ltd</strong></span>
//       </div> */}

//       <div style={styles.profileActions}>
//         <Button type="primary" icon={<MailOutlined />}>Download Resume</Button>
//         {/* <Button type="default" icon={<InfoCircleOutlined />}>Share Profile</Button> */}
//         <Button type="dashed" icon={<PhoneOutlined />}>Contact</Button>
//       </div>
//     </div>
    
//     </>
//   );
// };

// export default ProfileInformation;




















import React, { useState } from 'react';
import { Card, Descriptions, Progress, Row, Col, Button, Form, Input } from 'antd';
// import { MailOutlined, PhoneOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { MailOutlined} from '@ant-design/icons';


import profilePic from "./user.png";
import BgProfile from "./bg-profile.jpg";

// import vector from "../../assets/images/vector_image.png"



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
    name: 'Devika J',
    email: 'Devika123@gmail.com',
    dob: '13 June 2001',
    position: 'Web developer Intern',
    address: 'Sreenidhi',
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
    {/* <div style={{backgroundImage:`url(${vector})`,height:"900px"}}> */}
      
      <div className="profile-nav-bg" style={{ backgroundImage: `url(${BgProfile})` }}></div>
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
      {/* </div> */}
    </>
  );
};

export default ProfileInformation;








