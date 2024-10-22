import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { validateUserAuth } from '../utils/validators';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [editedData, setEditedData] = useState({}); // Edit form data

  const getUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/profile`, { withCredentials: true });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const isUserAuthenticated = validateUserAuth();
      if (isUserAuthenticated) {
        const userdata = await getUserData();
        setUserData(userdata);
        setEditedData(userdata); // Initialize the edit form with the fetched data
      } else {
        navigate("/auth");
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}/user/profile/update`, editedData, { withCredentials: true });
      if (response.status === 200) {
        setUserData(editedData); // Update user data with the edited values
        setIsModalOpen(false); // Close modal after successful update
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const profilePicUrl = userData?.photoUrl || "https://via.placeholder.com/150";

  return (
    <div className="min-h-screen bg-black text-white flex justify-center py-10">
      <div className="w-full max-w-5xl bg-gray-900 p-8 rounded-lg shadow-lg">
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          {/* Left Section: Profile Picture and Basic Info */}
          <div className="flex items-center space-x-6">
            {/* Profile Picture */}
            <div className="w-32 h-32">
              <img
                src={profilePicUrl}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-gray-700"
              />
            </div>
            {/* User Information */}
            <div className="text-left">
              <h1 className="text-4xl font-bold">{userData.firstName} {userData.lastName}</h1>
              <p className="text-lg text-gray-400">{userData.jobTitle || 'Job Title Here'}</p>
              <p className="text-lg text-gray-400">{userData.location || 'Location'}</p>
            </div>
          </div>
          {/* Edit Button */}
          <div>
            <button
              onClick={() => setIsModalOpen(true)} // Open modal on button click
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-full"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">About</h2>
          <p className="text-lg mt-2 text-gray-300">{userData.about || "This user hasn't added a bio yet."}</p>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Skills</h2>
          {userData.skills ? (
            <ul className="flex flex-wrap gap-2 mt-2">
              {userData?.skills.map((skill, index) => (
                <li key={index} className="bg-gray-800 px-4 py-2 rounded-full text-sm font-medium">
                  {skill}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-gray-300">No skills added.</p>
          )}
        </div>

        {/* Modal for Editing Profile */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg w-full max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    name="firstName"
                    value={editedData.firstName || ''}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="bg-gray-700 text-white p-2 rounded w-full"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={editedData.lastName || ''}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="bg-gray-700 text-white p-2 rounded w-full"
                  />
                </div>
                <input
                  type="text"
                  name="jobTitle"
                  value={editedData.jobTitle || ''}
                  onChange={handleInputChange}
                  placeholder="Job Title"
                  className="bg-gray-700 text-white p-2 rounded w-full"
                />
                <input
                  type="text"
                  name="location"
                  value={editedData.location || ''}
                  onChange={handleInputChange}
                  placeholder="Location"
                  className="bg-gray-700 text-white p-2 rounded w-full"
                />
                <textarea
                  name="about"
                  value={editedData.about || ''}
                  onChange={handleInputChange}
                  placeholder="About"
                  className="bg-gray-700 text-white p-2 rounded w-full h-32"
                />
                <textarea
                  name="skills"
                  value={editedData.skills || ''}
                  onChange={handleInputChange}
                  placeholder="Enter your skills (comma separated)"
                  className="bg-gray-700 text-white p-2 rounded w-full h-32"
                />

                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)} // Close modal on cancel
                    className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-full"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
