import React from 'react';
// import spotify_logo from '../components/shared/spotify_logo_white.svg';
// import { MdHomeFilled, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdLibraryMusic } from "react-icons/md";
// import { VscFolderLibrary } from "react-icons/vsc";
// import { FaSearch } from "react-icons/fa";
// import { AiOutlinePlus } from "react-icons/ai";
// import { IoIosArrowRoundForward } from "react-icons/io";
// import { IoPlaySkipBack, IoPlaySkipForwardSharp, IoPlayCircle, IoPauseCircle } from "react-icons/io5";
// import Playlist from '../components/shared/Playlist';
// import Navbar from '../components/shared/Navbar';
import ArtistCard from '../components/shared/ArtistCard';
import PlaylistCardView from '../components/shared/PlaylistCardView';
// import { Link } from 'react-router-dom';
// import { Howl, Howler } from 'howler';
import LogedInContainer from '../containers/LogedInContainer';
import { getAuth } from "firebase/auth";
import useUser from '../hooks/useUser';
// import { useQueryClient } from 'react-query';

function LogedInHome() {
  const { data, isLoading, isError,refetch } = useUser();
  // console.log(`data from react-query `, data);
  // const queryClient = useQueryClient();
  const auth = getAuth();
  const user = auth.currentUser;
  console.log("user from home page ", user);

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

  return (

    <div>
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
      <PlaylistCardView title={"Hindi Playlist"} playlisData={playlistData} />
      <PlaylistCardView title={"English Playlist"} playlisData={playlistData} />
    </div>
      

  )
}

// function LogedInHome() {
//   const screenW = window.innerWidth;
//   const [sidebarWidth, setSidebarWidth] = useState(400);
//   const [isResizing, setIsResizing] = useState(false);
//   const [screenSizing, setScreenSizing] = useState(screenW - sidebarWidth);
//   // const [songData, setSongData] = useState([]);
//   const [songPlayed, setSongPlayed] = useState(null);
//   const[isPlaying, setIsPlaying] = useState(false);
//   // const scree = window.innerWidth;
//   const songUrlHC = "https://res.cloudinary.com/djtwqlcgo/video/upload/v1711198154/gbdduppidnjchcorl5nl.mp3";


//   const playSong = (songSrc)=>{
//     if(songPlayed){
//         songPlayed.stop();
//         setIsPlaying(false);
//     }
//     var sound = new Howl({
//         src: [songSrc],
//         html5: true
//       });
//       setSongPlayed(sound)
//       sound.play();
//       setIsPlaying(true);
// }
// const playPause = ()=>{
//     if(songPlayed){
//         if(songPlayed.playing()){
//             songPlayed.pause();
//             setIsPlaying(false);
//         }else{
//             songPlayed.play();
//             setIsPlaying(true);
//         }
//     }
// }

//   const playlistData = [
//     {
//       ArtistName: 'Animal',
//       desc: 'Manan Bharadwaj',
//       img: 'https://th.bing.com/th/id/OIP.raJCZ85vDTelZDnG2LbH-wHaKX?w=182&h=254&c=7&r=0&o=5&dpr=1.3&pid=1.7'
//     },
//     {
//       ArtistName: 'Still Rollin',
//       desc: 'Shubh',
//       img: 'https://th.bing.com/th/id/OIP.nvcfQds84bZRnuh5A5E3rQHaJh?w=198&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
//     },
//     {
//       ArtistName: 'Moose Tape',
//       desc: 'Sidhu Moose Wala',
//       img: 'https://th.bing.com/th/id/OIP.5coWGeDHjo13AuKLNusnPQHaJQ?w=149&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7'
//     },
//     {
//       ArtistName: 'Husn',
//       desc: 'Anuv Jain',
//       img: 'https://th.bing.com/th/id/OIP.6X9X5wqX3maXmudetP2XqAHaJQ?w=131&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
//     },
//     {
//       ArtistName: 'Ghost',
//       desc: 'Diljit Doshanjh',
//       img: 'https://magarticles.magzter.com/articles/2009/460435/5ed487e90eff8/DILJIT-DOSANJHNEW-DATE.jpeg'
//     }
//   ]

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (isResizing) {
//         const screen = window.innerWidth
//         const newWidth = e.clientX;
//         setSidebarWidth(newWidth);
//         setScreenSizing(screen - newWidth);
//       }
//     };

//     const handleMouseUp = () => {
//       setIsResizing(false);
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };

