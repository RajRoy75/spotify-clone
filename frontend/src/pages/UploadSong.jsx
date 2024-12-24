import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloudinaryUpload from '../components/shared/CloundinaryUpload';
import { makeAuthenticatePOSTrequest } from '../utils/serverHelper';
import { auth } from '../utils/firebase';
import LogedInContainer from '../containers/LogedInContainer';

function UploadSong() {
    const [name, setName] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [songUrl, setSongUrl] = useState('');
    const [uploadSongFileName, setUploadSongFileName] = useState('');
    const navigate = useNavigate();

    const submitSong = async () => {
        // console.log(songUrl);
        const currentUser = auth.currentUser;
        const uid = currentUser.uid;
        const data = { name, thumbnail, track: songUrl, uid };
        const response = await makeAuthenticatePOSTrequest('/song/create', data);
        // console.log(response);
        if (response.err) {
            alert("Could not upload");
            return;
        }
        alert('Song Uploaded');
        navigate('/')

    }
    return (
        <>
            <LogedInContainer>
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
                                {uploadSongFileName.substring(0, 35)}...
                            </div>
                        ) : (

                            <CloudinaryUpload setUrl={setSongUrl} fileName={setUploadSongFileName} />
                        )}
                        <div className='flex bg-white w-40 items-center justify-center rounded-full p-4 cursor-pointer mt-4 font-semibold text-lg' onClick={submitSong}>
                            Submit Song
                        </div>
                    </div>

                </div>
            </LogedInContainer>
        </>
    )
}

export default UploadSong;

