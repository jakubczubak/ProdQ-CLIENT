//Importy zewnętrzne
import React from 'react';
import { Typography } from '@mui/material';
//Importy lokalne
import styles from './css/RecycleItem.module.css';

export const Header = ({ state }) => {
  return (
    <div className={styles.header}>
      <Typography variant="h5" component="div">
        {state ? 'Update waste transfer card' : 'Waste transfer card'}
      </Typography>
    </div>
  );
};
