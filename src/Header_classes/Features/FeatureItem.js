import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Import Tippy.js styles

const FeatureItem = ({ item, isDarkMode }) => {
  // Inline styles for the message-like tooltip
  const tooltipStyles = {
    minWidth: '200px', // Adjust as needed
    padding: '1rem 1rem',
    textAlign: 'center',
    borderRadius: '0.5rem', // Slightly more rounded for message bubble
    backgroundColor: isDarkMode ? '#2D3748' : '#EDF2F7', // Dark or light mode background
    color: isDarkMode ? '#F7FAFC' : '#2D3748', // Dark or light mode text color
    position: 'relative'
  };

  // Optional: Add a small arrow for the message bubble effect
  const arrowStyles = {
    position: 'absolute',
    bottom: '-8px', // Adjust based on tooltip height
    left: '50%',
    transform: 'translateX(-50%)',
    width: '0',
    height: '0',
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderTop: `8px solid ${isDarkMode ? '#2D3748' : '#EDF2F7'}` // Match the tooltip background
  };

  return (
    <Tippy
      content={
        <div style={{ ...tooltipStyles, position: 'relative' }}>
          {item.tooltip}
          <div style={arrowStyles} />
        </div>
      }
      placement="top"
      arrow={false} // Hide default arrow
      theme={isDarkMode ? 'dark' : 'light'}
    >
      <div className={`bg-white p-8 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-black' : 'bg-gray-100 text-gray-900'} transition-transform transform hover:scale-105`}>
        <img src={item.image} alt={item.text} className="w-full h-48 object-cover mb-4 rounded-md" />
        <h3 className="text-xl font-semibold mb-2 text-center">{item.text}</h3>
      </div>
    </Tippy>
  );
};

export default FeatureItem;
