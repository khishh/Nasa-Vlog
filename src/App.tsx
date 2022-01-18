import React from 'react';
import "./App.css"
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Saved from './pages/Saved';
import MenuBar from './components/MenuBar';
import BottomNavBar from './components/BottomNavBar';



function App() {

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
