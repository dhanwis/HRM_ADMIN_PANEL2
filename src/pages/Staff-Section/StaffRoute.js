import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import StaffLogin from './StaffLogin';
import Staffhome from './Home';
import ProfileStaff from './profile';
import ResetPassword from './resetpassword';
import LeaveFormStaff from './leaveform';
import Viewprojectstaff from './Task';
import AttendanceTable from './attendence';
import NotesSharing from './Notes';
import DailyWorksheetView from './worksheet';
import Tablesstaff from './Table';
import {isStaffAuthenticated} from '../../utils/isAuthenticated';
import Staff_Main from './main';

const PrivateStaffRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isStaffAuthenticated() ? (
          <Staff_Main>
          <Component {...props} />
          </Staff_Main>
        ) : (
          <Redirect to="/staff/login" />
        )
      }
    />
  );

const StaffRoutes = () => (
  <Switch>
    <Route path="/staff/login" exact component={StaffLogin} />
    <PrivateStaffRoute path="/staff/dashboard" exact component={Staffhome} />
    <PrivateStaffRoute path="/staff/profile" exact component={ProfileStaff} />
    <PrivateStaffRoute path="/staff/resetpassword" exact component={ResetPassword} />
    <PrivateStaffRoute path="/staff/leave" exact component={LeaveFormStaff} />
    <PrivateStaffRoute path="/staff/task" exact component={Viewprojectstaff} />
    <PrivateStaffRoute path="/staff/attendance" exact component={AttendanceTable} />
    <PrivateStaffRoute path="/staff/notes" exact component={NotesSharing} />
    <PrivateStaffRoute path="/staff/worksheet" exact component={DailyWorksheetView} />
    <PrivateStaffRoute path="/staff/table" exact component={Tablesstaff} />
    {/* <PrivateStaffRoute path="/staff/resetpasswoord" exact component={ResetPassword} /> */}
    <Route path="/staff/resetpasswoord" exact component={ResetPassword} />
  </Switch>
);

export default StaffRoutes;
