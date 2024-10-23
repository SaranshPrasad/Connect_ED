
import React, { useEffect, useState } from 'react';

import { validateUserAuth } from '../utils/validators';
import { useNavigate } from 'react-router-dom';
import EditProfileForm from './EditUserProfile';
import Navbar from './Navbar';
import { getUserData } from '../utils/getDatas';

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



  const profilePicUrl = userData?.photoUrl || "https://via.placeholder.com/150";

  return (
    <>
    <Navbar/>
    <div className="min-h-screenw-full h-[100vh] flex flex-col justify-center  items-center  bg-black text-wrap  inset-0  bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] text-white">
      <div className="w-full max-w-5xl bg-slate-900 p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-32 h-32">
              <img
                src={profilePicUrl}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-gray-700"
              />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold">{userData?.firstName || "First Name"} {userData?.lastName || "Last Name"} <span className="text-lg text-gray-400">{"@"+userData?.userName || '@username'}</span></h1>
              <p className="text-lg text-gray-400">{userData?.jobTitle || 'Job Title Here'}</p>
              <p className="text-lg text-gray-400">{userData?.location || 'Location'}</p>
            </div>
          </div>
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-full"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold">About</h2>
          <p className="text-lg mt-2 text-gray-300">{userData.about || "This user hasn't added a bio yet."}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Skills</h2>
          {userData?.skills ? (
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

        {isModalOpen && (
          <EditProfileForm
             initialData={userData}
            setIsModalOpen={setIsModalOpen}
            setUserData={setUserData}
          />
        )}
      </div>
    </div>
    </>
  );
};

export default UserProfile;
