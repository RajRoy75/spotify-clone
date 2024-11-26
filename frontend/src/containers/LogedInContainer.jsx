import React, { useState, useEffect, useContext } from 'react';
import spotify_logo from '../components/shared/spotify_logo_white.svg';
import { MdHomeFilled, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdLibraryMusic } from "react-icons/md";
import { VscFolderLibrary } from "react-icons/vsc";
import { FaSearch } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowRoundForward } from "react-icons/io";
import { ImVolumeMedium, ImVolumeMute2 } from "react-icons/im";
import { IoPlaySkipBack, IoPlaySkipForwardSharp, IoPlayCircle, IoPauseCircle } from "react-icons/io5";
import Playlist from '../components/shared/Playlist';
// import Navbar from '../components/shared/Navbar';
// import ArtistCard from '../components/shared/ArtistCard';
// import PlaylistCardView from '../components/shared/PlaylistCardView';
import { Link } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import songContext from '../context/SongContext';
import useUser from '../hooks/useUser';
import { useQueryClient } from 'react-query';
import { auth } from '../utils/firebase';
import { getAuth } from 'firebase/auth';
import useCurrentSong from '../hooks/useCurrentSong';


function LogedInContainer({ children }) {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log("user from home page ", user);
    const { data, isLoading, isError, refetch } = useUser();
    console.log("data from react-query", data);
    const { data: currentSong, isLoading: songLoading, isError: songError, refetch: songRefetch } = useCurrentSong();
    const queryClient = useQueryClient();
    const screenW = window.innerWidth;
    const [sidebarWidth, setSidebarWidth] = useState(400);
    const [isResizing, setIsResizing] = useState(false);
    const [screenSizing, setScreenSizing] = useState(screenW - sidebarWidth);
    // const [songData, setSongData] = useState([]);
    const [songPlayed, setSongPlayed] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [volume, setVolume] = useState(0.3);
    // const scree = window.innerWidth;
    const songUrlHC = "https://res.cloudinary.com/djtwqlcgo/video/upload/v1711198154/gbdduppidnjchcorl5nl.mp3";

    // const { currentSong, setCurrentSong } = useContext(songContext);
    // console.log(currentSong);
    const signOutUser = async () => {
        await auth.signOut().then(() => {
            queryClient.setQueryData('User', null);
        })
    }
    const playSong = (songSrc) => {
        if (songPlayed) {
            // If a song is already loaded
            if (songPlayed.playing()) {
                // Pause if currently playing
                songPlayed.pause();
                setIsPlaying(false);
            } else {
                // Play if paused
                songPlayed.play();
                setIsPlaying(true);
            }
        } else {
            // Load and play a new song if no song is loaded
            const sound = new Howl({
                src: [songSrc],
                html5: true,
            });
            setSongPlayed(sound);
            sound.play();
            setIsPlaying(true);
        }


        // if (songPlayed) {
        //     songPlayed.stop();
        //     setIsPlaying(false);
        // }
        // var sound = new Howl({
        //     src: [songSrc],
        //     html5: true
        // });
        // setSongPlayed(sound)
        // sound.play();
        // setIsPlaying(true);
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


    // const playPause = () => {
    //     if (songPlayed) {
    //         if (songPlayed.playing()) {
    //             songPlayed.pause();
    //             setIsPlaying(false);
    //         } else {
    //             songPlayed.play();
    //             setIsPlaying(true);
    //         }
    //     }
    // }
    useEffect(() => {
        if (currentSong) {
            if (songPlayed) {
                songPlayed.stop(); // Stop the previous song
            }
            const newSong = new Howl({
                src: [currentSong.track], // Use the source from `currentSong`
                html5: true,
                onend: () => setIsPlaying(false),
            });
            setSongPlayed(newSong);
            // newSong.play();
            setIsPlaying(false);
        }
    }, [currentSong]); // Re-run effect whenever `currentSong` changes

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

                            <span className='flex flex-row items-center py-2 cursor-pointer'>
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
                            <div className='flex items-center '>
                                <span className='p-2 bg-black items-center rounded-full cursor-pointer'>
                                    <AiOutlinePlus size={30} />
                                </span>
                                <span className='p-2 bg-black items-center rounded-full mx-2 cursor-pointer'>
                                    <IoIosArrowRoundForward size={30} />
                                </span>
                            </div>
                        </div>
                        <div className='playlist mt-6 '>
                            <Playlist
                                playlistName={'First Playlist'}
                                playlistOwner={'RajRoy'} />
                            <Playlist playlistName={'First Playlist'} playlistOwner={'RajRoy'} />
                            <Playlist playlistName={'First Playlist'} playlistOwner={'RajRoy'} />
                            {/* <Playlist playlistName={'First Playlist'} playlistOwner={'RajRoy'} /> */}
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
                    {/* main content */}

                    <div className='mb-4 '>
                        {children}
                    </div>
                </div>
            </div>
            {
                currentSong &&

                <div className='bg-black h-1/10 flex justify-between text-white px-5 items-center relative'>
                    <div className='flex'>
                        <div className='w-[50px] h-[50px] rounded-full' onClick={() => { playSong(currentSong.track) }}>
                            <img src={currentSong.thumbnail || ''} alt="error" className='rounded object-cover w-[50px] h-[50px] cursor-pointer' />
                        </div>
                        <div className='pl-4 flex flex-col justify-between'>
                            <span className='font-semibold cursor-pointer'>{songLoading ? 'Loading...': currentSong.name}</span>
                            <span className='font-normal text-xs text-gray-300 cursor-pointer' >{currentSong.artist.firstName + " " + currentSong.artist.lastName}</span>

                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className='flex items-center  justify-center'>
                            <span><IoPlaySkipBack size={25} color="grey" className='hover:cursor-pointer ' /></span>
                            <span className='hover:scale-110 cursor-pointer mx-2' onClick={() => { togglePlayPause() }}>
                                {isPlaying ? <IoPauseCircle size={40} /> : <IoPlayCircle size={40} />}
                            </span>
                            <span><IoPlaySkipForwardSharp size={25} color="grey" className='hover:cursor-pointer' /></span>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div>
                            <span onClick={() => { toggleMute() }} className='cursor-pointer'>
                                {isMute ? <ImVolumeMute2 size={25} color="#D91656" className='mx-2'/> : <ImVolumeMedium size={25} className='mx-2'  />}
                                
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