import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQueryClient,useQuery } from 'react-query';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
    //const queryClient = useQueryClient();
	const [songPlayed, setSongPlayed] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [playBackTime, setPlayBackTime] = useState(0);
	const [songBar, setSongBar] = useState(0);
	const[currentSong,setCurrentSong] = useState(null);

	//    const currentSong = queryClient.getQueryData('currentSong');

	//	const { data: currentSong } = useQuery('currentSong', () => 
	//		queryClient.getQueryData('currentSong'), 
//		{
//			staleTime: 0,
//			initialData: null
//		}
//	);

	// Reset player state when song changes
	// useEffect(() => {
	//     if(currentSong) {
	//         setIsPlaying(false);
	//         setPlayBackTime(0);
	//         setSongBar(0);
	//     }
	// }, [currentSong]);

	return (
		<PlayerContext.Provider
		value={{
		currentSong,
		setCurrentSong,
    songPlayed,
    setSongPlayed,
    isPlaying,
    setIsPlaying,
    playBackTime,
    setPlayBackTime,
    songBar,
    setSongBar,
		}}
		>
		{children}
		</PlayerContext.Provider>
	);
};
