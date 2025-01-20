import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaUserCircle, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { io } from "socket.io-client";
import Cookies from "js-cookie";

const ChatPage = () => {
  const { toUserName } = useParams();
  const { toUserId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessage] = useState([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(addUser(storedUser));
    }
  }, [dispatch]);

  const getChatData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/chat/${toUserId}`, {
        withCredentials: true,
      });
      console.log(res?.data?.messages);

      const chatMessages = res?.data?.messages.map((msg) => {
        const { createdAt } = msg;
        const date = new Date(createdAt);

        const formattedTime = date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        return {
          firstName: msg?.senderId?.firstName,
          text: msg.text,
          time: formattedTime,
        };
      });
      setMessage(chatMessages);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getChatData();
  }, []);
  // This effect is triggered when loggedUser is updated
  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // As soon as the page loaded, the socket connection is made and joinChat event is emitted

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      toUserId,
    });

    socket.on("messageReceived", ({ firstName, text, time }) => {
      console.log(firstName + " :  " + text);
      setMessage((messages) => [...messages, { firstName, text, time }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, toUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      toUserId,
      text: newMessage,
      time: time,
    });
    setNewMessage("");
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="p-4 flex items-center gap-3 bg-gray-800 shadow-lg">
        <FaArrowLeft
          className="text-2xl cursor-pointer text-gray-300 hover:text-white transition"
          onClick={() => navigate("/")}
        />
        <FaUserCircle className="text-3xl text-gray-300" />
        <h2 className="text-lg font-semibold">{toUserName}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-3 no-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              user?.firstName === msg?.firstName
                ? "justify-end"
                : "justify-start"
            }`}
          >
           <div className="flex flex-col">
           <div
              className={`p-3 rounded-lg max-w-xs ${
                user.firstName === msg.firstName
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-white"
              }` } onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              {msg.text}
              
            </div>
            <span className={` text-white text-[10px] transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>{msg.time}</span>
           </div>
           
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-gray-800 flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
        >
          <FaPaperPlane className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
