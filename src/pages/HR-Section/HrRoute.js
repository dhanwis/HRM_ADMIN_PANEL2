import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
 

import { isHRAdminAuthenticated } from '../../utils/isAuthenticated'; 

import HR_Home from '../HR-Section/Home';
import HR_Profile from '../HR-Section/profile';
import HR_Tables from '../HR-Section/table';
import HR_Billing from '../HR-Section/billing';
import LeaveRequest from '../HR-Section/Leaveaccept';
import EmployeeRegistrationForm from '../HR-Section/Registration';
import Taskform from '../HR-Section/Task';
import AttendanceMarkingPage from '../HR-Section/Attendance';
import Salaryform from '../HR-Section/Salary';
import JobForm from '../HR-Section/Jobalert';
import HR_Main from './main';
import HRSignIn from './HRAdminLogin';
import Feeform from '../HR-Section/Internfee';
import AdmissionForm from './admission';
import EnquiryAdmissionform from './enquiry';
import Testimonialform from '../HR-Section/testimonial';
import Referenceform from '../HR-Section/reference';



const PrivateHrRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isHRAdminAuthenticated() ? (
        <HR_Main>
        <Component {...props} />
        </HR_Main>
      ) : (
        <Redirect to="/admin/login" />
      )
    }
  />
);

const HrRoutes = () => (
  <Switch>
    <Route path="/admin/login" exact component={HRSignIn} />
    <PrivateHrRoute path="/admin/dashboard" exact component={HR_Home} />
    <PrivateHrRoute path="/admin/profile" exact component={HR_Profile} />
    <PrivateHrRoute path="/admin/leave" exact component={LeaveRequest} />
    <PrivateHrRoute path="/admin/register" exact component={EmployeeRegistrationForm} />
    <PrivateHrRoute path="/admin/task" exact component={Taskform} />
    <PrivateHrRoute path="/admin/table" exact component={HR_Tables} />
    <PrivateHrRoute path="/admin/salary" exact component={Salaryform} />
    <PrivateHrRoute path="/admin/jobForm" exact component={Feeform} />
    <PrivateHrRoute path="/admin/salary" exact component={JobForm} />
    <PrivateHrRoute path="/admin/attendance" exact component={AttendanceMarkingPage} />
    <PrivateHrRoute path="/admin/jobapply" exact component={JobForm} />
    <PrivateHrRoute path="/admin/billing" exact component={HR_Billing} />
    {/* <PrivateHrRoute path="/admin/reference" exact component={HR_Billing} /> */}
    <PrivateHrRoute path="/admin/admission" exact component={AdmissionForm} />
    <PrivateHrRoute path="/admin/enquiry" exact component={EnquiryAdmissionform} />
    <PrivateHrRoute path="/admin/testimonial" exact component={Testimonialform} />
    <PrivateHrRoute path="/admin/reference" exact component={Referenceform} />




  </Switch>
);

export default HrRoutes;