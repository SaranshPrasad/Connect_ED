import React, { useEffect, useState } from 'react'
import Herosection from './Herosection'
import { validateUserAuth } from '../utils/validators';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isUserAuthenticated = validateUserAuth();
  if(isUserAuthenticated){
    navigate("/user/feed")
  }
  }, []);
  return (
    <div className='font-[Poppins] '>
        <Herosection/>
    </div>
  )
}

export default Home