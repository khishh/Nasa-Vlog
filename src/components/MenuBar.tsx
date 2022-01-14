import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

const MenuBar = () => {
    return (
        <div className="manu-bar-main-wrapper">
            <nav>
                <Link to={'/'}>
                    <Typography textAlign="center" variant="h5" fontWeight="600" style={{ color: "white", margin: "0.5rem 0" }}>Home</Typography>
                </Link>
                <Link to={'/saved'}>
                    <Typography textAlign="center" variant="h5" fontWeight="600" style={{ color: "white", margin: "0.5rem 0" }}>Saved</Typography>
                </Link>
            </nav>
        </div>
    )
}

export default MenuBar


