import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex  bg-gradient-to-b from-black absolute w-screen  '>
        <div className=" flex justify-between  min-h-5 w-full mt-4 p-2 text-white list-none cursor-pointer font-[Poppins] mb-2">
           <div className='text-2xl ml-4'>
            Alumini Connect
            </div>
            <div>
              <button className='mr-4'> Sign In</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar;