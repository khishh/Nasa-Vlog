import React, { useState } from 'react'
import { Apod } from '../models/apod'
import '../App.css'
import { Button, Card, Typography } from '@mui/material';


const APODCard = (props: APODCardPropstype) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const onReadMoreClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(event.currentTarget.parentElement);
        const parentDiv = event.currentTarget.parentElement;
        if (parentDiv) {
            const hiddenText = parentDiv.querySelector('.hiddenExplanation');

            if (hiddenText) {
                hiddenText.classList.toggle('hiddenExplanation-active');
            }
        }
        setIsExpanded((prevIsExpanded => !prevIsExpanded));
    }

    return (

        <Card id={props.apod.date} style={{ padding: "1rem", margin: "1rem", backgroundColor: "#F6F6F6", position: "relative"}}>
            {props.renderHeartButton()}
            {
                props.apod.media_type === 'video' && <iframe src={props.apod.url} style={{ width: '100%', height: '40vh', borderRadius: '1rem' }} />
            }
            {
                props.apod.media_type === 'image' && <img src={props.apod.url} style={{ width: '100%', borderRadius: '1rem' }} />
            }

            <Typography variant='h4' fontWeight='600'>{props.apod.title}</Typography>
            <Typography variant='h5' fontWeight='600' textAlign="right">{props.apod.date}</Typography>
            {

                <Typography variant="body1" fontWeight="500" className='hiddenExplanation'>{props.apod.explanation}</Typography>

            }

            <Button style={{ backgroundColor: "#23272A", padding: "0.5rem 1.5rem" }} variant="contained" onClick={onReadMoreClick} >
                {isExpanded ? "Read Less" : "Read More"}
            </Button>
        </Card>

    )
}

export default APODCard

type APODCardPropstype = {
    apod: Apod;
    renderHeartButton: () => JSX.Element;
}