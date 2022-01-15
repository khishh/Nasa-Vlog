import React, { createContext, ReactNode, useRef } from 'react'
import { Apod } from './models/apod';

export const SavedApodsContext = createContext<SavedApodsContextType>({} as SavedApodsContextType);

export const SavedApodsContextProvider = (props: SavedApodsContextPropsType) => {

    const savedApods = useRef<Map<string, Apod>>(new Map<string, Apod>());

    const saveLikedApod = (likedApod: Apod) => {
        savedApods.current.set(likedApod.date, likedApod);
    }

    const saveDislikedApod = (dislikedApod: Apod) => {
        savedApods.current.delete(dislikedApod.date);
    }

    return (
        <SavedApodsContext.Provider value={{
            savedApods,
            saveLikedApod,
            saveDislikedApod
        }}>
            { props.children }
        </SavedApodsContext.Provider>
    )
}

type SavedApodsContextType = {
    savedApods: React.MutableRefObject<Map<string, Apod>>
    saveLikedApod: (likedApod: Apod) => void
    saveDislikedApod: (dislikedApod: Apod) => void
}

type SavedApodsContextPropsType = {
    children: ReactNode
}

