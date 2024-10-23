import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { validateUserAuth } from '../utils/validators';

const Feed = () => {
  const [profiles, setProfiles] = useState([]);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch user profiles
    const isAuth = validateUserAuth();
    if(!isAuth){
      navigate('/auth');
    }
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/feed`, { withCredentials: true });
        setProfiles(response?.data?.users);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
    fetchProfiles();
  }, []);
  console.log(profiles);

  const handleInterested = async (profileId) => {
    try {
      const toUserId = profileId;
      const status = "interested";
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${toUserId}`, {}, {withCredentials:true});
      if (res.status >= 200 && res.status < 300) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleIgnore = (profileId) => {
    // Handle ignore logic (e.g., API call to ignore user)
    setProfiles((prevProfiles) => prevProfiles.filter((p) => p._id !== profileId));
  };

  return (
    <div className="flex justify-between mx-auto p-6 max-w-6xl h-screen space-x-8">
      {/* Left Column: Profiles to Swipe */}
      <div className="w-1/2 overflow-y-scroll border-r border-gray-400 pr-4 no-scrollbar">
        <h2 className="text-xl font-bold text-white mb-4">Explore Profiles</h2>
        {profiles?.length > 0 ? (
          profiles.map((profile) => (
            <div
              key={profile?._id}
              className="bg-gray-800 text-white p-6 rounded-lg mb-6 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold">{profile?.firstName} {profile?.lastName}</h3>
                <p className="text-gray-400">@{profile?.username}</p>
              </div>
              <p className="text-gray-300 mb-2">Job Title: {profile?.jobTitle}</p>
              <p className="text-gray-300 mb-2">About: {profile?.about}</p>
              <p className="text-gray-300 mb-4">Skills: {profile?.skills.join(', ')}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleIgnore(profile?._id)}
                  className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300"
                >
                  Ignore
                </button>
                <button
                  onClick={() => handleInterested(profile?._id)}
                  className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300"
                >
                  Interested
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-300">No more profiles available.</p>
        )}
      </div>

      {/* Right Column: Connection Requests */}
      <div className="w-1/2 overflow-y-scroll no-scrollbar">
        <h2 className="text-xl font-bold text-white mb-4">Connection Requests</h2>
        {connectionRequests.length > 0 ? (
          connectionRequests.map((profile) => (
            <div
              key={profile._id}
              className="bg-gray-800 text-white p-6 rounded-lg mb-6 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold">{profile?.firstName} {profile?.lastName}</h3>
                <p className="text-gray-400">@{profile?.userName}</p>
              </div>
              <p className="text-gray-300 mb-2">Job Title: {profile?.jobTitle}</p>
              <p className="text-gray-300 mb-2">About: {profile?.about}</p>
              <p className="text-gray-300 mb-4">Skills: {profile?.skills.join(', ')}</p>
              <p className="text-green-500">Request Sent</p>
            </div>
          ))
        ) : (
          <p className="text-gray-300">No connection requests yet.</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
