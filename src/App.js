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
  isFrontOfficeAuthenticated
} from "./utils/isAuthenticated";
import HRSignIn from "./pages/HR-Section/HRAdminLogin";
import StaffLogin from "./pages/Staff-Section/StaffLogin";
import InternLogin from "./pages/Intern-Section/InternLogin";
import TeamLeadLogin from "./pages/TeamLead-Section/TeamLeadLogin";
import login from "./pages/frontoffice/login";
import Main from "./pages/frontoffice/main";
import LeaveForm from "./pages/frontoffice/LeaveForm";
import Customerdetails from "./pages/frontoffice/confirmed";
import Quatation from "./pages/frontoffice/quatation";
import DigitalMarketingPage from "./pages/frontoffice/digital";
import WebAppDevelopmentPage from "./pages/frontoffice/webapp";
import PaymentDetailsPage from "./pages/frontoffice/payment";
import Attendanceview from "./pages/frontoffice/attendance";
import Profile from "./pages/frontoffice/profile";
import CallSheet from "./pages/frontoffice/callsheet";


import Home from "./pages/Home";
import HR_Home from "./pages/HR-Section/Home";
import HR_Tables from "./pages/HR-Section/table";
import HR_Profile from "./pages/HR-Section/profile";
import HR_Billing from "./pages/HR-Section/billing";
import HR_Main from "./pages/HR-Section/main";
import Intern_Main from "./pages/Intern-Section/main";
import Intern_Home from "./pages/Intern-Section/Home";
import FrontOffice from "./pages/frontoffice/officehome";
import ResetPassword from "./pages/frontoffice/resetpass";


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


const PrivateFrontofficeRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isFrontOfficeAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/officestaff/login" />
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
        <Route path="/officestaff/login" exact component={login} />
         

        <PrivateHRAdminRoute
            path="/admin/dashboard"
            exact
            component={HR_Home}
          />
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
        <PrivateFrontofficeRoute
            path="/frontoffice/resetPassword"
            exact
            component={ResetPassword}
          />
        <Main>
        <PrivateFrontofficeRoute
            path="/frontoffice/dashboard"
            exact
            component={FrontOffice}
          />
          <PrivateFrontofficeRoute
            path="/frontoffice/CallSheet"
            exact
            component={CallSheet}
          />
          <PrivateFrontofficeRoute
            path="/frontoffice/Quatation"
            exact
            component={Quatation}
          />
          <PrivateFrontofficeRoute
            path="/frontoffice/digitalmarket/quotation"
            exact
            component={DigitalMarketingPage}
          />
           <PrivateFrontofficeRoute
            path="/frontoffice/mobileapp/quotation"
            exact
            component={WebAppDevelopmentPage}
          />
           <PrivateFrontofficeRoute
            path="/frontoffice/LeaveForm"
            exact
            component={LeaveForm}
          />
          <PrivateFrontofficeRoute
            path="/frontoffice/Attendanceview"
            exact
            component={Attendanceview}
          />
          <PrivateFrontofficeRoute
            path="/frontoffice/Customerdetails"
            exact
            component={Customerdetails}
          />
           <PrivateFrontofficeRoute
            path="/frontoffice/PaymentDetailsPage"
            exact
            component={PaymentDetailsPage}
          />
           <PrivateHRAdminRoute
            path="/frontoffice/profile"
            exact
            component={Profile}
          />
          </Main>
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
