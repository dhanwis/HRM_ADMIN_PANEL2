import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import StaffLogin from "./pages/StaffLogin";
// import InternLogin from "./pages/InternLogin";
// import TeamLeadLogin from "./pages/TeamLeadLogin";

// import StaffDashboard from "./pages/StaffDashboard";
// import InternDashboard from "./pages/InternDashboard";
// import TeamLeadDashboard from "./pages/TeamLeadDashboard";
// import HRAdminProfile from "./pages/HRAdminProfile";
// import StaffProfile from "./pages/StaffProfile";
// import InternProfile from "./pages/InternProfile";
// import TeamLeadProfile from "./pages/TeamLeadProfile";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import {
  isHRAdminAuthenticated,
  isInternAuthenticated,
  isStaffAuthenticated,
  isTeamLeadAuthenticated,
} from "./utils/isAuthenticated";
import HRSignIn from "./pages/HR-Section/HRAdminLogin";
import StaffLogin from "./pages/Staff-Section/StaffLogin";
import InternLogin from "./pages/Intern-Section/InternLogin";
import TeamLeadLogin from "./pages/TeamLead-Section/TeamLeadLogin";

import Home from "./pages/Home";
import HR_Home from "./pages/HR-Section/Home";
import HR_Tables from "./pages/HR-Section/table";
import HR_Profile from "./pages/HR-Section/profile";
import HR_Billing from "./pages/HR-Section/billing";
import HR_Main from "./pages/HR-Section/main";
import Intern_Main from "./pages/Intern-Section/main";
import Intern_Home from "./pages/Intern-Section/Home";
//import Intern_Sidebar from "./pages/Intern-Section/sidebar";
import EmployeeRegistrationForm from './pages/HR-Section/Registration';
import InternRegistrationForm from "./pages/HR-Section/Internregister";
import TaskForm from "./pages/HR-Section/Task";
import Feeform from "./pages/HR-Section/Internfee";
import AttendanceMarkingPage from "./pages/HR-Section/Attendance";
import SalaryForm from "./pages/HR-Section/Salary";
import JobForm from "./pages/HR-Section/Jobalert";


// Higher-order component to restrict access for HR Admin
const PrivateHRAdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isHRAdminAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/admin/login" />
      )
    }
  />
);

// Higher-order component to restrict access for Staff
const PrivateStaffRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isStaffAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/staff/login" />
      )
    }
  />
);

// Higher-order component to restrict access for Interns
const PrivateInternRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isInternAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/intern/login" />
      )
    }
  />
);

// Higher-order component to restrict access for Team Leads
const PrivateTeamLeadRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isTeamLeadAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/teamlead/login" />
      )
    }
  />
);

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/admin/login" exact component={HRSignIn} />
        <Route path="/staff/login" exact component={StaffLogin} />
        <Route path="/intern/login" exact component={InternLogin} />
        <Route path="/teamlead/login" exact component={TeamLeadLogin} />
          

        <HR_Main><PrivateHRAdminRoute
            path="/admin/dashboard"
            exact
            component={HR_Home}
          />
{/* 
        <PrivateHRAdminRoute
            path="/admin/main"
            exact
            component={HR_Main}
          /> */}
          <PrivateHRAdminRoute
            path="/admin/tables"
            exact
            component={HR_Tables}
          />
          <PrivateHRAdminRoute
            path="/admin/profile"
            exact
            component={HR_Profile}
          />
          <PrivateHRAdminRoute
            path="/admin/billing"
            exact
            component={HR_Billing}
          />
            <PrivateHRAdminRoute
            path="/register/dashboard"
            exact
            component={EmployeeRegistrationForm}
          />
          <PrivateHRAdminRoute
            path="/intern/register/dashboard"
            exact
            component={InternRegistrationForm}
          />
          <PrivateHRAdminRoute
            path="/task/dashboard"
            exact
            component={TaskForm}
          />
            <PrivateHRAdminRoute
            path="/fee/dashboard"
            exact
            component={Feeform}
          />

          <PrivateHRAdminRoute
            path="/admin/attendance"
            exact
            component={AttendanceMarkingPage}
          />
           <PrivateHRAdminRoute
            path="/admin/salary"
            exact
            component={SalaryForm}
          />

          <PrivateHRAdminRoute
            path="/job/dashboard"
            exact
            component={JobForm}
          />


      </HR_Main>


        <PrivateInternRoute
            path="/intern/dashboard"
            exact
            component={Intern_Home}
          />



          {/* <PrivateInternRoute
            path="/intern/sidebar"
            exact
            component={Intern_Sidebar}
          /> */}
          {/* <PrivateInternRoute
            path="/intern/profile" <Menu.Item key="9">
            <NavLink to="/admin/employee-registration">
              <span
                className="icon"
                style={{
                  background: page === "employee-registration" ? color : "",
                }}
              >
                {/* You can use any icon for the employee registration menu item */}
                {/* <svg
            exact
            component={InternProfile}
          /> */}
        {/* <PrivateStaffRoute path="/staff/dashboard" exact component={StaffDashboard} />
       
        <PrivateTeamLeadRoute path="/teamlead/dashboard" exact component={TeamLeadDashboard} />
        <PrivateStaffRoute path="/staff/profile" exact component={StaffProfile} /><
        
        <PrivateTeamLeadRoute path="/teamlead/profile" exact component={TeamLeadProfile} /> */}
       
       <Redirect from="*" to="/admin/login" />
      </Switch>
    </div>
  
  );
}

export default App;
