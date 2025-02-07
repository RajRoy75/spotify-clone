import React, { useEffect, useState } from 'react'
import LogedInContainer from '../containers/LogedInContainer';
import SongsList from '../components/shared/SongsList';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';

function Playlist() {
  const queryClient = useQueryClient();
  const { playlistId } = useParams();  

  const { data: songData, refetch } = useQuery(
    ['playlistSongs', playlistId],
    async () => {
      const response = await fetch(`http://localhost:8000/playlist/get/playlist/${playlistId}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      });
      const formattedResponse = await response.json();
      return formattedResponse.data.songs;
    }
  );
  return (
    <>
      <SongsList data={songData || []} />
    </>
  )
}

export default Playlist
