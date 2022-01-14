import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const MenuBar = () => {
    return (
        <div className="manu-bar-main-wrapper">
            <nav>
                <Link to={'/'} style={{ textDecoration: "none", boxShadow: "none"}}>
                    <Typography className="menu-text" textAlign="center" variant="h5" fontWeight="600" ><FontAwesomeIcon className="menu-icon" icon={faHome} />Home</Typography>
                </Link>
                <Link to={'/saved'} style={{ textDecoration: "none", boxShadow: "none"}}>
                    <Typography className="menu-text" textAlign="center" variant="h5" fontWeight="600" ><FontAwesomeIcon className="menu-icon" icon={faHeart}/>Saved</Typography>
                </Link>
            </nav>
        </div>
    )
}

export default MenuBar


