import React from 'react';

const Footer = ({ isDarkMode }) => {
  return (
    <footer className={`text-center py-4 text-sm ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-900 text-black'}`}>
      <p>&copy; 2024 Be Healthy. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
