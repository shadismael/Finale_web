import React from 'react';
// Functional component to display recommended recipes

const RecipesSection = ({ recommendedRecipes, isDarkMode }) => (
  <section className="mt-8">
    <h2 className="text-xl font-semibold mb-4">Recommended Recipes</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {recommendedRecipes.map(recipe => (
        <div key={recipe.id} className={`border rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <img src={recipe.image} alt={recipe.name} className="w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{recipe.name}</h3>
            <p className="text-sm mt-2">{recipe.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default RecipesSection;
