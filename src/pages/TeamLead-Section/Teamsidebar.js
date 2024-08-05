// import { useState } from "react";
import { Menu, Button, Dropdown } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/teamprofile.png";
import { baseUrlImg } from "../../url";

export default function SidenavTeam({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const user = JSON.parse(localStorage.getItem("teamlead"));

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
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];

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

  const seat = [
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
        d="M12 12c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v3c0 1.1.9 2 2 2zm6-2v-2c0-1.1-.9-2-2-2h-1V7c0-2.21-1.79-4-4-4s-4 1.79-4 4v1H8c-1.1 0-2 .9-2 2v2H4v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10h-2zm0 10H6v-4h12v4zm0-6H6v-2h12v2z"
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

  //////////////////////////////////////////////////// Staff status ///////////////////////////////////////////////////////////////////////////

  const StaffStatus = [
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 13c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm0-12c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
        fill={color}
      ></path>
    </svg>,
  ];

  /////////////////////////////////////////////////// view project /////////////////////////////////////////////////////////////////////////////////

  const Viewproject = [
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
        d="M13.975 16.4083L13.5533 12.4583H16.4583L16.88 16.4083H13.975ZM6.66668 11.7417H3.91835L3.28202 8.38335L3.62585 6.96668H6.37418L6.66668 11.7417ZM10 13.2167C11.3167 13.2167 12.3834 12.15 12.3834 10.8333C12.3834 9.51667 11.3167 8.44999 10 8.44999C8.68335 8.44999 7.61668 9.51667 7.61668 10.8333C7.61668 12.15 8.68335 13.2167 10 13.2167ZM10 15.55C12.6917 15.55 16.6667 16.6417 16.6667 18.3333H3.33335C3.33335 16.6417 7.30835 15.55 10 15.55Z"
      ></path>
    </svg>,
  ];

  //////////////////////////////////////////////////////////////student tasks////////////////////////////////////////////////////////////////////

  const StudentTasks = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="0.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 7v10l10 5 10-5V7m-7 4h4" />
    </svg>,
  ];
  ////////////////////////////////////////////////////////////// Feedback ///////////////////////////////////////////////////////////////////

  const StudentFeedback = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="0.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>,
  ];

  const DigitalMarketingTable = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="0.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M6 8l2 2 6-6M4 12h6M18 12h2m-5.38 3H8.38A4.26 4.26 0 0 0 4 19.38v.12A4.26 4.26 0 0 0 8.38 24h7.24A4.26 4.26 0 0 0 20 19.5v-7" />
    </svg>,
  ];

  ////////////////////////////////////////////////////////// drope down /////////////////////////////////////////////////////////////////////////

  const projectmenu = (
    <Menu>
      <Menu.Item key="view project">
        <NavLink to="/teamlead/projectview">Employee Registration</NavLink>
      </Menu.Item>
      {/* Add more menu items for other options */}
      <Menu.Item key="assign project">
        <NavLink to="/teamlead/giveproject">Task</NavLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="brand">
        <NavLink to="/teamlead/profile">
          <img
            src={`${baseUrlImg}${user.image}`}
            alt=""
            style={{ width: "120px", height: "120px" }}
          />
        </NavLink>
        <span style={{ marginLeft: "30px", fontSize: "20px" }}>
          <b>{user.username}</b>
        </span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/teamlead/dashboard" style={{ textDecoration: "none" }}>
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

        <Menu.Item key="3">
          <NavLink to="/teamlead/leave" style={{ textDecoration: "none" }}>
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

        {/* <Menu.Item key="4">
          <NavLink to="/teamlead/seat" style={{ textDecoration: "none" }}>
            <span
              className="icon"
              style={{
                background: page === "billing" ? color : "",
              }}
            >
              {seat}
            </span>
            <span className="label">Machine Allocation</span>
          </NavLink>
        </Menu.Item> */}

        <Menu.Item key="5">
          <NavLink
            to="/teamlead/projectview"
            style={{ textDecoration: "none" }}
          >
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
          <NavLink
            to="/teamlead/giveproject"
            style={{ textDecoration: "none" }}
          >
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

        {/* ////////////////////////////////////////////////////////staff status/////////////////////////////////////////////////////////////// */}

        <Menu.Item key="6">
          <NavLink
            to="/teamlead/staffstatus"
            style={{ textDecoration: "none" }}
          >
            <span
              className="icon"
              style={{
                background: page === "billing" ? color : "",
              }}
            >
              {StaffStatus}
            </span>
            <span className="label">Staff Status</span>
          </NavLink>
        </Menu.Item>

        {/* ////////////////////////////////////////////// student tasks ////////////////////////////////////////////////////////////////////// */}

        <Menu.Item key="6">
          <NavLink
            to="/teamlead/studenttask"
            style={{ textDecoration: "none" }}
          >
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

        {/* /////////////////////////////////////////// feedback /////////////////////////////////////////////////////////////////////////// */}

        <Menu.Item key="7">
          <NavLink to="/teamlead/feedback" style={{ textDecoration: "none" }}>
            <span
              className="icon"
              style={{
                background: page === "billing" ? color : "",
              }}
            >
              {StudentFeedback}
            </span>
            <span className="label">Student Feedback</span>
          </NavLink>
        </Menu.Item>

        {/* ////////////////////////////////////////////////////////// student notes ///////////////////////////////////////////////////// */}

        {/* <Menu.Item key="6">
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
        </Menu.Item> */}

        {/* //////////////////////////////////////////////////////////////// digital marketing //////////////////////////////////////////// */}

        <Menu.Item key="5">
          <NavLink
            to="/teamlead/digitalmarketing"
            style={{ textDecoration: "none" }}
          >
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

        {/* <Menu.Item className="menu-item-header" key="5">
          Account Pages
        </Menu.Item> */}

        {/* ////////////////////////////////////////////////////////////////// profile //////////////////////////////////////////////////////////// */}
        {/* 
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
        </Menu.Item> */}

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
