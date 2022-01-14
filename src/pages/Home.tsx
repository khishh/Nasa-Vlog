import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { convertToDateFormat, generateAPODRequest } from '../utils';
import { Apod } from '../models/apod';
import APODCard from '../components/APODCard';
import {Typography } from '@mui/material';
import "../App.css"
import MenuBar from '../components/MenuBar';

import { ThreeDots } from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";



function Home() {

  // TODO: apikey needs to be moved
  const apiKey = "pliz6dW9sZePBmgFd5nWSFMCAIR9ectVlqE4tUvO"

  const [apods, setApods] = useState<Apod[]>([]);
  const endDate = useRef<Date>(new Date());
  const startDate = useRef<Date>();
  const [isFetching, setIsFetching] = useState(true);

  console.log(apods);

  // only called once
  useEffect(() => {
    const _startDate = new Date(endDate.current);
    _startDate.setDate(_startDate.getDate() - 10);

    startDate.current = _startDate;

    fetchApodFromNASA();

    window.onscroll = function(event) {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        handleLoadMore();
      }
    };

    return () => {
      window.removeEventListener('onscroll', () => console.log('onScroll removed'));
    };
    
  }, []);

  const fetchApodFromNASA = () => {
    if (startDate.current) {
      setIsFetching(true);

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
        });
    }
  }

  const handleLoadMore = () => {
    if (startDate.current) {
      const newEndDate = new Date(startDate.current);
      newEndDate.setDate(newEndDate.getDate() - 1);
      endDate.current = newEndDate;

      const _startDate = new Date(endDate.current);
      _startDate.setDate(_startDate.getDate() - 10);

      startDate.current = _startDate;

      console.log(startDate.current.toUTCString());
      console.log(endDate.current.toUTCString());

      fetchApodFromNASA();
    }

  }

  return (
    <div className="home-wrapper">
      <div className="apod-post-wrapper">
        {
          apods.map((apod) =>
            <APODCard key={apod.date} apod={apod} />)
        }
        {
          isFetching && 
            <ThreeDots color="#00BFFF" height={80} width={"100%"}/>
        }
      </div>
      <div className="apod-right-main-wrapper">
        <Typography variant='h1'>Right</Typography>

      </div>
    </div>

  );
}

export default Home;
