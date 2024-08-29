// Footer.js
import React from 'react';

const Footer = ({ isDarkMode }) => (
  <footer className={`bg-blue-900 text-white text-center py-4 text-sm ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-[#20B2AA] text-white'}`}>
    <p>&copy; 2024 Be Healthy. All rights reserved.</p>
  </footer>
);

export default Footer;