//     if (isResizing) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isResizing]);

//   const handleMouseDown = () => {
//     setIsResizing(true);
//   };
//   return (
//     <div className='h-screen w-full'>

//       <div className="flex h-9/10 w-full">
//         <div
//           className="bg-[#1F2544] text-white h-auto" //overflow-auto
//           style={{ width: `${sidebarWidth}px` }}
//         >
//           {/* Sidebar content goes here */}
//           <div className='bg-slate-600 m-2 rounded flex flex-col justify-start items-start p-2 pl-6'>
//             <div className="img w-2/4 flex justify-center">
//               <img src={spotify_logo} alt="error" />
//             </div>
//             <div className="sidebar1 mt-2">
//               <span className='flex flex-row items-center py-2 cursor-pointer'>
//                 <MdHomeFilled size={20} />
//                 <h2 className='px-3 text-xl font-poppins font-normal'>Home</h2>
//               </span>
//               <span className='flex flex-row items-center py-2 cursor-pointer'>
//                 <FaSearch size={20} />
//                 <h2 className='px-3 text-xl font-poppins font-normal'>Search</h2>
//               </span>
//               <Link to={'/mymusic'}>
//                 <span className='flex flex-row items-center py-2 cursor-pointer'>
//                   <MdLibraryMusic size={20} />
//                   <h2 className='px-3 text-xl font-poppins font-normal'>My Music</h2>
//                 </span>
//               </Link>
//             </div>
//           </div>
//           <div className="bg-slate-600 m-2 rounded flex flex-col justify-start items-start p-2 pl-6 ">
//             <div className='flex w-full'>
//               <div className='flex justify-start flex-grow'>
//                 <span className='flex flex-row items-center py-2 cursor-pointer'>
//                   <VscFolderLibrary size={25} />
//                   <h2 className='px-3 text-xl font-poppins font-normal'>Your Library</h2>
//                 </span>
//               </div>
//               <div className='flex items-center '>
//                 <span className='p-2 bg-black items-center rounded-full cursor-pointer'>
//                   <AiOutlinePlus size={30} />
//                 </span>
//                 <span className='p-2 bg-black items-center rounded-full mx-2 cursor-pointer'>
//                   <IoIosArrowRoundForward size={30} />
//                 </span>
//               </div>
//             </div>
//             <div className='playlist mt-6 '>
//               <Playlist
//                 playlistName={'First Playlist'}
//                 playlistOwner={'RajRoy'} />
//               <Playlist playlistName={'First Playlist'} playlistOwner={'RajRoy'} />
//               <Playlist playlistName={'First Playlist'} playlistOwner={'RajRoy'} />
//               {/* <Playlist playlistName={'First Playlist'} playlistOwner={'RajRoy'} /> */}
//             </div>
//           </div>


//         </div>

//         <div
//           className="cursor-resize w-2 h-auto bg-gray-700"
//           onMouseDown={handleMouseDown}
//         />

