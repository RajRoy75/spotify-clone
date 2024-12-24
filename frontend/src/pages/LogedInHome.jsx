import React from 'react';
import ArtistCard from '../components/shared/ArtistCard';
import PlaylistCardView from '../components/shared/PlaylistCardView';
import LogedInContainer from '../containers/LogedInContainer';
import { getAuth } from "firebase/auth";
import useUser from '../hooks/useUser';

function LogedInHome() {
  const { data, isLoading, isError, refetch } = useUser();
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
    <LogedInContainer>



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
    </LogedInContainer>

  )
}

export default LogedInHome