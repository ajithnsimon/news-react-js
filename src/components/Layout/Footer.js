// layout/Footer.js
import React from 'react';

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2023 News App. All rights reserved.</p>
    </footer>
  );
}

// Styles
const footerStyle = {
  background: '#333',
  color: '#fff',
  padding: '1rem 0', // Equal padding on top and bottom, no padding on left and right
  textAlign: 'center',
  bottom: 0,
  width: '100%',
};
