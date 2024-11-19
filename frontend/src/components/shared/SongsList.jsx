import React from 'react'
// import songContext from '../../context/SongContext'
import useCurrentSong from '../../hooks/useCurrentSong';
import { useQueryClient } from 'react-query';

function SongsList({ data, playSong }) {
    // const { currentSong, setCurrentSong } = useContext(songContext);
    const {data:currentSong,isLoading:songLoading,isError:songError,refetch:songRefetch} = useCurrentSong();
    // console.log(song);
    const queryClient = useQueryClient();
    const setCurrentSong = (item)=>{
        queryClient.setQueryData("currentSong",item);
        localStorage.setItem('currentSong', JSON.stringify(item));
    }
    return (
        <>
            <table className='w-full mt-4'>
                <thead className='bg-gray-50 border-b-2 border-gray-500'>
                    <tr className='bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% '>
                        <th className='p-3 font-semibold text-sm tracking-wide text-left'>Song</th>
                        <th className='p-3 font-semibold text-sm tracking-wide text-left'>Artist</th>
                        <th className='p-3 font-semibold text-sm tracking-wide text-left'>Time</th>
                    </tr>
                </thead>
                <tbody className='text-white '>
                    {data.map((item,index) => {
                        return (
                            <tr className='bg-gradient-to-r from-violet-500 to-fuchsia-500' onClick={() => { setCurrentSong(item) }} key={index}>
                                <td className='flex flex-row items-center ml-2 p-2'>
                                    <div className='rounded w-[40px] h-[40px]' style={{ backgroundImage: `url('${item.thumbnail}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    </div>
                                    <div className='mx-3 text-base'>{item.name}</div>
                                </td>
                                <td className='text-base'>
                                    {item.artist.firstName + " " + item.artist.lastName}
                                </td>
                                <td className='text-base'>
                                    Song Duration
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