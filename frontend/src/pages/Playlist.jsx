import React, { useEffect, useState } from 'react'
import LogedInContainer from '../containers/LogedInContainer';
import SongsList from '../components/shared/SongsList';
import { useParams } from 'react-router-dom';

function Playlist() {
    const [songData, setSongData] = useState([]);
    const { playlistId } = useParams();  
        useEffect(() => {
            const getSong = async () => {
                // const response = await makeAuthenticateGETrequest('/song/get/mysong');
                const response = await fetch(`http://localhost:8000/playlist/get/playlist/${playlistId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const formatedResponse = await response.json();
                setSongData(formatedResponse.data.songs);
                // console.log(formatedResponse.data.songs);
            }
            getSong();
        }, [playlistId])
  return (
    <>
        <LogedInContainer>
            <SongsList data={songData} />
        </LogedInContainer>
        {console.log(songData)}
        </>
  )
}

export default Playlist