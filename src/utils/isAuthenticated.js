// Function to check if the user is a staff member and authenticated
export const isStaffAuthenticated = () => {
  // Check if the user's role is 'staff' and if they are authenticated
  // const userRole = localStorage.getItem("isStaff");
  // const authToken = localStorage.getItem("authToken");
  // console.log(userRole);
  // console.log('authToken',authToken);
  // if(userRole && authToken)
  // {
  //   console.log('you can go');
  //   return true
  // }
  return true
};

// Function to check if the user is an intern and authenticated
export const isInternAuthenticated = () => {
  // Check if the user's role is 'intern' and if they are authenticated
  // const userRole = localStorage.getItem("userRole");
  // const authToken = localStorage.getItem("authToken");
  // return userRole === "intern" && authToken;

  return true
};


// Function to check if the user is an HR admin and authenticated
export const isHRAdminAuthenticated = () => {
  //Check if the user's role is 'hradmin' and if they are authenticated

  // const userRole = localStorage.getItem("userRole");
  // const authToken = localStorage.getItem("authToken");
  // return userRole === "hr_admin" && authToken;
  return true
};

// Function to check if the user is an HR admin and authenticated
export const isTeamLeadAuthenticated = () => {
  // Check if the user's role is 'hradmin' and if they are authenticated
  // const userRole = localStorage.getItem("userRole");
  // const authToken = localStorage.getItem("authToken");
  // return userRole === "team_lead" && authToken;
  return true
};

// Function to check if the user is an HR admin and authenticated
export const isFrontOfficeAuthenticated = () => {
  // Check if the user's role is 'hradmin' and if they are authenticated
  // const userRole = localStorage.getItem("userRole");
  // const authToken = localStorage.getItem("authToken");
  // return userRole === "Front_office" && authToken;
  return true
};
