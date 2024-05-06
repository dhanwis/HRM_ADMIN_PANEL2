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
import Staffhome from "./pages/Staff-Section/Home";
import Staff_Main from "./pages/Staff-Section/main";
import Profilestaff from "./pages/Staff-Section/profile";
import Tablesstaff from "./pages/Staff-Section/Table";
import LeaveForm from "./pages/Staff-Section/leaveform";
import 'bootstrap/dist/css/bootstrap.min.css';
import Viewproject from "./pages/Staff-Section/Task";
import AttendanceTable from "./pages/Staff-Section/attendence";
import NotesSharingPage from "./pages/Staff-Section/Notes";
import DailyWorksheetView from "./pages/Staff-Section/worksheet";
import ResetPassword from "./pages/Staff-Section/resetpassword";


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
          

        <PrivateHRAdminRoute
            path="/admin/dashboard"
            exact
            component={HR_Home}
          />
           <PrivateStaffRoute
            path="/staff/resetpasswoord"
            exact
            component={ResetPassword}
          />
          <Staff_Main>
          <PrivateStaffRoute
            path="/staff/dashboard"
            exact
            component={Staffhome}
          />
            <PrivateStaffRoute
            path="/staff/table"
            exact
            component={Tablesstaff}
          />
            <PrivateStaffRoute
            path="/staff/profile"
            exact
            component={Profilestaff}
          />
            <PrivateStaffRoute
            path="/staff/leave"
            exact
            component={LeaveForm}
          />
            <PrivateStaffRoute
            path="/staff/task"
            exact
            component={Viewproject}
          />
            <PrivateStaffRoute
            path="/staff/attendance"
            exact
            component={AttendanceTable}
          />
            <PrivateStaffRoute
            path="/staff/notes"
            exact
            component={NotesSharingPage}
          />
            <PrivateStaffRoute
            path="/staff/worksheet"
            exact
            component={DailyWorksheetView}
          />
          </Staff_Main>
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

        <PrivateInternRoute
            path="/intern/dashboard"
            exact
            component={Intern_Home}
          />

          {/* <PrivateInternRoute
            path="/intern/profile"
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
