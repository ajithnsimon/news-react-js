// layout/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { signout } from '../../services/auth';

const Header = () => {

  const handleSignout = async () => {
    try {
      // Fetch the token from your preferred storage (localStorage, etc.)
      const token = localStorage.getItem('jwtToken');

      if (token) {
        await signout(token);        // Redirect to the home page or login page
        window.location.reload();

      } else {
        console.error('No token found for logout');
      }
    } catch (error) {
      console.error('Error during signout', error);
      // Handle signout error if needed
    }
  };

  return (
    <header style={headerStyle}>
      <h1>News App</h1>
      <nav>
        <ul style={navListStyle}>
          <li style={navListItemStyle}>
            <Link to="/feed" style={navLinkStyle}>Feed</Link>
          </li>
          <li style={navListItemStyle}>
            <Link to="/settings" style={navLinkStyle}>Settings</Link>
          </li>
          <li style={navListItemStyle}>
            {/* Call handleSignout on click */}
            <span style={{ cursor: 'pointer' }} onClick={handleSignout}>Sign Out</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

// Styles (unchanged)
const headerStyle = {
  background: "#333",
  color: "#fff",
  padding: "1rem",
  textAlign: "center",
};

const navListStyle = {
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  justifyContent: 'flex-end',
};

const navListItemStyle = {
  margin: '0 10px'
};

const navLinkStyle = {
  color: '#ffffff',
  textDecoration: 'none',
  cursor: 'pointer',
};
export default Header;
