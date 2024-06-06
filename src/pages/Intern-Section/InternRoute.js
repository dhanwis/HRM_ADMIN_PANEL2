import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Intern_Home from './Home';
import ProfileInformation from './profile';
import FeedbackForm from './Feedback';
import InternLogin from './InternLogin';
import LeaveForm from './leave';
import ReferenceForm from './reference';
import AttendanceTable_Intern from './attendance';
import Tables from './table';
import DailyWorksheetView_Intern from './updatestatus';
import FeedDetail from './feedetails';
import FourCards from './viewnotes';
import Jobapply from './jobapply';
import TestimonialForm from './Testimonial';
import InternLayout from './InternLayout';
import { isInternAuthenticated } from '../../utils/isAuthenticated'; 
import Intern_Main from './main';





const PrivateInternRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isInternAuthenticated() ? (

       <Intern_Main>
         <Component {...props} />
       </Intern_Main>
      ) : (
        <Redirect to="/intern/login" />
      )
    }
  />
);

const InternRoutes = () => (
  <Switch>
    <Route path="/intern/login" exact component={InternLogin} />
    <PrivateInternRoute path="/intern/dashboard" exact component={Intern_Home} />
    <PrivateInternRoute path="/intern/profile" exact component={ProfileInformation} />
    <PrivateInternRoute path="/intern/feedback" exact component={FeedbackForm} />
    <PrivateInternRoute path="/intern/leave" exact component={LeaveForm} />
    <PrivateInternRoute path="/intern/reference" exact component={ReferenceForm} />
    <PrivateInternRoute path="/intern/attendance" exact component={AttendanceTable_Intern} />
    <PrivateInternRoute path="/intern/table" exact component={Tables} />
    <PrivateInternRoute path="/intern/updatestatus" exact component={DailyWorksheetView_Intern} />
    <PrivateInternRoute path="/intern/feedetails" exact component={FeedDetail} />
    <PrivateInternRoute path="/intern/viewnotes" exact component={FourCards} />
    <PrivateInternRoute path="/intern/jobapply" exact component={Jobapply} />
    <PrivateInternRoute path="/intern/Testimonial" exact component={TestimonialForm} />

  
  </Switch>
);

export default InternRoutes;
