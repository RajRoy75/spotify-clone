import React, { useState, useEffect } from 'react';
import SongsList from '../components/shared/SongsList';
import LogedInContainer from '../containers/LogedInContainer';


function Mymusic() {
    
    const [songData, setSongData] = useState([]);

    useEffect(() => {
        const getSong = async () => {
            // const response = await makeAuthenticateGETrequest('/song/get/mysong');
            const response = await fetch('http://localhost:8000/song/get/allsong', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const formatedResponse = await response.json();
            setSongData(formatedResponse.data);
        }
        getSong();
    }, [])


    return (
        <>
        <LogedInContainer>
            <SongsList data={songData} />
        </LogedInContainer>
        </>
    )
}

export default Mymusic;