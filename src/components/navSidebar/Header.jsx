//Importy zewnętrzne
import React from 'react';
//Importy lokalne
import styles from './css/NavSidebar.module.css';

export const Header = () => {
  return (
    <div className={styles.navSidebar_header_container}>
      <h1 className={styles.navSidebar_header}>INFRABOX</h1>
    </div>
  );
};
