import React, { useState } from 'react';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/loading.json';
import styles from './css/Loader.module.css'; // Zmiana na wspólny plik CSS

export const Loader = () => {
  const [mounted, setMounted] = useState(true);

  const handleClick = () => {
    setMounted(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.container} sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      <div className={styles.animation_wrapper}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
      </div>
      <p className={styles.message}>Loading...</p>
      <button className={styles.btn} onClick={handleClick}>
        Hide
      </button>
    </div>
  );
};