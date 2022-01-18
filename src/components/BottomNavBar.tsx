import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import "../App.css";
import "../styles/bottom-nav-bar.css";

const BottomNavBar = () => {
    const [isHomeActive, setIsHomeActive] = useState(false);

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
        <div className="bottom-nav-bar-wrapper">
            <Link to={'/'} className='menu-link'>
                {
                    isHomeActive
                        ? <HomeIcon className="menu-icon" fontSize="large" />
                        : <HomeOutlinedIcon className="menu-icon" fontSize="large" onClick={handleHomeMenuClick} />
                }
            </Link>
            <Link to={'/saved'} className="menu-link">
                {
                    !isHomeActive
                        ? <FavoriteIcon className="menu-icon" fontSize="large" onClick={handleLikesMenuClick} />
                        : <FavoriteBorderOutlinedIcon className="menu-icon" fontSize="large" onClick={handleLikesMenuClick} />

                }
            </Link>
        </div>
    )
}

export default BottomNavBar
