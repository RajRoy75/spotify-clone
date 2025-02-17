import React, { useState, useEffect } from 'react';
import spotify_logo from '../components/shared/spotify_logo_white.svg';
import { MdHomeFilled, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdLibraryMusic } from "react-icons/md";
import { VscFolderLibrary } from "react-icons/vsc";
import { FaSearch } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowRoundForward,IoMdCloseCircle } from "react-icons/io";
import { ImVolumeMedium, ImVolumeMute2 } from "react-icons/im";
import { IoPlaySkipBack, IoPlaySkipForwardSharp, IoPlayCircle, IoPauseCircle } from "react-icons/io5";
import Playlist from '../components/shared/Playlist';
import { Link,Outlet } from 'react-router-dom';
import { Howl } from 'howler';
import useUser from '../hooks/useUser';
import useSearch from '../hooks/useSearch';
import { useQueryClient, useQuery } from 'react-query';
import { getAuth } from 'firebase/auth';
import useCurrentSong from '../hooks/useCurrentSong';
import { usePlayer } from '../hooks/playerProvider';
import { makeAuthenticateGETrequest } from '../utils/serverHelper';
import useUserPlaylist from '../hooks/useUserPlalylist';
import {fetchSearchResults} from '../api/index.js';

function LogedInContainer() {
  const auth = getAuth();
  const user = auth.currentUser;
  // console.log("user from home page ", user);
  const { data, isLoading, isError, refetch } = useUser();
  const { data: userPlaylist, isLoading: playlistLoading, isError: playlistError, refetch: playlistRefetch} = useUserPlaylist();
  const queryClient = useQueryClient();
  const screenW = window.innerWidth;
  const [sidebarWidth, setSidebarWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const [screenSizing, setScreenSizing] = useState(screenW - sidebarWidth);
  const [isMute, setIsMute] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [songDuration, setSongDuration] = useState('00:00');
  const [playlist, setPlaylist] = useState([]);

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State to store the search query
  const [debouncedQuery, setDebouncedQuery] = useState(''); //state to store the debouncedQuery


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { data:searchSong, isLoading:searchSongIsLoading, isError:searchSongIsError } = useSearch(debouncedQuery);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "/") {
        event.preventDefault(); // Prevent default browser behavior (e.g., Quick Find in Firefox)
        setShowSearchModal((prev) => !prev); // Toggle state
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // Function to close the search modal
  const closeSearchModal = () => {
    setShowSearchModal(false);
    setSearchQuery(''); // Clear search query when modal is closed
  };


  const {
    currentSong,
    setCurrentSong,
    songPlayed,
    setSongPlayed,
    isPlaying,
    setIsPlaying,
    playBackTime,
    setPlayBackTime,
    songBar,
    setSongBar,
  } = usePlayer();
  console.log(currentSong);
  const setSong = async(item)=>{
    await setCurrentSong(item);
    setShowSearchModal(false);
    setSearchQuery('');
  }
  const signOutUser = async () => {
    await auth.signOut().then(() => {
      queryClient.setQueryData('User', null);
    })
  }
  const updateVolume = (e) => {
    const newVoulume = e.target.value / 100;
    setVolume(newVoulume);
    if (songPlayed) {
      songPlayed.volume(newVoulume);
    }
  }
  const toggleMute = () => {
    if (isMute) {
      if (songPlayed) {
        songPlayed.volume(volume);
        setIsMute(false);
      }
    } else {
      if (songPlayed) {
        songPlayed.volume(0);
        setIsMute(true);
      }

    }
  }
  useEffect(() => {
    if (!currentSong) return;
    console.log(songPlayed);
    if (songPlayed) {
      songPlayed.stop(); // Stop the previous song
      songPlayed.unload();
      setPlayBackTime(0)
      setSongBar(0);
    }
    const newSong = new Howl({
      src: [currentSong.track],
      html5: true,
      preload: true,
      onload: () => {
        // let time = formatedTime(newSong.duration());
        setSongDuration(newSong.duration());
        //console.log(currentSong.track);
      },
      onloaderror: (_, error) => {
        console.error("Failed to load audio:", error);
      },
      onend: () => setIsPlaying(false)
    });
    setSongPlayed(newSong);
    setIsPlaying(false);
    return () => {
      newSong.stop();
      newSong.unload();
    };


  }, [currentSong]);

  useEffect(() => {
    let interval;
    if (isPlaying && songPlayed) {
      interval = setInterval(() => {
        if (songPlayed.playing()) {
          const currentTime = songPlayed.seek();
          setPlayBackTime(currentTime);
          setSongBar((currentTime / songDuration) * 100);
        }
      }, 500);
    }

    return () => clearInterval(interval);
  }, [isPlaying, songPlayed, songDuration]);

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const currentUser = await auth.currentUser;
        if (!currentUser) {
          console.warn('No user is logged in.');
          return;
        }
        const uid = currentUser.uid;
        const response = await makeAuthenticateGETrequest(`/playlist/get/artist/${uid}`);
        setPlaylist(response.data);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    }
    getPlaylist();
  }, [auth])

  const togglePlayPause = () => {
    if (songPlayed) {
      if (songPlayed.playing()) {
        songPlayed.pause();
        setIsPlaying(false);
      } else {
        songPlayed.play();
        setIsPlaying(true);
      }
    }
  };
  const updateSlider = (e) => {
    const newBarValue = parseInt(e.target.value, 10);
    const newPlayBackTime = (newBarValue / 100) * songDuration;
    setPlayBackTime(newPlayBackTime);
    setSongBar(newBarValue);
    if (songPlayed) {
      songPlayed.seek(newPlayBackTime);
      // if(!isPlaying) togglePlayPause();
    }
  }

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

  const formatedTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
  }

  return (
    <div className='h-screen w-full'>

      {/* ${currentSong ? "h-9/10" : "h-full"} */}
      <div className={`${currentSong ? "h-9/10" : "h-full"} flex w-full`}>
        <div
          className="bg-[#1F2544] text-white h-auto" //overflow-auto
          style={{ width: `${sidebarWidth}px` }}
        >
          {/* Sidebar content goes here */}
          <div className='bg-slate-600 m-2 rounded flex flex-col justify-start items-start p-2 pl-6'>
            <div className="img w-2/4 flex justify-center">
              <img src={spotify_logo} alt="error" />
            </div>
            <div className="sidebar1 mt-2">
              <Link to={'/'}>
                <span className='flex flex-row items-center py-2 cursor-pointer'>
                  <MdHomeFilled size={20} />
                  <h2 className='px-3 text-xl font-poppins font-normal'>Home</h2>
                </span>
              </Link>

              <span className='flex flex-row items-center py-2 cursor-pointer' onClick={() => setShowSearchModal(true)}>
                <FaSearch size={20} />
                <h2 className='px-3 text-xl font-poppins font-normal'>Search</h2>
              </span>
              <Link to={'/mymusic'}>
                <span className='flex flex-row items-center py-2 cursor-pointer'>
                  <MdLibraryMusic size={20} />
                  <h2 className='px-3 text-xl font-poppins font-normal'>My Music</h2>
                </span>
              </Link>
            </div>
          </div>
          <div className="bg-slate-600 m-2 rounded flex flex-col justify-start items-start p-2 pl-6 ">
            <div className='flex w-full'>
              <div className='flex justify-start flex-grow'>
                <span className='flex flex-row items-center py-2 cursor-pointer'>
                  <VscFolderLibrary size={25} />
                  <h2 className='px-3 text-xl font-poppins font-normal'>Your Library</h2>
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='p-2 bg-black items-center rounded-full cursor-pointer mx-2'>
                  <Link to={'/create-playlist'}>
                    <AiOutlinePlus size={30} />
                  </Link>
                </span>
                <span className='p-2 bg-black items-center rounded-full mx-2 cursor-pointer'>
                  <IoIosArrowRoundForward size={30} />
                </span>
              </div>
            </div>
            <div className='playlist mt-6 '>
              {userPlaylist?.data?.length > 0 ? (
                // <PlaylistCardView title={'playlist'} playlisData={playlist}/>
                userPlaylist.data.map((item) => {
                  return (
                    <>
                      <Link to={`/playlist/${item._id}`} key={item._id}>
                        <Playlist
                          key={item._id}
                          playlistName={item.name}
                          img={item.thumbnail}
                          playlistOwner={item.owner.firstName + " " + item.owner.lastName}
                        />
                      </Link>
                    </>
                  )
                })

              ) : (
                  <p>Create Playlist</p>
                )}

            </div>
          </div>


        </div>

        <div
          className="cursor-resize w-2 h-auto bg-gray-700"
          onMouseDown={handleMouseDown}
        />

        <div className={`flex-1 bg-black bg-opacity-85 p-2 w-${screenSizing} overflow-auto`}>
          {/* <Navbar screen={screenSizing} /> */}
          <nav className={`bg-black  h-20 w-${screenSizing} rounded sticky top-0`}>
            <div className='flex items-center w-full h-full justify-between flex-grow'>
              <div className="right flex items-center text-white ml-6">
                <span className='p-2 bg-black items-center rounded-full cursor-pointer mx-2'><MdKeyboardArrowLeft size={30} /></span>
                <span className='p-2 bg-black items-center rounded-full cursor-pointer mx-2'><MdKeyboardArrowRight size={30} /></span>
              </div>
              <div className="left flex items-center">
                {data ? (
                  <>
                    <Link to={'/upload'}>
                      <button className='text-white p-4 px-4 font-semibold rounded-full'>Upload</button>
                    </Link>
                    <div className='text-white p-4 px-4 font-semibold rounded-full cursor-pointer' onClick={signOutUser}>
                      Log Out
                    </div>
                    <Link to={'/login'}>
                      <button className='bg-[#1db954] h-10 w-10 font-semibold rounded-full mx-4 text-white text-xl'>{data?.email[0].toUpperCase()}</button>
                    </Link>
                  </>
                ) : (
                    <>
                      <Link to={'/signup'}>
                        <button className='text-white p-4 px-4 font-semibold rounded-full'>Sign Up</button>
                      </Link>
                      <Link to={'/login'}>
                        <button className='text-white p-4 px-4 font-semibold rounded-full'>LogIn</button>
                      </Link>

                    </>
                  )}


              </div>
            </div>
          </nav>
          {/* Modal */}
          {showSearchModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
              <div className="bg-black rounded-lg shadow-lg w-96 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">Search</h2>
                  <button
                    onClick={closeSearchModal}
                    className="focus:outline-none"
                  >
                    <IoMdCloseCircle className="text-blue-400 hover:text-red-500" size={40} />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Search for songs or playlists..."
                  className="w-full px-4 py-2 mb-4 bg-gray-700 text-white rounded focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="space-y-2">
                  {searchSong?.length > 0 ? (
                    searchSong?.map((item) => (
                      <div key={item._id} className="flex items-center p-2 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer" onClick={ ()=> {setSong(item)}}>
                        <img src={item.thumbnail} alt={item.title || item.name} className="w-10 h-10 rounded" />
                        <div className="ml-3">
                          <p className="text-white font-semibold">{item.title || item.name}</p>
                          <p className="text-gray-400 text-sm">
                            {item.owner ? `${item.owner.firstName} ${item.owner.lastName}` : 'Song'}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                      <p className="text-gray-400">No results found</p>
                    )}
                </div>
                <button
                  onClick={closeSearchModal}
                  className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {/* main content */}

          <div className='mb-4 '>
            <Outlet />
          </div>
        </div>
      </div>
      {
        currentSong &&

          <div className='bg-black h-1/10 flex justify-between text-white px-5 items-center relative w-full z-1'>
            <div className='flex'>
              <div className='w-[50px] h-[50px] rounded-full'>
                <img src={currentSong.thumbnail || ''} alt="error" className='rounded object-cover w-[50px] h-[50px] cursor-pointer' />
              </div>
              <div className='pl-4 flex flex-col justify-between'>
                <span className='font-normal text-lg text-white cursor-pointer'>{currentSong.name}</span> 
                <span className='font-normal text-xs text-gray-300 cursor-pointer' >{currentSong.artist.firstName + " " + currentSong.artist.lastName}</span>

              </div>
            </div>
            <div className='flex items-center justify-center flex-col'>
              <div>
                <div className='flex items-center  justify-center'>
                  <span><IoPlaySkipBack size={25} color="grey" className='hover:cursor-pointer ' /></span>
                  <span className='hover:scale-110 cursor-pointer mx-2' onClick={() => { togglePlayPause() }}>
                    {isPlaying ? <IoPauseCircle size={40} /> : <IoPlayCircle size={40} />}
                  </span>
                  <span><IoPlaySkipForwardSharp size={25} color="grey" className='hover:cursor-pointer' /></span>
                </div>
              </div>
              <div className='flex '>
                <span>{formatedTime(playBackTime)}</span>
                <div>
                  <input
                    type="range"
                    className='cursor-pointer'
                    min={0}
                    max={100}
                    value={songBar}
                    onChange={updateSlider} />
                </div>
                <span>{formatedTime(songDuration)}</span>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <div>
                <span onClick={() => { toggleMute() }} className='cursor-pointer'>
                  {isMute ? <ImVolumeMute2 size={25} color="#D91656" className='mx-2' /> : <ImVolumeMedium size={25} className='mx-2' />}

                </span>
              </div>
              <div>
                <input
                  type="range"
                  className='accent-slate-500 cursor-pointer'
                  value={volume * 100}
                  min={0}
                  max={100}
                  onChange={updateVolume}
                />
              </div>
            </div>
          </div>

      }

    </div>
  )
}

export default LogedInContainer;
