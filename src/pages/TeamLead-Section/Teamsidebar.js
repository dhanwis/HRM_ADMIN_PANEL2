/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// import { useState } from "react";
import { Menu, Button,Dropdown } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/3d-render-camera-icon.jpg";
// import StudentList from "./Studentlist";
// import giveproject from "./giveproject";
// import Viewproject from "./viewproject";

export default function SidenavTeam({ color }) {
const { pathname } = useLocation();
const page = pathname.replace("/", "");

const dashboard = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
  <path
    d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
    fill={color}
  >
  </path>
  <path
    d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
    fill={color}
  >
  </path>
  <path
    d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
    fill={color}
  >
  </path>
  </svg>,
  ];


///////////////////////////////////////  table  ////////////////////////////////////////////////////////////////////////////////////////////////

  const tables = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
        fill={color}
      ></path>
    </svg>,
  ];

/////////////////////////////////////// billing //////////////////////////////////////////////////////////////////////////////////////////////////


  const billing = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
        fill={color}
      ></path>
    </svg>,
  ];


/////////////////////////////////// rtl ////////////////////////////////////////////////////////////////////////////////////////////////////////


  const rtl = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 6C3 4.34315 4.34315 3 6 3H16C16.3788 3 16.725 3.214 16.8944 3.55279C17.0638 3.89157 17.0273 4.29698 16.8 4.6L14.25 8L16.8 11.4C17.0273 11.703 17.0638 12.1084 16.8944 12.4472C16.725 12.786 16.3788 13 16 13H6C5.44772 13 5 13.4477 5 14V17C5 17.5523 4.55228 18 4 18C3.44772 18 3 17.5523 3 17V6Z"
        fill={color}
      ></path>
    </svg>,
  ];



///////////////////////////////////////////// profile ///////////////////////////////////////////////////////////////////////////////////////////
 
  const profile = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
        fill={color}
      ></path>
    </svg>,
  ];


/////////////////////////////////////////////////////// signin //////////////////////////////////////////////////////////////////////////////////


  // const signin = [
  //   <svg
  //     width="20"
  //     height="20"
  //     viewBox="0 0 20 20"
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //     key={0}
  //   >
  //     <path
  //       fillRule="evenodd"
  //       clipRule="evenodd"
  //       d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
  //       fill={color}
  //     ></path>
  //   </svg>,
  // ];



////////////////////////////////////// signup ///////////////////////////////////////////////////////////////////////////////////////////////////


  // const signup = [
  //   <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     width="20"
  //     height="20"
  //     viewBox="0 0 14 14"
  //     key={0}
  //   >
  //     <path
  //       d="M0,2A2,2,0,0,1,2,0H8a2,2,0,0,1,2,2V8a2,2,0,0,1-2,2H2A2,2,0,0,1,0,8Z"
  //       transform="translate(4 4)"
  //       fill={color}
  //     />
  //     <path
  //       d="M2,0A2,2,0,0,0,0,2V8a2,2,0,0,0,2,2V4A2,2,0,0,1,4,2h6A2,2,0,0,0,8,0Z"
  //       fill={color}
  //     />
  //   </svg>,
  // ];



///////////////////////////////////////// student ///////////////////////////////////////////////////////////////////////////////////////////////  

  const student = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
        fill={color}
      ></path>
    </svg>,
  ];


/////////////////////////////////// give project ////////////////////////////////////////////////////////////////////////////////////////////////

  const Giveproject = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 10V18H14V10H19L12 3L5 10H10ZM17 20H7C6.46957 20 5.96086 19.7893 5.58579 19.4142C5.21071 19.0391 5 18.5304 5 18V11H3C2.46957 11 1.96086 10.7893 1.58579 10.4142C1.21071 10.0391 1 9.53043 1 9V19C1 19.7956 1.31607 20.5587 1.87868 21.1213C2.44129 21.6839 3.20435 22 4 22H20C20.7956 22 21.5587 21.6839 22.1213 21.1213C22.6839 20.5587 23 19.7956 23 19V9C23 8.46957 22.7893 7.96086 22.4142 7.58579C22.0391 7.21071 21.5304 7 21 7H19V18C19 18.5304 18.7893 19.0391 18.4142 19.4142C18.0391 19.7893 17.5304 20 17 20Z"
        fill={color}
      ></path>
    </svg>,
  ];

