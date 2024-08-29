import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { database } from '../../FireBase/Firebase';
import { FaMoon, FaSun } from 'react-icons/fa'; // Import the icons

// Mock images for demonstration purposes
import basketballImage from '../../Images/basketball.jpg';
import yogaImage from '../../Images/yoga.jpg';
import runningImage from '../../Images/running.jpg';
import cyclingImage from '../../Images/cycling.jpg';
import swimmingImage from '../../Images/swimming.jpg';
import hikingImage from '../../Images/hiking.jpg';
import tennisImage from '../../Images/tennis.jpg';
import soccerImage from '../../Images/soccer.jpg';
import weightliftingImage from '../../Images/weightlifting.jpg';
import pilatesImage from '../../Images/pilates.jpg';

import chickenSaladImage from '../../Images/chicken_salad.jpg';
import quinoa from '../../Images/black-bean-quinoa-salad.jpg';
import avocado from '../../Images/avocado_toast.jpg';
import berry from '../../Images/berry_smoothie.jpg';
import vegetable from '../../Images/Stir-Fry-Vegetables.jpg';
import chia from '../../Images/Chia-Pudding.jpg';
import potato from '../../Images/sweet-potato-black-bean-tacos.jpg';
import yogurt from '../../Images/Greek-Yogurt-Parfait-Recipe.jpg';
import peppers from '../../Images/Stuffed-Bell-Peppers-close.jpg';
import salmon from '../../Images/oven-baked-salmon.jpg';

const fetchUserData = async (userId) => {
  try {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log('No data available for user:', userId);
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

const calculateBMI = (weight, height) => {
  if (height > 0) {
    return (weight / (height * height)) * 10000;
  }
  return 0;
};

const sports = [
  { id: 1, name: 'Basketball', image: basketballImage, description: 'A great way to build endurance and agility while having fun.', category: 'normal' },
  { id: 2, name: 'Yoga', image: yogaImage, description: 'Enhances flexibility and reduces stress.', category: 'all' },
  { id: 3, name: 'Running', image: runningImage, description: 'Improves cardiovascular health and burns calories.', category: 'overweight' },
  { id: 4, name: 'Cycling', image: cyclingImage, description: 'Builds muscle and improves heart health.', category: 'normal' },
  { id: 5, name: 'Swimming', image: swimmingImage, description: 'A full-body workout that is easy on the joints.', category: 'all' },
  { id: 6, name: 'Hiking', image: hikingImage, description: 'Great for building leg strength and enjoying nature.', category: 'normal' },
  { id: 7, name: 'Tennis', image: tennisImage, description: 'Enhances hand-eye coordination and cardiovascular fitness.', category: 'normal' },
  { id: 8, name: 'Soccer', image: soccerImage, description: 'Improves endurance and teamwork skills.', category: 'normal' },
  { id: 9, name: 'Weightlifting', image: weightliftingImage, description: 'Builds muscle strength and bone density.', category: 'all' },
  { id: 10, name: 'Pilates', image: pilatesImage, description: 'Improves core strength and flexibility.', category: 'normal' },
];

const recipes = [
  { id: 1, name: 'Grilled Chicken Salad', image: chickenSaladImage, description: 'A healthy and delicious grilled chicken salad with fresh veggies.', category: 'all' },
  { id: 2, name: 'Quinoa and Black Bean Bowl', image: quinoa, description: 'A protein-packed quinoa and black bean bowl with a lime dressing.', category: 'all' },
  { id: 3, name: 'Avocado Toast', image: avocado, description: 'Simple and tasty avocado toast with a sprinkle of chili flakes.', category: 'underweight' },
  { id: 4, name: 'Berry Smoothie', image: berry, description: 'A refreshing berry smoothie packed with antioxidants.', category: 'underweight' },
  { id: 5, name: 'Vegetable Stir Fry', image: vegetable, description: 'A quick and easy vegetable stir fry with a savory sauce.', category: 'normal' },
  { id: 6, name: 'Chia Pudding', image: chia, description: 'A creamy chia pudding with fresh berries and honey.', category: 'normal' },
  { id: 7, name: 'Sweet Potato and Black Bean Tacos', image: potato, description: 'Flavorful sweet potato and black bean tacos with avocado.', category: 'normal' },
  { id: 8, name: 'Greek Yogurt Parfait', image: yogurt, description: 'A light and refreshing Greek yogurt parfait with granola and fruit.', category: 'underweight' },
  { id: 9, name: 'Stuffed Bell Peppers', image: peppers, description: 'Bell peppers stuffed with quinoa, black beans, and vegetables.', category: 'normal' },
  { id: 10, name: 'Oven-Baked Salmon', image: salmon, description: 'Delicious oven-baked salmon with a lemon and dill seasoning.', category: 'all' },
];

const TipsPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false);

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const data = await fetchUserData(userId);
          if (data) {
            setUserData(data);
          } else {
            setError(
              <div className={`p-8 border border-gray-300 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg`}>
                <p className="text-lg mb-4">
                  No user data found, please fill your details.{' '}
                  <Link to="/editdetails" className="text-blue-500 hover:underline">
                    Go to User Details
                  </Link>
                </p>
              </div>
            );
          }
          
        } else {
          setError('User not authenticated.');
        }
      } catch (err) {
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>No user data available.</div>;
  }

  const { weight, height } = userData;
  const bmi = calculateBMI(weight, height);

  let bmiCategory;
  if (bmi < 18.5) {
    bmiCategory = 'underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    bmiCategory = 'normal';
  } else {
    bmiCategory = 'overweight';
  }

  // Filter sports and recipes based on BMI category
  const recommendedSports = sports.filter(sport => sport.category === bmiCategory || sport.category === 'all');
  const recommendedRecipes = recipes.filter(recipe => recipe.category === bmiCategory || recipe.category === 'all');

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex flex-col`}>
      <header className={`shadow-md py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-blue-900'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-blue-500' : 'text-white'}`}>Be Healthy</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/lobby" className={`hover:text-blue-500 ${isDarkMode ? 'text-gray-300' : 'text-white'}`}>Lobby</Link>
              </li>
              <li>
                <Link to="/" className={`hover:text-blue-500 ${isDarkMode ? 'text-gray-300' : 'text-white'}`}>Home</Link>
              </li>
              <li>
              <button 
              onClick={toggleDarkMode} 
                  className="p-2 text-white bg-gray-800 rounded-full"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? '🌙' : '☀️'}
              </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Welcome To Tips </h2>
          <div className={`border rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h3 className="text-lg font-semibold">BMI Information</h3>
            <p className="text-sm mt-2">Height: <strong>{height} cm</strong></p>
            <p className="text-sm mt-2">Weight: <strong>{weight} kg</strong></p>
            <p className="text-sm mt-2">Category: <strong>{bmiCategory}</strong></p>
          </div>
        </section>

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
      </main>

      <footer className={`py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-blue-900'}`}>
        <div className="container mx-auto text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-white'}`}>© 2024 Be Healthy</p>
        </div>
      </footer>
    </div>
  );
};

export default TipsPage;
