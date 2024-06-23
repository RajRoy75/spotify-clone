import React from 'react'

function PlaylistCard({ArtistName, desc, img}) {
  return (
    <>
    <div>
        <div className='bg-black flex flex-col mx-4 rounded items-center filter grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer'>
          <div className=' pt-4 '>
            <img src={img} alt="error" className=' rounded object-cover w-[160px] h-[200px]' />
          </div>
          <div className='p-2 flex flex-col justify-start w-full '>
            <h2 className='text-white font-semibold'>{ArtistName}</h2>
            <p className='text-gray-400'>{desc}</p>
          </div>
          {/* https://th.bing.com/th/id/OIG2.bf.IQR6A99PE42UdSE2i?w=173&h=173&c=6&r=0&o=5&dpr=1.3&pid=ImgGn */}
        </div>
      </div>
    </>
  )
}

export default PlaylistCard