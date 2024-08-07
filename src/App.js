import React, { useEffect, useRef } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

import LandingPage from "./landing.js";
import HrRoutes from "./pages/HR-Section/HrRoute.js";
import InternRoutes from "./pages/Intern-Section/InternRoute.js";

import StaffRoutes from "./pages/Staff-Section/StaffRoute.js";

import FrontRoutes from "./pages/frontoffice/frontRoutes.js";

import TeamRoutes from "./pages/TeamLead-Section/TeamRoutes.js";

function App() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        console.log("Size changed:", entry.contentRect);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  
  return (
    <div className="App">
      <Switch>
        <Route path="/intern" component={InternRoutes} />
        <Route path="/admin" component={HrRoutes} />

        <Route path="/staff" component={StaffRoutes} />

        <Route path="/frontoffice" component={FrontRoutes} />

        <Route path="/Teamlead" component={TeamRoutes} />

        <Route path="/landing" component={LandingPage} />
        <Redirect from="*" to="/landing" />
      </Switch>
    </div>
  );
}

export default App;
