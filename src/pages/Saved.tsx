import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LikeButton from '../components/LikeButton';
import { Apod } from '../models/apod';

const Saved = () => {

    const [savedApod, setSavedApod] = useState<Apod[]>([]);

    // only called when the page is opened
    useEffect(() => {

        
    
    }, [])

    return (
        <div  style={{ width: "100vh", minHeight: "100vh", margin:"0 0 0 15vw "}}>
            {/* <LikeButton /> */}
        </div>

    )
}

export default Saved
