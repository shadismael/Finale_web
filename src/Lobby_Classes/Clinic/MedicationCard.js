// MedicationCard.js
import React from 'react';
// Functional component to display a card for a medication

const MedicationCard = ({ medication, buttonColor, navigate }) => (
  <div className="bg-white p-4 rounded-lg shadow-lg dark:bg-gray-700">
    <img src={medication.image} alt={medication.name} className="w-full h-40 object-cover mb-4 rounded" />
    <h3 className="text-xl font-semibold mb-2">{medication.name}</h3>
    <p className="text-lg font-bold text-blue-900 mb-2">{medication.price}</p>
    <button 
      className="w-full text-white py-2 rounded"
      style={{ backgroundColor: buttonColor }}
      onClick={() => navigate('/medicationDetails')}
    >
      View Details
    </button>
  </div>
);

export default MedicationCard;
