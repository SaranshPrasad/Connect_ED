import { Link, useNavigate } from "react-router-dom";
import {
  getAllConnection,
  getConnectionReceived,
  getFeedData,
  getLoggedInUserData,
} from "../utils/getDatas";
import { validateUserAuth } from "../utils/validators";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import Navbar from "./Navbar";
import ProfileCards from "./ProfileCards";
import { useSelector } from "react-redux";

const Feed = () => {
  const [profiles, setProfiles] = useState([]);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [connections, setConnection] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    const isAuth = validateUserAuth();
    if (!isAuth) {
      navigate("/auth");
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
    const fetchAllConnections = async () => {
      const res = await getAllConnection();
      setConnection(res);
    };
    fetchProfiles();
    fetchConnectionRequests();
    fetchAllConnections();
  }, []);
  const handleAccept = async (rId) => {
    try {
      const requestId = rId;
      const status = "accepted";
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      if (res.status >= 200 && res.status < 300) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (rId) => {
    try {
      const requestId = rId;
      const status = "rejected";
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      if (res.status >= 200 && res.status < 300) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(connections);
  return (
    <>
      <Navbar />
      <div className="flex justify-between  p-6 m-auto overflow-hidden max-h-screen space-x-8  overflow-y-scroll no-scrollbar  text-wrap  bg-gradient-to-b from-black via-gray-900 to-black text-white">
        <div className="w-1/6 bg-gray-900 text-white p-6 rounded-lg shadow-md h-fit hidden md:block">
          {user ? (
            <div className="mb-4">
              <img
                src={user?.photoUrl}
                alt="userphoto"
                className="w-full h-full object-cover rounded-full border-4 border-gray-700"
              />
              <h2 className="text-lg font-bold mb-2">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-400 mb-4">@{user?.userName}</p>
              <p className="text-gray-300 mb-2">
                Job Title: {user?.jobTitle}
              </p>
              {user?.skills ? (
                <ul className="flex flex-wrap gap-2 mt-2">
                  {user?.skills.map((skill, index) => (
                    <li
                      key={index}
                      className="bg-gray-800 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-lg text-gray-300">No skills added.</p>
              )}
            </div>
          ) : (
            <p>Loading your profile...</p>
          )}
        </div>
        <div className="w-full md:w-3/6  overflow-y-scroll no-scrollbar h-[100vh]">
  <h2 className="text-lg md:text-xl font-bold text-white mb-4 text-center md:text-left">
    Explore Profiles
  </h2>
  {profiles?.length > 0 ? (
    profiles.map((profile) => (
      <div
        key={profile?._id}
        className=" text-white  md:p-6  mb-4 md:mb-6  hover:shadow-xl transition-shadow duration-300 "
      >
        <ProfileCards
          photoUrl={profile?.photoUrl}
          firstName={profile?.firstName}
          lastName={profile?.lastName}
          username={profile?.userName}
          jobTitle={profile?.jobTitle}
          id={profile?._id}
          about={profile?.about}
          skill={profile?.skills?.join(", ") || "No skills listed"}
          location={profile?.location}
        />
      </div>
    ))
  ) : (
    <p className="text-gray-300 text-center">No more profiles available.</p>
  )}
</div>

        <div className="w-1/6 overflow-y-scroll no-scrollbar hidden md:block">
          <div className=" bg-gray-900 text-white p-4 rounded-lg shadow-md h-fit mb-3">
            <h2 className="text-xl font-bold mb-4">Connection Requests</h2>
            <div className=" p-4 rounded-lg shadow-md bg-slate-300 text-black">
              {connectionRequests?.length > 0 ? (
                connectionRequests.map((request) => (
                  <div key={request._id} className="mb-4">
                    <h3 className="text-lg font-bold">
                      <img
                        src={request?.fromUserId?.photoUrl}
                        alt="userphoto"
                      />
                      {request?.fromUserId?.firstName || "Unknown"}
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
        </div>
      </div>
    </>
  );
};

export default Feed;
