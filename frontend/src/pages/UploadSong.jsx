import React, { useState, useEffect } from 'react';
import spotify_logo from '../components/shared/spotify_logo_white.svg';
import { MdHomeFilled, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdLibraryMusic } from "react-icons/md";
import { VscFolderLibrary } from "react-icons/vsc";
import { FaSearch } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowRoundForward } from "react-icons/io";
import Playlist from '../components/shared/Playlist';
import { Link, useNavigate } from 'react-router-dom';
import CloudinaryUpload from '../components/shared/CloundinaryUpload';
import { makeAuthenticatePOSTrequest } from '../utils/serverHelper';

function UploadSong() {
    const screenW = window.innerWidth;
    const [sidebarWidth, setSidebarWidth] = useState(400);
    const [isResizing, setIsResizing] = useState(false);
    const [screenSizing, setScreenSizing] = useState(screenW - sidebarWidth);
    const [name, setName] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [songUrl, setSongUrl] = useState('');
    const [uploadSongFileName, setUploadSongFileName] = useState('');
    const navigate = useNavigate;

    const submitSong = async ()=>{
        // console.log(songUrl);
        const data = {name, thumbnail, track:songUrl};
        const response = await makeAuthenticatePOSTrequest('/song/create', data);
        // console.log(response);
        if(response.err){
            alert("Could not upload");
            return;
        }
        alert('Song Uploaded');
        navigate('/')

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
                        <span className='flex flex-row items-center py-2 cursor-pointer'>
                            <MdLibraryMusic size={25} />
                            <h2 className='px-3 text-xl font-poppins font-normal'>My Music</h2>
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
                    <div className='playlist mt-6 '>
                        <Playlist
                            playlistName={'First Playlist'}
                            playlistOwner={'RajRoy'} />
                        <Playlist playlistName={'First Playlist'} playlistOwner={'RajRoy'} />
                        <Playlist playlistName={'First Playlist'} playlistOwner={'RajRoy'} />
                        <Playlist playlistName={'First Playlist'} playlistOwner={'RajRoy'} />
                    </div>
                </div>


            </div>

            <div
                className="cursor-resize w-2 h-screen bg-gray-700"
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
                            <Link to={'/upload'}>
                                <button className='text-white p-4 px-4 font-semibold rounded-full'>Upload</button>
                            </Link>
                            <Link to={'/login'}>
                                <button className='bg-[#1db954] h-10 w-10 font-semibold rounded-full mx-4 '>RR</button>
                            </Link>

                        </div>
                    </div>
                </nav>
                {/* main content */}

                <div className='mb-4 '>
                    <h2 className='text-white font-bold text-2xl my-2'>Upload your song</h2>
                    <div className='w-4/5 flex justify-between items-center space-x-8 '>
                        <div className='flex flex-col space-y-2 w-full mt-6'>
                            <label for='name' className='font-semibold flex justify-start text-white text-xl'>Name</label>
                            <input type="text" placeholder='Enter song name' className='border-2 border-gray-500 rounded p-2 placeholder-slate-600' id='name' value={name} onChange={(e) => { setName(e.target.value); }} />
                            
                        </div>
                        <div className='flex flex-col space-y-2 w-full mt-6'>
                            <label for='thumbnail' className='font-semibold flex justify-start text-white text-xl'>Thumbnail</label>
                            <input type="text" placeholder='Enter song name' className='border-2 border-gray-500 rounded p-2 placeholder-slate-600' id='thumbnail' value={thumbnail} onChange={(e) => { setThumbnail(e.target.value); }} />
                            
                        </div>
                        
                    </div>
                    <div className='mt-4'>
                        {uploadSongFileName ? (
                            <div className='bg-white p-3 rounded-full w-1/3 text-lg'> 
                                {uploadSongFileName.substring(0,35)}...
                            </div>
                        ) : (

                    <CloudinaryUpload setUrl={setSongUrl} fileName={setUploadSongFileName}/>
                        )}
                        <div className='flex bg-white w-40 items-center justify-center rounded-full p-4 cursor-pointer mt-4 font-semibold text-lg' onClick={submitSong}>
                            Submit Song
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default UploadSong;