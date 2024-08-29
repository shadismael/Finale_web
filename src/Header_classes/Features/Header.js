import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isDarkMode, toggleDarkMode, toggleMenu }) => {
  return (
    <header className={`bg-blue-900 p-4 shadow-sm ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-[#20B2AA] text-white'} z-50`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Be Healthy</h1>
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
          <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
          <Link to="/signup" className="text-white hover:text-gray-300">Sign Up</Link>

          <button 
            onClick={toggleDarkMode} 
            className="p-2 text-white bg-gray-800 rounded-full"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
