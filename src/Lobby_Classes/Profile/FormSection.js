import React from 'react';
import FormField from './FormField'; // Import FormField component
// Component for the form section

const FormSection = ({ formData, onChange, onSubmit, isDarkMode }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField 
          label="First Name" 
          name="name" 
          value={formData.name} 
          onChange={onChange}
          isDarkMode={isDarkMode}
          required 
        />
        <FormField 
          label="Last Name" 
          name="familyName" 
          value={formData.familyName} 
          onChange={onChange}
          isDarkMode={isDarkMode}
          required 
        />
        <div className="mb-4">
          <label className={`block mb-2 ${isDarkMode ? 'text-black' : 'text-gray-700'}`} htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={onChange}
            className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <FormField 
          label="Email Address" 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={onChange}
          isDarkMode={isDarkMode}
          required 
        />
        <FormField 
          label="Address" 
          name="address" 
          value={formData.address} 
          onChange={onChange}
          isDarkMode={isDarkMode}
          required 
        />
        <FormField 
          label="Date of Birth" 
          type="date" 
          name="dateOfBirth" 
          value={formData.dateOfBirth} 
          onChange={onChange}
          isDarkMode={isDarkMode}
          required 
        />
        <FormField 
          label="ID Number" 
          name="idNumber" 
          value={formData.idNumber} 
          onChange={onChange}
          isDarkMode={isDarkMode}
          required 
        />
        <FormField 
          label="Height (cm)" 
          type="number" 
          name="height" 
          value={formData.height} 
          onChange={onChange}
          isDarkMode={isDarkMode}
          required 
        />
        <FormField 
          label="Weight (kg)" 
          type="number" 
          name="weight" 
          value={formData.weight} 
          onChange={onChange}
          isDarkMode={isDarkMode}
          required 
        />
      </div>
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded ${isDarkMode ? 'bg-gray-500 text-white' : 'bg-blue-900 text-white'} hover:bg-blue-900`}
      >
        Update
      </button>
    </form>
  );
};

export default FormSection;
