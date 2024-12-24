import React, { useState } from 'react'
import CloudinaryUpload from '../components/shared/CloundinaryUpload';
// import { Navigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { makeAuthenticatePOSTrequest } from '../utils/serverHelper';

function CreatePlaylist() {
    const [imageUrl, setImageUrl] = useState('');
    const [uploadImgaeFileName, setUploadImgaeFileName] = useState('');
    const [playlistName, setPlaylistName] = useState('');

    const createPlaylist = async () => {
        const currentUser = auth.currentUser;
        const uid = currentUser.uid;
        const data = { name:playlistName, thumbnail:imageUrl, uid, songs:[] };
        const response = await makeAuthenticatePOSTrequest('/playlist/create', data);
        // console.log(response);
        if (response.err) {
            alert("Playlist not create");
            return;
        }
        alert('playlist created');
        // Navigate('/')
    }
    return (
        <>
            <div>
                <div className='mt-4 '>
                    <div className='flex flex-col space-y-2 w-full mt-6'>
                        <label for='thumbnail' className='font-semibold flex justify-start text-white text-xl'>Playlist</label>
                        <input type="text" placeholder='Enter Playlist name' className='border-2 border-gray-500 rounded p-2 placeholder-slate-600' id='thumbnail' value={playlistName} onChange={(e) => { setPlaylistName(e.target.value); }} />

                    </div>
                    <div className='mt-4'>
                        {uploadImgaeFileName ? (
                            <div className='bg-white p-3 rounded-full w-1/3 text-lg'>
                                {uploadImgaeFileName.substring(0, 35)}...
                            </div>
                        ) : (

                            <CloudinaryUpload setUrl={setImageUrl} fileName={setUploadImgaeFileName} />
                        )}
                    </div>

                </div>
                <div className='flex bg-white w-40 items-center justify-center rounded-full p-4 cursor-pointer mt-4 font-semibold text-lg' onClick={createPlaylist}>
                    Create Playlist
                </div>
            </div>

        </>
    )
}

export default CreatePlaylist