//         <div className={`flex-1 bg-black bg-opacity-85 p-2 w-${screenSizing} overflow-auto`}>
//           {/* <Navbar screen={screenSizing} /> */}
//           <nav className={`bg-black  h-20 w-${screenSizing} rounded sticky top-0`}>
//             <div className='flex items-center w-full h-full justify-between flex-grow'>
//               <div className="right flex items-center text-white ml-6">
//                 <span className='p-2 bg-black items-center rounded-full cursor-pointer mx-2'><MdKeyboardArrowLeft size={30} /></span>
//                 <span className='p-2 bg-black items-center rounded-full cursor-pointer mx-2'><MdKeyboardArrowRight size={30} /></span>
//               </div>
//               <div className="left flex items-center">
//                 <Link to={'/upload'}>
//                   <button className='text-white p-4 px-4 font-semibold rounded-full'>Upload</button>
//                 </Link>
//                 <Link to={'/login'}>
//                   <button className='bg-[#1db954] h-10 w-10 font-semibold rounded-full mx-4 '>RR</button>
//                 </Link>

//               </div>
//             </div>
//           </nav>
//           {/* main content */}

//           <div className='mb-4 '>
//             <h2 className='text-white font-bold text-2xl my-2'>Popular Artist</h2>
//             <div className='grid grid-auto-flow grid-cols-5 gap-2'>
//               <ArtistCard
//                 ArtistName={'Arijit Singh'}
//                 desc={'Artist'}
//                 img={"https://th.bing.com/th/id/OIP.oCqMXfAnD-bPvxb6j3p_8gHaGP?w=220&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7"}
//               />
//               <ArtistCard
//                 ArtistName={'Pritam'}
//                 desc={'Artist'}
//                 img={"https://th.bing.com/th/id/OIP.0mNM1VgA2xXgxdF2NcQ4hgHaFj?w=264&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7"}
//               />
//               <ArtistCard
//                 ArtistName={'Anirudh Ravichander'}
//                 desc={'Artist'}
//                 img={"https://th.bing.com/th/id/OIP.QY7VEVEJ50arV6WPVlptbQHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7"}
//               />
//               <ArtistCard
//                 ArtistName={'Shreya Ghoshal'}
//                 desc={'Artist'}
//                 img={"https://th.bing.com/th/id/OIP.l50jHCB13wkpna3DFWDO9AHaFj?w=232&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"}
//               />
//               <ArtistCard
//                 ArtistName={'Alka Yagnik'}
//                 desc={'Artist'}
//                 img={"https://th.bing.com/th/id/OIP.FfjdqNMB6ERTTyLpvjugYwHaEK?w=297&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"}
//               />
//             </div>
//           </div>
//           {/* dsfsdf */}
//           <PlaylistCardView title={"Hindi Playlist"} playlisData={playlistData} />
//           {/* dsfsdf */}
//           <PlaylistCardView title={"English Playlist"} playlisData={playlistData} />



//         </div>
//       </div>
//       <div className='bg-black h-1/10 flex justify-between text-white px-5 items-center relative'>
//           <div className='flex'>
//             <div className='w-[50px] h-[50px] rounded-full' onClick={()=>{playSong(songUrlHC)}}>
//               <img src="https://th.bing.com/th?id=OIP.pSdXQ4hKGR2Iwo97lZk_mAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="error" className='rounded object-cover w-[50px] h-[50px] cursor-pointer'/>
//             </div>
//             <div className='pl-4 flex flex-col justify-between'>
//               <span className='font-semibold cursor-pointer'>Blue Eyes</span>
//               <span className='font-normal text-xs text-gray-300 cursor-pointer' >Yo YO Honey Singh</span>
//             </div>
//             </div> 
//           <div >
//             <div className='flex items-center absolute top-1 justify-center'>
//               <span><IoPlaySkipBack size={25} color="grey" className='hover:cursor-pointer '/></span>
//               <span className='hover:scale-110 cursor-pointer mx-2' onClick={()=>{playPause()}}>
//                 {isPlaying? <IoPauseCircle size={40}/>:<IoPlayCircle size={40}/>}
//                 </span>
//               <span><IoPlaySkipForwardSharp size={25} color="grey" className='hover:cursor-pointer'/></span>
//               </div>
//             <div></div>
//           </div>
//           <div>
//             Volume Control
//           </div>
//       </div>
//     </div>
//   )
// }

export default LogedInHome