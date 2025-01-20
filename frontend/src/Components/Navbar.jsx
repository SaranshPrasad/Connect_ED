import React, { useEffect, useState } from 'react';
import { validateUserAuth } from '../utils/validators';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';

const Navbar = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    setIsSignIn(!validateUserAuth());
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/auth/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md  w-full z-10 top-0 px-4 md:px-8">
      {/* Left Side: Brand Logo */}
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-gray-500">Connect-ED</Link>
      </div>

      {/* Right Side: Profile Dropdown */}
      <div className="flex-none">
        
        <div className="dropdown dropdown-end">
          <div tabIndex={1} role="button" className=" btn-circle avatar px-1">
            <div className="w-10 rounded-full">
              <img
                alt="User Profile"
                src={user?.photoUrl}
              />
            </div>
          </div>
          <ul 
            tabIndex={0} 
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ">
            <li><Link to="/user/profile" className='text-white'>Profile</Link></li>
            <li><Link to="/user/post" className='text-white'>Create Posts</Link></li>
            <li><Link to="/connections" className='text-white'>Connections</Link></li>
            <li><Link to="/user/feed" className='text-white'>Feed</Link></li>
            <li><Link to="/connections/requests" className='text-white'>Requests</Link></li>


            <li><button onClick={handleLogout} className=' text-white'>Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
