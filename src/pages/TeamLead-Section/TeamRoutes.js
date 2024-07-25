import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
 
import { isTeamLeadAuthenticated } from '../../utils/isAuthenticated';

import Teamlead_Main from './main';

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
        <Redirect to="/teamlead/login" />
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