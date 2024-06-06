import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
 

import { isHRAdminAuthenticated } from '../../utils/isAuthenticated'; 
import { isTeamLeadAuthenticated } from '../../utils/isAuthenticated';

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
import Teamlead_Main from './main';
// import HRSignIn from './HRAdminLogin';
import Feeform from '../HR-Section/Internfee';
import Team_Home from './home';
import TeamLeadLogin from './TeamLeadLogin';
import Team_Table from './Teamtable';
import LeaveForm from './Leaveform';
import SeatingChart from './seatallocation';
import Viewproject from './viewproject';
import Giveproject from './giveproject';
import StudentTasks from './interntask';
import DigitalMarketingTable from './digitalmarket';
import FeedbackList from './Internfeedback';
import Team_Profile from './teamprofil';
import PasswordForm from './resetpass';
import ProjectDetailsViewer from './staffstatus'

const PrivateTeamLeadRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
        isTeamLeadAuthenticated() ? (
        <Teamlead_Main>
        <Component {...props} />
        </Teamlead_Main>
      ) : (
        <Redirect to="/admin/login" />
      )
    }
  />
);

const TeamRoutes = () => (
  <Switch>
    <Route path="/teamlead/login" exact component={TeamLeadLogin} />
    <PrivateTeamLeadRoute path="/teamlead/dashboard" exact component={Team_Home} />
    <PrivateTeamLeadRoute path="/teamlead/tables" exact component={Team_Table} />
    <PrivateTeamLeadRoute path="/teamlead/leave" exact component={LeaveForm} />
    <PrivateTeamLeadRoute path="/teamlead/seat" exact component={SeatingChart} />
    <PrivateTeamLeadRoute path="/teamlead/projectview" exact component={Viewproject} />
    <PrivateTeamLeadRoute path="/teamlead/staffstatus" exact component={ProjectDetailsViewer} />
    <PrivateTeamLeadRoute path="/teamlead/giveproject" exact component={Giveproject} />
    <PrivateTeamLeadRoute path="/teamlead/studenttask" exact component={StudentTasks} />
    <PrivateTeamLeadRoute path="/teamlead/feedback" exact component={FeedbackList} />
    <PrivateTeamLeadRoute path="/teamlead/digitalmarketing" exact component={DigitalMarketingTable} />
    <PrivateTeamLeadRoute path="/teamlead/profile" exact component={Team_Profile}/>
    <Route path="/teamlead/resetpass" exact component={PasswordForm} />

  </Switch>
);

export default TeamRoutes;