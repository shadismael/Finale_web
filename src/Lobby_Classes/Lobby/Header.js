import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../FireBase/Firebase';

const Header = ({ isDarkMode, toggleDarkMode, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-blue-900 text-white'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Be Healthy</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" onClick={handleLogout} className="hover:text-blue-900">Logout</a>
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
