// /*!
//   =========================================================
//   * Muse Ant Design Dashboard - v1.0.0
//   =========================================================
//   * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
//   * Copyright 2021 Creative Tim (https://www.creative-tim.com)
//   * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
//   * Coded by Creative Tim
//   =========================================================
//   * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */
// import { useState } from "react";

// import {
//   Row,
//   Col,
//   Card,
//   Button,
//   List,
//   Descriptions,
//   Avatar,
//   Radio,
//   Switch,
//   Upload,
//   message,
// } from "antd";

// import {
//   FacebookOutlined,
//   TwitterOutlined,
//   InstagramOutlined,
//   VerticalAlignTopOutlined,
// } from "@ant-design/icons";

// import BgProfile from "../../assets/images/bg-profile.jpg";
// import profilavatar from "../../assets/images/face-1.jpg";
// import convesionImg from "../../assets/images/face-3.jpg";
// import convesionImg2 from "../../assets/images/face-4.jpg";
// import convesionImg3 from "../../assets/images/face-5.jpeg";
// import convesionImg4 from "../../assets/images/face-6.jpeg";
// import convesionImg5 from "../../assets/images/face-2.jpg";
// import project1 from "../../assets/images/home-decor-1.jpeg";
// import project2 from "../../assets/images/home-decor-2.jpeg";
// import project3 from "../../assets/images/home-decor-3.jpeg";

// function HR_Profile() {
//   const [imageURL, setImageURL] = useState(false);
//   const [, setLoading] = useState(false);

//   const getBase64 = (img, callback) => {
//     const reader = new FileReader();
//     reader.addEventListener("load", () => callback(reader.result));
//     reader.readAsDataURL(img);
//   };

//   const beforeUpload = (file) => {
//     const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
//     if (!isJpgOrPng) {
//       message.error("You can only upload JPG/PNG file!");
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//       message.error("Image must smaller than 2MB!");
//     }
//     return isJpgOrPng && isLt2M;
//   };

//   const handleChange = (info) => {
//     if (info.file.status === "uploading") {
//       setLoading(false);
//       return;
//     }
//     if (info.file.status === "done") {
//       getBase64(info.file.originFileObj, (imageUrl) => {
//         setLoading(false);
//         setImageURL(false);
//       });
//     }
//   };

//   const pencil = [
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       key={0}
//     >
//       <path
//         d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
//         className="fill-gray-7"
//       ></path>
//       <path
//         d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
//         className="fill-gray-7"
//       ></path>
//     </svg>,
//   ];

//   const uploadButton = (
//     <div className="ant-upload-text font-semibold text-dark">
//       {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
//       <div>Upload New Project</div>
//     </div>
//   );

//   const data = [
//     {
//       title: "Sophie B.",
//       avatar: convesionImg,
//       description: "Hi! I need more information…",
//     },
//     {
//       title: "Anne Marie",
//       avatar: convesionImg2,
//       description: "Awesome work, can you…",
//     },
//     {
//       title: "Ivan",
//       avatar: convesionImg3,
//       description: "About files I can…",
//     },
//     {
//       title: "Peterson",
//       avatar: convesionImg4,
//       description: "Have a great afternoon…",
//     },
//     {
//       title: "Nick Daniel",
//       avatar: convesionImg5,
//       description: "Hi! I need more information…",
//     },
//   ];

//   const project = [
//     {
//       img: project1,
//       titlesub: "Project #1",
//       title: "Modern",
//       disciption:
//         "As Uber works through a huge amount of internal management turmoil.",
//     },
//     {
//       img: project2,
//       titlesub: "Project #2",
//       title: "Scandinavian",
//       disciption:
//         "Music is something that every person has his or her own specific opinion about.",
//     },
//     {
//       img: project3,
//       titlesub: "Project #3",
//       title: "Minimalist",
//       disciption:
//         "Different people have different taste, and various types of music, Zimbali Resort",
//     },
//   ];

//   return (
//     <>
//       <div
//         className="profile-nav-bg"
//         style={{ backgroundImage: "url(" + BgProfile + ")" }}
//       ></div>

//       <Card
//         className="card-profile-head"
//         bodyStyle={{ display: "none" }}
//         title={
//           <Row justify="space-between" align="middle" gutter={[24, 0]}>
//             <Col span={24} md={12} className="col-info">
//               <Avatar.Group>
//                 <Avatar size={74} shape="square" src={profilavatar} />

//                 <div className="avatar-info">
//                   <h4 className="font-semibold m-0">Sarah Jacob</h4>
//                   <p>CEO / Co-Founder</p>
//                 </div>
//               </Avatar.Group>
//             </Col>
//             <Col
//               span={24}
//               md={12}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "flex-end",
//               }}
//             >
//               {/* <Radio.Group defaultValue="a">
//                 <Radio.Button value="a">OVERVIEW</Radio.Button>
//                 <Radio.Button value="b">TEAMS</Radio.Button>
//                 <Radio.Button value="c">PROJECTS</Radio.Button>
//               </Radio.Group> */}
//             </Col>
//           </Row>
//         }
//       ></Card>

//       <Row gutter={[24, 0]}>
        
