import React from 'react';
import SidenavIntern from './sidebar';


const InternLayout = ({ children }) => (
  <div className="intern-layout">
     <SidenavIntern />
    <div className="intern-content">
      {children}
    </div>
  </div>
);

export default InternLayout;
