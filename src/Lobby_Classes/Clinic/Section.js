// Section.js
import React from 'react';
// Functional component to display a section with a list of items

const Section = ({ title, items, buttonColor, navigate, isDarkMode }) => (
  <div className={`p-6 rounded-lg shadow-lg mb-8 w-full max-w-4xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-lg dark:bg-gray-700">
          <img src={item.image} alt={item.name} className="w-full h-40 object-cover mb-4 rounded" />
          <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
          <p className="text-lg font-bold text-blue-900 mb-2">{item.price}</p>
          <button 
            className="w-full text-white py-2 rounded"
            style={{ backgroundColor: buttonColor }}
            onClick={() => navigate('/medicationDetails')}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default Section;
