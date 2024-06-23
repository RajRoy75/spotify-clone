import React from 'react';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';

function Navbar({screen, txt1, txt2}) {
  // console.log(screen)
  return (
    <>

      <nav className={`bg-black  h-20 w-${screen} rounded sticky top-0`}>
        <div className='flex items-center w-full h-full justify-between flex-grow'>
          <div className="right flex items-center text-white ml-6">
            <span className='p-2 bg-black items-center rounded-full cursor-pointer mx-2'><MdKeyboardArrowLeft size={30} /></span>
            <span className='p-2 bg-black items-center rounded-full cursor-pointer mx-2'><MdKeyboardArrowRight size={30} /></span>
          </div>
          <div className="left flex items-center">
            <Link to={'/signup'}>
              <button className='text-white p-4 px-8 font-semibold rounded-full'>{txt2}</button>
            </Link>
            <Link to={'/login'}>
              <button className='bg-[#1db954] p-4 px-8 font-semibold rounded-full mx-4 '>{txt1}</button>
            </Link>

          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar