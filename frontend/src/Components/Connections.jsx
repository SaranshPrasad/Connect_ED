import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getAllConnection } from "../utils/getDatas";
import { FaRegCommentDots,FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
const Connections = () => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const getConnectionsData = async () => {
      const res = await getAllConnection();
      setConnections(res);
    };
    getConnectionsData();
  }, []);
  console.log(connections);
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black text-white">
        <h1 className="mb-3 text-center text-2xl font-semibold">Connections</h1>
        <div className="flex flex-col items-center gap-4">
          {connections.length > 0 ? (
            connections.map((connection, _id) => (
              <div
                key={connection._id}
                className="bg-gray-900 flex w-3/4 justify-between items-center p-4 rounded-lg shadow-lg"
              >
                <div className="flex  justify-center h-auto items-center gap-2">
                  <img
                    src={connection?.photoUrl}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <p className="text-lg">{connection?.firstName}</p>
                </div>
                <div className="flex items-center h-auto gap-1">
                <Link
                  to={`/user/post/${connection?._id}`}
                  className=" text-white rounded-md text-sm"
                >
                  <FaEye className="text-xl"/>
                </Link>
                <Link to={`/chat/${connection?.firstName}/${connection?._id}`} className="px-4 py-2  text-white rounded hover:bg-gray-800">
                  <FaRegCommentDots className="text-lg" />
                </Link>
                </div>
                
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 mt-4">
              No connections found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Connections;
