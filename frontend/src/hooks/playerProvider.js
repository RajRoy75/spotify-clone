import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
    const [songPlayed, setSongPlayed] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playBackTime, setPlayBackTime] = useState(0);
    const [songBar, setSongBar] = useState(0);

    return (
        <PlayerContext.Provider
            value={{
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
