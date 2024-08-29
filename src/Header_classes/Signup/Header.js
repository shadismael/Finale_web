import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isDarkMode, toggleDarkMode, toggleMenu }) => {
  return (
    <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-blue-900 text-white'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>Be Healthy</h2>
        <nav className="hidden md:flex space-x-4">
          <Link to="/login" className={`hover:text-gray-300 ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>Log In</Link>
          <Link to="/" className={`hover:text-gray-300 ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>Home</Link>
          <Link to="/features" className={`hover:text-gray-300 ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>Features</Link>
          <Link to="/contact" className={`hover:text-gray-300 ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>Contact</Link>
        </nav>
        <button 
          onClick={toggleDarkMode} 
          className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-800 text-white'}`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>
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