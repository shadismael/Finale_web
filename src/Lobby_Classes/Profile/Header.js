import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
// Component for the header section

const Header = ({ isDarkMode, toggleDarkMode, handleLogout }) => {
  return (
    <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-blue-900 text-white'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link to="/lobby" className="hover:text-white">Lobby</Link></li>
            <li>
              <button onClick={handleLogout} className="hover:text-blue-900">Logout</button>
            </li>
            <li>
              <button 
                onClick={toggleDarkMode} 
                className="p-2 text-white bg-gray-800 rounded-full"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? '🌙' : '☀️'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
