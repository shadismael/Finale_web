import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa'; 
// Functional component for the header

const Header = ({ isDarkMode, toggleDarkMode }) => (
  <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-blue-900'}`}>
    <div className="container mx-auto flex justify-between items-center">
      <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-blue-500' : 'text-white'}`}>Be Healthy</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/lobby" className={`hover:text-blue-500 ${isDarkMode ? 'text-gray-300' : 'text-white'}`}>Lobby</Link>
          </li>
          <li>
            <Link to="/" className={`hover:text-blue-500 ${isDarkMode ? 'text-gray-300' : 'text-white'}`}>Home</Link>
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

export default Header;
