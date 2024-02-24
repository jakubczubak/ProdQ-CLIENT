// Importy zewnętrzne
import React from 'react';
import styles from './css/Header.module.css';

// Importy lokalne
import { HeaderProductionCart } from './HeaderProductionCart';
import { HeaderBoxCart } from './HeaderBoxCart';
import { HeaderNotificationCart } from './HeaderNotificationCart';

export const Header = () => {
  return (
    <div className={styles.header_container}>
      <HeaderProductionCart />
      <HeaderBoxCart />
      <HeaderNotificationCart />
    </div>
  );
};
