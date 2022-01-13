import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { convertToDateFormat, generateAPODRequest } from './utils';
import { Apod } from './models/apod';
import APODCard from './components/APODCard';

function App() {

  // TODO: apikey needs to be moved
  const apiKey = "pliz6dW9sZePBmgFd5nWSFMCAIR9ectVlqE4tUvO"

  const [apods, setApods] = useState<Apod[]>([]);
  const endDate = useRef<Date>(new Date());

  // console.log(convertToDateFormat(startDate.current));
  console.log(apods);
  

  // only called once
  useEffect(() => {
    const startDate = new Date(endDate.current);
    startDate.setDate(startDate.getDate() - 10);
    axios.get(generateAPODRequest(
      apiKey,
      convertToDateFormat(startDate),
      convertToDateFormat(endDate.current)))
      .then(response => {
        let newApods: Apod[] = [];
        response.data.forEach((apod: Apod) => newApods.push(apod));  
        newApods = newApods.reverse()
        setApods((prevApods) => [...newApods, ...prevApods]);
      });
  }, []);
  
  return (
    <div>
      {
        apods.map((apod) => <APODCard apod={apod}/>)
      }
    </div>
  );
}

export default App;
