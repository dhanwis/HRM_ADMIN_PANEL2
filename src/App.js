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
import Team_Home from "./pages/TeamLead-Section/home";
import HR_Home from "./pages/HR-Section/Home";
import HR_Main from "./pages/HR-Section/main";
import HR_Tables from "./pages/HR-Section/table";
import HR_Profile from "./pages/HR-Section/profile";
import HR_Billing from "./pages/HR-Section/billing";
import Teamlead_Main from "./pages/TeamLead-Section/main";
import Team_Tables from "./pages/TeamLead-Section/Teamtable";
import Team_Profile from "./pages/TeamLead-Section/teamprofil";
import LeaveForm from "./pages/TeamLead-Section/Leaveform";
import StudentList from "./pages/TeamLead-Section/Studentlist";
import Viewproject from "./pages/TeamLead-Section/viewproject";
import Giveproject from "./pages/TeamLead-Section/giveproject";
import DigitalMarketingTable from "./pages/TeamLead-Section/digitalmarket"
import StudentTasks from "./pages/TeamLead-Section/interntask";
import Uploadnote from "./pages/TeamLead-Section/internnote";
import PasswordForm from "./pages/TeamLead-Section/resetpass.js";
import SeatingChart from "./pages/TeamLead-Section/seatallocation.js";

//import Intern_Sidebar from "./pages/Intern-Section/sidebar";
import EmployeeRegistrationForm from './pages/HR-Section/Registration';
import InternRegistrationForm from "./pages/HR-Section/Internregister";
import TaskForm from "./pages/HR-Section/Task";
import Feeform from "./pages/HR-Section/Internfee";
import AttendanceMarkingPage from "./pages/HR-Section/Attendance";
import SalaryForm from "./pages/HR-Section/Salary";
import JobForm from "./pages/HR-Section/Jobalert";

import LeaveRequest from "./pages/HR-Section/Leaveaccept.js";

import Staffhome from "./pages/Staff-Section/Home";
import Staff_Main from "./pages/Staff-Section/main";
import Profilestaff from "./pages/Staff-Section/profile";
import Tablesstaff from "./pages/Staff-Section/Table";
import LeaveFormStaff from "./pages/Staff-Section/leaveform";
import 'bootstrap/dist/css/bootstrap.min.css';
import Viewprojectstaff from "./pages/Staff-Section/Task";
import AttendanceTable from "./pages/Staff-Section/attendence";
import NotesSharingPage from "./pages/Staff-Section/Notes";
import DailyWorksheetView from "./pages/Staff-Section/worksheet";
import ResetPassword from "./pages/Staff-Section/resetpassword";


import { isFrontOfficeAuthenticated } from "./utils/isAuthenticated";
import FrontOffice from "./pages/frontoffice/officehome.js";
import login from "./pages/frontoffice/login";
import Main from "./pages/frontoffice/main";
import OfficeLeaveForm from "./pages/frontoffice/LeaveForm.js"
import Customerdetails from "./pages/frontoffice/confirmed";
import DigitalMarketingPage from "./pages/frontoffice/digital";
import WebAppDevelopmentPage from "./pages/frontoffice/Quotation.js";
import PaymentDetailsPage from "./pages/frontoffice/payment";
import Attendanceview from "./pages/frontoffice/attendance";
import Profile from "./pages/frontoffice/profile";
import CallSheet from "./pages/frontoffice/callsheet";
import FrontResetPassword from "./pages/frontoffice/resetpass.js";
import InternRegistration from "./pages/frontoffice/internregister.js";




 
import Intern_Main from "./pages/Intern-Section/main";
import Intern_Home from "./pages/Intern-Section/Home";

import Intern_Profile from "./pages/Intern-Section/profile";
import Intern_sidebar from "./pages/Intern-Section/sidebar";

import FeedbackForm from "./pages/Intern-Section/Feedback";
import LeaveForm_Intern from "./pages/Intern-Section/leave";
import ReferenceForm from "./pages/Intern-Section/reference";
// import AttendanceTable_Intern from "./pages/Intern-Section/attendance";
import Tables from "./pages/Intern-Section/table";
import Fee_Details from "./pages/Intern-Section/feedetails";
import View_notes from "./pages/Intern-Section/viewnotes";
import DailyWorksheetView_Intern from "./pages/Intern-Section/updatestatus";
import Jobapply from "./pages/Intern-Section/jobapply";
import TestimonialForm from "./pages/Intern-Section/Testimonial";
 
import FeedbackList from "./pages/TeamLead-Section/Internfeedback.js";
import LandingPage from "./landing.js";
import HrRoutes from "./pages/HR-Section/HrRoute.js";
import InternRoutes from "./pages/Intern-Section/InternRoute.js";

//import StaffRoutes from "./pages/Staff-Section/StaffRoute.js";


import FrontRoutes from "./pages/frontoffice/frontRoutes.js";
 
import TeamRoutes from "./pages/TeamLead-Section/TeamRoutes.js";
 


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
// const PrivateStaffRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isStaffAuthenticated() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/staff/login" />
//       )
//     }
//   />
// );

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
          
 
      {/* <HR_Main>
 
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

          <PrivateHRAdminRoute
            path="/leave/dashboard"
            exact
            component={LeaveRequest}
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
  */}
 


