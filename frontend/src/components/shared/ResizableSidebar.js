import React, { useState, useEffect } from 'react';
import spotify_logo from './spotify_logo_white.svg';
import { MdHomeFilled } from "react-icons/md";
import { VscFolderLibrary } from "react-icons/vsc";
import { FaSearch } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowRoundForward } from "react-icons/io";
// import Playlist from './Playlist';
import Navbar from './Navbar';
import ArtistCard from './ArtistCard';
import PlaylistCardView from './PlaylistCardView';

function ResizableSidebar() {
  const screenW = window.innerWidth;
  const [sidebarWidth, setSidebarWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const [screenSizing, setScreenSizing] = useState(screenW - sidebarWidth);
  // const scree = window.innerWidth;

  const playlistData = [
    {
      ArtistName: 'Animal',
      desc: 'Manan Bharadwaj',
      img: 'https://th.bing.com/th/id/OIP.raJCZ85vDTelZDnG2LbH-wHaKX?w=182&h=254&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    },
    {
      ArtistName: 'Still Rollin',
      desc: 'Shubh',
      img: 'https://th.bing.com/th/id/OIP.nvcfQds84bZRnuh5A5E3rQHaJh?w=198&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    },
    {
      ArtistName: 'Moose Tape',
      desc: 'Sidhu Moose Wala',
      img: 'https://th.bing.com/th/id/OIP.5coWGeDHjo13AuKLNusnPQHaJQ?w=149&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    },
    {
      ArtistName: 'Husn',
      desc: 'Anuv Jain',
      img: 'https://th.bing.com/th/id/OIP.6X9X5wqX3maXmudetP2XqAHaJQ?w=131&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    },
    {
      ArtistName: 'Ghost',
      desc: 'Diljit Doshanjh',
      img: 'https://magarticles.magzter.com/articles/2009/460435/5ed487e90eff8/DILJIT-DOSANJHNEW-DATE.jpeg'
    }
  ]

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing) {
        const screen = window.innerWidth
        const newWidth = e.clientX;
        setSidebarWidth(newWidth);
        setScreenSizing(screen - newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleMouseDown = () => {
    setIsResizing(true);
  };
  return (
    <div className="flex h-screen">
      <div
        className="bg-[#1F2544] text-white "
        style={{ width: `${sidebarWidth}px` }}
      >
        {/* Sidebar content goes here */}
        <div className='bg-slate-600 m-2 rounded flex flex-col justify-start items-start p-2 pl-6'>
          <div className="img w-3/4 flex justify-center">
            <img src={spotify_logo} alt="error" />
          </div>
          <div className="sidebar1 mt-2">
            <span className='flex flex-row items-center py-2 cursor-pointer'>
              <MdHomeFilled size={25} />
              <h2 className='px-3 text-xl font-poppins font-normal'>Home</h2>
            </span>
            <span className='flex flex-row items-center py-2 cursor-pointer'>
              <FaSearch size={25} />
              <h2 className='px-3 text-xl font-poppins font-normal'>Search</h2>
            </span>
          </div>
        </div>
        <div className="bg-slate-600 m-2 rounded flex flex-col justify-start items-start p-2 pl-6">
          <div className='flex w-full'>
            <div className='flex justify-start flex-grow'>
              <span className='flex flex-row items-center py-2 cursor-pointer'>
                <VscFolderLibrary size={25} />
                <h2 className='px-3 text-xl font-poppins font-normal'>Your Library</h2>
              </span>
            </div>
            <div className='flex items-center '>
              <span className='p-2 bg-black items-center rounded-full cursor-pointer'>
                <AiOutlinePlus size={30} />
              </span>
              <span className='p-2 bg-black items-center rounded-full mx-2 cursor-pointer'>
                <IoIosArrowRoundForward size={30} />
              </span>
            </div>
          </div>
          {/* <div className='playlist mt-6 '>
            <Playlist 
            playlistName={'First Playlist'} 
            playlistOwner={'RajRoy'} />
            <Playlist playlistName={'First Playlist'} playlistOwner={'RajRoy'} />
            <Playlist playlistName={'First Playlist'} playlistOwner={'RajRoy'} />
            <Playlist playlistName={'First Playlist'} playlistOwner={'RajRoy'} />
          </div> */}
        </div>


      </div>

      <div
        className="cursor-resize w-2 h-screen bg-gray-700"
        onMouseDown={handleMouseDown}
      />

      <div className={`flex-1 bg-black bg-opacity-85 p-2 w-${screenSizing} overflow-auto`}>
        <Navbar screen={screenSizing} txt1={"LOG IN"} txt2={"SIGN UP"}/>
        {/* main content */}

        <div className='mb-4 '>
          <h2 className='text-white font-bold text-2xl my-2'>Popular Artist</h2>
          <div className='grid grid-auto-flow grid-cols-5 gap-2'>
            <ArtistCard
              ArtistName={'Arijit Singh'}
              desc={'Artist'}
              img={"https://th.bing.com/th/id/OIP.oCqMXfAnD-bPvxb6j3p_8gHaGP?w=220&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7"}
            />
            <ArtistCard
              ArtistName={'Pritam'}
              desc={'Artist'}
              img={"https://th.bing.com/th/id/OIP.0mNM1VgA2xXgxdF2NcQ4hgHaFj?w=264&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7"}
            />
            <ArtistCard
              ArtistName={'Anirudh Ravichander'}
              desc={'Artist'}
              img={"https://th.bing.com/th/id/OIP.QY7VEVEJ50arV6WPVlptbQHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7"}
            />
            <ArtistCard
              ArtistName={'Shreya Ghoshal'}
              desc={'Artist'}
              img={"https://th.bing.com/th/id/OIP.l50jHCB13wkpna3DFWDO9AHaFj?w=232&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"}
            />
            <ArtistCard
              ArtistName={'Alka Yagnik'}
              desc={'Artist'}
              img={"https://th.bing.com/th/id/OIP.FfjdqNMB6ERTTyLpvjugYwHaEK?w=297&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"}
            />
          </div>
        </div>
        {/* dsfsdf */}
        <PlaylistCardView title={"Hindi Playlist"} playlisData={playlistData} />
        {/* dsfsdf */}
        <PlaylistCardView title={"English Playlist"} playlisData={playlistData} />



      </div>
    </div>
  )
}

export default ResizableSidebar