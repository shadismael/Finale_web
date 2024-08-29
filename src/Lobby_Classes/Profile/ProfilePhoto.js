import React from 'react';
// Component for displaying and updating profile photo

const ProfilePhoto = ({ profilePhoto, handlePhotoChange, isDarkMode }) => {
  return (
    <div className="flex items-center mb-6">
      <div className="relative w-24 h-24 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden flex items-center justify-center">
        {profilePhoto ? (
          <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-500 dark:text-gray-300 text-xl">Profile</span>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      <div className="ml-6">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-black' : 'text-blue-900'}`}>Edit Your Profile</h2>
      </div>
    </div>
  );
};

export default ProfilePhoto;
