import React, { useState } from 'react'
import { Apod } from '../models/apod'
import '../App.css'
import '../styles/apod-card.css'
import { Card, Typography, useTheme } from '@mui/material';


const APODCard = (props: APODCardPropstype) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const onReadMoreClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

        <Card id={props.apod.date} className="apod-card-wrapper">
            {props.renderHeartButton()}
            {
                props.apod.media_type === 'video' && <iframe className="apod-card-iframe" src={props.apod.url} />
            }
            {
                props.apod.media_type === 'image' && <img className="apod-card-img" src={props.apod.url} />
            }

            <Typography variant='h4' fontWeight='600'>{props.apod.title}</Typography>
            <Typography variant='h5' fontWeight='600' textAlign="right">{props.apod.date}</Typography>
            {

                <Typography variant="body1" fontWeight="500" className='hiddenExplanation'>{props.apod.explanation}</Typography>

            }

            <button className="apod-card-button" onClick={onReadMoreClick}>
                <Typography>{isExpanded ? "Read Less" : "Read More"}</Typography>
            </button>

        </Card>

    )
}

export default APODCard

type APODCardPropstype = {
    apod: Apod;
    renderHeartButton: () => JSX.Element;
}