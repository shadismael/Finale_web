import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaInfoCircle } from 'react-icons/fa'; 
/**
 * Header component for navigation and dark mode toggle.
 * @param {Object} props - Component properties.
 * @param {boolean} props.isDarkMode - Indicates if dark mode is active.
 * @param {Function} props.toggleDarkMode - Function to toggle dark mode.
 * @param {Function} props.handleLogout - Function to handle user logout.
 */
const Header = ({ isDarkMode, toggleDarkMode, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-blue-900'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Be Healthy</h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <a href="/" onClick={handleLogout} className={`text-white-700 hover:text-blue-900 ${isDarkMode ? 'text-gray-300' : 'text-white'}`}>
                Logout
              </a>
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
            <li>
              <button onClick={() => navigate('/lobby')} className={`p-2 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-blue-900'}`}>
                Lobby
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
