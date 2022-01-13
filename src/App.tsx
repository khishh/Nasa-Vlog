import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { convertToDateFormat, generateAPODRequest } from './utils';
import { Apod } from './models/apod';
import APODCard from './components/APODCard';
import { Accordion, AccordionSummary, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./App.css"


function App() {

  // TODO: apikey needs to be moved
  const apiKey = "pliz6dW9sZePBmgFd5nWSFMCAIR9ectVlqE4tUvO"

  const [apods, setApods] = useState<Apod[]>([]);
  const endDate = useRef<Date>(new Date());
  const startDate = useRef<Date>();

  // console.log(convertToDateFormat(startDate.current));
  console.log(apods);


  // only called once
  useEffect(() => {
    const _startDate = new Date(endDate.current);
    _startDate.setDate(_startDate.getDate() - 10);

    startDate.current = _startDate;

    fetchApodFromNASA();

    window.onscroll = function(ev) {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        handleLoadMore();
      }
    };

    return () => {
      window.removeEventListener('onscroll', () => console.log('onScroll removed'));
    };
    
  }, []);

  // any time startDate ~ endDate window is updated
  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])

  const fetchApodFromNASA = () => {
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
    <div className="main-wrapper">
      <div className="apod-left-main-wrapper">
        <Typography variant='h1'>Left</Typography>
      </div>
      <div className="apod-post-wrapper">
        {/* <Accordion> */}
        {
          apods.map((apod) =>
            <APODCard key={apod.date} apod={apod} />)
        }
        {/* </Accordion> */}
        {/* <Button variant="contained" style={{ width: "100%", margin: "0 0 1rem"}} onClick={handleLoadMore}>Load More</Button> */}
      </div>
      <div className="apod-right-main-wrapper">
        <Typography variant='h1'>Right</Typography>

      </div>
    </div>

  );
}

export default App;
