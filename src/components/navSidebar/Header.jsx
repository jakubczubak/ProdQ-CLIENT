// Importy zewnętrzne
import React from 'react';

// Importy lokalne
import styles from './css/NavSidebar.module.css';
import logo from '../../assets/ProdQ/logo_white.svg';

export const Header = () => {
  return (
    <div className={styles.navSidebar_header_container}>
      <img src={logo} alt="ProdQ Logo" className={styles.navSidebar_logo} />
    </div>
  );
};