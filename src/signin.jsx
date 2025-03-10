import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { TypingAnimation } from './extras.jsx';
import './signin.css'
import sendlogo from './assets/arrow-small-right-svgrepo-com.svg';
 
export const Signin = () => {
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event) => {
    setInputValue(event.target.value);
    };
    const navigate = useNavigate();
    function generateSixDigitTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0'); 
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
      
        const sixDigitTime = `${hours}${minutes}${seconds}`; 
        return parseInt(sixDigitTime); 
      }
      
      const timeCode = generateSixDigitTime();
    const handleLogin = (e) => {
        e.preventDefault()
        sessionStorage.setItem("loggedin",true)
        sessionStorage.setItem("user",inputValue+timeCode)
        navigate('/VSF-GPT')
    };

    const textLines = [
      { text: "Welcome!", className: "text1" },
      { text: "to Lattice AI,", className: "text2" },
      { text: "Gateway to your custom AI-Powered Solutions.", className: "text3" }
    ];
    
      
    return (
      <div className='signinpage'>
        <div className="anim">
          <TypingAnimation textLines={textLines} />
        </div>
        <form className='loginform' onSubmit={handleLogin}>
          <input value={inputValue} placeholder="enter your cdsid" onChange={handleInputChange} className="loginput" ></input>
          <button className='vbut2' disabled={!inputValue.trim()}> <img src={sendlogo} alt="send" className='senlogo' /> </button>
        </form>
      </div>
    );
};


export const Loadpopup= () => {
    const [isOpen, setIsOpen] = useState(true); 
  
    const handleClose = () => {
      setIsOpen(false);
    };
    if(sessionStorage.getItem('loggedin')){
    return (
      <dialog className='popupbox' open={isOpen}> 
        <p>
        Your user id {sessionStorage.getItem('user')}. Please note that this session will expire after 24 hours from the time of login, or sooner if the window is closed. 
        </p>
        <button onClick={handleClose}>Close</button> 
      </dialog>
    )
  }
  }