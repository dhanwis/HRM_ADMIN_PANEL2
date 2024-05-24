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
import Main from './main';
import Feeform from '../HR-Section/Internfee';
import Front_Home from '../frontoffice/officehome';
import login from '../frontoffice/login'
import { isFrontOfficeAuthenticated } from '../../utils/isAuthenticated';
import FrontOffice from '../frontoffice/officehome';
import CallSheet from './callsheet';
import DigitalMarketingPage from './digital';
import WebAppDevelopmentPage from './webapp';
import OfficeLeaveForm from './LeaveForm';
import Attendanceview from './attendance';
import CustomerDetails from './confirmed';
import PaymentDetailsPage from './payment';
import InternRegistration from './internregister';
import Profile from './profile';
import FrontResetPassword from './resetpass';
const PrivateFrontofficeRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
        isFrontOfficeAuthenticated() ? (
        <Main>
        <Component {...props} />
        </Main>
      ) : (
        <Redirect to="/frontoffice/login" />
      )
    }
  />
);

const FrontRoutes = () => (
  <Switch>
    <Route path="/frontoffice/login" exact component={login} />
    <PrivateFrontofficeRoute path="/frontoffice/dashboard" exact component={FrontOffice}/>
    <PrivateFrontofficeRoute path="/frontoffice/CallSheet" exact component={CallSheet}/>
    <PrivateFrontofficeRoute path="/frontoffice/digitalmarket/quotation" exact component={DigitalMarketingPage}/>
    <PrivateFrontofficeRoute path="/frontoffice/mobileapp/quotation" exact component={WebAppDevelopmentPage}/>
    <PrivateFrontofficeRoute path="/frontoffice/OfficeLeaveForm" exact component={OfficeLeaveForm}/>
    <PrivateFrontofficeRoute path="/frontoffice/Attendanceview" exact component={Attendanceview}/>
    <PrivateFrontofficeRoute path="/frontoffice/Customerdetails" exact component={CustomerDetails}/>
    <PrivateFrontofficeRoute path="/frontoffice/PaymentDetailsPage" exact component={PaymentDetailsPage}/>
    <PrivateFrontofficeRoute path="/frontoffice/internRegistration" exact component={InternRegistration}/>
    <PrivateFrontofficeRoute path="/frontoffice/profile" exact component={Profile}/>
    <Route path="/frontoffice/frontResetPassword" exact component={FrontResetPassword} />
  </Switch>
);

export default FrontRoutes;