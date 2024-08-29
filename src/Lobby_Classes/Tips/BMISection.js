import React from 'react';
// Functional component to display BMI information

const BMISection = ({ height, weight, bmiCategory, isDarkMode }) => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-4">BMI Information</h2>
    <div className={`border rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <h3 className="text-lg font-semibold">BMI Information</h3>
      <p className="text-sm mt-2">Height: <strong>{height} cm</strong></p>
      <p className="text-sm mt-2">Weight: <strong>{weight} kg</strong></p>
      <p className="text-sm mt-2">Category: <strong>{bmiCategory}</strong></p>
    </div>
  </section>
);

export default BMISection;
