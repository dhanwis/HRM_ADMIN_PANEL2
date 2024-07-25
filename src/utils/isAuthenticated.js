// Function to check if the user is a staff member and authenticated
export const isStaffAuthenticated = () => {
  // Check if the user's role is 'staff' and if they are authenticated
  const userRole = localStorage.getItem("is_staff");
  const authToken = localStorage.getItem("authToken");
  console.log(userRole);
  console.log("authToken", authToken);
  if (userRole && authToken) {
    console.log("you can go");
    return true;
  }
};

// Function to check if the user is an intern and authenticated
export const isInternAuthenticated = () => {
  // Check if the user's role is 'intern' and if they are authenticated
  const userRole = localStorage.getItem("is_intern");
  const authToken = localStorage.getItem("authToken");
  return userRole && authToken;
};

// Function to check if the user is an HR admin and authenticated
export const isHRAdminAuthenticated = () => {
  //Check if the user's role is 'hradmin' and if they are authenticated

  const userRole = localStorage.getItem("is_hr");
  const authToken = localStorage.getItem("authToken");
  return userRole && authToken;
};

// Function to check if the user is an HR admin and authenticated
export const isTeamLeadAuthenticated = () => {
  // Check if the user's role is 'hradmin' and if they are authenticated
  const userRole = localStorage.getItem("is_teamlead");
  const authToken = localStorage.getItem("authToken");
  return userRole && authToken;
};

// Function to check if the user is an HR admin and authenticated
export const isFrontOfficeAuthenticated = () => {
  // Check if the user's role is 'hradmin' and if they are authenticated
  const userRole = localStorage.getItem("is_frontoffice");
  const authToken = localStorage.getItem("authToken");
  return userRole && authToken;
};
