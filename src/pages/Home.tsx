import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { convertToDateFormat, fetchLikedApodDatesFromLocalStorage, generateAPODRequest, saveLikedApodDatesInLocalStorage } from '../utils';
import { Apod } from '../models/apod';
import APODCard from '../components/APODCard';
import { Typography } from '@mui/material';
import "../App.css"
import { ThreeDots } from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LikeButton from '../components/LikeButton';
import { SavedApodsContext } from '../SavedApodsContext';
import useMountedStatus from '../hooks/UseMountedStatus';



function Home() {

  // TODO: apikey needs to be moved
  const apiKey = "pliz6dW9sZePBmgFd5nWSFMCAIR9ectVlqE4tUvO"

  const { savedApods, saveLikedApod, saveDislikedApod } = useContext(SavedApodsContext)

  const [apods, setApods] = useState<Apod[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const endDate = useRef<Date>(new Date());
  const startDate = useRef<Date>();

  const isMounted = useMountedStatus();

  // only called once 
  useEffect(() => {

    setIsFetching(true);

    const locallySavedApods: Apod[] = fetchLikedApodDatesFromLocalStorage();
    locallySavedApods.forEach(savedApod => savedApods.current.set(savedApod.date, savedApod));
    console.log(locallySavedApods);

    window.addEventListener("scroll", (event) => {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && isMounted.current && !isFetching) {
        setIsFetching(true);
      }
    });

    return () => {
      console.log('useEffect return handle...');
      // window.removeEventListener('onscroll', () => console.log('onScroll removed'));
      window.removeEventListener('scroll', () => console.log('removed scroll listener'));
    };

  }, []);

  useEffect(() => {

    if (isFetching && isMounted.current) {
      handleLoadMore();
    }

  }, [isFetching])

  useEffect(() => {

    window.addEventListener('onbeforeunload', () => {
      saveApodsToLocalStorage();
    });

    return () => {
      // save savedApods in LocalStorage whenever refresh or leave
      saveApodsToLocalStorage();
      window.removeEventListener('onbeforeunload', () => console.log('onbeforeunload remomved'));
    }

  }, [apods])

  const fetchApodFromNASA = () => {
    console.log('handleLoadMore...');

    if (startDate.current) {
      axios.get(generateAPODRequest(
        apiKey,
        convertToDateFormat(startDate.current),
        convertToDateFormat(endDate.current)))
        .then(response => {
          let newApods: Apod[] = [];
          response.data.forEach((apod: Apod) => newApods.push(apod));
          newApods = newApods.reverse()

          if (isMounted.current) {
            setApods((prevApods) => [...prevApods, ...newApods]);
            setIsFetching(false);
          }

          const newEndDate = new Date(startDate.current!);
          newEndDate.setDate(newEndDate.getDate() - 1);
          endDate.current = newEndDate;
        });
    } else {
      if (isMounted.current) {
        setIsFetching(false);
      }
    }
  }

  const saveApodsToLocalStorage = () => {
    console.log('Saving Saved APODs to local storage...');
    saveLikedApodDatesInLocalStorage(Array.from(savedApods.current.values()));
  }

  const handleLoadMore = () => {
    const _startDate = new Date(endDate.current);
    _startDate.setDate(_startDate.getDate() - 10);

    startDate.current = _startDate;

    console.log(startDate.current.toUTCString());
    console.log(endDate.current.toUTCString());

    fetchApodFromNASA();
  }

  return (
    <div className="home-wrapper">
      <div className="apod-post-wrapper">
        {
          apods.map((apod) =>
            <APODCard key={apod.date} apod={apod} renderHeartButton={() => (
              // render props to avoid "props drilling"
              <LikeButton apod={apod} initialIsLiked={savedApods.current.has(apod.date)} saveLikedApod={saveLikedApod} saveDislikedApod={saveDislikedApod} />
            )} />)
        }
        {
          isFetching &&
          <ThreeDots color="#F6F6F6" height={80} width={"100%"} />
        }
      </div>
      <div className="apod-right-main-wrapper">
        <Typography variant='h1'>Right</Typography>

      </div>
    </div>

  );
}

export default Home;
