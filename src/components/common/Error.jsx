import React from 'react';
import styles from './css/Error.module.css';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/error.json';
import { useState } from 'react';

export const Error = ({ message }) => {
  const [mounted, setMounted] = useState(true);

  const handleClick = () => {
    setMounted(false);
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
        Hide
      </button>
    </div>
  );
};
