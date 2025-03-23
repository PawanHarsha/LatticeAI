import React, { useState, useRef, useEffect } from 'react';
import { Header, Header2 } from './header.jsx';
import './workstation.css';

const Workstation = () => {
  return (
    <>
    <div className='ws'>
    <Header/>
      <div className='ws-content'>
        <h1>Workstation</h1>
        <p>This is the workstation page.</p>
        </div>
    </div>
    </>
  );
}

export default Workstation;