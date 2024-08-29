import React from 'react';
import { Link } from 'react-router-dom';

const MobileMenu = ({ isMenuOpen, isDarkMode, toggleDarkMode }) => {
  if (!isMenuOpen) return null;

  return (
    <div className={`md:hidden ${isDarkMode ? 'bg-gray-800' : 'bg-blue-800'} py-2`}>
      <nav className="flex flex-col items-center">
        <Link to="/" className="text-white py-2 hover:bg-blue-700 w-full text-center">Home</Link>
        <Link to="/contact" className="text-white py-2 hover:bg-blue-700 w-full text-center">Contact</Link>
        <Link to="/login" className="text-white py-2 hover:bg-blue-700 w-full text-center">Login</Link>
        <Link to="/signup" className="text-white py-2 hover:bg-blue-700 w-full text-center">Sign Up</Link>

        <button onClick={toggleDarkMode} className="mt-2 p-2 rounded bg-gray-300 dark:bg-gray-600 w-full">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>
    </div>
  );
};

export default MobileMenu;
