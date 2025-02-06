import React from 'react'

function Playlist({playlistName, img, playlistOwner,onClick,inPlaylist}) {
  return(
    <>
      {inPlaylist ?(
        <div className='flex cursor-pointer hover:bg-red-400 rounded p-2 bg-gray-600' onClick={onClick}>
          <div className='w-1/4 rounded'>
            <img src={img} alt="error" className='object-cover' />
          </div>
          <div className='ml-4 flex flex-col justify-center'>
            <h2 className='font-semibold text-xl'>{playlistName}</h2>
            <p className='font-normal'>{playlistOwner}</p>
            <p className='font-normal'>Already Added</p>
          </div>
        </div>

      ):(
          <div className='flex cursor-pointer hover:bg-cyan-400 rounded p-2 bg-gray-600' onClick={onClick}>
            <div className='w-1/4 rounded'>
              <img src={img} alt="error" className='object-cover' />
            </div>
            <div className='ml-4 flex flex-col justify-center'>
              <h2 className='font-semibold text-xl'>{playlistName}</h2>
              <p className='font-normal'>{playlistOwner}</p>
            </div>
          </div>

        )}
    </>
  )
  // return (
  //     <>
  //         <div className='flex cursor-pointer hover:bg-[#1F2544] rounded p-2' onClick={onClick}>
  //             <div className='w-1/4 rounded'>
  //                 <img src={img} alt="error" className='object-cover' />
  //             </div>
  //             <div className='ml-4 flex flex-col justify-center'>
  //                 <h2 className='font-semibold text-xl'>{playlistName}</h2>
  //                 <p className='font-normal text-gray-400'>{playlistOwner}</p>
  //             </div>
  //         </div>
  //     </>
  //)
}

export default Playlist
