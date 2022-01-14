import { Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import APODCard from '../components/APODCard';
import LikeButton from '../components/LikeButton';
import { Apod } from '../models/apod';
import { SavedApodsContext } from '../SavedApodsContext';
import { fetchLikedApodDatesFromLocalStorage, saveLikedApodDatesInLocalStorage } from '../utils';

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
        <div style={{ width: "100vh", minHeight: "100vh", margin: "0 0 0 15vw ", padding: "1rem" }}>
            {
                apods.length == 0 && (
                    <div style={{ backgroundColor: "#23272A", margin: 'auto', borderRadius: ".5rem"}}>
                        <Typography textAlign="center" variant='h4' fontWeight='700' style={{color: "white"}}>You haven't added any Posts to your Likes yet</Typography>
                        <Typography textAlign="center" variant='body1' fontWeight='400' style={{color: "white"}}>Like some cool posts from Home and personalize your collections!</Typography>
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

    )
}

export default Saved

