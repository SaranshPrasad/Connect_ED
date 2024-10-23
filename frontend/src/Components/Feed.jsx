import { useNavigate } from "react-router-dom";
import { getAllConnection, getConnectionReceived, getFeedData, getLoggedInUserData } from "../utils/getDatas";
import { validateUserAuth } from "../utils/validators";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import Navbar from './Navbar';
const Feed = () => {
  const [profiles, setProfiles] = useState([]);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null); 
  const [connections, setConnection] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profiles
    const isAuth = validateUserAuth();
    if (!isAuth) {
      navigate('/auth');
    }

    const fetchProfiles = async () => {
      const data = await getFeedData();
      setProfiles(data);
    };

    const fetchConnectionRequests = async () => {
      const data = await getConnectionReceived();
      setConnectionRequests(data);
      console.log(connectionRequests);
    };

    // Fetch logged-in user profile (mocking the request, you will have to replace with real API)
    const fetchLoggedInUser = async () => {
      const user = await getLoggedInUserData(); // Replace with your actual user data API
      setLoggedInUser(user);
    };
    const fetchAllConnections = async () => {
      const res = await getAllConnection();
      setConnection(res);
    }
    fetchProfiles();
    fetchConnectionRequests();
    fetchLoggedInUser();
    fetchAllConnections();
  }, []);

  const handleInterested = async (profileId) => {
    try {
      const toUserId = profileId;
      const status = "interested";
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${toUserId}`, {}, { withCredentials: true });
      if (res.status >= 200 && res.status < 300) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleIgnore = async (profileId) => {
    try {
      const toUserId = profileId;
      const status = "ignored";
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${toUserId}`, {}, { withCredentials: true });
      if (res.status >= 200 && res.status < 300) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async  (rId) => {
    try {
      const requestId = rId;
      const status = "accepted";
      const res = await axios.post(`${BASE_URL}/request/review/${status}/${requestId}`, {}, { withCredentials: true });
      if (res.status >= 200 && res.status < 300) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async  (rId) => {
   
    try {
      const requestId = rId;
      const status = "rejected";
      const res = await axios.post(`${BASE_URL}/request/review/${status}/${requestId}`, {}, { withCredentials: true });
      if (res.status >= 200 && res.status < 300) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex justify-between m-auto p-6  h-screen space-x-8  bg-black text-wrap  inset-0  bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      
      {/* Left Column: Logged-in User Profile */}
      <div className="w-1/6 bg-gray-900 text-white p-6 rounded-lg shadow-md h-fit mt-20">
        {loggedInUser ? (
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">{loggedInUser.firstName} {loggedInUser.lastName}</h2>
            <p className="text-gray-400 mb-4">@{loggedInUser.userName}</p>
            <p className="text-gray-300 mb-2">Job Title: {loggedInUser.jobTitle}</p>
            <p className="text-gray-300">Skills: {loggedInUser.skills?.join(', ') || 'No skills listed'}</p>
          </div>
        ) : (
          <p>Loading your profile...</p>
        )}
      </div>

      {/* Middle Column: Swipeable Profiles */}
      <div className="w-3/6 overflow-y-scroll no-scrollbar mt-10">
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
              <p className="text-gray-300 mb-4">Skills: {profile?.skills?.join(', ') || 'No skills listed'}</p>
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
      <div className="w-1/6 mt-20">
      <div className=" bg-gray-800 text-white p-4 rounded-lg shadow-md h-fit mb-3">
        <h2 className="text-xl font-bold mb-4">Connection Requests</h2>
        <div className=" p-4 rounded-lg shadow-md bg-slate-300 text-black">
        {connectionRequests?.length > 0 ? (
          connectionRequests.map((request) => (
            <div key={request._id} className="mb-4">
              <h3 className="text-lg font-bold">
                {request?.fromUserId?.firstName || 'Unknown'}
              </h3>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleAccept(request?._id)}
                  className=" text-green-700 font-semibold py-2 px-3 rounded transition-all duration-300"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request?._id)}
                  className="  text-red-700 font-semibold py-2 px-3 rounded transition-all duration-300"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="">No connection requests yet.</p>
        )}
        </div>
      </div>
      <div className=" bg-gray-800 text-white p-4 rounded-lg shadow-md h-fit">
      <h2 className="text-xl font-bold mb-4">Connections</h2>
        <div className="bg-slate-400 p-4 rounded-lg shadow-md h-fit text-black">
        
        {connections?.length > 0 ? (
          connections.map((request) => (
            <div key={request._id} className="mb-4">
              <h3 className="text-lg font-bold">
                {request?.firstName || 'Unknown'}
              </h3>
              <div className="flex justify-between mt-2">
                <p className="text-white-800">See Posts</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-300">No connection  yet.</p>
        )}
        </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default Feed;
