import React, { useState,useEffect,useRef } from 'react';
import { SlOptions } from "react-icons/sl";
import useUserPlaylist from "../../hooks/useUserPlalylist.js" 
import Playlist from "./Playlist.js";
import {auth} from "../../utils/firebase.js";
import {makeAuthenticatePOSTrequest,makeAuthenticateGETrequest} from "../../utils/serverHelper.js";
import { useParams } from 'react-router-dom';

const OptionMenu = ({ itemId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const dropdownRef = useRef(null);

  const currentUser = auth.currentUser;
  const uid = currentUser.uid;

  const { playlistId } = useParams();  


  const { data: userPlaylist, isLoading: playlistLoading, isError: playlistError, refetch: playlistRefetch} = useUserPlaylist();
  //  console.log(userPlaylist.data);
  console.log(playlistId);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAddToPlaylistClick = () => {
    setShowPlaylistModal(true);
    setIsOpen(false); // Close the dropdown menu
  };

  const closePlaylistModal = () => {
    setShowPlaylistModal(false);
  };

  const removeFromPlaylist = async()=>{
    const data = {playlistId,songId:itemId,uid};
    try {
      const response = await makeAuthenticatePOSTrequest('/playlist/remove/song',data);
      if(response.err){
        alert("unable to remove");
      }
      alert('Succesfully remove from playlist');
    } catch (error) {
      console.error('error: ',error);
    }
    setIsOpen(false);
  }
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(()=>{
    if(playlistId){
      const getOwnership = async()=>{
        try {
          const response = await makeAuthenticateGETrequest(`/playlist/check-ownership?playlistId=${playlistId}&uid=${uid}`);
          if(response.isOwner){
            setIsOwner(true);
            console.log(isOwner);
          }
        } catch (error) {
          console.error(error); 
        }
      }
      getOwnership();

    }else{
      return;
    }
  },[playlistId,uid])

  const addToPlaylist = async(id)=>{
    const data = {playlistId:id, songId:itemId,uid} 
    const response = await makeAuthenticatePOSTrequest('/playlist/add/song',data);
    if (response.err) {
      alert("Could not added");
      return;
    }
    alert('Song added to the playlist');

  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none z-10"
      >
        <SlOptions color={"blue"} /> 

      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                handleAddToPlaylistClick();
              }}
              className="block w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
            >
              Add to Playlist
            </button>
            {isOwner &&(
              <button
                onClick={() => {
                  removeFromPlaylist();
                }}
                className="block w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
              >
                Remove From Plalylist
              </button>
            )}
          </div>
        </div>
      )}
      {/* Playlist Modal */}
      {showPlaylistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-black rounded-lg shadow-lg w-96 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">Add to Playlist</h2>
              <button
                onClick={closePlaylistModal}
                className="p-2 rounded-full hover:bg-cyan-500 focus:outline-none bg-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              {/* Example Playlist Items */}
              {userPlaylist?.data?.length > 0 ? (
                userPlaylist.data.map((item) => {
                  const isSongInPlaylist = item.songs.includes(itemId);
                  return (
                    <Playlist
                      key={item._id}
                      playlistName={item.name}
                      img={item.thumbnail}
                      playlistOwner={`${item.owner.firstName} ${item.owner.lastName}`}
                      onClick={()=>{
                        if(isSongInPlaylist){
                          alert("Song Already in Playlist");
                        }else{
                          // alert('Ready for api');
                          addToPlaylist(item._id);
                        }
                        closePlaylistModal();
                      } }
                      inPlaylist={isSongInPlaylist}
                    /> 
                  ) 
                })

              ) : (
                  <p>Create Playlist</p>
                )} 

            </div>
            <button
              onClick={closePlaylistModal}
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div> 
  );
};

export default OptionMenu;
