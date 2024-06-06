 
import { useState } from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
} from "antd";
import {
  ToTopOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

import Echart from "../../components/chart/EChart";
import LineChart from "./TaskChart";

import ava1 from "../../assets/images/logo-shopify.svg";
import ava2 from "../../assets/images/logo-atlassian.svg";
import ava3 from "../../assets/images/logo-slack.svg";
import ava4 from "../../assets/images/logo-spotify.svg";
import ava5 from "../../assets/images/logo-jira.svg";
import ava6 from "../../assets/images/logo-invision.svg";
import team1 from "../../assets/images/team-1.jpg";
import team2 from "../../assets/images/team-2.jpg";
import team3 from "../../assets/images/team-3.jpg";
import team4 from "../../assets/images/team-4.jpg";
import card from "../../assets/images/info-card-1.jpg";
 
import InternHeader from "./Header_intern";
import { color } from "chart.js/helpers";

import { Link } from "@material-ui/core";

import vector from "../../assets/images/vector_image.png"


function Intern_Home() {
  const { Title, Text } = Typography;

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  const [reverse, setReverse] = useState(false);

  const dollor = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
        fill="#fff"
      ></path>
      <path
        d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
        fill="#fff"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const profile = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
        fill="#fff"
      ></path>
      <path
        d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
        fill="#fff"
      ></path>
      <path
        d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
        fill="#fff"
      ></path>
      <path
        d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const heart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const cart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z"
        fill="#fff"
      ></path>
    </svg>,
  ];



  const tables = [
    <svg
      width="50"
      height="40"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
        fill="#fff"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
        fill="#fff"
      ></path>
    </svg>,
  ];



  const jobs = [
    <svg
      width="50"
      height="40"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"
        fill="#fff"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
        fill="#fff"
      ></path>
    </svg>,
  ];


  const count = [
    {
      today: "Tasks",
      title: "5",
      // persent: "+30%",
      icon: tables,
      bnb: "bnb2",
      backgroundColor: "#98fb98", 
    },
    {
      today: "Notes",
      title: "2",
      // persent: "+20%",
      icon: tables,
      bnb: "bnb2",
      backgroundColor: "#ADD8E6", // light blue
    },
    {
      today: "Job",
      title: "5",
      // persent: "-20%",
      icon: jobs,
      bnb: "redtext",
      backgroundColor: "#eee8aa", // tomato
    },
    // {
    //   today: "New Orders",
    //   title: "$13,200",
    //   persent: "10%",
    //   icon: cart,
    //   bnb: "bnb2",
    //   backgroundColor: "#98FB98", // pale green
    // },
  ];
  

  // const list = [
  //   {
  //     img: ava1,
  //     Title: "Soft UI Shopify Version",
  //     bud: "$14,000",
  //     progress: <Progress percent={60} size="small" />,
  //     member: (
  //       <div className="avatar-group mt-2">
  //         <Tooltip placement="bottom" title="Ryan Tompson">
  //           <img className="tootip-img" src={team1} alt="" />
  //         </Tooltip>
  //         <Tooltip placement="bottom" title="Romina Hadid">
  //           <img className="tootip-img" src={team2} alt="" />
  //         </Tooltip>
  //         <Tooltip placement="bottom" title="Alexander Smith">
  //           <img className="tootip-img" src={team3} alt="" />
  //         </Tooltip>
  //         <Tooltip placement="bottom" title="Jessica Doe">
  //           <img className="tootip-img" src={team4} alt="" />
  //         </Tooltip>
  //       </div>
  //     ),
  //   },
  //   {
  //     img: ava2,
  //     Title: "Progress Track",
  //     bud: "$3,000",
  //     progress: <Progress percent={10} size="small" />,
  //     member: (
  //       <div className="avatar-group mt-2">
  //         <Tooltip placement="bottom" title="Ryan Tompson">
  //           <img className="tootip-img" src={team1} alt="" />
  //         </Tooltip>
  //         <Tooltip placement="bottom" title="Romina Hadid">
  //           <img className="tootip-img" src={team2} alt="" />
  //         </Tooltip>
  //       </div>
  //     ),
  //   },
  //   {
  //     img: ava3,
  //     Title: "Fix Platform Errors",
  //     bud: "Not Set",
  //     progress: <Progress percent={100} size="small" status="active" />,
  //     member: (
  //       <div className="avatar-group mt-2">
  //         <Tooltip placement="bottom" title="Ryan Tompson">
  //           <img className="tootip-img" src={team1} alt="" />
  //         </Tooltip>
  //         <Tooltip placement="bottom" title="Romina Hadid">
  //           <img className="tootip-img" src={team1} alt="" />
  //         </Tooltip>
  //         <Tooltip placement="bottom" title="Alexander Smith">
  //           <img className="tootip-img" src={team3} alt="" />
  //         </Tooltip>
  //       </div>
  //     ),
  //   },
  //   {
  //     img: ava4,
  //     Title: "Launch new Mobile App",
  //     bud: "$20,600",
  //     progress: <Progress percent={100} size="small" status="active" />,
  //     member: (
  //       <div className="avatar-group mt-2">
  //         <Tooltip placement="bottom" title="Ryan Tompson">
  //           <img className="tootip-img" src={team1} alt="" />
  //         </Tooltip>
  //         <Tooltip placement="bottom" title="Romina Hadid">
  //           <img className="tootip-img" src={team2} alt="" />
  //         </Tooltip>
  //       </div>
  //     ),
  //   },
  //   {
  //     img: ava5,
  //     Title: "Add the New Landing Page",
  //     bud: "$4,000",
  //     progress: <Progress percent={80} size="small" />,
  //     member: (
  //       <div className="avatar-group mt-2">
  //         <Tooltip placement="bottom" title="Ryan Tompson">
  //           <img className="tootip-img" src={team1} alt="" />
  //         </Tooltip>
  //         <Tooltip placement="bottom" title="Romina Hadid">
  //           <img className="tootip-img" src={team2} alt="" />
  //         </Tooltip>
  //         <Tooltip placement="bottom" title="Alexander Smith">
  //           <img className="tootip-img" src={team3} alt="" />
  //         </Tooltip>
  //         <Tooltip placement="bottom" title="Jessica Doe">
  //           <img className="tootip-img" src={team4} alt="" />
  //         </Tooltip>
  //       </div>
  //     ),
  //   },

  //   {
  //     img: ava6,
  //     Title: "Redesign Online Store",
  //     bud: "$2,000",
  //     progress: (
  //       <Progress
  //         percent={100}
  //         size="small"
  //         status="exception"
  //         format={() => "Cancel"}
  //       />
  //     ),
  //     member: (
  //       <div className="avatar-group mt-2">
  //         <Tooltip placement="bottom" title="Ryan Tompson">
  //           <img className="tootip-img" src={team1} alt="" />
  //         </Tooltip>
  //         <Tooltip placement="bottom" title="Romina Hadid">
  //           <img className="tootip-img" src={team2} alt="" />
  //         </Tooltip>
  //       </div>
  //     ),
  //   },
  // ];

  // const timelineList = [
  //   {
  //     title: "$2,400 - Redesign store",
  //     time: "09 JUN 7:20 PM",
  //     color: "green",
  //   },
  //   {
  //     title: "New order #3654323",
  //     time: "08 JUN 12:20 PM",
  //     color: "green",
  //   },
  //   {
  //     title: "Company server payments",
  //     time: "04 JUN 3:10 PM",
  //   },
  //   {
  //     title: "New card added for order #4826321",
  //     time: "02 JUN 2:45 PM",
  //   },
  //   {
  //     title: "Unlock folders for development",
  //     time: "18 MAY 1:30 PM",
  //   },
  //   {
  //     title: "New order #46282344",
  //     time: "14 MAY 3:30 PM",
  //     color: "gray",
  //   },
  // ];

  // const uploadProps = {
  //   name: "file",
  //   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  //   headers: {
  //     authorization: "authorization-text",
  //   },
  //   onChange(info) {
  //     if (info.file.status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  return (
    <>
    <div style={{backgroundImage:`url(${vector})`,height:"700px"}}>
    
    <InternHeader/>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]} style={{width:'1600px',marginTop:"50px"}}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox " style={{height:"150px",backgroundColor: c.backgroundColor}}>
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span style={{fontSize:"20px",color:"black"}}>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart/>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row> */}

        {/* <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Projects</Title>
                  <Paragraph className="lastweek">
                    done this month<span className="blue">40%</span>
                  </Paragraph>
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">ALL</Radio.Button>
                      <Radio.Button value="b">ONLINE</Radio.Button>
                      <Radio.Button value="c">STORES</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div className="ant-list-box table-responsive">
                <table className="width-100">
                  <thead>
                    <tr>
                      <th>COMPANIES</th>
                      <th>MEMBERS</th>
                      <th>BUDGET</th>
                      <th>COMPLETION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((d, index) => (
                      <tr key={index}>
                        <td>
                          <h6>
                            <img
                              src={d.img}
                              alt=""
                              className="avatar-sm mr-10"
                            />{" "}
                            {d.Title}
                          </h6>
                        </td>
                        <td>{d.member}</td>
                        <td>
                          <span className="text-xs font-weight-bold">
                            {d.bud}{" "}
                          </span>
                        </td>
                        <td>
                          <div className="percent-progress">{d.progress}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="uploadfile shadow-none">
                <Upload {...uploadProps}>
                  <Button
                    type="dashed"
                    className="ant-full-box"
                    icon={<ToTopOutlined />}
                  >
                    <span className="click">Click to Upload</span>
                  </Button>
                </Upload>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <div className="timeline-box">
                <Title level={5}>Orders History</Title>
                <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                  this month <span className="bnb2">20%</span>
                </Paragraph>

                <Timeline
                  pending="Recording..."
                  className="timelinelist"
                  reverse={reverse}
                >
                  {timelineList.map((t, index) => (
                    <Timeline.Item color={t.color} key={index}>
                      <Title level={5}>{t.title}</Title>
                      <Text>{t.time}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
                <Button
                  type="primary"
                  className="width-100"
                  onClick={() => setReverse(!reverse)}
                >
                  {<MenuUnfoldOutlined />} REVERSE
                </Button>
              </div>
            </Card>
          </Col>
        </Row> */}

        {/* <Row gutter={[24, 0]}>
          <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Row gutter>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={14}
                  className="mobile-24"
                >
                  <div className="h-full col-content p-20">
                    <div className="ant-muse">
                      <Text>Built by developers</Text>
                      <Title level={5}>Muse Dashboard for Ant Design</Title>
                      <Paragraph className="lastweek mb-36">
                        From colors, cards, typography to complex elements, you
                        will find the full documentation.
                      </Paragraph>
                    </div>
                    <div className="card-footer">
                      <a className="icon-move-right" href="#pablo">
                        Read More
                        {<RightOutlined />}
                      </a>
                    </div>
                  </div>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={10}
                  className="col-img"
                >
                  <div className="ant-cret text-right">
                    <img src={card} alt="" className="border10" />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} md={12} sm={24} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox card-info-2 h-full">
              <div className="gradent h-full col-content">
                <div className="card-content">
                  <Title level={5}>Work with the best</Title>
                  <p>
                    Wealth creation is an evolutionarily recent positive-sum
                    game. It is all about who take the opportunity first.
                  </p>
                </div>
                <div className="card-footer">
                  <a className="icon-move-right" href="#pablo">
                    Read More
                    <RightOutlined />
                  </a>
                </div>
              </div>
            </Card>
          </Col>
        </Row> */}





 {/* <Row gutter={[24, 0]}>
        
        <Col xs={24} md={8} lg={8} xl={8} className="mb-24">
          <Link to="/register/dashboard"  style={{textDecoration:'none'}}>
            <Card bordered={false} className="circlebox">
              <Title level={4}>Front Office Staff 1</Title>
              <img src={logo1} style={{width:'400px',borderRadius:'50%'}}/>
              <Paragraph>
              Name: Emily Johnson
              <br></br>
              Position: Office Staff/Administrative Assistant
              <br></br>
              Role Overview: Emily Johnson is an indispensable member of our administrative team, 
              ensuring the seamless operation of day-to-day activities within our office. Her role
              encompasses a wide range of administrative duties crucial for maintaining efficiency 
              and organization in our workplace.
              </Paragraph>
              <Button>View</Button>
            </Card>
          </Link>
        </Col>
       
        <Col xs={24} md={8} lg={8} xl={8} className="mb-24">

          <Link to="/register/dashboard"  style={{textDecoration:'none'}}>
            <Card bordered={false} className="circlebox">
              <Title level={4}>Front Office Staff 2</Title>

              <img src={logo2} style={{width:'400px',borderRadius:'50%'}}/>
              <Paragraph>Name: Emily Johnson
              <br></br>
                Position: Office Staff/Administrative Assistant
                <br></br>
                Role Overview: Emily Johnson is an indispensable member of our administrative team, 
                ensuring the seamless operation of day-to-day activities within our office. Her role
                encompasses a wide range of administrative duties crucial for maintaining efficiency 
                and organization in our workplace.</Paragraph>
                <Button>View</Button>
            </Card>
          </Link>
        </Col>
        
        <Col xs={24} md={8} lg={8} xl={8} className="mb-24">
          <Link to="/register/dashboard" style={{textDecoration:'none'}}>
            <Card bordered={false} className="circlebox">
              <Title level={4}>Front Office Staff 3</Title>
              <img src={logo3} style={{width:'400px',borderRadius:'50%'}}/>
              <Paragraph>Name: Emily Johnson
              <br></br>
              Position: Office Staff/Administrative Assistant
                <br></br>
              Role Overview: Emily Johnson is an indispensable member of our administrative team, 
              ensuring the seamless operation of day-to-day activities within our office. Her role
              encompasses a wide range of administrative duties crucial for maintaining efficiency 
              and organization in our workplace.</Paragraph>
              <Button>View</Button>
            </Card>
          </Link>
        </Col>
    </Row>  */}






      </div>
      </div>
    </>
  );
}

