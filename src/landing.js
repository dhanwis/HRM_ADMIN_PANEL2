import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner';

const LandingPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      setLoading(true);
      setTimeout(() => {
        const roleRoutes = {
          Student: '/Intern/Login',
          TeamLead: '/teamlead/login',
          Staff: '/staff/login',
          HR: '/admin/login',
          'Front Office': '/frontoffice/login'
        };
        setLoading(false);
        history.push(roleRoutes[selectedRole]);
      }, 3000);
    }
  };

  return (
    <div style={styles.container}>
      {loading && <div style={styles.blurOverlay}></div>}
      <h1 style={styles.title}>Please select your role</h1>
      <p style={styles.description}></p>
      <div style={styles.rolesContainer}>
        {['Student', 'TeamLead', 'Staff', 'HR', 'Front Office'].map((role) => (
          <div
            key={role}
            style={selectedRole === role ? styles.selectedRole : styles.role}
            onClick={() => handleRoleSelect(role)}
          >
            <div style={styles.icon}>
              {role === 'Student' && '🎓'}
              {role === 'TeamLead' && '👨‍🏫'}
              {role === 'Staff' && '👨🏻‍💻'}
              {role ===
               'HR' && '💻'}
              {role === 'Front Office' && '☎️'}
            </div>
            <div style={styles.roleText}>{role}</div>
          </div>
        ))}
      </div>
      <button 
        style={styles.continueButton} 
        onClick={handleContinue} 
        disabled={!selectedRole || loading}
      >
        Continue
      </button>
      {loading && (
        <div style={styles.spinnerOverlay}>
          <div style={styles.spinnerContainer}>
            <Triangle
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff',
    padding: '20px',
    boxSizing: 'border-box',
  },
  blurOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(5px)',
    zIndex: 1000,
  },
  title: {
    fontSize: '2rem',
    marginBottom: '10px',
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: '1rem',
    color: '#777',
    textAlign: 'center',
    maxWidth: '500px',
    marginBottom: '30px',
  },
  rolesContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  role: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '150px', // Adjust the width as needed
    height: '150px', // Adjust the height as needed
    padding: '20px',
    border: '2px solid #ccc',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
    textAlign: 'center', // Center the text
  },
  selectedRole: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '150px', // Adjust the width as needed
    height: '150px', // Adjust the height as needed
    padding: '20px',
    border: '2px solid #007bff',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
    textAlign: 'center', // Center the text
  },
  icon: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  roleText: {
    fontSize: '1.2rem',
    color: '#333',
  },
  continueButton: {
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '20px',
  },
  spinnerOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1001,
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default LandingPage;
