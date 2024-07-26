import React from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  FileOutlined,
  FormOutlined,
  ScheduleOutlined,
  UserOutlined,
  LaptopOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import logos from "../../assets/images/call.webp";
import { baseUrlImg } from "../../url";

export default function SidenavFront({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const user = JSON.parse(localStorage.getItem("frontoffice"));

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      link: "/frontoffice/dashboard",
    },
    {
      key: "callsheet",
      icon: <FileOutlined />,
      label: "CallSheet",
      link: "/frontoffice/CallSheet",
    },

    {
      key: "webapp_development",
      label: "Quotation",
      icon: <LaptopOutlined />,
      link: "/frontoffice/quotation",
    },
    //   ],
    // },
    {
      key: "leave_form",
      icon: <FormOutlined />,
      label: "Leave Application",
      link: "/frontoffice/OfficeLeaveForm",
    },
    // {
    //   key: "Enquiry",
    //   icon: <ScheduleOutlined />,
    //   label: "Enquiry",
    //   link: "/frontoffice/Enquiry",
    // },
    // {
    //   key: "confirmed_details",
    //   icon: <SolutionOutlined />,
    //   label: "Confirmed Details",
    //   link: "/frontoffice/Customerdetails",
    // },

    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      link: "/frontoffice/profile",
    },
  ];

  const generateMenuItem = (item) => {
    if (item.subMenu) {
      const subMenuItems = item.subMenu.map((subItem) => (
        <Menu.Item
          key={subItem.key}
          style={{ paddingLeft: "32px", textAlign: "left" }}
        >
          <NavLink to={subItem.link} style={{ textDecoration: "none" }}>
            <span className="icon">{subItem.icon}</span>
            <span
              className="label"
              style={{ fontWeight: subItem.bold ? "bold" : "normal" }}
            >
              {subItem.label}
            </span>
          </NavLink>
        </Menu.Item>
      ));

      return (
        <Menu.SubMenu
          key={item.key}
          title={
            <span>
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </span>
          }
        >
          {subMenuItems}
        </Menu.SubMenu>
      );
    } else {
      const isExternalLink = item.link.startsWith("http");
      if (isExternalLink) {
        return (
          <Menu.Item key={item.key}>
            <a
              href={item.link}
              style={{ textDecoration: "none", textAlign: "left" }}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </a>
          </Menu.Item>
        );
      } else {
        return (
          <Menu.Item
            key={item.key}
            style={{
              textAlign: "left",
              paddingLeft: item.key === "quotation" ? "15px" : "0",
            }}
          >
            <NavLink to={item.link} style={{ textDecoration: "none" }}>
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </NavLink>
          </Menu.Item>
        );
      }
    }
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #f0f0f0",
          textAlign: "center",
        }}
      >
        <img
          src={`${baseUrlImg}${user.image}`}
          alt=""
          style={{ width: "150px", marginBottom: "20px" }}
        />
        <span style={{ color: "black", fontSize: "100%" }}>
          <b>{user.username}</b>
        </span>
      </div>
      <div style={{ flex: "1", overflowY: "auto" }}>
        <Menu theme="light" mode="inline">
          {menuItems.map((item) => generateMenuItem(item))}
        </Menu>
      </div>
    </div>
  );
}
