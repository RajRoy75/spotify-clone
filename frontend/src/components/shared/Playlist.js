import React from 'react'

function Playlist({playlistName, img}) {
    return (
        <>
            <div className='flex cursor-pointer hover:bg-[#1F2544] rounded p-2'>
                <div className='w-1/4 rounded'>
                    <img src={img} alt="error" className='object-cover' />
                </div>
                <div className='ml-4 flex flex-col'>
                    <h2 className='font-semibold text-xl'>{playlistName}</h2>
                    {/* <p className='font-normal text-gray-400'>{playlistOwner}</p> */}
                </div>
            </div>
        </>
    )
}

export default Playlist