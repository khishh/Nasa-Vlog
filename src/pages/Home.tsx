import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { convertToDateFormat, fetchLikedApodDatesFromLocalStorage, generateAPODRequest, saveLikedApodDatesInLocalStorage } from '../utils';
import { Apod } from '../models/apod';
import APODCard from '../components/APODCard';
import { Typography } from '@mui/material';
import "../App.css"
import { ThreeDots } from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LikeButton from '../components/LikeButton';



function Home() {

  // TODO: apikey needs to be moved
  const apiKey = "pliz6dW9sZePBmgFd5nWSFMCAIR9ectVlqE4tUvO"

  const [apods, setApods] = useState<Apod[]>([]);
  const endDate = useRef<Date>(new Date());
  const startDate = useRef<Date>();
  const [isFetching, setIsFetching] = useState(false);

  const savedApods = useRef<Set<string>>(new Set<string>());

  // only called once 
  useEffect(() => {

    setIsFetching(true);

    const locallySavedApods: string[] = fetchLikedApodDatesFromLocalStorage();
    locallySavedApods.forEach(savedApodDate => savedApods.current.add(savedApodDate));

  }, []);

  useEffect(() => {

    if (isFetching) {
      handleLoadMore();
    }

    window.onscroll = function (event) {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && !isFetching) {
        setIsFetching(true);
      }
    };

    return () => {
      console.log('useEffect return handle...');
      window.removeEventListener('onscroll', () => console.log('onScroll removed'));
    };

  }, [isFetching])

  useEffect(() => {

    window.onbeforeunload = () => {
      saveApodsToLocalStorage();
    }

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
          setApods((prevApods) => [...prevApods, ...newApods]);
          setIsFetching(false);

          const newEndDate = new Date(startDate.current!);
          newEndDate.setDate(newEndDate.getDate() - 1);
          endDate.current = newEndDate;
        });
    } else {
      setIsFetching(false);
    }
  }

  const saveApodsToLocalStorage = () => {
    console.log('Saving Saved APODs to local storage...');
    saveLikedApodDatesInLocalStorage(Array.from(savedApods.current));
  }

  const handleLoadMore = () => {
    const _startDate = new Date(endDate.current);
    _startDate.setDate(_startDate.getDate() - 10);

    startDate.current = _startDate;

    console.log(startDate.current.toUTCString());
    console.log(endDate.current.toUTCString());

    fetchApodFromNASA();
  }

  const saveLikedApod = (likedApod: Apod) => {
    console.log('==== newly liked Apod ====');
    console.log(likedApod);

    savedApods.current.add(likedApod.date);
    console.log(savedApods.current);
  }

  const saveDislikedApod = (dislikedApod: Apod) => {
    console.log('==== newly disliked Apod ====');
    console.log(dislikedApod);
    savedApods.current.delete(dislikedApod.date);
    console.log(savedApods.current);
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