/////////////////////////////////////////////////// view project /////////////////////////////////////////////////////////////////////////////////


  const Viewproject = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.975 16.4083L13.5533 12.4583H16.4583L16.88 16.4083H13.975ZM6.66668 11.7417H3.91835L3.28202 8.38335L3.62585 6.96668H6.37418L6.66668 11.7417ZM10 13.2167C11.3167 13.2167 12.3834 12.15 12.3834 10.8333C12.3834 9.51667 11.3167 8.44999 10 8.44999C8.68335 8.44999 7.61668 9.51667 7.61668 10.8333C7.61668 12.15 8.68335 13.2167 10 13.2167ZM10 15.55C12.6917 15.55 16.6667 16.6417 16.6667 18.3333H3.33335C3.33335 16.6417 7.30835 15.55 10 15.55Z"
      ></path>
    </svg>,
  ];


//////////////////////////////////////////////////////////////student tasks////////////////////////////////////////////////////////////////////

const StudentTasks = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 2H7C5.34315 2 4 3.34315 4 5V15C4 16.6569 5.34315 18 7 18H13C14.6569 18 16 16.6569 16 15V5C16 3.34315 14.6569 2 13 2ZM7 4H13C13.5523 4 14 4.44771 14 5V15C14 15.5523 13.5523 16 13 16H7C6.44772 16 6 15.5523 6 15V5C6 4.44772 6.44772 4 7 4ZM11 6C11 6.55228 10.5523 7 10 7H7C6.44772 7 6 6.55228 6 6V5C6 4.44772 6.44772 4 7 4H10C10.5523 4 11 4.44772 11 5V6ZM11 10C11 10.5523 10.5523 11 10 11H7C6.44772 11 6 10.5523 6 10V9C6 8.44772 6.44772 8 7 8H10C10.5523 8 11 8.44772 11 9V10ZM11 14C11 14.5523 10.5523 15 10 15H7C6.44772 15 6 14.5523 6 14V13C6 12.4477 6.44772 12 7 12H10C10.5523 12 11 12.4477 11 13V14Z"
      fill={color}
    ></path>
  </svg>,
];


/////////////////////////////////////////////////// note upload ///////////////////////////////////////////////////////////////////////////////

const Uploadnote = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.76 10.31L11.48 9.1C11.69 9.001 11.94 9 12.15 9C12.36 9 12.61 9.001 12.82 9.1L14.54 10.31C14.65 10.3699 14.745 10.46 14.815 10.57C14.885 10.68 14.9283 10.8045 14.94 10.93V12.7C14.92 13.225 14.6598 13.7266 14.215 14.05C13.851 14.3148 13.383 14.4493 12.915 14.436C12.447 14.4227 11.9873 14.262 11.595 13.975C11.3183 13.7575 11.1227 13.4655 11.05 13.147V12.72L10.59 12.28L9.17 10.84L4.28 14.5C3.80142 14.8821 3.1534 14.9956 2.68603 14.7945C2.21866 14.5933 1.93653 14.1245 2.05 13.65L3.48 8.54C3.61 8.05 4.08 7.76 4.58 7.76H6V6C6 5.45 6.45 5 7 5H17C17.55 5 18 5.45 18 6V7.76H19.42C19.92 7.76 20.39 8.05 20.52 8.54L21.95 13.65C22.0635 14.1245 21.7813 14.5933 21.3139 14.7945C20.8466 14.9956 20.1986 14.8821 19.72 14.5L14.83 10.84L13.41 12.28L12.95 12.72V13.15C12.8773 13.4655 12.6817 13.7575 12.405 13.975C12.0127 14.262 11.552 14.4227 11.085 14.436C10.617 14.4493 10.149 14.3148 9.785 14.05C9.34016 13.7266 9.08 13.225 9.06 12.7V10.93C9.07167 10.8045 9.11497 10.68 9.185 10.57C9.25503 10.46 9.35 10.3699 9.46 10.31H9.76ZM12 15C13.66 15 15 16.34 15 18C15 19.66 13.66 21 12 21C10.34 21 9 19.66 9 18C9 16.34 10.34 15 12 15ZM7 6C7 5.45 7.45 5 8 5H16C16.55 5 17 5.45 17 6V7H7V6Z"
      fill={color}
    ></path>
  </svg>,
];


