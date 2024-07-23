// import { useState } from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo1.jpg";
import "./Home.css";

export default function SidenavHR({ color }) {
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

  const profile = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1C7.79086 1 6 2.79086 6 5C6 7.20914 7.79086 9 10 9C12.2091 9 14 7.20914 14 5C14 2.79086 12.2091 1 10 1ZM5 5C5 2.23858 7.23858 0 10 0C12.7614 0 15 2.23858 15 5C15 7.76142 12.7614 10 10 10C7.23858 10 5 7.76142 5 5Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 15C3 11.134 6.13401 8 10 8C13.866 8 17 11.134 17 15C17 15.5523 16.5523 16 16 16H4C3.44772 16 3 15.5523 3 15ZM10 9C6.68629 9 4 11.6863 4 15H16C16 11.6863 13.3137 9 10 9Z"
        fill={color}
      />
    </svg>,
  ];
  const employees = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1C7.79086 1 6 2.79086 6 5C6 7.20914 7.79086 9 10 9C12.2091 9 14 7.20914 14 5C14 2.79086 12.2091 1 10 1ZM5 5C5 2.23858 7.23858 0 10 0C12.7614 0 15 2.23858 15 5C15 7.76142 12.7614 10 10 10C7.23858 10 5 7.76142 5 5Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 15C3 11.134 6.13401 8 10 8C13.866 8 17 11.134 17 15C17 15.5523 16.5523 16 16 16H4C3.44772 16 3 15.5523 3 15ZM10 9C6.68629 9 4 11.6863 4 15H16C16 11.6863 13.3137 9 10 9Z"
        fill={color}
      />
    </svg>,
  ];

  const task = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.833 1.667H12.35C11.933 0.7 11.017 0 10 0C8.983 0 8.067 0.7 7.65 1.667H4.167C3.245 1.667 2.5 2.412 2.5 3.333V16.667C2.5 17.588 3.245 18.333 4.167 18.333H15.833C16.755 18.333 17.5 17.588 17.5 16.667V3.333C17.5 2.412 16.755 1.667 15.833 1.667ZM10 1.667C10.459 1.667 10.833 2.041 10.833 2.5C10.833 2.959 10.459 3.333 10 3.333C9.541 3.333 9.167 2.959 9.167 2.5C9.167 2.041 9.541 1.667 10 1.667ZM15.833 16.667H4.167V3.333H5.833V5H14.167V3.333H15.833V16.667ZM9.167 8.333H6.667V6.667H9.167V8.333ZM13.333 8.333H10.833V6.667H13.333V8.333ZM6.667 11.667H9.167V13.333H6.667V11.667ZM10.833 13.333H13.333V11.667H10.833V13.333Z"
        fill={color}
      />
    </svg>,
  ];

  const leave_request = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 2H14V1C14 0.447715 13.5523 0 13 0C12.4477 0 12 0.447715 12 1V2H8V1C8 0.447715 7.55228 0 7 0C6.44772 0 6 0.447715 6 1V2H5C3.89543 2 3 2.89543 3 4V17C3 18.1046 3.89543 19 5 19H15C16.1046 19 17 18.1046 17 17V4C17 2.89543 16.1046 2 15 2ZM15 17H5V7H15V17ZM15 5H5V4H15V5ZM7.70711 11.2929C7.31658 10.9024 6.68342 10.9024 6.29289 11.2929C5.90237 11.6834 5.90237 12.3166 6.29289 12.7071L8.29289 14.7071C8.68342 15.0976 9.31658 15.0976 9.70711 14.7071L13.7071 10.7071C14.0976 10.3166 14.0976 9.68342 13.7071 9.29289C13.3166 8.90237 12.6834 8.90237 12.2929 9.29289L9 12.5858L7.70711 11.2929Z"
        fill={color}
      />
    </svg>,
  ];
  const job_alert = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0C8.9 0 8 0.9 8 2H6C4.9 2 4 2.9 4 4V6H2C0.9 6 0 6.9 0 8V16C0 17.1 0.9 18 2 18H6C6 19.1 6.9 20 8 20C9.1 20 10 19.1 10 18H18C19.1 18 20 17.1 20 16V8C20 6.9 19.1 6 18 6H16V4C16 2.9 15.1 2 14 2H12C12 0.9 11.1 0 10 0ZM12 4H14V6H12V4ZM6 4H8V6H6V4ZM2 8H18V16H2V8ZM10 18C9.4 18 9 17.6 9 17C9 16.4 9.4 16 10 16C10.6 16 11 16.4 11 17C11 17.6 10.6 18 10 18Z"
        fill={color}
      />
    </svg>,
  ];
  // const account = [
  //   <svg
  //   width="20"
  //   height="20"
  //   viewBox="0 0 20 20"
  //   fill="none"
  //   xmlns="http://www.w3.org/2000/svg"
  // >
  //   <path
  //     fillRule="evenodd"
  //     clipRule="evenodd"
  //     d="M10 1.667C7.697 1.667 5.833 3.531 5.833 5.833C5.833 8.136 7.697 10 10 10C12.303 10 14.167 8.136 14.167 5.833C14.167 3.531 12.303 1.667 10 1.667ZM7.5 5.833C7.5 4.725 8.392 3.833 9.5 3.833C10.608 3.833 11.5 4.725 11.5 5.833C11.5 6.942 10.608 7.833 9.5 7.833C8.392 7.833 7.5 6.942 7.5 5.833Z"
  //     fill={color}
  //   />
  //   <path
  //     d="M2.5 18.333C2.5 16.14 4.307 14.333 6.5 14.333H13.5C15.693 14.333 17.5 16.14 17.5 18.333V19.167C17.5 19.628 17.128 20 16.667 20H3.333C2.872 20 2.5 19.628 2.5 19.167V18.333Z"
  //     fill={color}
  //   />
  // </svg>
  // ];

  // const AccountMenu = (
  //   <Menu>
  //     <Menu.Item key="register">
  //       <NavLink to="/register/dashboard"style={{textDecoration:"none"}}>
  //         Student fee
  //       </NavLink>
  //     </Menu.Item>
  //     <Menu.Item key="task">
  //       <NavLink to="/task/dashboard"style={{textDecoration:"none"}}>
  //         Production
  //       </NavLink>
  //     </Menu.Item>
  //   </Menu>
  // );

  const testimonial = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 2C1.44772 2 1 2.44772 1 3V13C1 13.5523 1.44772 14 2 14H6V18C6 18.5 6.5 18.8333 7 18.6667L12.5 14H18C18.5523 14 19 13.5523 19 13V3C19 2.44772 18.5523 2 18 2H2ZM3 4H17V12H12L8 15V12H3V4ZM5 6H7V8H5V6ZM9 6H11V8H9V6ZM13 6H15V8H13V6Z"
        fill={color}
      />
    </svg>,
  ];
  const reference = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 2V8C14 8.53043 13.7893 9.03914 13.4142 9.41421C13.0391 9.78929 12.5304 10 12 10H8C7.46957 10 6.96086 9.78929 6.58579 9.41421C6.21071 9.03914 6 8.53043 6 8V2H14ZM4 2V18H16V14H18V20H2V2H4ZM8 12C8.53043 12 9.03914 12.2107 9.41421 12.5858C9.78929 12.9609 10 13.4696 10 14V18H12V14C12 13.4696 12.2107 12.9609 12.5858 12.5858C12.9609 12.2107 13.4696 12 14 12H16V8H8V12Z"
        fill={color}
      />
    </svg>,
  ];
  const enquiry = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20ZM12 7C11.448 7 11 7.448 11 8V12C11 12.552 11.448 13 12 13C12.552 13 13 12.552 13 12V8C13 7.448 12.552 7 12 7ZM12 15C11.448 15 11 15.448 11 16C11 16.552 11.448 17 12 17C12.552 17 13 16.552 13 16C13 15.448 12.552 15 12 15Z"
        fill={color}
      />
    </svg>,
  ];
  // const admission = [
  //   <svg
  //     width="20"
  //     height="20"
  //     viewBox="0 0 24 24"
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //   >
  //     <path
  //       d="M20 4H4C3.447 4 3 4.447 3 5V9.5C3 9.776 3.224 10 3.5 10C4.328 10 5 10.672 5 11.5C5 12.328 4.328 13 3.5 13C3.224 13 3 13.224 3 13.5V19C3 19.553 3.447 20 4 20H20C20.553 20 21 19.553 21 19V13.5C21 13.224 20.776 13 20.5 13C19.672 13 19 12.328 19 11.5C19 10.672 19.672 10 20.5 10C20.776 10 21 9.776 21 9.5V5C21 4.447 20.553 4 20 4ZM5 5H19V8.528C17.809 8.801 17 9.831 17 11C17 12.169 17.809 13.199 19 13.472V19H5V13.472C6.191 13.199 7 12.169 7 11C7 9.831 6.191 8.801 5 8.528V5Z"
  //       fill={color}
  //     />
  //   </svg>,
  // ];
  return (
    <>
      <div style={{ width: "50%" }}>
        <div className="brand">
          <img src={logo} alt="" style={{ width: "200px", height: "90px" }} />
          <span
            style={{
              fontWeight: "bolder",
              fontSize: "35px",
              color: "green",
              paddingLeft: "25px",
            }}
          >
            HR
          </span>
        </div>
        <hr />
        <Menu theme="light" mode="inline">
          <Menu.Item key="1">
            <NavLink to="/admin/profile" style={{ textDecoration: "none" }}>
              <span
                className="icon"
                style={{
                  background: page === "profile" ? color : "",
                }}
              >
                {profile}
              </span>
              <span className="label" style={{ fontSize: "17px" }}>
                Profile
              </span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="2">
            <NavLink to="/admin/dashboard" style={{ textDecoration: "none" }}>
              <span
                className="icon"
                style={{
                  background: page === "dashboard" ? color : "",
                }}
              >
                {dashboard}
              </span>
              <span className="label" style={{ fontSize: "17px" }}>
                Dashboard
              </span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink to="/admin/register" style={{ textDecoration: "none" }}>
              <span
                className="icon"
                style={{
                  background: page === "employees" ? color : "",
                }}
              >
                {employees}
              </span>
              <span className="label" style={{ fontSize: "17px" }}>
                Employees
              </span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="4">
            <NavLink to="/admin/task" style={{ textDecoration: "none" }}>
              <span
                className="icon"
                style={{
                  background: page === "task" ? color : "",
                  width: "20px",
                }}
              >
                {task}
              </span>
              <span className="label" style={{ fontSize: "17px" }}>
                Task
              </span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="5">
            <NavLink to="/admin/leave" style={{ textDecoration: "none" }}>
              <span
                className="icon"
                style={{
                  background: page === "leave_request" ? color : "",
                }}
              >
                {leave_request}
              </span>
              <span className="label" style={{ fontSize: "17px" }}>
                Leave request
              </span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="6">
            <NavLink to="/admin/jobapply" style={{ textDecoration: "none" }}>
              <span
                className="icon"
                style={{
                  background: page === "job_alert" ? color : "",
                }}
              >
                {job_alert}
              </span>
              <span className="label" style={{ fontSize: "17px" }}>
                Job alert
              </span>
            </NavLink>
          </Menu.Item>

          {/* <Menu.Item key="7" style={{marginLeft:"15px",marginTop:'10px'}}>
   <Dropdown overlay={AccountMenu}>
    <span>
    <span className="icon-container">
      <span
        className="icon"
        style={{
          background: page === "account" ? color : "",
          width: '20px', height: '30px'
          // marginRight: '8px'
        }}
      >
        {account}
      </span>
      </span>
      <span className="label" style={{fontSize:'17px'}}>Account</span>
    </span>
  </Dropdown> 
</Menu.Item> */}

          <Menu.Item key="8">
            <NavLink to="/admin/testimonial" style={{ textDecoration: "none" }}>
              <span
                className="icon"
                style={{
                  background: page === "testimonial" ? color : "",
                }}
              >
                {testimonial}
              </span>
              <span className="label" style={{ fontSize: "17px" }}>
                Testimonial
              </span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="9">
            <NavLink to="/admin/reference" style={{ textDecoration: "none" }}>
              <span
                className="icon"
                style={{
                  background: page === "reference" ? color : "",
                }}
              >
                {reference}
              </span>
              <span className="label" style={{ fontSize: "17px" }}>
                Reference
              </span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="10">
            <NavLink to="/admin/enquiry" style={{ textDecoration: "none" }}>
              <span
                className="icon"
                style={{
                  background: page === "enquiry" ? color : "",
                }}
              >
                {enquiry}
              </span>
              <span className="label" style={{ fontSize: "17px" }}>
                Enquiry
              </span>
            </NavLink>
          </Menu.Item>

          {/* <Menu.Item key="11">
            <NavLink to="/admin/admission" style={{ textDecoration: "none" }}>
              <span
                className="icon"
                style={{
                  background: page === "admission" ? color : "",
                }}
              >
                {admission}
              </span>
              <span className="label" style={{ fontSize: "17px" }}>
                Admission
              </span>
            </NavLink>
          </Menu.Item> */}
        </Menu>
      </div>
    </>
  );
}
