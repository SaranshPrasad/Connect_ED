import React, { useEffect } from 'react'
import { validateUserAuth } from '../utils/validators'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Feed = () => {
  const navigate = useNavigate();
  const isValidUser = validateUserAuth();
  
  useEffect(() => {
    if(!isValidUser){
      navigate("/auth");
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    navigate("/auth");
  }
  return (
    <div>Feed <br />
      <button onClick={handleLogout}> Logout</button>
      <br />
    </div>
  )
}

export default Feed