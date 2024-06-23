import React from 'react';
import PlaylistCard from './PlaylistCard';

function PlaylistCardView({ title, playlisData }) {
    return (
        <>
            <div className='mb-4 '>
                <h2 className='text-white font-bold text-2xl my-2'>{title}</h2>
                <div className='grid grid-auto-flow grid-cols-5 gap-2'>
                    {
                        playlisData.map((item) => {
                            return(
                                <PlaylistCard
                                ArtistName={item.ArtistName}
                                desc={item.desc}
                                img={item.img} />
                            )
                            
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default PlaylistCardView