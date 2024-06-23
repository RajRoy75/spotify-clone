import React from 'react'

function ArtistCard({ArtistName, desc, img}) {
  return (
    <>
      <div>
        <div className='bg-black flex flex-col mx-4 rounded items-center cursor-pointer'>
          <div className=' pt-4 '>
            <img src={img} alt="error" className='rounded-full object-cover w-[150px] h-[150px]' />
          </div>
          <div className='p-2 flex flex-col justify-start w-full '>
            <h2 className='text-white font-semibold'>{ArtistName}</h2>
            <p className='text-gray-400'>{desc}</p>
          </div>
        </div>
      </div>


    </>
  )
}

export default ArtistCard