import React from 'react';
// ToggleDarkModeButton component to switch between light and dark modes

const ToggleDarkModeButton = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button 
      onClick={toggleDarkMode} 
      className="p-2 text-white bg-gray-800 rounded-full"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? '🌙' : '☀️'}
    </button>
  );
};

export default ToggleDarkModeButton;
