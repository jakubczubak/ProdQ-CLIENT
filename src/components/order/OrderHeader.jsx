//Importy zewnętrzne
import { Typography } from '@mui/material';
import React from 'react';
//Importy lokalne
import styles from './css/OrderItem.module.css';

export const OrderHeader = ({ state }) => {
  return (
    <div className={styles.header}>
      <Typography variant="h5" component="div">
        {state ? 'Edit order' : 'Create order'}
      </Typography>
    </div>
  );
};
