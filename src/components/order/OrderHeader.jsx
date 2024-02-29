import React from 'react';
import styles from './css/OrderItem.module.css';
import { Typography } from '@mui/material';

export const OrderHeader = ({ state }) => {
  return (
    <div className={styles.header}>
      <Typography variant="h5" component="div">
        {state ? 'Edit order' : 'Create order'}
      </Typography>
    </div>
  );
};
