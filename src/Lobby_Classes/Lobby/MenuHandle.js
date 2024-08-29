import React from 'react';
// Component to handle menu button visibility and state

const MenuHandle = ({ toggleMenu, isMenuOpen }) => {
  return (
    <button 
      onClick={toggleMenu} 
      className={`fixed top-1/2 transform -translate-y-1/2 bg-blue-900 text-white p-2 rounded-r-lg transition-all duration-300 ${isMenuOpen ? 'left-64' : 'left-0'}`}
    >
      {isMenuOpen ? 'Close' : 'Menu'}
    </button>
  );
};

export default MenuHandle;
