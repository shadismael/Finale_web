import React, { createContext, useState, useContext } from 'react';

// Create a Context for Dark Mode
const DarkModeContext = createContext();

/**
 * Provider component that manages dark mode state and provides 
 * context to its children.
 * 
 * @param {Object} props - React props
 * @param {React.ReactNode} props.children - Child components to render within the provider
 */
export const DarkModeProvider = ({ children }) => {
  // State to hold the current dark mode status
  const [darkMode, setDarkMode] = useState(false);
//
  /**
   * Toggles the dark mode state and persists the preference to localStorage.
   */
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    localStorage.setItem('darkMode', JSON.stringify(!darkMode)); // Persist preference
  };

  // Retrieve the dark mode preference from localStorage on initial render
  React.useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

/**
 * Custom hook to use the DarkModeContext.
 * 
 * @returns {Object} - The current dark mode state and the toggle function
 */
export const useDarkMode = () => useContext(DarkModeContext);
