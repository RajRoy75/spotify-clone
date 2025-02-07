import React, { useEffect } from 'react'
import useCurrentSong from '../../hooks/useCurrentSong';
import { useQueryClient } from 'react-query';
import { Howl } from 'howler';
import { usePlayer } from '../../hooks/playerProvider';
import OptionMenu from './OptionMenu.js';

function SongsList({ data }) {

  const {
    currentSong,
    setCurrentSong,
  } = usePlayer();
  const setSong= (item)=>{
    setCurrentSong(item);
  }
  const getDuration = (url)=>{
    const sound = new Howl({src:url});
    const durationInSeconds = sound.duration();
    return formatedTime(durationInSeconds)
  }
  const formatedTime = (seconds)=>{
    const minutes = Math.floor(seconds/60);
    const sec = Math.floor(seconds%60);
    return `${minutes}:${sec<10 ? '0':''}${sec}`;
  }
  return (
    <>
      <table className='w-full mt-4'>
        <thead className='bg-gray-50 border-b-2 border-gray-500'>
          <tr className='bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% '>
            <th className='p-3 font-semibold text-sm tracking-wide text-left'>Song</th>
            <th className='p-3 font-semibold text-sm tracking-wide text-left'>Artist</th>
            <th className='p-3 font-semibold text-sm tracking-wide text-left'>Time</th>
            <th className='p-3 font-semibold text-sm tracking-wide text-left'>Option</th>
          </tr>
        </thead>
        <tbody className='text-white cursor-pointer'>
          {data.map((item,index) => {
            return (
              <tr className='bg-gradient-to-r from-violet-500 to-fuchsia-500' key={index}>
                <td className='flex flex-row items-center ml-2 p-2' onClick={() => { setSong(item) }}>
                  <div className='rounded w-[40px] h-[40px]' style={{ backgroundImage: `url('${item.thumbnail}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  </div>
                  <div className='mx-3 text-base'>{item.name}</div>
                </td>
                <td className='text-base'>
                  {item.artist.firstName + " " + item.artist.lastName}
                </td>
                <td className='text-base'>
                  {getDuration(item.track)}
                </td>
                <td>
                  <OptionMenu itemId={item._id} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default SongsList
