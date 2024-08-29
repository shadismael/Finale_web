// Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = ({ isDarkMode, toggleDarkMode, handleLogout, handleBackToLobby }) => {
// Define button color used for the Lobby button
  const buttonColor = '#003366';
  return (
    <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-blue-900 text-white'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pharmacy Shop</h1>
        <div className="flex items-center space-x-4">
          <button 
            className={`text-white py-2 px-4 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}`}
            style={{ backgroundColor: isDarkMode ? '#4a5568' : buttonColor }}
            onClick={handleBackToLobby}
          >
            Lobby
          </button>
          <nav>
            <ul className="flex space-x-4 items-center">
              <li>
                <a href="/" onClick={handleLogout} className="hover:text-blue-900">Logout</a>
              </li>
              <li>
                <button 
                  onClick={toggleDarkMode} 
                  className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-800 text-white'}`}
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <FaMoon /> : <FaSun />}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
