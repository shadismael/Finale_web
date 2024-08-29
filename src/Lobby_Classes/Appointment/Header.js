import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../FireBase/Firebase'; 
// Header component to display navigation and dark mode toggle

const Header = ({ isDarkMode, toggleDarkMode, handleLogout }) => {
  return (
    <header className={`shadow-md py-4 ${isDarkMode ? 'bg-black-900 text-black-200' : 'bg-blue-900 text-white'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Be Healthy</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/lobby" className={`hover:text-blue-900 ${isDarkMode ? 'text-gray-300' : 'text-gray-100'}`}>
                Lobby
              </Link>
            </li>
            <li>
              {auth.currentUser ? (
                <button onClick={handleLogout} className={`hover:text-blue-900 ${isDarkMode ? 'text-gray-300' : 'text-gray-100'}`}>
                  Logout
                </button>
              ) : (
                <Link to="/login" className={`hover:text-blue-900 ${isDarkMode ? 'text-gray-300' : 'text-gray-100'}`}>
                  Login
                </Link>
              )}
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
