//Importy zewnętrzne
import React from 'react';
import Lottie from 'lottie-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//Importy lokalne
import styles from './css/NotFound.module.css';
import animation from '../../assets/Lottie/notfound.json';

export const NotFound = () => {
  const [mounted, setMounted] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    setMounted(false);
    navigate('/');
  };

  if (!mounted) return null;

  return (
    <div className={styles.notfound_container}>
      <div className={styles.notfound}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
      </div>
      <button className={styles.btn} onClick={handleClick}>
        Go to home
      </button>
    </div>
  );
};
