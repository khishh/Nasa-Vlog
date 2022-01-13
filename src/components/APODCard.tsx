import React from 'react'
import { Apod } from '../models/apod'

const APODCard = (props: APODCardtype) => {
    console.log(props.apod);
    
    return (
        <div>
            <p>{props.apod.date}</p>
            <p>{props.apod.title}</p>
            <p>{props.apod.explanation}</p>
            <img src={props.apod.url}/>
        </div>
    )
}

export default APODCard

type APODCardtype = {
    apod: Apod
}