////////////////////////////////////////////////// digital marketing //////////////////////////////////////////////////////////////////////////


  const DigitalMarketingTable = [
    <svg
      width="25"
      height="25"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 3C3 2.44772 3.44772 2 4 2H12V9.47204L11.2929 8.76489C11.1347 8.60668 10.8906 8.53202 10.6569 8.56641C10.4233 8.6008 10.2268 8.73909 10.1095 8.95114L6.60948 14.4011C6.29834 14.8286 6.49792 15.4091 7.01559 15.4919L8.5 15.7158V22H6C5.44772 22 5 21.5523 5 21V16.2598C3.93186 15.9772 3.14935 15.093 3.00118 14.0003C2.85435 12.9077 3.36004 11.8212 4.25592 11.2642L10.5 8.71582V2H4C3.44772 2 3 2.44772 3 3ZM19.5 3H12V14.7142L13.4844 14.4903C13.7767 14.4432 14 14.2035 14 13.9145V2H19.5C20.3284 2 21 2.67157 21 3.5V13.9145C21 14.2035 21.2233 14.4432 21.5156 14.4903L23 14.7142V3.5C23 2.67157 22.3284 2 21.5 2H21V13.9145L19.5156 14.1384C19.2233 14.1855 19 14.4252 19 14.7142V3ZM14 16C14 16.5523 14.4477 17 15 17H18.9999L19 17.6667C19 17.936 18.7761 18.1667 18.5 18.1667H16C15.4477 18.1667 15 18.6144 15 19.1667C15 19.719 15.4477 20.1667 16 20.1667H18.5C19.3241 20.1667 20 19.4918 20 18.6667V17H21C21.5523 17 22 16.5523 22 16V13C22 12.4477 21.5523 12 21 12H20.5V10H21C21.5523 10 22 9.55228 22 9V6C22 5.44772 21.5523 5 21 5H20.5V3.5C20.5 3.22386 20.2761 3 20 3H15C14.4477 3 14 3.44772 14 4V16Z"
        fill={color}
      ></path>
    </svg>,
  ];



