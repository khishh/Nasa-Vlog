import {Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import "../styles/menu-bar.css"

const MenuBar = () => {
    return (
        <div className="manu-bar-main-wrapper">
            <nav>
                <Link to={'/'} className='menu-link'>
                    <Typography className="menu-text" textAlign="center" variant="h5" fontWeight="600" ><FontAwesomeIcon className="menu-icon" icon={faHome} />Home</Typography>
                </Link>
                <Link to={'/saved'} className="menu-link">
                    <Typography className="menu-text" textAlign="center" variant="h5" fontWeight="600" ><FontAwesomeIcon className="menu-icon" icon={faHeart}/>Saved</Typography>
                </Link>
            </nav>
        </div>
    )
}

export default MenuBar


