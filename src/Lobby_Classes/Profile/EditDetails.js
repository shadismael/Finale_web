import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, update, get } from 'firebase/database';
import { auth, database } from '../../FireBase/Firebase';
import Header from './Header'; // Import Header component
import ProfilePhoto from './ProfilePhoto'; // Import ProfilePhoto component
import FormSection from './FormSection'; // Import FormSection component

const EditDetails = () => {
    // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    familyName: '',
    gender: '',
    email: '',
    address: '',
    dateOfBirth: '',
    idNumber: '',
    height: '',
    weight: '',
  });
    // State to hold profile photo URL
  const [profilePhoto, setProfilePhoto] = useState(null);
    // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false);
    // Hook to handle navigation
  const navigate = useNavigate();

  // Fetch user data from Firebase on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const userRef = ref(database, `users/${userId}`);
        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            setFormData({
              name: data.name || '',
              familyName: data.familyName || '',
              gender: data.gender || '',
              email: data.email || '',
              address: data.address || '',
              dateOfBirth: data.dateOfBirth || '',
              idNumber: data.idNumber || '',
              height: data.height || '',
              weight: data.weight || '',
            });
            setProfilePhoto(data.profilePhoto || '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);
  // Apply dark mode styles based on isDarkMode state

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  // Handle form field changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  // Handle profile photo changes

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };
  // Handle form submission to update user details

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("User not authenticated");
      return;
    }

    const userId = user.uid;
    const userRef = ref(database, `users/${userId}`);

    try {
      await update(userRef, {
        ...formData,
        profilePhoto: profilePhoto || formData.profilePhoto,
      });

      alert('Details updated successfully!');
      navigate('/lobby');
    } catch (error) {
      console.error('Error updating details:', error);
      alert('Error updating details: ' + error.message);
    }
  };
  // Handle user logout

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        handleLogout={handleLogout}
      />
      <div id="container" className="flex-grow flex items-center justify-center py-8 px-4">
        <div className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto ${isDarkMode ? 'bg-gray-800 text-gray-200' : ''}`}>
          <ProfilePhoto 
            profilePhoto={profilePhoto} 
            handlePhotoChange={handlePhotoChange}
            isDarkMode={isDarkMode}
          />
          <FormSection 
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default EditDetails;