////////////////////////////////////////////////////////// drope down /////////////////////////////////////////////////////////////////////////


  const projectmenu = (
    <Menu>
      <Menu.Item key="view project">
        <NavLink to="/teamlead/projectview">
          Employee Registration
        </NavLink>
       
      </Menu.Item>
      {/* Add more menu items for other options */}
      <Menu.Item key="assign project">
        <NavLink to="/teamlead/giveproject">
          Task
        </NavLink>
       
      </Menu.Item>
    </Menu>
)

  return (
    <div>
      <div className="brand">
        <img src={logo} alt=""  style={{width:"120x",height:"120px"}}/>
        <span style={{marginLeft:"30px",fontSize:"20px"}}><b>TEAMLEAD</b></span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/teamlead/dashboard" style={{ textDecoration: 'none' }}>
            <span
              className="icon"
              style={{
                background: page === "dashboard" ? color : "",
              }}
            >
              {dashboard}
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>

{/* ///////////////////////////////////////// table ///////////////////////////////////////////////////////////////////////////////////////// */}

        <Menu.Item key="2">
          <NavLink to="/teamlead/tables" style={{ textDecoration: 'none' }}>
            <span
              className="icon"
              style={{
                background: page === "tables" ? color : "",
              }}
            >
              {tables}
            </span>
            <span className="label">Team details</span>
          </NavLink>
        </Menu.Item>


{/* /////////////////////////////////////////////////////// billing ////////////////////////////////////////////////////////////////////////// */}

        <Menu.Item key="3">
          <NavLink to="/teamlead/leave" style={{ textDecoration: 'none' }}>
            <span
              className="icon"
              style={{
                background: page === "billing" ? color : "",
              }}
            >
              {billing}
            </span>
            <span className="label">Leave Form</span>
          </NavLink>
        </Menu.Item>


{/* /////////////////////////////////////////////////////////////////  student //////////////////////////////////////////////////////////////// */}



        <Menu.Item key="4">
          <NavLink to="/teamlead/student" style={{ textDecoration: 'none' }}>
            <span
              className="icon"
              style={{
                background: page === "billing" ? color : "",
              }}
            >
              {student}
            </span>
            <span className="label">Student List</span>
          </NavLink>
        </Menu.Item>


{/* //////////////////////////////////////////// rtl //////////////////////////////////////////////////////////////////////////////////////// */}

        {/* <Menu.Item key="4">
          <NavLink to="/rtl">
            <span
              className="icon"
              style={{
                background: page === "rtl" ? color : "",
              }}
            >
              {rtl}
            </span>
            <span className="label">RTL</span>
          </NavLink>
        </Menu.Item> */}



{/* ///////////////////////////////////////////////////// view project /////////////////////////////////////////////////////////////////////// */}

        <Menu.Item key="5">
          <NavLink to="/teamlead/projectview" style={{ textDecoration: 'none' }}>
            <span
              className="icon"
              style={{
                background: page === "viewproject" ? color : "",
              }}
            >
              {Viewproject}
            </span>
            <span className="label">Project List</span>
          </NavLink>
        </Menu.Item>


{/* //////////////////////////////////////////////////////// give project ///////////////////////////////////////////////////////////////// */}


        <Menu.Item key="6">
          <NavLink to="/teamlead/giveproject" style={{ textDecoration: 'none' }}>
            <span
              className="icon"
              style={{
                background: page === "billing" ? color : "",
              }}
            >
              {Giveproject}
            </span>
            <span className="label">Assign Project</span>
          </NavLink>
        </Menu.Item>


{/* ////////////////////////////////////////////// student tasks ////////////////////////////////////////////////////////////////////// */}

        <Menu.Item key="6">
          <NavLink to="/teamlead/studenttask" style={{ textDecoration: 'none' }}>
            <span
              className="icon"
              style={{
                background: page === "billing" ? color : "",
              }}
            >
              {StudentTasks}
            </span>
            <span className="label">Student Tasks</span>
          </NavLink>
        </Menu.Item>


{/* ////////////////////////////////////////////////////////// student notes ///////////////////////////////////////////////////// */}

<Menu.Item key="6">
          <NavLink to="/teamlead/internnotes" style={{ textDecoration: 'none' }}>
            <span
              className="icon"
              style={{
                background: page === "billing" ? color : "",
              }}
            >
              {Uploadnote}
            </span>
            <span className="label">Upload Notes</span>
          </NavLink>
        </Menu.Item>





{/* //////////////////////////////////////////////////////////////// digital marketing //////////////////////////////////////////// */}


        <Menu.Item key="5">
          <NavLink to="/teamlead/digitalmarketing" style={{ textDecoration: 'none' }}>
            <span
              className="icon"
              style={{
                background: page === "viewproject" ? color : "",
              }}
            >
              {DigitalMarketingTable}
            </span>
            <span className="label">Digital Marketing</span>
          </NavLink>
        </Menu.Item>


{/* ////////////////////////////////////////////////////////////// account pages /////////////////////////////////////////////////////////// */}


        <Menu.Item className="menu-item-header" key="5">
          Account Pages
        </Menu.Item>

{/* ////////////////////////////////////////////////////////////////// profile //////////////////////////////////////////////////////////// */}

        <Menu.Item key="6">
          <NavLink to="/teamlead/profile" style={{ textDecoration: 'none' }}>
            <span
              className="icon"
              style={{
                background: page === "profile" ? color : "",
              }}
            >
              {profile}
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>


{/* ///////////////////////////////////////////////////////////// sigin ////////////////////////////////////////////////////////////////////// */}

        {/* <Menu.Item key="7">
          <NavLink to="/sign-in"style={{ textDecoration: 'none' }}>
            <span className="icon">{signin}</span>
            <span className="label">Sign In</span>
          </NavLink>
        </Menu.Item> */}

{/* ///////////////////////////////////////////////////////////// signup ///////////////////////////////////////////////////////////////////// */}

        {/* <Menu.Item key="8">
          <NavLink to="/sign-up" style={{ textDecoration: 'none' }}>
            <span className="icon">{signup}</span>
            <span className="label">Sign Up</span>
          </NavLink>
        </Menu.Item> */}


{/* ///////////////////////////////////////////////////////// dropedown///////////////////////////////////////////////////////////////////// */}

        {/* <Menu.Item key="employee" className="menu-item-header">
          <Dropdown overlay={projectmenu} trigger={['click']}>
            <span>project</span>
          </Dropdown>
        </Menu.Item> */}
        </Menu>
      <div className="aside-footer">
        <div
          className="footer-box"
          
          style={{
            background: color,
          }}
          >

{/* ///////////////////////////////////////////////////////ad////////////////////////////////////////////////////////////////////////////// */}

          <span className="icon" style={{ color }}>
            {dashboard}
          </span>
          <h6>Need Help?</h6>
          <p>Please check our docs</p>
          <Button type="primary" className="ant-btn-sm ant-btn-block">
            DOCUMENTATION
          </Button>
        </div>
      </div>
    </div>
  );
}

 

