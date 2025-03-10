import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './vchat';
import Workstation from './workstation';
import { Signin } from "./signin";
import Homepage from './homepage'

function Home() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route exact path="/workstation" element={<Workstation/>} />
        <Route exact path="/VSF-GPT" element={<Chat/>} />
        <Route exact path="/signin" element={<Signin/>} />
        
      </Routes>
    </Router>
  );
}

//<Route exact path="/signout" element={<Signout/>} />

export default Home;