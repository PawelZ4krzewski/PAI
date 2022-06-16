import React from 'react';
import './App.css'
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import Notes from './components/notes/Notes';
import Registration from './components/registration/Registration';
import Login from './components/login/Login';
import ChangePassword from './components/changePassword/ChangePassword';
import OneNote from './components/oneNote/OneNote';
import Homepage from './components/homepage/Homepage';

function App(){
  return (<div className = "App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/changePassword" element={<ChangePassword/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/notes" element={<Notes/>}/>
        <Route path="/notes/:type/:noteid" element={<OneNote/>}/>
        <Route path="/notes/:noteid" element={<OneNote/>}/>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App; 