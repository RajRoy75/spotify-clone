import React from 'react'

function Playlist({playlistName, playlistOwner, img}) {
    return (
        <>
            <div className='flex cursor-pointer hover:bg-[#1F2544] rounded p-2'>
                <div className='w-1/4 rounded'>
                    <img src="https://th.bing.com/th/id/OIP.oCqMXfAnD-bPvxb6j3p_8gHaGP?w=220&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="error" className='object-cover' />
                </div>
                <div className='ml-4 flex flex-col'>
                    <h2 className='font-semibold text-xl'>{playlistName}</h2>
                    <p className='font-normal text-gray-400'>{playlistOwner}</p>
                </div>
            </div>
        </>
    )
}

export default Playlist