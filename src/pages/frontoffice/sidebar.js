import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  FileTextOutlined,
  FormOutlined,
  SolutionOutlined,
  UserOutlined,
  LaptopOutlined,
} from "@ant-design/icons"; // Import the icons
import logo from "../../assets/images/logo.png";

export default function SidenavFront({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      link: "/frontoffice/dashboard",
    },
    {
      key: "callsheet",
      icon: <FileTextOutlined />,
      label: "CallSheet",
      link:
        "https://docs.google.com/spreadsheets/d/1rPTzvgLtt6jcWNUFskW0K6IxjfSzF22chsYUlZazPPw/edit#gid=0",
    },
    {
      key: "quotation",
      icon: <FileTextOutlined />,
      label: "Quotation",
      subMenu: [
        {
          key: "digital_market",
          label: "Digital Market",
          bold: true,
          icon: <FormOutlined />,
          link: "/frontoffice/digitalmarket/quotation",
        },
        {
          key: "mobile_app",
          label: "Mobile App Development",
          bold: true,
          icon: <LaptopOutlined />,
          link: "/frontoffice/mobileapp/quotation",
        },
      ],
    },
    {
      key: "leave_form",
      icon: <FormOutlined />,
      label: "Leave Application",
      link: "/frontoffice/LeaveForm",
    },
    {
      key: "confirmed_details",
      icon: <SolutionOutlined />,
      label: "Confirmed Details",
      link: "/frontoffice/Customerdetails",
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      link: "/admin/profile",
    },
  ];

  const generateMenuItem = (item) => {
    if (item.subMenu) {
      const subMenuItems = item.subMenu.map((subItem) => (
        <Menu.Item key={subItem.key} style={{ paddingLeft: "32px" }}>
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
      return (
        <Menu.Item key={item.key}>
          <NavLink to={item.link} style={{ textDecoration: "none" }}>
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </NavLink>
        </Menu.Item>
      );
    }
  };

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span style={{ color: "black" }}>
          <b>FrontOfficeDashboard</b>
        </span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        {menuItems.map((item) => generateMenuItem(item))}
      </Menu>
      <div className="aside-footer">
        <div
          className="footer-box"
          style={{
            background: color,
          }}
        >
          <span className="icon" style={{ color: color }}>
            <DashboardOutlined />
          </span>
          <h6>Need Help?</h6>
          <p>Please check our docs</p>
          <Button type="primary" className="ant-btn-sm ant-btn-block">
            DOCUMENTATION
          </Button>
        </div>
      </div>
    </>
  );
}
