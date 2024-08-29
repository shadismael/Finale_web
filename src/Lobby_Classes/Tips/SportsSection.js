import React from 'react';
// Functional component to display recommended sports

const SportsSection = ({ recommendedSports, isDarkMode }) => (
  <section>
    <h2 className="text-xl font-semibold mb-4">Recommended Sports</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {recommendedSports.map(sport => (
        <div key={sport.id} className={`border rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <img src={sport.image} alt={sport.name} className="w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{sport.name}</h3>
            <p className="text-sm mt-2">{sport.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default SportsSection;
