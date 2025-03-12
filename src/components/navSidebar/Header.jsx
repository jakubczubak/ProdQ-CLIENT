//Importy zewnętrzne
import React from 'react';
//Importy lokalne
import styles from './css/NavSidebar.module.css';
import logo from '../../assets/logo.png';

export const Header = () => {
  return (
    <div className={styles.navSidebar_header_container}>
      <img src={logo} alt="logo" className={styles.navSidebar_logo} />
    </div>
  );
};
