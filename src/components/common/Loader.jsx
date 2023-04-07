import React from 'react';
import styles from './css/Loader.module.css';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/loading.json';
import { useState } from 'react';

export const Loader = () => {
  const [mounted, setMounted] = useState(true);

  const handleClick = () => {
    setMounted(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.loader_container}>
      <div className={styles.loader}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
      </div>
      <p className={styles.message}>Loading...</p>
      <button className={styles.btn} onClick={handleClick}>
        Hide
      </button>
    </div>
  );
};