//         <Col span={24} md={12} className="mb-24" style={{paddingLeft:'250px'}}>
//           <Card
//             bordered={false}
//             title={<h6 className="font-semibold m-0">Profile Information</h6>}
//             className="header-solid h-full card-profile-information"
//             extra={<Button type="link">{pencil}</Button>}
//             bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
//             style={{width:'900px',height:'500px'}}
//           >
//             <p className="text-dark">
//               {" "}
//               Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer
//               is no. If two equally difficult paths, choose the one more painful
//               in the short term (pain avoidance is creating an illusion of
//               equality).{" "}
//             </p>
//             <hr className="my-25" />
//             <Descriptions title="Oliver Liam">
//               <Descriptions.Item label="Full Name" span={3}>
//                 Sarah Emily Jacob
//               </Descriptions.Item>
//               <Descriptions.Item label="Mobile" span={3}>
//                 (44) 123 1234 123
//               </Descriptions.Item>
//               <Descriptions.Item label="Email" span={3}>
//                 sarahjacob@mail.com
//               </Descriptions.Item>
//               <Descriptions.Item label="Location" span={3}>
//                 USA
//               </Descriptions.Item>
//               <Descriptions.Item label="Social" span={3}>
//                 <a href="#pablo" className="mx-5 px-5">
//                   {<TwitterOutlined />}
//                 </a>
//                 <a href="#pablo" className="mx-5 px-5">
//                   {<FacebookOutlined style={{ color: "#344e86" }} />}
//                 </a>
//                 <a href="#pablo" className="mx-5 px-5">
//                   {<InstagramOutlined style={{ color: "#e1306c" }} />}
//                 </a>
//               </Descriptions.Item>
//             </Descriptions>
//           </Card>
//         </Col>   
//       </Row>
      
//     </>
//   );
// }

// export default HR_Profile;
import { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Descriptions,
  Avatar,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import BgProfile from "../../assets/images/bg-profile.jpg";
import profilavatar from "../../assets/images/face-1.jpg";
import convesionImg from "../../assets/images/face-3.jpg";
import convesionImg2 from "../../assets/images/face-4.jpg";
import convesionImg3 from "../../assets/images/face-5.jpeg";
import convesionImg4 from "../../assets/images/face-6.jpeg";
import convesionImg5 from "../../assets/images/face-2.jpg";
import project1 from "../../assets/images/home-decor-1.jpeg";
import project2 from "../../assets/images/home-decor-2.jpeg";
import project3 from "../../assets/images/home-decor-3.jpeg";

function HR_Profile() {
  const [imageURL, setImageURL] = useState(false);
  const [, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    fullName: "Sarah Emily Jacob",
    mobile: "(44) 123 1234 123",
    email: "sarahjacob@mail.com",
    location: "USA",
  });

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(false);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageURL(false);
      });
    }
  };

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
      onClick={() => setIsModalVisible(true)}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
      <div>Upload New Project</div>
    </div>
  );

  const data = [
    {
      title: "Sophie B.",
      avatar: convesionImg,
      description: "Hi! I need more information…",
    },
    {
      title: "Anne Marie",
      avatar: convesionImg2,
      description: "Awesome work, can you…",
    },
    {
      title: "Ivan",
      avatar: convesionImg3,
      description: "About files I can…",
    },
    {
      title: "Peterson",
      avatar: convesionImg4,
      description: "Have a great afternoon…",
    },
    {
      title: "Nick Daniel",
      avatar: convesionImg5,
      description: "Hi! I need more information…",
    },
  ];

  const project = [
    {
      img: project1,
      titlesub: "Project #1",
      title: "Modern",
      disciption:
        "As Uber works through a huge amount of internal management turmoil.",
    },
    {
      img: project2,
      titlesub: "Project #2",
      title: "Scandinavian",
      disciption:
        "Music is something that every person has his or her own specific opinion about.",
    },
    {
      img: project3,
      titlesub: "Project #3",
      title: "Minimalist",
      disciption:
        "Different people have different taste, and various types of music, Zimbali Resort",
    },
  ];

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    setProfileInfo(values);
    setIsModalVisible(false);
    message.success("Profile updated successfully!");
  };

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={profilavatar} />
                <div className="avatar-info">
                  <h4 className="font-semibold m-0">Sarah Jacob</h4>
                  <p>CEO / Co-Founder</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={12} className="mb-24" style={{ paddingLeft: "50px" }}>
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            extra={<Button type="link">{pencil}</Button>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
            style={{ width: "1465px", height: "350px" }}
          >
            {/* <p className="text-dark">
              {" "}
              Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer
              is no. If two equally difficult paths, choose the one more painful
              in the short term (pain avoidance is creating an illusion of
              equality).{" "}
            </p> */}
            <hr className="my-25" />
            <Descriptions>
              <Descriptions.Item label="Full Name" span={3}>
                {profileInfo.fullName}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile" span={3}>
                {profileInfo.mobile}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {profileInfo.email}
              </Descriptions.Item>
              <Descriptions.Item label="Location" span={3}>
                {profileInfo.location}
              </Descriptions.Item>
              <Descriptions.Item label="Social" span={3}>
                <a href="#pablo" className="mx-5 px-5" >
                  {<TwitterOutlined />}
                </a>
                <a href="#pablo" className="mx-5 px-5" >
                  {<FacebookOutlined style={{ color: "#344e86" }} />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<InstagramOutlined style={{ color: "#e1306c" }} />}
                </a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Modal style={{paddingTop:'250px'}}
        title="Edit Profile"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form style={{width:'350px'}}
          name="profileForm"
          initialValues={profileInfo}
          onFinish={onFinish}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please input your full name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mobile"
            name="mobile"
            rules={[{ required: true, message: "Please input your mobile number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please input your location!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default HR_Profile;
