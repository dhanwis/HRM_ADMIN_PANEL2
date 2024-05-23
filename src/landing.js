import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div style={styles.container}>
    <h1 style={styles.title}>Welcome! Please select your role:</h1>
    <ul style={styles.list}>
      <li style={styles.listItem}><Link style={styles.link} to="/intern/login">Intern</Link></li>
      <li style={styles.listItem}><Link style={styles.link} to="/admin/login">HR Admin</Link></li>
      <li style={styles.listItem}><Link style={styles.link} to="/staff/login">Staff</Link></li>
      <li style={styles.listItem}><Link style={styles.link} to="/frontoffice/login">Front Office</Link></li>
      <li style={styles.listItem}><Link style={styles.link} to="/teamlead/login">Team Lead</Link></li>
    </ul>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    margin: '10px 0',
  },
  link: {
    fontSize: '1.5rem',
    color: '#fff',
    backgroundColor: '#007bff',
    padding: '10px 20px',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
};

export default LandingPage;
