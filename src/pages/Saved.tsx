import { Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import APODCard from '../components/APODCard';
import LikeButton from '../components/LikeButton';
import { Apod } from '../models/apod';
import { SavedApodsContext } from '../SavedApodsContext';
import { fetchLikedApodDatesFromLocalStorage, saveLikedApodDatesInLocalStorage } from '../utils';

import "../styles/saved.css"

const Saved = () => {

    const { savedApods, saveLikedApod, saveDislikedApod } = useContext(SavedApodsContext);
    const [apods, setApods] = useState<Apod[]>([]);

    // only called when the page is opened
    useEffect(() => {
        // make sure savedApods is loaded in case users access this page directly
        const locallySavedApods: Apod[] = fetchLikedApodDatesFromLocalStorage();
        locallySavedApods.forEach(savedApod => savedApods.current.set(savedApod.date, savedApod));

        const _apods: Apod[] = Array.from(savedApods.current.values());
        const _sortedApods = _apods.sort((a, b) => a.date < b.date ? 1 : -1);
        console.log(_sortedApods);

        setApods(_sortedApods);

    }, []);

    useEffect(() => {
        window.onbeforeunload = () => {
            saveLikedApodDatesInLocalStorage(Array.from(savedApods.current.values()));
        }

        return () => {
            // save savedApods in LocalStorage whenever refresh or leave
            saveLikedApodDatesInLocalStorage(Array.from(savedApods.current.values()));
            window.removeEventListener('onbeforeunload', () => console.log('onbeforeunload remomved'));
        }
    }, [apods]);

    const handleSaveDislikedApod = (dislikedApod: Apod) => {
        saveDislikedApod(dislikedApod);
        setApods(prevApods => prevApods.filter(apod => apod.date !== dislikedApod.date));
    }

    return (
        <div className="home-wrapper">
            <div className="saved-apod-post-wrapper">
                {
                    apods.length == 0 && (
                        <div className="no-saved-wrapper">
                            <Typography textAlign="center" variant='h4' fontWeight='700' color="white" >You haven't added any Posts to your Likes yet</Typography>
                            <Typography textAlign="center" variant='body1' fontWeight='500' color="white">Like some cool posts from Home and personalize your collections!</Typography>
                        </div>
                    )
                }
                {
                    apods.map((apod) =>
                        <APODCard key={apod.date} apod={apod} renderHeartButton={() => (
                            // render props to avoid "props drilling"
                            <LikeButton apod={apod} initialIsLiked={true} saveLikedApod={saveLikedApod} saveDislikedApod={handleSaveDislikedApod} />
                        )} />)
                }
            </div>


        </div>

    )
}

export default Saved

