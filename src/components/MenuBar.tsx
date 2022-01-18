import { Theme, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import "../App.css";
import "../styles/menu-bar.css"


const MenuBar = () => {

    const [isHomeActive, setIsHomeActive] = useState(false);

    const theme = useTheme();

    theme.typography.h5 = {
        fontSize: '1rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.5rem',
        },
    }


    useEffect(() => {
        const currentLocation = window.location.href;
        if (currentLocation.includes('saved')) {
            setIsHomeActive(false);
        } else {
            setIsHomeActive(true);
        }
    }, []);

    const handleHomeMenuClick = () => {
        if (!isHomeActive) {
            setIsHomeActive(true);
        }
    }

    const handleLikesMenuClick = () => {
        if (isHomeActive) {
            setIsHomeActive(false);
        }
    }

    return (
        <div className="manu-bar-main-wrapper">
            <nav className="menu-nav">
                <Link to={'/'} className='menu-link'>
                    {
                        isHomeActive
                            ? <div className="menu-item-wrapper" onClick={handleHomeMenuClick}>
                                <HomeIcon className="menu-icon" fontSize="large" />
                                <Typography className="menu-text" textAlign="center" variant="h5" fontWeight="700">Home</Typography>
                            </div>
                            : <div className="menu-item-wrapper" onClick={handleHomeMenuClick}>
                                <HomeOutlinedIcon className="menu-icon" fontSize="large" />
                                <Typography className="menu-text" textAlign="center" variant="h5" fontWeight="400">Home</Typography>
                            </div>
                    }
                </Link>
                <Link to={'/saved'} className="menu-link">
                    {
                        !isHomeActive
                            ? <div className="menu-item-wrapper" onClick={handleLikesMenuClick}>
                                <FavoriteIcon className="menu-icon" fontSize="large" />
                                <Typography className="menu-text" textAlign="center" variant="h5" fontWeight="700" >Likes</Typography>
                            </div>
                            : <div className="menu-item-wrapper" onClick={handleLikesMenuClick}>
                                <FavoriteBorderOutlinedIcon className="menu-icon" fontSize="large" />
                                <Typography className="menu-text" textAlign="center" variant="h5" fontWeight="400">Likes</Typography>
                            </div>
                    }
                </Link>
            </nav>
        </div>
    )
}

export default MenuBar


