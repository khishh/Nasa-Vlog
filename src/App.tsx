import React from 'react';
import "./App.css"
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Saved from './pages/Saved';
import MenuBar from './components/MenuBar';



function App() {

  return (
    <div className="main-wrapper">
      <MenuBar />
      <Routes>
        <Route path="/" element={ <Home />}/>   
        <Route path="/saved" element={ <Saved />}/>   
      </Routes>
    </div>

  );
}

export default App;
