import React from 'react';
// Component for individual form fields

const FormField = ({ label, type = 'text', name, value, onChange, isDarkMode, required = false }) => {
  return (
    <div className="mb-4">
      <label
        className={`block mb-2 ${isDarkMode ? 'text-black' : 'text-gray-700'}`}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
        required={required}
      />
    </div>
  );
};

export default FormField;
