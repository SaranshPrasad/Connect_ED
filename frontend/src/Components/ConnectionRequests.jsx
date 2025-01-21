import React, { useEffect, useState } from "react";
import { getConnectionReceived } from "../utils/getDatas";
import { FaCheck, FaTimes } from "react-icons/fa";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import Navbar from "./Navbar";
import Cookies from "js-cookie";
const ConnectionRequests = () => {
    const token = Cookies.get("token");
  const [connections, setConnections] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success or error
  const options = {
    withCredentials: true,
     headers:{'Authorization': `Bearer ${token}`}
  }
  useEffect(() => {
    const fetchConnectionRequests = async () => {
      const data = await getConnectionReceived();
      setConnections(data);
      console.log(connections);
    };
    fetchConnectionRequests();
  }, [connections]);

  const handleAccept = async (rId) => {
    try {
      const requestId = rId;
      const status = "accepted";
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        options
      );
      if (res.status >= 200 && res.status < 300) {
        setMessage("Request Accepted!");
        setMessageType("success");
        setTimeout(() => window.location.reload(), 2000);
      }
    } catch (error) {
      setMessage("An error occurred while accepting the request.");
      setMessageType("error");
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
        options
      );
      if (res.status >= 200 && res.status < 300) {
        setMessage("Request Declined!");
        setMessageType("error");
        setTimeout(() => window.location.reload(), 2000); // Refresh after showing message
      }
    } catch (error) {
      setMessage("An error occurred while rejecting the request.");
      setMessageType("error");
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black text-white">
        <h1 className="mb-3 text-center text-2xl font-semibold">
          Connections Requests
        </h1>

        {/* Alert Box */}
        {message && (
          <div
            role="alert"
            className={`alert ${messageType === "success" ? "alert-success" : "alert-error"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  messageType === "success"
                    ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    : "M6 18L18 6M6 6l12 12"
                }
              />
            </svg>
            <span>{message}</span>
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          {connections.length > 0 ? (
            connections.map((req) => (
              <div
                key={req?._id}
                className="bg-gray-900 flex w-3/4 justify-between items-center p-4 rounded-lg shadow-lg"
              >
                <div className="flex justify-center h-auto items-center gap-2">
                  <img
                    src={req?.fromUserId?.photoUrl}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <p className="text-lg">
                    {req?.fromUserId?.firstName || "Unknown"}
                  </p>
                </div>
                <div className="flex items-center h-auto gap-1">
                  <button className="" onClick={() => handleReject(req?._id)}>
                    <FaTimes className="text-xl" />
                  </button>
                  <button onClick={() => handleAccept(req?._id)}>
                    <FaCheck className="text-lg" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 mt-4">
              No connection requests.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ConnectionRequests;
