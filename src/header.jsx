import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import toplogo from './assets/upload-svgrepo-com.svg';
import homelogo from './assets/home-svgrepo-com.svg';
import notilogo from './assets/notifications-svgrepo-com.svg';
import loglogo from './assets/login-svgrepo-com.svg';
import botlogo from './assets/settings-v-svgrepo-com.svg';
import './header.css';

const LogoutDialog = ({ onClose }) => {
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog && dialog.open) {
        dialog.close();
      }
    };
  }, []);

  const handleLogout = (status) => {
    if (status) {
      sessionStorage.clear();
      navigate('/');
    }
    onClose();
  };

  const handleClickOutside = (event) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog 
      ref={dialogRef}
      onClick={handleClickOutside}
      className="logdialog"
    >
      <div>
        <h2 >
          Are you sure you want to logout?
        </h2>
        <div>
          <button
            onClick={() => handleLogout(true)}
            className="logbuts"
          >
            Yes
          </button>
          <button
            onClick={() => handleLogout(false)}
            className="logbuts"
          >
            No
          </button>
        </div>
      </div>
    </dialog>
  );
};

export const Header = ({className}) => {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLogin = () => {
    console.log("logout called");
    navigate('/signin');
  };

  if (sessionStorage.getItem('loggedin')) {
    return (
      <header className={`header ${className || ''}`}>
          <img src={homelogo} alt="home" className='headlogo' onClick={handleHomeClick} />
          <img src={notilogo} alt="notifications" className='headlogo' />
          <img src={loglogo} alt="logout" className='headlogo' onClick={() => setShowLogoutDialog(true)}/>
        {showLogoutDialog && (
          <LogoutDialog 
            onClose={() => setShowLogoutDialog(false)}
          />
        )}
      </header>
    );
  } else {
    return (
      <header className={`header ${className || ''}`}>
          <img src={homelogo} alt="home" className='headlogo' onClick={handleHomeClick} />
          <img src={toplogo} alt="login" className='headlogo' onClick={handleLogin} />
      </header>
    );
  }
};

export const Header2 = ({className}) => {
  return (
    <header className={`titleheader ${className || ''}`}>
      <img src={botlogo} alt="vsf gpt" className='chlogo' />
      <div className='tithdrheading'>LatticeAI</div>
    </header>
  );
};