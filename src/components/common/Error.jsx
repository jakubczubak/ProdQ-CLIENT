// Importy zewnętrzne
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importy lokalne
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/error.json';
import styles from './css/Error.module.css';

export const Error = ({ message }) => {
  const [mounted] = useState(true);

  const navigate = useNavigate(); // Inicjalizacja nawigacji

  const handleClick = () => {
    sessionStorage.removeItem('userToken');
    navigate('/login', { state: { logoutMessage: 'See you soon 👋' } });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.loader_container}>
      <div className={styles.error}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
      </div>
      <p className={styles.message}>{message}</p>
      <button className={styles.btn} onClick={handleClick}>
        Logout
      </button>
    </div>
  );
};
