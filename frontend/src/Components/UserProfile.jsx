import React, { useEffect, useState } from 'react';
import { validateUserAuth } from '../utils/validators';
import { useNavigate } from 'react-router-dom';
import EditProfileForm from './EditUserProfile';
import Navbar from './Navbar';
import { getUserData } from '../utils/getDatas';
import { FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';
const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const isUserAuthenticated = validateUserAuth();
      if (isUserAuthenticated) {
        const userdata = await getUserData();
        setUserData(userdata);
      } else {
        navigate("/auth");
      }
    };

    fetchUserData();
  }, [navigate]);

  const profilePicUrl = userData?.photoUrl;

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-black via-gray-900 to-black text-white">
        <div className="w-full max-w-4xl bg-black bg-opacity-50 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Profile Section */}
            <div className="flex items-center space-x-6 md:space-x-8 flex-col md:flex-row md:items-center">
              <div className="w-32 h-32 mb-4 md:mb-0">
                <img
                  src={profilePicUrl}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-4 border-purple-400"
                />
              </div>
              <div className="text-left md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  {userData?.firstName || "First Name"} {userData?.lastName || "Last Name"}{" "}
                  <span className="text-lg text-gray-400">{"@" + (userData?.userName || "username")}</span>
                </h1>
                <div className="flex items-center text-md gap-2 text-gray-300">
                  <FaBriefcase />  { userData?.jobTitle || 'Job Title Here'}
                  <FaMapMarkerAlt /> {userData?.location || 'Location'}
                </div>
                
                {/* <p className="text-md text-gray-400"><span><FaBriefcase />   </span> || {userData?.location || 'Location'}</p> */}
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="mt-4 md:mt-0">
            
              {/* <button
                onClick={() => setIsModalOpen(true) }
                className="bg-gradient-to-r from-purple-400 to-pink-600 hover:from-purple-500 hover:to-pink-700 text-white font-semibold py-2 px-6 rounded-full transition-transform transform hover:scale-105"
              >
                Edit Profile
              </button> */}
              {
            <EditProfileForm
              initialData={userData}
              setIsModalOpen={setIsModalOpen}  // Pass function to close modal
              setUserData={setUserData}  // Pass function to update user data
            />
          }
            </div>
          </div>

          {/* About Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">About</h2>
            <p className="text-lg mt-2 text-gray-300">
              {userData?.about || "This user hasn't added a bio yet."}
            </p>
          </div>

          {/* Skills Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Skills</h2>
            {userData?.skills ? (
              <ul className="flex flex-wrap gap-2 mt-2">
                {userData?.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="bg-purple-600 px-4 py-2 rounded-full text-sm font-medium text-white"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg text-gray-300">No skills added.</p>
            )}
          </div>

          {/* Edit Profile Modal */}
          
        </div>
      </div>
    </>
  );
};

export default UserProfile;
