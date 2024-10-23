import React, { useEffect, useState } from 'react'
import { validateUserAuth } from '../utils/validators';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    const isAuth = validateUserAuth();
    if(!isAuth){
      setIsSignIn(true)
    }else{
      setIsSignIn(false)
    }
  }, []);
  const handleLogout = () => {
    Cookies.remove('token');
    navigate("/auth");
  }
  return (
    <div className='flex  bg-gradient-to-b from-black absolute w-screen  '>
        <div className=" flex justify-between  min-h-5 w-full mt-4 p-2 text-white list-none cursor-pointer font-[Poppins] mb-2">
           <div className='text-2xl ml-4'>
            Alumini Connect
            </div>
            <div>
              {isSignIn && 
              <>
              <button className='mr-4' > <Link to='/auth'>Sign In</Link></button>
              </>
              }
              <button className='mr-4' onClick={handleLogout}> Logout</button>
              
            </div>
        </div>
    </div>
  )
}

export default Navbar;