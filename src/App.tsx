import React from 'react';
import "./App.css"
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Saved from './pages/Saved';
import MenuBar from './components/MenuBar';
import BottomNavBar from './components/BottomNavBar';
import { Theme, useTheme } from '@mui/material';

function App() {

  const configureTheme = (theme: Theme) => {

    theme.typography.h4 = {
      fontSize: '1.2rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.5rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '1.8rem',
      },
    }
  
    theme.typography.h5 = {
      fontSize: '1rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.2rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '1.5rem',
      },
    }
  
    theme.typography.body1 = {
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
      },
    }
  
  }

  configureTheme(useTheme());

  return (
    <div className="page">
      <div className="main-wrapper">
        <MenuBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </div>
      <BottomNavBar />

    </div>
  );
}

export default App;