{/*   

          <PrivateTeamLeadRoute
            path="/teamlead/changepass"
            exact
            component={PasswordForm}
          />

                {/* <Teamlead_Main>

          <PrivateTeamLeadRoute
            path="/teamlead/dashboard"
            exact
            component={Team_Home}
          />
          
           <PrivateTeamLeadRoute
            path="/teamlead/changepass"
            exact
            component={PasswordForm}
          />


          <PrivateTeamLeadRoute
            path="/teamlead/tables"
            exact
            component={Team_Tables}
          />

          <PrivateTeamLeadRoute
            path="/teamlead/profile"
            exact
            component={Team_Profile}
          />

          <PrivateTeamLeadRoute
            path="/teamlead/leave"
            exact
            component={LeaveForm}
          />

          {/* <PrivateTeamLeadRoute
            path="/teamlead/student"
            exact
            component={StudentList}
          /> */}

          {/* <PrivateTeamLeadRoute
            path="/teamlead/seat"
            exact
            component={SeatingChart}
          />

          <PrivateTeamLeadRoute
            path="/teamlead/projectview"
            exact
            component={Viewproject}
          />

          <PrivateTeamLeadRoute
            path="/teamlead/giveproject"
            exact
            component={Giveproject}
          />

            <PrivateTeamLeadRoute
            path="/teamlead/studenttask"
            exact
            component={StudentTasks}
          />

            <PrivateTeamLeadRoute
            path="/Students/feedback"
            exact
            component={FeedbackList}
          />
          

          
          <PrivateTeamLeadRoute
            path="/teamlead/digitalmarketing"
            exact
            component={DigitalMarketingTable}
          /> */}
          
          {/* <PrivateTeamLeadRoute
            path="/teamlead/internnotes"
            exact
            component={Uploadnote}
          /> */}

 
               {/* <PrivateTeamLeadRoute
            path="/teamlead/changepass"
            exact
            component={PasswordForm}
          />
 
          </Teamlead_Main>   */}
 
 



           
          
         {/* <PrivateStaffRoute
           path="/staff/resetpasswoord"
           exact
           component={ResetPassword}
                     
          <Staff_Mai          
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
           component={LeaveFormStaff}
         />
           <PrivateStaffRoute
           path="/staff/task"
           exact
           component={Viewprojectstaff}
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
         </Staff_Main>  */}
 
        
{/*         
        <PrivateFrontofficeRoute
            path="/frontoffice/frontResetPassword"
            exact
            component={FrontResetPassword}
          />

 
        
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
            path="/frontoffice/OfficeLeaveForm"
            exact
            component={OfficeLeaveForm}
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
 

 
          <PrivateHRAdminRoute
            path="/frontoffice/internRegistration"
            exact
            component={InternRegistration}
          />
          </Main> 

          {/* <Intern_Main>



{/* 
<PrivateInternRoute
  path="/intern/dashboard"
  exact
  component={Intern_Home}
 
 
/>

<PrivateInternRoute
  path="/intern/main"
  exact
  component={Intern_Main}
/>
<PrivateInternRoute
 
  path="/intern/sidebar"
  exact
  component={Intern_sidebar}
/>
<PrivateInternRoute
  path="/intern/profile"
  exact
  component={Intern_Profile}
/>
<PrivateInternRoute
  path="/intern/feedback"
  exact
  component={FeedbackForm}
/>
<PrivateInternRoute
  path="/intern/leave"
  exact
  component={LeaveForm_Intern}
/>
<PrivateInternRoute
  path="/intern/reference"
  exact
  component={ReferenceForm}
/>
{/* <PrivateInternRoute
  path="/intern/attendance"
  exact
  component={AttendanceTable_Intern}
/> */}
{/* <PrivateInternRoute
  path="/intern/table"
  exact
  component={Tables}
/>
<PrivateInternRoute
  path="/intern/updatestatus"
  exact
  component={DailyWorksheetView_Intern}
/>
<PrivateInternRoute
  path="/intern/feedetails"
  exact
  component={Fee_Details}
/>
<PrivateInternRoute
  path="/intern/viewnotes"
  exact
  component={View_notes}
/>
<PrivateInternRoute
  path="/intern/jobapply"
  exact
  component={Jobapply}
/>
<PrivateInternRoute
  path="/intern/Testimonial"
  exact
  component={TestimonialForm}
/> */}




 
{/* </Intern_Main> */}
 

         
          {/* <PrivateInternRoute
            path="/intern/profile"
            exact
            component={InternProfile}
          /> */}
        {/* <PrivateStaffRoute path="/staff/dashboard" exact component={StaffDashboard} />
       
        <PrivateTeamLeadRoute path="/teamlead/dashboard" exact component={TeamLeadDashboard} />
        <PrivateStaffRoute path="/staff/profile" exact component={StaffProfile} /><
        
        <PrivateTeamLeadRoute path="/teamlead/profile" exact component={TeamLeadProfile} /> */}
       
    <Route path="/intern" component={InternRoutes} />
   <Route path="/admin" component={HrRoutes} />

   {/* <Route path="/staff" component={StaffRoutes} /> */}


   <Route path="/frontoffice" component={FrontRoutes} />
 
   <Route path="/Teamlead" component={TeamRoutes} />

<Route path="/landing" component={LandingPage} />
<Redirect from="*" to="/landing" />
      </Switch>
    </div>
  );
}

export default App;