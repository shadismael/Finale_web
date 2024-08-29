import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* Centered on the page is a contact section with essential information for getting in touch with the support team. */
const Contact = () => {
  // State to track whether dark mode is enabled
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize state from localStorage, defaulting to false if not found
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });

  // State to store the contact page HTML content
  const [content, setContent] = useState('');

  // Effect to apply or remove dark mode classes on the document element based on the current state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Effect to fetch and set the contact page HTML content (assuming it's stored separately)
  useEffect(() => {
    fetch('/contact.html')
      .then(response => response.text())
      .then(html => setContent(html))
      .catch(err => console.error('Failed to load HTML:', err));
  }, []);

  // Function to toggle dark mode and save the preference to localStorage
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-blue-900 p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Be Healthy</h1>
          <nav className="flex space-x-4">
            <Link to="/" className="text-white hover:text-gray-900">Home</Link>
            <Link to="/features" className="text-white hover:text-gray-900">About</Link>
            <Link to="/login" className="text-white hover:text-gray-900">Login</Link>
            <Link to="/signup" className="text-white hover:text-gray-300">Sign Up</Link>
          </nav>
          <button 
            onClick={toggleDarkMode} 
            className="p-2 text-white bg-gray-800 rounded-full"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className={`bg-white p-8 rounded shadow-md w-full max-w-lg mx-auto ${isDarkMode ? 'bg-gray-800 text-black' : 'bg-gray-100 text-gray-900'}`}>
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
          <div className="text-center">
            <p className="text-lg mb-4">You can reach us through the following methods:</p>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Phone Number</h3>
              <p className="text-black dark:text-gray-300">+972502800980</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Email</h3>
              <p className="text-black dark:text-gray-300">support@behealthy.com</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Fax</h3>
              <p className="text-black dark:text-gray-300">049947573</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`bg-blue-900 text-white text-center py-4 text-sm ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-[#20B2AA] text-white'}`}>
        <p>&copy; 2024 Be Healthy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
