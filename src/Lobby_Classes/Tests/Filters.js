import React from 'react';
import { FaInfoCircle } from 'react-icons/fa'; 
/**
 * Filters component allows users to filter test results by date and test type.
 * @param {Object} props - Component properties
 * @param {string} props.dateFilter - Current date filter value
 * @param {Function} props.setDateFilter - Function to update date filter
 * @param {string} props.testTypeFilter - Current test type filter value
 * @param {Function} props.setTestTypeFilter - Function to update test type filter
 * @param {Array} props.availableTestTypes - List of available test types
 * @param {Object} props.testTypeInfo - Information about each test type
 * @param {boolean} props.isDarkMode - Indicates if dark mode is enabled
 */
const Filters = ({ dateFilter, setDateFilter, testTypeFilter, setTestTypeFilter, availableTestTypes, testTypeInfo, isDarkMode }) => {
  return (
    <div className="mb-4 flex flex-wrap gap-4">
      <input
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className={`p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
      />
      <select
        value={testTypeFilter}
        onChange={(e) => setTestTypeFilter(e.target.value)}
        className={`p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
      >
        <option value="">All Test Types</option>
        {availableTestTypes.map(type => (
          <option key={type} value={type}>
            {type}
            <span className="ml-2 text-gray-500 cursor-pointer" title={testTypeInfo[type] || 'No information available'}>
              <FaInfoCircle size={14} />
            </span>
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