export default Intern_Home;









// import { useState } from "react";
// import { Card, Col, Row, Typography } from "antd";
// import { useHistory } from "react-router-dom";

// import InternHeader from "./Header_intern";

// function Intern_Home() {
//   const { Title } = Typography;
//   const history = useHistory();

//   const [sections] = useState([
//     { title: "Tasks", path: "./table" },
//     { title: "Notes", path: "./viewnotes" },
//     { title: "Jobs", path: "./jobapply" },
//   ]);

//   const handleSectionClick = (path) => {
//     history.push(path);
//   };

//   return (
//     <>
//       <InternHeader />
//       <div className="layout-content">
//         <Row className="rowgap-vbox" gutter={[24, 0]} style={{ width: "1600px" }}>
//           {sections.map((section, index) => (
//             <Col
//               key={index}
//               xs={24}
//               sm={24}
//               md={12}
//               lg={6}
//               xl={6}
//               className="mb-24"
//               onClick={() => handleSectionClick(section.path)}
//             >
//               <Card bordered={false} className="criclebox " style={{ height: "150px", backgroundColor: "#98fb98" }}>
//                 <div className="number">
//                   <Row align="middle" gutter={[24, 0]}>
//                     <Col xs={18}>
//                       <span style={{ fontSize: "20px", color: "black" }}>{section.title}</span>
//                       <Title level={3}>
//                         {section.title === "Tasks" && "5"}
//                         {section.title === "Notes" && "2"}
//                         {section.title === "Jobs" && "5"}
//                         <small className="bnb2">{/* Add your percentage here */}</small>
//                       </Title>
//                     </Col>
//                     <Col xs={6}>
//                       {/* Add your icon here */}
//                     </Col>
//                   </Row>
//                 </div>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </>
//   );
// }

// export default Intern_Home;
