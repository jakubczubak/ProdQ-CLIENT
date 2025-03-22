import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/error.json';
import styles from './css/Error.module.css'; // Zmiana na wspólny plik CSS

export const Error = ({ message }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    sessionStorage.removeItem('userToken');
    navigate('/login', { state: { logoutMessage: 'See you soon' } }); 
  };

  return (
    <div className={styles.container} sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      <div className={styles.animation_wrapper}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
      </div>
      <p className={styles.message}>{message}</p>
      <button className={styles.btn} onClick={handleClick}>
        Logout
      </button>
    </div>
  );
};