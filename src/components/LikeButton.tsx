import React, { useEffect, useRef } from 'react'
import "../styles/like-button.css";
import { Apod } from '../models/apod';

const LikeButton = (props: LikeButtonPropsType) => {

    const isLiked = useRef(props.initialIsLiked);
    
    const heartIcon = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        if(heartIcon.current) {
            if(isLiked.current) {
                heartIcon.current.classList.toggle('heart-active');
            }
        }
    }, []);

    const handleLikeClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const clickedNode = event.currentTarget;
        clickedNode.querySelector('span')?.classList.toggle('heart-active');

        isLiked.current = !isLiked.current;
        console.log(isLiked.current);
        

        isLiked.current ? props.saveLikedApod(props.apod) : props.saveDislikedApod(props.apod);
    }

    return (
        <div className="heart-wrapper" onClick={handleLikeClicked}>
            <span className="heart" ref={heartIcon}></span>
        </div>
    )
}

export default LikeButton

type LikeButtonPropsType = {
    apod: Apod;
    initialIsLiked: boolean,
    saveLikedApod: (likedApod: Apod) => void;
    saveDislikedApod: (dislikedApod: Apod) => void;
}