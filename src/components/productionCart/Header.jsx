//Importy zewnętrzne
import React from 'react';
//Importy lokalne
import styles from './css/ProductionCart.module.css';

export const Header = ({ productionCartQuantity }) => {
  return <h2 className={styles.header}>Number of production items: {productionCartQuantity}</h2>;
};
