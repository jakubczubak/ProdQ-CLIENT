/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
//Importy zewnętrzne
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
//Importy lokalne
import animation from '../../assets/Lottie/infinite.json';
import { Header } from './Header';
import { NavigationList } from './NavigationList';
import { Logout } from '../logout/Logout';
import styles from './css/NavSidebar.module.css';

export const NavSidebar = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const navigate = useNavigate(); // Inicjalizacja nawigacji
  const handleLogout = () => {
    sessionStorage.removeItem('userToken');
    navigate('/login', { state: { logoutMessage: 'See you soon 👋' } });
  };

  return (
    <>
      <div className={styles.navSidebar_container}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
        <Header />
        <NavigationList setOpenLogoutModal={setOpenLogoutModal} />
      </div>
      <Logout
        open={openLogoutModal}
        onCancel={() => setOpenLogoutModal(false)}
        onLogout={handleLogout}
      />
    </>
  );
};
