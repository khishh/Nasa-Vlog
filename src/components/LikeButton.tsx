import React from 'react'
import "../heart-button.css"

const LikeButton = () => {

    const handleLikeClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const clickedNode = event.currentTarget;
        clickedNode.querySelector('span')?.classList.toggle('heart-active');
    }

    return (
        <div onClick={handleLikeClicked} style={{position: "absolute", top: "2rem", right:"2rem", borderRadius:"3rem", backgroundColor:"#F6F6F6"}}>
            <span className="heart"></span>
        </div>
    )
}

export default LikeButton

