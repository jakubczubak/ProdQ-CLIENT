// Importy zewnętrzne
import React from 'react';
import styles from './css/Header.module.css';
import { useSelector } from 'react-redux';

// Importy lokalne
import { HeaderBoxCart } from './HeaderBoxCart';
import { HeaderNotificationCart } from './HeaderNotificationCart';

export const Header = () => {
  const isSelectMode = useSelector((state) => state.mode);

  if (isSelectMode) {
    return null;
  }

  return (
    <div className={styles.header_container}>
      <HeaderBoxCart 
       />
      <HeaderNotificationCart />
    </div>
  );
};
